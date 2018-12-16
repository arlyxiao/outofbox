from rest_framework import serializers

from moon.schemas.tag import Tag


class TagSerializer(serializers.ModelSerializer):
    nodes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Tag
        fields = ('id', 'parent_id', 'name', 'nodes')
