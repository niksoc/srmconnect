"""
Definition of models.
"""

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    course_choices = (
        ('B.Tech', 'B.Tech'),
        ('M.Tech', 'M.Tech'),
        ('Phd', 'Phd'),
        )
    dept_choices = (
        ('CSE', 'CSE'),
        ('IT', 'IT'),
        ('ECE', 'ECE'),
        ('ITC', 'ITC'),
        ('Mech', 'Mech'),
        )
    year_choices = (
        ('I', 1),
        ('II', 2),
        ('III', 3),
        ('IV', 4),
        ('V', 5),
        )
    campus_choices = (
        ('KTR', 'Kattankulathur'),
        ('VDP', 'Vadapalani'),
        ('RMP', 'Ramapuram'),
        ('NCR', 'NCR'),
        ('SKM', 'Sikkim'),
        )
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    display_name = models.CharField(max_length=50)
    register_no = models.CharField(max_length=20, unique=True, null=True)
    course = models.CharField(choices=course_choices, max_length=10, null=True)
    department = models.CharField(choices=dept_choices, max_length=5, null=True)
    year = models.IntegerField(choices=year_choices, null=True)
    campus = models.CharField(choices=campus_choices, max_length=3, null=True)
    oneliner = models.CharField(max_length=100, null=True)
    profile_image = models.ImageField(upload_to='profiles', null=True)
    moderator = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.id and not self.display_name:
            self.display_name = self.first_name + self.last_name
        return super(UserProfile, self).save(*args, **kwargs)


User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])


class Question(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user))
    title = models.CharField(max_length=100, blank=False)
    text = models.TextField()
    status = models.BooleanField(default=True)
    num_votes = models.IntegerField(default=0)
    num_views = models.IntegerField(default=0)
    num_answers = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created', 'num_answers', 'num_views', 'num_votes', )


class Answer(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user))
    text = models.TextField(blank=False)
    status = models.BooleanField(default=True)
    num_votes = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created', 'num_votes', )


class Story(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user))
    title = models.CharField(max_length=100, blank=False)
    text = models.TextField(blank=False)
    status = models.BooleanField(default=True)
    num_votes = models.IntegerField(default=0)
    num_views = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created', 'num_votes', 'num_views', )


class Wanted(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user))
    title = models.CharField(max_length=50, blank=False)
    text = models.TextField()
    status = models.BooleanField(default=True)
    num_views = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created', 'num_views', )


class Available(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user))
    title = models.CharField(max_length=50, blank=False)
    text = models.TextField()
    status = models.BooleanField(default=True)
    num_views = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created', 'num_views', )
