
"""
Definition of forms.
"""

from django import forms
from . import models


class WantedForm(forms.ModelForm):
    class Meta:
        model = models.Wanted
        fields = ('title', 'text',)
