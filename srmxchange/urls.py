"""srmxchange URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

import app.views

urlpatterns = [
    url(r'^/?$', app.views.redirect_to_home_bare),
    url(r'^admin/', admin.site.urls),
    url('^searchableselect/', include('searchableselect.urls')),
    url('^markdown/', include('django_markdown.urls')),
    url(r'^app/', include('app.urls')),
    url(r'^api/', include('app.api_urls')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('^(!login).+', app.views.redirect_to_home)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
