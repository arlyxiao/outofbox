from rest_framework import serializers

from .schemas.node import Node


class NodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Node
        fields = ('user_id', 'title')
