from django.urls import path
from .views import *

urlpatterns = [
    path("api/tag/", StackApiView.as_view()),
    path("api/tags/", GetStacksApiView.as_view()),
]