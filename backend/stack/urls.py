from django.urls import path
from .views import *

urlpatterns = [
    path("api/stack/", StackApiView.as_view()),
    path("api/stacks/", GetStacksApiView.as_view()),
]