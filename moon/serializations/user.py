from rest_framework import serializers

from moon.schemas.user import User


class UserSerializer(serializers.ModelSerializer):
    nodes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'
