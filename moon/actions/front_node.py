from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from moon.serializers import NodeSerializer
from moon.schemas.node import Node


class Pagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'


class NodeConstantList(APIView):

    def get(self, request, format=None):
        data = {
            'page_size': Pagination.page_size,
            'max_page_size': Pagination.max_page_size
        }
        return Response(data)


class NodeList(generics.ListCreateAPIView):
    serializer_class = NodeSerializer
    pagination_class = Pagination

    def get_queryset(self):
        id = self.request.query_params.get('id', None)
        if id is None:
            return Node.objects.exclude(parent=None).order_by('-updated_at')
        else:
            return Node.objects.filter(parent=id, state=Node.PUBLIC).order_by('-updated_at')


class NodeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()

