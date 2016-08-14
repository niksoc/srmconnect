"""srmxchange main app url config"""

from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from . import views
from . import rest_views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^question/$', views.questions),
    url(r'^user/$', views.user),
    url(r'^create/wanted/$', rest_views.WantedCreateFormView.as_view()),
    url(r'^edit/wanted/(?P<pk>\d+)/$', rest_views.WantedUpdateFormView.as_view()),
    url(r'^create/available/$', rest_views.AvailableCreateFormView.as_view()),
    url(r'^edit/available/(?P<pk>\d+)/$', rest_views.AvailableUpdateFormView.as_view()),
    url(r'^create/story/$', rest_views.StoryCreateFormView.as_view()),
    url(r'^edit/story/(?P<pk>\d+)/$', rest_views.StoryUpdateFormView.as_view()),
    url(r'^delete/story/(?P<pk>\d+)/$', rest_views.StoryDeleteView.as_view()),
    url(r'^delete/question/(?P<pk>\d+)/$', rest_views.QuestionDeleteView.as_view()),
    url(r'^delete/available/(?P<pk>\d+)/$', rest_views.AvailableDeleteView.as_view()),
    url(r'^delete/wanted/(?P<pk>\d+)/$', rest_views.WantedDeleteView.as_view()),
    url(r'^message/(?P<message>\D+)/$', TemplateView.as_view(template_name='app/message.html')),
    url(r'logout', views.logout),
    url(r'.+', views.home, name='home'),
]
