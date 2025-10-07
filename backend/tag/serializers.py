from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = TagModel
        fields = "__all__"