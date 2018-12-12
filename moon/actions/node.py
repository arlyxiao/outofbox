from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from moon.serializers import NodeSerializer
from moon.schemas.node import Node


class Pagination(PageNumberPagination):
    page_size = 18
    page_size_query_param = 'page_size'


class Home(generics.ListAPIView):
    serializer_class = NodeSerializer
    pagination_class = Pagination

    def get_queryset(self):
        type = self.request.query_params.get('type', '')

        nodes = Node.objects.filter(state=Node.PUBLIC) \
            .exclude(type=Node.CHANNEL)\
            .order_by('-created_at', '-updated_at')

        if type == 'text':
            return nodes.filter(type=type).exclude(cover__isnull=True)\
                        .exclude(cover='')[:6]

        if type == 'shared-video':
            return nodes.filter(type=type).exclude(cover__isnull=True)\
                        .exclude(cover='')[:18]

        return None


class Search(generics.ListAPIView):
    serializer_class = NodeSerializer
    pagination_class = Pagination

    def get_queryset(self):
        nodes = Node.objects.filter(state=Node.PUBLIC) \
            .exclude(type=Node.CHANNEL) \
            .order_by('-created_at', '-updated_at')

        type = self.request.query_params.get('type', '')

        if type in ['text', 'shared-video']:
            return nodes.filter(type=type)

        return nodes.filter(title__icontains=type)
