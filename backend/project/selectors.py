from .models import *
from rest_framework.exceptions import NotFound

def get_project(post_id: int) -> ProjectModel:

    project = ProjectModel.objects.filter(pk=post_id).first()

    if not project:
        raise NotFound
    
    return project