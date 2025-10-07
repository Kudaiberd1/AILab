from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class StackSerializer(serializers.ModelSerializer):

    class Meta:
        model = StackModel
        fields = "__all__"