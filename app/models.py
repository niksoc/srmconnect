"""
Definition of models.
"""

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib import admin
from django_extensions.db.models import TimeStampedModel


def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

#    ActivatableModelMixin:
#    refer https://github.com/ambitioninc/django-activatable-model/blob/develop/activatable_model/models.py
#    to extend this if needed. Before using this be aware of possible
#    ForiegnKey/OnetoOneKey problems. refer to above repository for details


class ActivatableModelMixin(models.Model):
    """
    overrides delete to make is_active field false
    subclass should create an is_active field
    """
    class Meta:
        abstract = True

    def delete(self, force=False, **kwargs):
        """
        It is impossible to delete an activatable model unless force is True.
        This function instead sets it to inactive.
        """
        if force:
            return super(ActivatableModelMixin, self).delete(**kwargs)
        else:
            setattr(self, 'is_active', False)
            return self.save(update_fields=['is_active'])


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

    def save(self, *args, **kwargs):
        if not self.id and not self.display_name:
            self.display_name = self.first_name + self.last_name
        return super(UserProfile, self).save(*args, **kwargs)


User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])


class Tag(models.Model):
    name = models.CharField(max_length=50, blank=False)
    is_moderator_only = models.BooleanField(default=False)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Feature(TimeStampedModel, ActivatableModelMixin):
    title = models.CharField(max_length=100, blank=False)
    text = models.TextField()
    num_views = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Answer(TimeStampedModel, ActivatableModelMixin):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='answers_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='answers_modified',
                                    null=True)
    text = models.TextField(blank=False)
    num_votes = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ('created', 'num_votes', )


class Notification(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=100)
    url = models.URLField(max_length=100)


class Question(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='questions_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='questions_modified',
                                    null=True)
    num_votes = models.IntegerField(default=0)
    num_answers = models.IntegerField(default=0)
    followers = models.ManyToManyField(User)

    class Meta:
        ordering = ('created', 'num_views', 'num_votes', )


class Story(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='stories_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='stories_modified',
                                    null=True)
    num_votes = models.IntegerField(default=0)

    class Meta:
        ordering = ('created', 'num_votes', 'num_views', )


class Wanted(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='wanteds_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='wanteds_modified',
                                    null=True)

    class Meta:
        ordering = ('created', 'num_views', )


class Available(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='availables_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='availables_modified',
                                    null=True)

    class Meta:
        ordering = ('created', 'num_views', )


class Moderator(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user))


class CommentBaseModel(TimeStampedModel, ActivatableModelMixin):
    text = models.TextField(blank=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Comment_Question(CommentBaseModel, ActivatableModelMixin):
    for_item = models.ForeignKey(Question, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_questions')


class Comment_Answer(CommentBaseModel, ActivatableModelMixin):
    for_item = models.ForeignKey(Answer, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_answers')


class Comment_Available(CommentBaseModel, ActivatableModelMixin):
    for_item = models.ForeignKey(Available, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_availables')


class Comment_Wanted(CommentBaseModel, ActivatableModelMixin):
    for_item = models.ForeignKey(Wanted, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_wanteds')


class Comment_Story(CommentBaseModel, ActivatableModelMixin):
    for_item = models.ForeignKey(Story, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_stories')

admin.site.register(UserProfile)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Story)
admin.site.register(Available)
admin.site.register(Wanted)
admin.site.register(Tag)
admin.site.register(Notification)
admin.site.register(Moderator)
admin.site.register(Comment_Question)
admin.site.register(Comment_Answer)
admin.site.register(Comment_Available)
admin.site.register(Comment_Wanted)
admin.site.register(Comment_Story)
