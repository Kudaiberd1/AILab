from django.db import models

class StackModel(models.Model):
    stack_name = models.CharField(max_length=100)

    def __str__(self):
        return self.stack_name