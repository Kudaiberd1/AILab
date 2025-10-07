from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectModel
        fields = ['id', 'title', 'photo', 'description', 'status', 'tags', 'stacks', 'author', 'link', 'started_date', 'ended_date']