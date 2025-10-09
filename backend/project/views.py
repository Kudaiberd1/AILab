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
    
    def get(self, request, id, format=None):
        project = get_project(id)
        serializer = ProjectSerializer(project)
        return Response(serializer.data, status=200)
    
    def post(self, request,id, format=None):
        f_data=format_check_data(request.data)

        serializer = ProjectSerializer(data=f_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def patch(self, request, id, format=None):
        f_data=format_check_data(request.data)

        try:
            project = ProjectModel.objects.get(pk=id)
        except:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProjectSerializer(project, data=f_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        
        return Response(serializer.errors, status=400)
    
    def delete(self, request, id, format=None):
        try:
            project = ProjectModel.objects.get(pk=id)
        except:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        
        project.delete()
        return Response({"message": "Project deleted"}, status=204)
    

class GetAllProjectsApiView(APIView):

    def get(self, request, format=None):
        projects = ProjectModel.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=200)