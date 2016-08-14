from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.http import HttpResponse
from django.http import Http404
from django.core.urlresolvers import reverse
from django.forms import ModelForm
from django.views.generic import (CreateView, UpdateView, DeleteView)
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from searchableselect.widgets import SearchableSelect

from . import models
from . import utils
from . import forms


def isCreator(obj, user):
    return obj.created_by == user


# temp needed for implicitly passed self
def isCreatorOrModerator(temp, obj, user):
    isModerator = models.Moderator.objects.filter(user=user).exists()
    return obj.created_by == user or isModerator


class CommonCreateFormViewBase(CreateView):
    template_name = 'app/form.html'

    def form_valid(self, form):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        obj = form.save(commit=False)
        obj.created_by = self.request.user
        obj.modified_by = self.request.user
        obj.save()
        form.save_m2m()
        return super(CommonCreateFormViewBase, self).form_valid(form)


class CommonUpdateFormViewBase(UpdateView):
    template_name = 'app/form.html'
    permissions = isCreatorOrModerator

    def form_valid(self, form):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        if(not self.permissions(self.get_object(), self.request.user)):
            return HttpResponse(status=403)
        obj = form.save(commit=False)
        obj.modified_by = self.request.user
        obj.save()
        form.save_m2m()
        return super(CommonUpdateFormViewBase, self).form_valid(form)


class CommonDeleteViewBase(DeleteView):
    template_name = 'app/form.html'
    permissions = isCreatorOrModerator
    success_url = 'app/message/successfully_deleted'

    def delete(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        if(not self.permissions(self.get_object(), self.request.user)):
            return HttpResponse(status=403)
        self.object = self.get_object()
        success_url = self.get_success_url()
        self.object.delete()
        return HttpResponseRedirect(success_url)

tagsWidget = {
    'tags': SearchableSelect(model='app.Tag', search_field='name', many=True)
}


class WantedCreateFormView(CommonCreateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Wanted
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    model = models.Wanted
    success_url = "/app/message/success/"


class WantedUpdateFormView(CommonUpdateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Wanted
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    success_url = "/app/message/success/"
    queryset = models.Wanted.objects.all()


class AvailableCreateFormView(CommonCreateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Available
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    model = models.Available
    success_url = "/app/message/success/"


class AvailableUpdateFormView(CommonUpdateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Available
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    success_url = "/app/message/success/"
    queryset = models.Available.objects.all()


class StoryCreateFormView(CommonCreateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Story
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    model = models.Story
    success_url = "/app/message/success/"


class StoryUpdateFormView(CommonUpdateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Story
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    success_url = "/app/message/success/"
    queryset = models.Story.objects.all()


class QuestionCreateFormView(CommonCreateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Question
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    model = models.Question
    success_url = "/app/message/success/"


class QuestionUpdateFormView(CommonUpdateFormViewBase):
    class FormClass(ModelForm):
        class Meta:
            model = models.Question
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    success_url = "/app/message/success/"
    queryset = models.Question.objects.all()


class QuestionDeleteView(CommonDeleteViewBase):
    queryset = models.Question.objects.all()


class AvailableDeleteView(CommonDeleteViewBase):
    queryset = models.Available.objects.all()


class WantedDeleteView(CommonDeleteViewBase):
    queryset = models.Wanted.objects.all()


class StoryDeleteView(CommonDeleteViewBase):
    queryset = models.Story.objects.all()
