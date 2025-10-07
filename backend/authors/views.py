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