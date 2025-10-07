from django.urls import path
from .views import TagApiView

urlpatterns = [
    path("api/tag/", TagApiView.as_view())
]