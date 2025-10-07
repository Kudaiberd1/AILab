from django.db import models

class PhotoModel(models.Model):
    photo = models.ImageField(upload_to='project_photos/')
