# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-23 20:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0021_auto_20160823_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment_answer',
            name='text',
            field=models.TextField(verbose_name='comment'),
        ),
        migrations.AlterField(
            model_name='comment_available',
            name='text',
            field=models.TextField(verbose_name='comment'),
        ),
        migrations.AlterField(
            model_name='comment_question',
            name='text',
            field=models.TextField(verbose_name='comment'),
        ),
        migrations.AlterField(
            model_name='comment_story',
            name='text',
            field=models.TextField(verbose_name='comment'),
        ),
        migrations.AlterField(
            model_name='comment_wanted',
            name='text',
            field=models.TextField(verbose_name='comment'),
        ),
    ]
