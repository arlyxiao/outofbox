from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import NodeSerializer

from .schemas.node import Node


class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all().order_by('id')
    serializer_class = NodeSerializer
