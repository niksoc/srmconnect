from django.apps import apps
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


@login_required
def filter_models(request):
    model_name = request.GET.get('model')
    search_field = request.GET.get('search_field')
    value = request.GET.get('q')

    model = apps.get_model(model_name)

    values = model.objects.filter(**{'{}__icontains'.format(search_field): value})[:10]
    values = [
        dict(pk=value.pk, name=str(value))
        for value
        in values
    ]

    return JsonResponse(dict(result=values))
