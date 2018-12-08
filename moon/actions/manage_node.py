from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from rest_framework.authentication import SessionAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from moon.serializers import NodeSerializer
from moon.serializers import NodeUpdateSerializer
from moon.schemas.node import Node
from moon.schemas.tag import Tag


class Pagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 3


class NodeConstantList(APIView):

    def get(self, request, format=None):
        tag_set = Tag.objects.filter(parent_id=1)
        ids = list(map(lambda item: item.id, tag_set))
        actual_set = Tag.objects.filter(parent_id__in=ids)
        actual_tags = list(map(lambda item: item.name, actual_set))

        data = {
            'channels': Node.CHANNELS,
            'node_states': [x[0] for x in Node.STATES],
            'types': [x[0] for x in Node.TYPES],
            'tags': actual_tags,
            'page_size': Pagination.page_size,
            'max_page_size': Pagination.max_page_size
        }

        return Response(data)


class NodeList(generics.ListCreateAPIView):
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    queryset = Node.objects.all().exclude(type='channel').order_by('-created_at', '-updated_at')
    serializer_class = NodeSerializer
    pagination_class = Pagination



class NodeDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    queryset = Node.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return NodeUpdateSerializer

        return NodeSerializer