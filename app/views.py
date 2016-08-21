"""
Definition of views.
"""

import django
from django.shortcuts import (render, redirect)
from django.http import HttpRequest
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.http import Http404
from django.core.urlresolvers import reverse
from . import models
from . import utils


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


def redirect_to_home(request, route):
    request.session['route'] = route
    print('set here ', request.session['route'])
    return redirect('/app/')


def logout(request):
    django.contrib.auth.logout(request)
    return HttpResponseRedirect("/app/")


def questions(request):
    """REST api for Question model."""
    assert isinstance(request, HttpRequest)
    return JsonResponse([
        {'num_votes': 34,
         'num_answers': 4,
         'num_views': 100,
         'title': 'Who let the dogs out?'},
        {'num_votes': 4,
         'num_answers': 1,
         'num_views': 11,
         'title': 'Is global warming real?'}
    ], safe=False)


def user(request):
    user = request.user
    if(user.is_authenticated()):
        userProfile = user.userprofile
        return JsonResponse(utils.to_dict(userProfile))
    else:
        raise Http404
