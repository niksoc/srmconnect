"""
Definition of models.
"""

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib import admin
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django_markdown.models import MarkdownField
from django.utils.html import escape
from hitcount.models import HitCountMixin
from django.db.models import F
import datetime


def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

#    ActivatableModelMixin:
#    refer https://github.com/ambitioninc/django-activatable-model/blob/develop/activatable_model/models.py
#    to extend this if needed. Before using this be aware of possible
#    ForiegnKey/OnetoOneKey problems. refer to above repository for details


class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(blank=True)

    def save(self, _modified, *args, **kwargs):
        if(_modified):
            self.modified = datetime.datetime.now()
        super(TimeStampedModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True


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


class Dept(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50, blank=False)
    is_moderator_only = models.BooleanField(default=False)
    dept = models.ManyToManyField(Dept, blank=True)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    course_choices = (
        ('B.Tech', 'B.Tech'),
        ('M.Tech', 'M.Tech'),
        ('Phd', 'Phd'),
    )
    year_choices = (
        (1, 'I'),
        (2, 'II'),
        (3, 'III'),
        (4, 'IV'),
        (5, 'V'),
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
    register_no = models.CharField(
        max_length=20, unique=True, null=True, blank=True)
    course = models.CharField(choices=course_choices,
                              max_length=10, null=True, blank=True)
    department = models.ForeignKey(
        Dept, on_delete=models.SET_NULL, blank=True, null=True)
    year = models.IntegerField(choices=year_choices, null=True, blank=True)
    campus = models.CharField(choices=campus_choices,
                              max_length=3, null=True, blank=True)
    profile_text = MarkdownField(
        max_length=500, null=True, blank=True, verbose_name='Describe yourself')
    profile_image = ProcessedImageField(upload_to='profiles',
                                        processors=[ResizeToFill(50, 50)],
                                        format='JPEG',
                                        options={'quality': 60},
                                        default='profiles/default.jpg',
                                        blank=True)
    interests = models.ManyToManyField(Tag, blank=True)
    num_views = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.id and not self.display_name:
            self.display_name = self.first_name + self.last_name
        return super(UserProfile, self).save(*args, **kwargs)

    def clean(self):
        self.first_name = escape(self.first_name)
        self.last_name = escape(self.last_name)
        self.display_name = escape(self.display_name)
        self.register_no = escape(self.register_no)


User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])


class Notification(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=100)
    url = models.CharField(max_length=100)


class Feature(TimeStampedModel, ActivatableModelMixin):
    title = models.CharField(max_length=100, blank=False)
    text = MarkdownField()
    num_views = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank=True)
    is_active = models.BooleanField(default=True)

    __original_title_text = None
    __original_modified = None

    def __init__(self, *args, **kwargs):
        super(Feature, self).__init__(*args, **kwargs)
        self.__original_title_text = (self.title, self.text)
        self.__original_modified = self.modified

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        _modified = True
        if (self.title, self.text) == self.__original_title_text:
            _modified = False
        super(Feature, self).save(_modified=_modified, *args, **kwargs)
        self.__original_title_text = (self.title, self.text)

    class Meta:
        abstract = True

    def clean(self):
        self.title = escape(self.title)


class Question(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='questions_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='questions_modified',
                                    null=True)
    last_active = models.DateTimeField(null=True, blank=True)
    votes = models.ManyToManyField(User, blank=True,
                                   related_name='questions_voted')
    num_votes = models.IntegerField(default=0)
    num_answers = models.IntegerField(default=0)
    followers = models.ManyToManyField(User)

    def save(self, *args, **kwargs):
        super(Question, self).save(*args, **kwargs)
        self.followers.add(self.created_by)

    class Meta:
        ordering = ('created', 'num_views', 'num_votes', )


class Answer(TimeStampedModel, ActivatableModelMixin):
    for_question = models.ForeignKey(Question, on_delete=models.PROTECT)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='answers_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='answers_modified',
                                    null=True)
    text = MarkdownField(blank=False)
    votes = models.ManyToManyField(User, blank=True,
                                   related_name='answers_voted')
    num_votes = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    followers = models.ManyToManyField(User)

    __original_text = None
    __original_modified = None

    def __str__(self):
        return self.text[:20]

    def __init__(self, *args, **kwargs):
        super(Answer, self).__init__(*args, **kwargs)
        self.__original_text = self.text
        self.__original_modified = self.modified

    def save(self, *args, **kwargs):
        if not self.pk:
            q = self.for_question
            q.num_answers += 1
            for follower in q.followers.all():
                if follower == self.created_by:
                    continue
                n = Notification(
                    owner=follower, message='New answer to ' + q.title, url='question/' + str(q.id))
                n.save()

        _modified = True
        if self.text == self.__original_text:
            _modified = False
        super(Answer, self).save(_modified=_modified, *args, **kwargs)
        self.__original_text = self.text
        q = self.for_question
        q.last_active = datetime.datetime.now()
        q.save()

    class Meta:
        ordering = ('created', 'num_votes')

    def delete(self, *args, **kwargs):
        q = self.for_question
        q.num_answers -= 1
        q.save()
        super(Answer, self).delete(*args, **kwargs)


class Story(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='stories_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='stories_modified',
                                    null=True)
    votes = models.ManyToManyField(User, blank=True,
                                   related_name='stories_voted')
    num_votes = models.IntegerField(default=0)
    followers = models.ManyToManyField(User)

    class Meta:
        ordering = ('created', 'num_views', 'num_votes', )


class Wanted(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='wanteds_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='wanteds_modified',
                                    null=True)
    followers = models.ManyToManyField(User)

    class Meta:
        ordering = ('created', 'num_views', )


class Available(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='availables_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='availables_modified',
                                    null=True)
    followers = models.ManyToManyField(User)

    class Meta:
        ordering = ('created', 'num_views', )


class Project(Feature):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='projects_created')
    modified_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                    related_name='projects_modified',
                                    null=True)
    image = ProcessedImageField(upload_to='projects',
                                processors=[ResizeToFill(300, 225)],
                                format='JPEG',
                                options={'quality': 60},
                                default='projects/default.jpg',
                                blank=True,
                                null=True)

    class Meta:
        ordering = ('created', 'num_views', )


class Moderator(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user))


class CommentBaseModel(TimeStampedModel, ActivatableModelMixin):
    text = models.TextField(blank=False, verbose_name='comment')
    is_active = models.BooleanField(default=True)

    __original_text = None
    __original_modified = None

    def __init__(self, *args, **kwargs):
        super(CommentBaseModel, self).__init__(*args, **kwargs)
        self.__original_text = self.text
        self.__original_modified = self.modified

    def comment_created(instance):
        i = instance.for_item
        # notifying all followers
        for follower in i.followers.all():
            if follower == instance.created_by:
                continue
            model = str(i.__class__).split('.')[2].split('\'')[0]
            if model == 'Answer':
                title = 'answer ' + i.text[:5]
                model = 'Question'
            else:
                title = i.title
            n = Notification(
                owner=follower, message='New comment on ' + model + ' "' + title + '"',
                url='/' + model + '/' + str(i.id))
            n.save()
        # add creator to follower list if not already in it
        if not i.followers.filter(id=instance.created_by.id).exists():
            i.followers.add(instance.created_by)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.comment_created()
        _modified = True
        if self.text == self.__original_text:
            _modified = False
        super(CommentBaseModel, self).save(
            _modified=_modified, *args, **kwargs)
        self.__original_text = self.text

    def __str__(self):
        return self.title

    class Meta:
        abstract = True


class Comment_Question(CommentBaseModel):
    for_item = models.ForeignKey(Question, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_questions')

    def save(self, *args, **kwargs):
        q = self.for_item
        q.last_active = datetime.datetime.now()
        q.save()
        super(Comment_Question, self).save(*args, **kwargs)


class Comment_Answer(CommentBaseModel):
    for_item = models.ForeignKey(Answer, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_answers')


class Comment_Available(CommentBaseModel):
    for_item = models.ForeignKey(Available, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_availables')


class Comment_Wanted(CommentBaseModel):
    for_item = models.ForeignKey(Wanted, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_wanteds')


class Comment_Story(CommentBaseModel):
    for_item = models.ForeignKey(Story, on_delete=models.PROTECT,
                                 related_name='comments')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT,
                                   related_name='comments_created_on_stories')


class App_Text(models.Model):
    title = models.CharField(max_length=20, unique=True)
    text = MarkdownField()

    def __str__(self):
        return self.title


class Feedback(models.Model):
    title = models.CharField(max_length=20, unique=True,
                             verbose_name="your email")
    text = MarkdownField()

    def __str__(self):
        return self.title


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
admin.site.register(App_Text)
admin.site.register(Feedback)
admin.site.register(Dept)
