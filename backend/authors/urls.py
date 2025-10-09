from django.urls import path
from .views import *

urlpatterns = [
    path('api/register/', CreateUserView.as_view(), name="registration"),
    path("api/profiles/", ProfileApiView.as_view(), name="all_users"),
    path("api/my/", MyProfileApiView.as_view()),
    path("api/author/", AuthorApiView.as_view()),
    path("api/login/", LoginView.as_view())
]