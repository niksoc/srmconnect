# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-01-16 00:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0037_alerttouser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alerttouser',
            name='is_read',
        ),
        migrations.AddField(
            model_name='alerttouser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
