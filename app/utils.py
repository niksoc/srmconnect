from django.db.models.fields.related import ManyToManyRel, ManyToManyField, ManyToOneRel
from django.db.models.fields.files import FieldFile


def to_dict(instance, *args, **kwargs):
    exclude_fields = kwargs.get('exclude', ())
    data = {}
    for field in instance._meta.get_fields():
        field_name = field.name
        if field.name in exclude_fields:
            continue
        if isinstance(field, ManyToOneRel):
            pass
        elif isinstance(field, ManyToManyField):
            if instance.pk is None:
                data[field_name] = []
            else:
                data[field_name] = list(field.value_from_object(
                    instance).values_list('pk', flat=True))
        elif isinstance(field, ManyToManyRel):
            pass
        else:
            value = field.value_from_object(instance)
            if 'image' in field.name:
                value = value.url
            data[field_name] = value
    return data
