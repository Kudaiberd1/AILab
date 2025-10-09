from django.db import models
from photos.models import PhotoModel

class ProjectModel(models.Model):

    class Status(models.IntegerChoices):
        WORKING = 0, 'Working'
        SOLD = 1, 'Sold'
        STARTING = 2, 'Starting'
        MVP = 3, 'MVP'
        COMPLETED = 4, 'Completed'

    title = models.CharField(max_length=200)
    description = models.TextField()
    about = models.TextField(null=True)
    photo = models.ManyToManyField(PhotoModel, related_name="Project_photos", blank=True)
    link = models.CharField(max_length=100, blank=True, null=True)
    status = models.IntegerField(choices=Status.choices, default=Status.STARTING)
    author = models.ManyToManyField("authors.AuthorModel", blank=True)
    tags = models.ManyToManyField("tag.TagModel", blank=True)
    stacks = models.ManyToManyField("stack.StackModel", blank=True)
    started_date = models.DateField(null=True, blank=True)
    ended_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Project created {self.title}"