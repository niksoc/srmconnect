from django.db.models.fields.related import ManyToManyRel, ManyToManyField, ManyToOneRel
from django.db.models.fields.files import FieldFile


def _to_dict(self, *args, **kwargs):
    exclude_fields = kwargs.get('exclude', ())
    data = {}
    for field in self._meta.get_fields():
        field_name = field.name
        if field.name in exclude_fields:
            continue
        if isinstance(field, ManyToOneRel):
            pass
        elif isinstance(field, ManyToManyField):
            pass
        elif isinstance(field, ManyToManyRel):
            pass
        else:
            value = field.value_from_object(self)
            if 'image' in field.name:
                value = value.url
            data[field_name] = value
    return data
