import datetime
from haystack import indexes
from app import models


class WantedIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    created_by = indexes.CharField(
        model_attr='created_by__userprofile__display_name', faceted=True)
    created = indexes.DateTimeField(model_attr='created')
    tags = indexes.MultiValueField()
    num_views = indexes.IntegerField(model_attr='num_views')

    def prepare_tags(self, object):
        return object.get_tag_names()

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(
            created__lte=datetime.datetime.now(), is_active=True)

    def get_model(self):
        return models.Wanted

    def get_updated_field(self):
        return "last_modified"


class AvailableIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    created_by = indexes.CharField(
        model_attr='created_by__userprofile__display_name', faceted=True)
    created = indexes.DateTimeField(model_attr='created')
    tags = indexes.MultiValueField()
    num_views = indexes.IntegerField(model_attr='num_views')

    def prepare_tags(self, object):
        return object.get_tag_names()

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(
            created__lte=datetime.datetime.now(), is_active=True)

    def get_model(self):
        return models.Available

    def get_updated_field(self):
        return "last_modified"


class QuestionIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    created_by = indexes.CharField(
        model_attr='created_by__userprofile__display_name', faceted=True)
    created = indexes.DateTimeField(model_attr='created')
    last_active = indexes.DateTimeField(model_attr='last_active')
    tags = indexes.MultiValueField()
    num_views = indexes.IntegerField(model_attr='num_views')
    num_votes = indexes.IntegerField(model_attr='num_votes')

    def prepare_tags(self, object):
        return object.get_tag_names()

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(
            created__lte=datetime.datetime.now(), is_active=True)

    def get_model(self):
        return models.Question

    def get_updated_field(self):
        return "last_modified"


class ProjectIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    created_by = indexes.CharField(
        model_attr='created_by__userprofile__display_name', faceted=True)
    created = indexes.DateTimeField(model_attr='created')
    tags = indexes.MultiValueField()
    num_views = indexes.IntegerField(model_attr='num_views')

    def prepare_tags(self, object):
        return object.get_tag_names()

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(
            created__lte=datetime.datetime.now(), is_active=True)

    def get_model(self):
        return models.Project

    def get_updated_field(self):
        return "last_modified"


class StoryIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    created_by = indexes.CharField(
        model_attr='created_by__userprofile__display_name', faceted=True)
    created = indexes.DateTimeField(model_attr='created')
    tags = indexes.MultiValueField()
    num_views = indexes.IntegerField(model_attr='num_views')
    num_votes = indexes.IntegerField(model_attr='num_votes')

    def prepare_tags(self, object):
        return object.get_tag_names()

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(
            created__lte=datetime.datetime.now(), is_active=True)

    def get_model(self):
        return models.Story

    def get_updated_field(self):
        return "last_modified"
