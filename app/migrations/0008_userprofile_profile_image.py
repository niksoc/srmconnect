# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-29 16:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20160729_1449'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='profile_image',
            field=models.ImageField(null=True, upload_to='profiles'),
        ),
    ]