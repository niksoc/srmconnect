# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-23 13:06
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='asked_date',
            field=models.DateField(default=datetime.datetime.now),
        ),
    ]
