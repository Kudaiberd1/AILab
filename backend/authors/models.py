from django.db import models

class AuthorModel(models.Model):
    name = models.CharField(max_length=100)
    surename = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.surename}"
