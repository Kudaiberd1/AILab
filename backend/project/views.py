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
from .selectors import get_project

class ProjectApiView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request, format=None):
        project = get_project(request.data['id'])
        serializer = ProjectSerializer(project)
        return Response(serializer.data, status=200)
    
    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def patch(self, request, format=None):
        id=request.data['id']
        try:
            project = ProjectModel.objects.get(pk=id)
        except:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        
        return Response(serializer.errors, status=400)
    
    def delete(self, request, format=None):
        id=request.data['id']
        try:
            project = ProjectModel.objects.get(pk=id)
        except:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
        
        project.delete()
        return Response({"message": "Message deleted"}, status=204)
    