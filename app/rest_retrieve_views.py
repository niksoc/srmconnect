from django.http import (HttpResponse, Http404, JsonResponse)
from django.views.generic import (ListView, DetailView)
from django.core import serializers
from django.apps import apps
from django.shortcuts import get_object_or_404
from hitcount.views import HitCountDetailView
from hitcount.views import HitCountMixin
from hitcount.models import HitCount
from django.db.models import F

from . import models
from . import utils


def processDataList(data):
    ''' truncates text field if too long, adds tag_names,
    created_by_name and modified_by_name if corresponding fields exist'''
    if len(data) == 0:
        return
    if('text' in data[0]):
        for obj in data:
            if len(obj['text']) > 150:
                obj['text'] = obj['text'][:150]
    if('tags' in data[0]):
        for obj in data:
            obj['tag_names'] = []
            for tag in obj['tags']:
                obj['tag_names'].append(
                    models.Tag.objects.get(pk=tag).name)
    if('created_by' in data[0]):
        for obj in data:
            try:
                obj['created_by_name'] = models.UserProfile.objects.get(
                    user=models.User.objects.get(pk=obj['created_by'])).display_name
            except:
                obj['created_by_name'] = models.User.objects.get(
                    pk=obj['created_by']).username
    if('modified_by' in data[0]):
        for obj in data:
            if(obj['modified_by'] is not None):
                try:
                    obj['modified_by_name'] = models.UserProfile.objects.get(
                        user=models.User.objects.get(pk=obj['modified_by'])).display_name
                except:
                    obj['modified_by_name'] = models.User.objects.get(
                        pk=obj['modified_by']).username


class BaseListView(ListView):
    paginate_by = 15

    def render_to_response(self, context, **response_kwargs):
        data = []
        for obj in context.get('object_list'):
            data.append(utils.to_dict(obj))
        processDataList(data)
        return JsonResponse(data, safe=False)

    def get(self, request, *args, **kwargs):
        self.ordering = request.GET.get('ordering')
        tags = request.GET.get('tags')
        if tags:
            tags = [tag for tag in tags.split(',')]
            self.queryset = self.model.objects.filter(
                is_active=True, tags__in=tags)
        else:
            self.queryset = self.model.objects.filter(is_active=True)
        return super().get(self, request, *args, **kwargs)


class BaseDetailView(DetailView):

    def render_to_response(self, context, **response_kwargs):
        obj = context.get('object')
        instance = self.get_object()
        try:  # if num_views field exists, update it
            a = instance.num_views  # crude test for existence
        except:
            pass
        else:
            hit_count = HitCount.objects.get_for_object(instance)
            hit_count_response = HitCountMixin.hit_count(
                self.request, hit_count)
            if(hit_count_response[0]):
                instance.num_views = F('num_views') + 1
                instance.save()
        obj = [obj]  # serializer needs an iterable
        # to remove the '[' and ']' to make array -> object
        return HttpResponse(serializers.serialize('json', obj)[1:-1], content_type="application/json")


class CommentListView(ListView):
    ordering = 'created'

    def render_to_response(self, context, **response_kwargs):
        data = []
        for i, obj in enumerate(context.get('object_list')):
            if self.num and self.num != '' and i >= int(self.num):
                break
            data.append(utils.to_dict(obj))
        processDataList(data)
        return JsonResponse(data, safe=False)

    def get(self, request, *args, **kwargs):
        self.for_model_name = request.GET['for']
        self.for_id = request.GET['id']
        model = apps.get_model('app.Comment_' + self.for_model_name)
        for_item = apps.get_model(
            'app.' + self.for_model_name).objects.get(pk=self.for_id)
        self.num = request.GET.get('num')
        if self.num:
            # if limited no. of comments is requested, we give them latest
            # comments first
            self.ordering = '-created'
        self.queryset = model.objects.filter(
            is_active=True, for_item=for_item)
        return super().get(request, *args, **kwargs)


class AnswerListView(ListView):
    ordering = '-num_votes'

    def render_to_response(self, context, **response_kwargs):
        data = []
        for obj in context.get('object_list'):
            data.append(utils.to_dict(obj))
        processDataList(data)
        return JsonResponse(data, safe=False)

    def get(self, request, *args, **kwargs):
        self.for_id = request.GET['id']
        for_question = models.Question.objects.get(pk=self.for_id)
        self.queryset = models.Answer.objects.filter(
            is_active=True, for_question=for_question)
        return super().get(request, *args, **kwargs)


class WantedListView(BaseListView):
    model = models.Wanted


class WantedDetailView(BaseDetailView):
    queryset = models.Wanted.objects.filter(is_active=True)


class AvailableListView(BaseListView):
    model = models.Available


class AvailableDetailView(BaseDetailView):
    queryset = models.Available.objects.filter(is_active=True)


class StoryListView(BaseListView):
    model = models.Story


class StoryDetailView(BaseDetailView):
    queryset = models.Story.objects.filter(is_active=True)


class QuestionListView(BaseListView):
    model = models.Question


class QuestionDetailView(BaseDetailView):
    queryset = models.Question.objects.filter(is_active=True)


class ProjectListView(BaseListView):
    model = models.Project


class ProjectDetailView(BaseDetailView):
    queryset = models.Project.objects.filter(is_active=True)


# kind of a hack view to get the userprofile according to user pk
# and not userProfile pk
def UserProfileDetailView(request, pk):
    userProfile = models.User.objects.get(pk=pk).userprofile
    if request.GET.get('count_hit'):
        hit_count = HitCount.objects.get_for_object(userProfile)
        hit_count_response = HitCountMixin.hit_count(request, hit_count)
        if(hit_count_response[0]):
            userProfile.num_views = F('num_views') + 1
            userProfile.save()
    fields = utils.to_dict(userProfile)
    fields['interest_names'] = []
    for interest in fields['interests']:
        fields['interest_names'].append(
            models.Tag.objects.get(pk=interest).name)
    profile_dict = {'model': "app.userprofile",
                    'pk': fields['id'], 'fields': fields}
    return JsonResponse(profile_dict)


def TagDetailView(request, pk):
    tag = get_object_or_404(models.Tag, pk=pk)
    fields = utils.to_dict(tag)
    return JsonResponse({'model': "app.tag", 'pk': pk, 'fields': fields})


# only model which you fetch by title
def App_TextDetailView(request, title):
    tag = get_object_or_404(models.App_Text, title=title)
    fields = utils.to_dict(tag)
    return JsonResponse(fields)


def CountView(request, model):
    try:
        tags = request.GET.get('tags')
        if tags:
            tags = [tag for tag in tags.split(',')]
            return JsonResponse({'count': apps.get_model(
                'app.' + model).objects.filter(is_active=True, tags__in=tags).count()})
        return JsonResponse({'count': apps.get_model(
            'app.' + model).objects.filter(is_active=True).count()})
    except:
        raise Http404
