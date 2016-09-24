from django.http import (HttpResponse, Http404, JsonResponse)
from django.views.generic import (ListView, DetailView)
from django.core import serializers
from django.apps import apps
from django.shortcuts import get_object_or_404
from hitcount.views import HitCountMixin
from django.contrib.auth.models import User
from hitcount.models import HitCount
from django.db.models import F
from django.views.decorators.http import condition
from haystack.query import SearchQuerySet
import datetime

from . import models
from . import utils


def queryset_gen(search_qs):
    '''from SearchQuerySet to QuerySet'''
    for item in search_qs:
        yield item.object


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
        obj_list = context.get('object_list')
        if self.isSearchQuery:
            obj_list = queryset_gen(obj_list)
        for obj in obj_list:
            data.append(utils.to_dict(obj))
        processDataList(data)
        return JsonResponse(data, safe=False)

    def get(self, request, *args, **kwargs):
        self.ordering = request.GET.get('ordering')
        tags = request.GET.get('tags')
        created_by = request.GET.get('created_by')
        query = {'is_active': True}
        self.isSearchQuery = False
        if tags:
            tags = [tag for tag in tags.split(',')]
            query['tags__in'] = tags
        try:
            if created_by:
                query['created_by'] = User.objects.get(id=created_by)
        except:
            pass
        if request.GET.get('q'):
            self.queryset = SearchQuerySet().auto_query(
                request.GET.get('q')).models(self.model).load_all()
            self.isSearchQuery = True
        else:
            self.queryset = self.model.objects.filter(**query)
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
        fields = utils.to_dict(obj)
        response = {'fields': fields, 'pk': obj.pk,
                    'model': str(obj.__class__)[8:-2]}
        return JsonResponse(response)


def latest_comment(request):
    for_model_name = request.GET['for']
    for_id = request.GET['id']
    model = apps.get_model('app.Comment_' + for_model_name)
    for_item = apps.get_model(
        'app.' + for_model_name).objects.get(pk=for_id)
    created = modified = datetime.datetime(1996, 11, 28)
    qs = model.objects.filter(for_item=for_item)
    if qs.exists():
        modified = qs.latest("modified").modified
    qs = qs.filter(is_active=True)
    if qs.exists():
        created = qs.latest("created").created
    if created > modified:
        return created
    else:
        return modified


@condition(last_modified_func=latest_comment)
def CommentListView(request):
    ordering = 'created'
    for_model_name = request.GET['for']
    for_id = request.GET['id']
    model = apps.get_model('app.Comment_' + for_model_name)
    try:
        for_item = apps.get_model(
            'app.' + for_model_name).objects.get(pk=for_id)
    except:
        return JsonResponse({})
    num = request.GET.get('num')
    if num:
        # if limited no. of comments is requested, we give them latest
        # comments first
        ordering = '-created'
    queryset = model.objects.filter(
        is_active=True, for_item=for_item).order_by(ordering)
    data = []
    for i, obj in enumerate(queryset):
        if num and num != '' and i >= int(num):
            break
        data.append(utils.to_dict(obj))
    processDataList(data)
    return JsonResponse(data, safe=False)


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


class UserProfileListView(BaseListView):
    model = models.UserProfile

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
            userProfile.refresh_from_db()
    fields = utils.to_dict(userProfile)
    if(fields['department']):
        fields['dept_name'] = models.Dept.objects.get(
            id=fields['department']).name
    else:
        fields['dept_name'] = None
    fields['interest_names'] = userProfile.get_interest_names()
    fields['isModerator'] = models.Moderator.objects.filter(user__id=fields['user']).exists()
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
        query = {'is_active': True}
        tags = request.GET.get('tags')
        q = request.GET.get('q')
        model = model.replace('_', '')
        if model == 'userprofile':
            query = {}
        model = apps.get_model('app.' + model)
        if q:
            count = SearchQuerySet().auto_query(q).models(model).count()
        else:
            if tags:
                tags = [tag for tag in tags.split(',')]
                query['tags__in'] = tags
            count = model.objects.filter(**query).count()
        return JsonResponse({'count': count})
    except ArithmeticError:
        raise Http404


def MoreLikeThisView(request, model, pk):
    try:
        data = []
        item_model = apps.get_model('app.' + model)
        model = apps.get_model('app.' + request.GET.get('model'))
        obj = item_model.objects.get(pk=pk)
        obj_list = SearchQuerySet().models(model).more_like_this(obj)
        if request.GET.get('num'):
            obj_list = obj_list[:int(request.GET.get('num'))]
        obj_list = queryset_gen(obj_list)
        for obj in obj_list:
            data.append({'title': obj.title, 'id': obj.id})
        processDataList(data)
        return JsonResponse(data, safe=False)
    except:
        raise Http404
