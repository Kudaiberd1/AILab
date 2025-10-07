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
    photo = models.ForeignKey(PhotoModel, on_delete=models.CASCADE, related_name="Project_photos", blank=True, null=True)
    link = models.CharField(max_length=100, null=True)
    status = models.IntegerField(choices=Status.choices, default=Status.STARTING)
    author = models.ManyToManyField("authors.AuthorModel", null=True, blank=True)
    tags = models.ManyToManyField("tag.TagModel", null=True, blank=True)
    stacks = models.ManyToManyField("stack.StackModel", null=True, blank=True)
    started_date = models.DateField(null=True)
    ended_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Project created {self.title}"