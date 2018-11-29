from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from moon.serializers import NodeSerializer
from moon.serializers import NodeUpdateSerializer
from moon.schemas.node import Node


class Pagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 3


class NodeConstantList(APIView):

    def get(self, request, format=None):
        data = {
            'channels': Node.CHANNELS,
            'node_states': [x[0] for x in Node.STATES],
            'types': [x[0] for x in Node.TYPES],
            'page_size': Pagination.page_size,
            'max_page_size': Pagination.max_page_size
        }
        return Response(data)


class NodeList(generics.ListCreateAPIView):
    queryset = Node.objects.all().order_by('-updated_at')
    serializer_class = NodeSerializer
    pagination_class = Pagination


class NodeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return NodeUpdateSerializer

        return NodeSerializer