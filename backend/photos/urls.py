from django.urls import path
from .views import *

urlpatterns = [
    path("api/photo/", PhotoApiView.as_view())
]