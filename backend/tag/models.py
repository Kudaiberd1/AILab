from django.db import models

class TagModel(models.Model):
    tag_name = models.CharField(max_length=100)

    def __str__(self):
        return self.tag_name
