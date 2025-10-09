from django.shortcuts import get_object_or_404, render
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import *
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import status
from .services import *
from .selectors import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

from rest_framework import status
from authors.utils import set_jwt_token

# For register and registered user

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ProfileApiView(generics.ListAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

# Authors for project

class AuthorApiView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        author = get_author(request.data['id'])
        serializer = AuthorSerializer(author)
        return Response(serializer.data, status=200)

    def post(self, request, format=None):
        serializer = AuthorSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)
    
class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            if access_token and refresh_token:
                response = set_jwt_token(
                    response=response,
                    access_token=access_token,
                    refresh_token=refresh_token,
                )
                #del response.data["access"]
                #del response.data["refresh"]
        

        return response