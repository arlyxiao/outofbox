from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from moon.serializers import NodeSerializer
from moon.serializers import NodeUpdateSerializer
from moon.schemas.node import Node


class NodeConstantList(APIView):

    def get(self, request, format=None):
        data = {
            'node_states': [x[0] for x in Node.STATES],
            'types': [x[0] for x in Node.TYPES]
        }
        return Response(data)


class NodeList(generics.ListCreateAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer


class NodeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return NodeUpdateSerializer

        return NodeSerializer
