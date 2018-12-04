from rest_framework import serializers
import datetime

from moon.schemas.node import Node
from moon.schemas.node_revision import NodeRevision
from moon.schemas.tag import Tag
from moon.schemas.node_tag import NodeTag
from .user import UserSerializer
from .tag import TagSerializer


def refresh_node_tags(node, tags_data):
    node_tag_set = NodeTag.objects.filter(node_id=node.id)
    for node_tag in node_tag_set:
        tag = node_tag.tag
        if tag is not None:
            if NodeTag.objects.filter(tag_id=tag.id).count() <= 1:
                tag.delete()

        node_tag.delete()

    for tag in tags_data:
        name = tag.get('name', None)
        tag = Tag.objects.filter(name=name).first()
        if tag is None:
            parent = Tag.objects.filter(name=node.parent.title).exclude(parent_id__isnull=True).first()
            if parent is not None:
                tag = Tag.objects.create(name=name, parent_id=parent.id)

        if isinstance(tag, Tag):
            NodeTag.objects.update_or_create(node=node, tag=tag)



class NodeRevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeRevision
        fields = ('body',)


class NodeSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    user_id = serializers.IntegerField()
    parent_id = serializers.IntegerField()
    revisions = NodeRevisionSerializer(many=True)
    tags = TagSerializer(many=True)
    channel_name = serializers.SerializerMethodField()
    node_tag = serializers.SerializerMethodField()

    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    updated_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    revision = NodeRevisionSerializer(many=False, read_only=True)


    class Meta:
        model = Node
        fields = ('id', 'parent_id', 'user', 'user_id', 'revisions', 'tags', 'type', 'parent_id',
                  'channel_name', 'node_tag', 'title', 'intro',
                  'revision', 'state', 'created_at', 'updated_at')


    def get_channel_name(self, obj):
        return obj.parent.title if obj.parent else ''

    def get_node_tag(self, obj):
        tags = obj.tags
        channel_name = self.get_channel_name(obj)
        for tag in tags.all():
            if tag.parent.name == channel_name:
                return {'id': tag.id, 'name': tag.name}


    def create(self, validated_data):
        parent_id = validated_data.pop('parent_id')
        revisions_data = validated_data.pop('revisions')
        tags_data = validated_data.pop('tags')
        node = Node.objects.create(**validated_data)

        revision_data = revisions_data[0]
        latest_version = NodeRevision.objects.create(node=node, **revision_data)

        node.parent = Node.objects.get(id=parent_id)
        node.revision = latest_version
        node.save()

        refresh_node_tags(node, tags_data)

        return node


class NodeUpdateSerializer(serializers.ModelSerializer):
    revisions = NodeRevisionSerializer(many=True)
    tags = TagSerializer(many=True)
    parent_id = serializers.IntegerField()

    class Meta:
        model = Node
        fields = ('id', 'title', 'intro', 'revisions', 'tags', 'type', 'state', 'parent_id')

    def update(self, instance, validated_data):
        parent_id = validated_data.get('parent_id', instance.parent.id)

        instance.parent = Node.objects.get(id=parent_id)
        instance.title = validated_data.get('title', instance.title)
        instance.intro = validated_data.get('intro', instance.intro)
        instance.state = validated_data.get('state', instance.state)
        instance.updated_at = datetime.datetime.now()
        instance.save()

        revisions_data = validated_data.pop('revisions')
        if instance.revision is not None:
            instance.revision.body = revisions_data[0].get('body', instance.revision.body)
            instance.revision.save()

        tags_data = validated_data.pop('tags')
        refresh_node_tags(instance, tags_data)

        return instance
