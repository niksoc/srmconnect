# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-24 21:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0023_app_text'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='app_text',
            name='created',
        ),
        migrations.RemoveField(
            model_name='app_text',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='app_text',
            name='modified',
        ),
    ]
