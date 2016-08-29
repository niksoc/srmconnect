"""
Definition of views.
"""

import django
from django.shortcuts import (render, redirect)
from django.http import HttpRequest
from django.http import JsonResponse
from django.http import HttpResponse
from django.http import Http404
from django.apps import apps
from django.db.models import F
from django.views.decorators.http import condition
import datetime
from . import utils
from . import models


def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    if 'route' in request.session:
        context = {'route': request.session['route']}
        del request.session['route']
    else:
        context = {'route': None}
    return render(
        request,
        'app/index.html',
        context=context
    )


def redirect_to_home_bare(request):
    return redirect('/app/')


def redirect_to_home(request, route):
    request.session['route'] = route
    return redirect('/app/')


def logout(request):
    django.contrib.auth.logout(request)
    return redirect("/app/")


def user(request):
    user = request.user
    if(user.is_authenticated()):
        userProfile = user.userprofile
        return JsonResponse(utils.to_dict(userProfile))
    else:
        raise Http404


def is_subscribed(request):
    user = request.user
    if not user.is_authenticated():
        raise Http404
    model = request.GET['for']
    id = request.GET['id']
    item = apps.get_model(
        'app.' + model).objects.get(pk=id)
    isSubscribed = item.followers.filter(id=user.id).exists()
    return JsonResponse({'subscribed': isSubscribed})


def subscribe(request):
    user = request.user
    model = request.GET['for']
    id = request.GET['id']
    item = apps.get_model(
        'app.' + model).objects.get(pk=id)
    isSubscribed = item.followers.filter(id=user.id).exists()
    if not isSubscribed:
        item.followers.add(user)
        item.save()
    return HttpResponse(status=200)


def unsubscribe(request):
    user = request.user
    model = request.GET['for']
    id = request.GET['id']
    item = apps.get_model(
        'app.' + model).objects.get(pk=id)
    while item.followers.filter(id=user.id).exists():
        item.followers.remove(user)
        item.save()
    return HttpResponse(status=200)


def voted(request):
    user = request.user
    if not user.is_authenticated():
        raise Http404
    model = request.GET['for']
    id = request.GET['id']
    item = apps.get_model(
        'app.' + model).objects.get(pk=id)
    voted = item.votes.filter(id=user.id).exists()
    return JsonResponse({'voted': voted})


def vote(request):
    user = request.user
    model = request.GET['for']
    id = request.GET['id']
    item = apps.get_model(
        'app.' + model).objects.get(pk=id)
    voted = item.votes.filter(id=user.id).exists()
    if not voted:
        item.votes.add(user)
        item.num_votes = F('num_votes') + 1
        item.save()
    return HttpResponse(status=200)


def unvote(request):
    user = request.user
    model = request.GET['for']
    id = request.GET['id']
    item = apps.get_model(
        'app.' + model).objects.get(pk=id)
    while item.votes.filter(id=user.id).exists():
        item.votes.remove(user)
        item.num_votes = F('num_votes') - 1
        item.save()
    return HttpResponse(status=200)


def latest_notification(request):
    try:
        return models.Notification.objects.filter(owner=request.user).latest("created").created
    except:
        return datetime.datetime(1996, 11, 28)


@condition(last_modified_func=latest_notification)
def notifications(request):
    user = request.user
    notifications = models.Notification.objects.filter(
        owner=user).order_by('-created')[:10]
    data = []
    for obj in notifications:
        data.append(utils.to_dict(obj))
    return JsonResponse(data, safe=False)


def clear_notifications(request):
    user = request.user
    models.Notification.objects.filter(owner=user).delete()
    return HttpResponse(status=200)


def moderator(request):
    user = request.user
    if(user.is_authenticated() and models.Moderator.objects.filter(user=user).exists()):
        return JsonResponse({'isModerator': True})
    else:
        raise Http404
