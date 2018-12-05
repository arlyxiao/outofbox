from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from moon.serializers import NodeSerializer
from moon.schemas.node import Node
from moon.schemas.tag import Tag


class Pagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


class NodeConstantList(APIView):

    def get(self, request, format=None):
        data = {
            'page_size': Pagination.page_size,
            'max_page_size': Pagination.max_page_size
        }

        id = request.query_params.get('id', '')
        if not id:
            return Response(data)

        channel = Node.objects.get(pk=id)
        parent_tag = Tag.objects.filter(name=channel.title).first()
        tags = Tag.objects.filter(parent_id=parent_tag.id)
        data['tags'] = list(map(lambda tag: [tag.id, tag.name, channel.title], tags))

        return Response(data)


class NodeList(generics.ListCreateAPIView):
    serializer_class = NodeSerializer
    pagination_class = Pagination

    def get_queryset(self):
        nodes = Node.objects.filter(state=Node.PUBLIC)\
            .exclude(type='channel')\
            .order_by('-created_at', '-updated_at')
        id = self.request.query_params.get('id', '')
        if not id:
            return nodes

        tag = self.request.query_params.get('tag', '')
        if not tag:
            return nodes.filter(parent=id)

        return nodes.filter(tags__id=tag)


class NodeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer


