from django.http import (HttpResponse, Http404)
from django.contrib.auth.models import User
from django.forms import ModelForm
from django import forms
from django.views.generic import (CreateView, UpdateView, DeleteView)
from searchableselect.widgets import SearchableSelect
from django.apps import apps

from . import widgets
from . import models


# temp needed for implicitly passed self
def isCreator(temp, obj, user):
    return obj.created_by == user


# temp needed for implicitly passed self
def isCreatorOrModerator(temp, obj, user):
    isModerator = models.Moderator.objects.filter(user=user).exists()
    return obj.created_by == user or isModerator


class CommonCreateFormViewBase(CreateView):
    template_name = 'app/form.html'

    def form_invalid(self, form):
        """
        If the form is invalid, re-render the context data with the
        data-filled form and errors.
        """
        return self.render_to_response(self.get_context_data(form=form))

    def form_valid(self, form):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        obj = form.save(commit=False)
        obj.created_by = self.request.user
        obj.save()
        form.save_m2m()
        return super(CommonCreateFormViewBase, self).form_valid(form)


class CommonUpdateFormViewBase(UpdateView):
    template_name = 'app/form.html'
    permissions = isCreator

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
    success_url = '/app/message/success/'

    def delete(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        if(not self.permissions(self.get_object(), self.request.user)):
            return HttpResponse(status=403)
        else:
            return super(CommonDeleteViewBase, self).delete(request, *args, **kwargs)

tagsWidget = {
    'tags': SearchableSelect(model='app.Tag', search_field='name', many=True)
}


class FeedbackCreateFormView(CreateView):
    template_name = 'app/form.html'
    fields = ('title', 'text')
    model = models.Feedback
    success_url = "/app/message/success/"


class TagCreateFormView(CreateView):
    template_name = 'app/form.html'
    fields = ('name', 'dept')
    model = models.Tag
    success_url = "/app/message/success/"


class FeedbackUpdateFormView(CommonUpdateFormViewBase):
    fields = ('title', 'text')
    model = models.Feedback
    success_url = "/app/message/success/"


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
    queryset = models.Wanted.objects.filter(is_active=True)


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
    queryset = models.Available.objects.filter(is_active=True)


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
    queryset = models.Story.objects.filter(is_active=True)


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
    permissions = isCreatorOrModerator

    class FormClass(ModelForm):

        class Meta:
            model = models.Question
            fields = ('title', 'text', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    success_url = "/app/message/success/"
    queryset = models.Question.objects.filter(is_active=True)


class ProjectCreateFormView(CommonCreateFormViewBase):

    class FormClass(ModelForm):

        class Meta:
            model = models.Project
            fields = ('title', 'text', 'image', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    model = models.Project
    success_url = "/app/message/success/"


class ProjectUpdateFormView(CommonUpdateFormViewBase):

    class FormClass(ModelForm):

        class Meta:
            model = models.Project
            fields = ('title', 'text', 'image', 'tags',)
            widgets = tagsWidget
    form_class = FormClass
    success_url = "/app/message/success/"
    queryset = models.Project.objects.filter(is_active=True)


class UserProfileUpdateFormView(UpdateView):
    template_name = 'app/form.html'

    def get_object(self, queryset=None):
        queryset = User.objects.all()
        pk = self.kwargs.get(self.pk_url_kwarg)
        if pk is not None:
            queryset = queryset.filter(pk=pk)
        if pk is None:
            raise AttributeError("Generic detail view %s must be called with "
                                 "either an object pk or a slug."
                                 % self.__class__.__name__)
        try:
            obj = queryset.get()
        except queryset.model.DoesNotExist:
            raise Http404(("No %(verbose_name)s found matching the query") %
                          {'verbose_name': queryset.model._meta.verbose_name})
        return obj.userprofile

    def form_valid(self, form):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        if(not self.get_object().user == self.request.user):
            return HttpResponse(status=403)
        form.save()
        return super(UserProfileUpdateFormView, self).form_valid(form)

    class FormClass(ModelForm):

        class Meta:
            model = models.UserProfile
            exclude = ('user', 'num_views')
            widgets = {'interests': SearchableSelect(
                model='app.Tag', search_field='name', many=True)}
    form_class = FormClass
    success_url = "/app/message/success/"
    queryset = models.UserProfile.objects.all()


class AnswerCreateFormView(CreateView):
    template_name = 'app/form.html'
    fields = ('text', )
    success_url = "/app/message/success/"
    for_item = None
    model = models.Answer

    def get(self, request, *args, **kwargs):
        self.for_id = request.GET['id']
        if(models.Question.objects.get(pk=self.for_id).answer_set.filter(is_active=True, created_by=request.user).exists()):
            return HttpResponse(status=403, content="""You are not allowed to answer more than once,
            please edit your existing answer""")
        return super(AnswerCreateFormView, self).get(request, * args, **kwargs)

    def get_context_data(self, **kwargs):
        kwargs['for_id'] = self.for_id
        kwargs['q_title'] = models.Question.objects.get(pk=self.for_id).title
        return super(AnswerCreateFormView, self).get_context_data(**kwargs)

    def post(self, request, *args, **kwargs):
        for_id = request.GET.get('id')
        if(models.Question.objects.get(pk=for_id).answer_set.filter(is_active=True, created_by=request.user).exists()):
            return HttpResponse(status=403)
        self.for_question = models.Question.objects.get(
            pk=for_id, is_active=True)
        return super(AnswerCreateFormView, self).post(request, * args, **kwargs)

    def form_valid(self, form):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        obj = form.save(commit=False)
        obj.created_by = self.request.user
        obj.for_question = self.for_question
        obj.save()
        return super(AnswerCreateFormView, self).form_valid(form)


class AnswerUpdateFormView(CommonUpdateFormViewBase):
    fields = ('text', )
    success_url = "/app/message/success/"
    queryset = models.Answer.objects.filter(is_active=True)


class CommentCreateFormView(CreateView):
    template_name = 'app/form.html'
    fields = ('text', )
    success_url = "/app/message/success/"
    for_item = None

    def get(self, request, *args, **kwargs):
        self.for_model_name = request.GET['for']
        self.for_id = request.GET['id']
        self.model = apps.get_model('app.Comment_' + self.for_model_name)
        if (not apps.get_model(
                'app.' + self.for_model_name).objects.get(pk=self.for_id).is_active):
            raise Http404
        return super(CommentCreateFormView, self).get(request, * args, **kwargs)

    def get_context_data(self, **kwargs):
        kwargs['for_model_name'] = self.for_model_name
        kwargs['for_id'] = self.for_id
        return super(CommentCreateFormView, self).get_context_data(**kwargs)

    def post(self, request, *args, **kwargs):
        for_model_name = request.GET.get('for')
        for_id = request.GET.get('id')
        self.for_item = apps.get_model(
            'app.' + for_model_name).objects.get(pk=for_id, is_active=True)
        self.model = apps.get_model('app.Comment_' + for_model_name)
        return super(CommentCreateFormView, self).post(request, * args, **kwargs)

    def get_queryset(self):
        return self.model.objects.all()

    def form_valid(self, form):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        obj = form.save(commit=False)
        obj.created_by = self.request.user
        obj.for_item = self.for_item
        obj.save()
        return super(CommentCreateFormView, self).form_valid(form)


class CommentUpdateFormView(UpdateView):
    template_name = 'app/form.html'
    permissions = isCreator
    fields = ('text', )
    success_url = "/app/message/success/"

    def get(self, request, *args, **kwargs):
        self.for_model_name = request.GET['for']
        self.for_id = request.GET.get('id')
        self.queryset = apps.get_model(
            'app.Comment_' + self.for_model_name).objects.filter(is_active=True)
        return super(CommentUpdateFormView, self).get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        for_model_name = request.GET.get('for')
        self.model = apps.get_model('app.Comment_' + for_model_name)
        return super(CommentUpdateFormView, self).post(request, * args, **kwargs)

    def get_context_data(self, **kwargs):
        kwargs['for_model_name'] = self.for_model_name
        kwargs['for_id'] = self.for_id
        return super(CommentUpdateFormView, self).get_context_data(**kwargs)

    def get_queryset(self):
        if self.queryset:
            return self.queryset
        return self.model.objects.filter(is_active=True)

    def form_valid(self, form):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        if(not self.permissions(self.get_object(), self.request.user)):
            return HttpResponse(status=403)
        obj = form.save(commit=False)
        obj.modified_by = self.request.user
        obj.save()
        return super(CommentUpdateFormView, self).form_valid(form)


class CommentDeleteView(DeleteView):
    template_name = 'app/form.html'
    permissions = isCreatorOrModerator
    success_url = '/app/message/success/'

    def get(self, request, *args, **kwargs):
        self.for_model_name = request.GET['for']
        self.for_id = request.GET.get('id')
        self.queryset = apps.get_model(
            'app.Comment_' + self.for_model_name).objects.filter(is_active=True)
        return super(CommentDeleteView, self).get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        for_model_name = request.GET.get('for')
        self.model = apps.get_model('app.Comment_' + for_model_name)
        return super(CommentDeleteView, self).post(request, * args, **kwargs)

    def get_context_data(self, **kwargs):
        kwargs['for_model_name'] = self.for_model_name
        kwargs['for_id'] = self.for_id
        return super(CommentDeleteView, self).get_context_data(**kwargs)

    def get_queryset(self):
        if self.queryset:
            return self.queryset
        return self.model.objects.filter(is_active=True)

    def delete(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated()):
            return HttpResponse(status=401)
        if(not self.permissions(self.get_object(), self.request.user)):
            return HttpResponse(status=403)
        else:
            return super(CommentDeleteView, self).delete(request, *args, **kwargs)


class AnswerDeleteView(CommonDeleteViewBase):
    queryset = models.Answer.objects.filter(is_active=True)


class QuestionDeleteView(CommonDeleteViewBase):
    queryset = models.Question.objects.filter(is_active=True)


class AvailableDeleteView(CommonDeleteViewBase):
    queryset = models.Available.objects.filter(is_active=True)


class WantedDeleteView(CommonDeleteViewBase):
    queryset = models.Wanted.objects.filter(is_active=True)


class StoryDeleteView(CommonDeleteViewBase):
    queryset = models.Story.objects.filter(is_active=True)


class ProjectDeleteView(CommonDeleteViewBase):
    queryset = models.Project.objects.filter(is_active=True)


class FeedbackDeleteView(CommonDeleteViewBase):
    queryset = models.Feedback.objects.all()
