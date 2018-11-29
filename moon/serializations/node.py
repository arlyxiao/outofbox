from rest_framework import serializers
import datetime

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
    parent_id = serializers.IntegerField()
    revisions = NodeRevisionSerializer(many=True)

    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    updated_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    revision = NodeRevisionSerializer(many=False, read_only=True)


    class Meta:
        model = Node
        fields = ('id', 'parent_id', 'user', 'user_id', 'revisions', 'type', 'parent_id',
                  'title', 'revision', 'state', 'created_at', 'updated_at')


    def create(self, validated_data):
        parent_id = validated_data.pop('parent_id')
        revisions_data = validated_data.pop('revisions')
        node = Node.objects.create(**validated_data)

        revision_data = revisions_data[0]
        latest_version = NodeRevision.objects.create(node=node, **revision_data)

        node.parent = Node.objects.get(id=parent_id)
        node.revision = latest_version
        node.save()

        return node


class NodeUpdateSerializer(serializers.ModelSerializer):
    revisions = NodeRevisionSerializer(many=True)
    parent_id = serializers.IntegerField()

    class Meta:
        model = Node
        fields = ('id', 'title', 'revisions', 'type', 'state', 'parent_id')

    def update(self, instance, validated_data):
        parent_id = validated_data.get('parent_id', instance.parent.id)

        instance.parent = Node.objects.get(id=parent_id)
        instance.title = validated_data.get('title', instance.title)
        instance.state = validated_data.get('state', instance.state)
        instance.updated_at = datetime.datetime.now()
        instance.save()

        revisions_data = validated_data.pop('revisions')
        if instance.revision is not None:
            instance.revision.body = revisions_data[0].get('body', instance.revision.body)
            instance.revision.save()

        return instance
