"""srmxchange main app url config"""

from django.conf.urls import url, include
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^user/$', views.user),
    url(r'^is_subscribed/$', views.is_subscribed),
    url(r'^subscribe/$', views.subscribe),
    url(r'^unsubscribe/$', views.unsubscribe),
    url(r'^voted/$', views.voted),
    url(r'^vote/$', views.vote),
    url(r'^unvote/$', views.unvote),
    url(r'^notifications/$', views.notifications),
    url(r'^clear_notifications/$', views.clear_notifications),
    url(r'^message/(?P<message>\D+)/$',
        TemplateView.as_view(template_name='app/message.html')),
    url(r'^logout', views.logout),
    url(r'(?P<route>.+)', views.redirect_to_home),
]
