from django.db import models
from django.contrib.auth.models import User

class CommentModel(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey("project.ProjectModel", on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} sended comment {self.project}"