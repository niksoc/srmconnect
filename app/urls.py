"""srmxchange main app url config""" 

from django.conf.urls import url
from django.contrib import admin

from . import views

urlpatterns = [ 
    url(r'^$', views.home, name='home'),
    url(r'^question$', views.questions),
] 
