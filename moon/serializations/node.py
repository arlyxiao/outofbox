from rest_framework import serializers

from moon.schemas.node import Node
from moon.schemas.node_revision import NodeRevision
from .user import UserSerializer


class NodeRevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeRevision
        fields = ('body',)


class NodeSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    user_id = serializers.IntegerField()
    revisions = NodeRevisionSerializer(many=True)

    class Meta:
        model = Node
        fields = ('id', 'user', 'user_id', 'title', 'revisions', 'type')

    def create(self, validated_data):
        revisions_data = validated_data.pop('revisions')
        node = Node.objects.create(**validated_data)

        revision_data = revisions_data[0]
        latest_version = NodeRevision.objects.create(node=node, **revision_data)

        node.parent = Node.objects.get(id=1)
        node.revision = latest_version
        node.save()

        return node


class NodeUpdateSerializer(serializers.ModelSerializer):
    revisions = NodeRevisionSerializer(many=True)

    class Meta:
        model = Node
        fields = ('id', 'title', 'revisions', 'type')

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        revisions_data = validated_data.pop('revisions')
        instance.revision.body = revisions_data[0].get('body', instance.revision.body)
        instance.revision.save()

        return instance
