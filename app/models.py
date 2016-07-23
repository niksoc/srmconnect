"""
Definition of models.
"""

from django.db import models
import datetime


class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    register_no = models.CharField(max_length=20, unique=True)


class Question(models.Model):
    asker = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    text = models.TextField()
    asked_date = models.DateField(default=datetime.datetime.now)
    status = models.BooleanField()
    num_votes = models.IntegerField()
    num_views = models.IntegerField()
    num_answers = models.IntegerField()
