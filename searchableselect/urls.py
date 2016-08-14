from django.conf.urls import url
from . import views


urlpatterns = [
    url('^filter$', views.filter_models, name='searchable-select-filter'),
]
