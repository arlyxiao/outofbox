from rest_framework import serializers
import datetime

from moon.schemas.node import Node
from moon.schemas.node_revision import NodeRevision
from moon.schemas.tag import Tag
from moon.schemas.node_tag import NodeTag
from .tag import TagSerializer


def refresh_node_tags(node, tags_data):
    root_tag_id = 1
    node_tag_set = NodeTag.objects.filter(node_id=node.id)
    for node_tag in node_tag_set:
        tag = node_tag.tag
        if tag is not None:
            if NodeTag.objects.filter(tag_id=tag.id).count() <= 1:
                tag.delete()

        node_tag.delete()

    for tag in tags_data:
        name = tag.get('name', None)
        if name is None:
            next

        parent, parent_created = Tag.objects.get_or_create(name=node.parent.title, parent_id=root_tag_id)
        tag, tag_created = Tag.objects.get_or_create(name=name, parent=parent)

        if tag_created:
            NodeTag.objects.update_or_create(node=node, tag=tag)


class NodeRevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeRevision
        fields = ('body',)


class NodeSerializer(serializers.ModelSerializer):
    # https://www.django-rest-framework.org/tutorial/1-serialization/
    user_id = serializers.IntegerField(required=False)
    parent_id = serializers.IntegerField()
    revisions = NodeRevisionSerializer(many=True)
    tags = TagSerializer(many=True)
    channel_name = serializers.SerializerMethodField()

    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    updated_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    revision = NodeRevisionSerializer(many=False, read_only=True)


    class Meta:
        model = Node
        fields = ('id', 'user_id', 'parent_id', 'revisions', 'tags', 'type', 'parent_id',
                  'channel_name', 'title', 'cover', 'intro', 'video',
                  'revision', 'state', 'created_at', 'updated_at')


    def get_channel_name(self, obj):
        return obj.parent.title if obj.parent else ''


    def create(self, validated_data):
        parent_id = validated_data.pop('parent_id')
        revisions_data = validated_data.pop('revisions')
        tags_data = validated_data.pop('tags')
        node = Node.objects.create(**validated_data)

        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            node.user = request.user

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
        fields = ('id', 'title', 'cover', 'intro', 'video', 'revisions', 'tags',
                  'type', 'state', 'parent_id')

    def update(self, instance, validated_data):
        # https://stackoverflow.com/questions/30203652/how-to-get-request-user-in-django-rest-framework-serializer
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            instance.user = request.user

        parent_id = validated_data.get('parent_id', instance.parent.id)

        instance.parent = Node.objects.get(id=parent_id)
        instance.title = validated_data.get('title', instance.title)
        instance.type = validated_data.get('type', instance.type)
        instance.cover = validated_data.get('cover', instance.cover)
        instance.intro = validated_data.get('intro', instance.intro)
        instance.video = validated_data.get('video', instance.video)
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
