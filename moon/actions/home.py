from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from moon.serializers import NodeSerializer
from moon.schemas.node import Node


class Pagination(PageNumberPagination):
    page_size = 18
    page_size_query_param = 'page_size'


class NodeList(generics.ListAPIView):
    serializer_class = NodeSerializer
    pagination_class = Pagination

    def get_queryset(self):
        type = self.request.query_params.get('type', '')

        print('====')
        print(type)
        print('====')

        nodes = Node.objects.filter(state=Node.PUBLIC) \
            .order_by('-created_at', '-updated_at')

        if type == 'text':
            return nodes.filter(type=type).exclude(cover__isnull=True)[:6]

        if type == 'shared-video':
            return nodes.filter(type=type).exclude(cover__isnull=True)

        if type == 'search':
            pass

        return None


