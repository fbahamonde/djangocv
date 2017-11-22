from django.db import models
from django.utils import timezone
import os

class Perfil(models.Model):
    author = models.ForeignKey('auth.User')
    name = models.CharField(max_length=200)
    nacimiento = models.DateTimeField(
            default=timezone.now)
    Direccion = models.CharField(max_length=200)
    Email= models.CharField(max_length=200)
    Celular = models.CharField(max_length=200)
    web = models.CharField(max_length=200)
    def __str__(self):
        return self.title
