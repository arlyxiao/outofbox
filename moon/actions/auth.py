from rest_framework.response import Response

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

class User(APIView):
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    # permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if request.user is None:
            return None

        data = {
            'username': request.user.username,
        }

        return Response(data, status=HTTP_200_OK)



class Login(APIView):

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        if username is None or password is None:
            return Response(status=HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is None:
            return Response(status=HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)

        data = {
            'token': token.key
        }

        return Response(data, status=HTTP_200_OK)


class Logout(APIView):
    authentication_classes = (SessionAuthentication, TokenAuthentication)

    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=HTTP_200_OK)

