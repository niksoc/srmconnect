"""srmxchange main app url config"""

from django.conf.urls import url, include
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^question/$', views.questions),
    url(r'^user/$', views.user),
    url(r'^moderator/$', views.moderator),
    url(r'^message/(?P<message>\D+)/$',
        TemplateView.as_view(template_name='app/message.html')),
    url(r'^logout', views.logout),
    url(r'(?P<route>.+)', views.redirect_to_home),
]
