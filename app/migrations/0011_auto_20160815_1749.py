# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-15 17:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_auto_20160815_1748'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_text',
            field=models.TextField(max_length=500, null=True, verbose_name='Describe yourself'),
        ),
    ]
