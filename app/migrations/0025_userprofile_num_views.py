# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-25 13:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0024_auto_20160824_2121'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='num_views',
            field=models.IntegerField(default=0),
        ),
    ]
