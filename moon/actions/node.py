from rest_framework import generics

from moon.serializers import NodeSerializer
from moon.serializers import NodeUpdateSerializer
from moon.schemas.node import Node


class NodeList(generics.ListCreateAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer


class NodeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return NodeUpdateSerializer

        return NodeSerializer
