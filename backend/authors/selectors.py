from .models import *
from rest_framework.exceptions import NotFound

def get_author(author_id: int) -> AuthorModel:

    project = AuthorModel.objects.filter(pk=author_id).first()

    if not project:
        raise NotFound
    
    return project