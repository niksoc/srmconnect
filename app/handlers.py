from django.db.models.signals import m2m_changed
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from django.db.models import F
from . import models


# periodically has to be checked whether num_votes = votes.count()


def update_num_votes(instance, action, **kwargs):
    if(action == 'post_add'):
        instance.num_votes = F('num_votes') + 1
    elif(action == 'post_remove'):
        instance.num_votes = F('num_votes') - 1
    elif(action == 'post_clear'):
        instance.num_votes = 0
    instance.save()


def answer_created(instance, created, **kwargs):
    if created:
        q = instance.for_question
        q.num_answers = F('num_answers') + 1
        q.save()
        for follower in q.followers:
            n = models.Notification(
                owner=follower, message='New answer to ' + q.title, url='question/' + q.id)
            n.save()


def answer_deleted(instance, **kwargs):
    q = instance.for_question
    q.num_answers = F('num_answers') - 1
    q.save()


def comment_created(instance, created, sender, **kwargs):
    if created:
        i = instance.for_item
        # notifying all followers
        for follower in i.followers:
            model = str(i.__class__).split('.')[2].split('\'')[0]
            if model == 'Answer':
                title = 'answer ' + i.text[:5]
            else:
                title = i.title
            n = models.Notification(
                owner=follower, message='New comment on ' + model + ' ' + title,
                url='/' + str(i.__class__).split('.')[2].split('\'')[0] + '/' + i.id)
            n.save()
        # add creator to follower list if not already in it
        if not i.followers.filter(id=instance.created_by.id).exists():
            i.add(instance.created_by)


m2m_changed.connect(update_num_votes, sender=models.Answer.votes.through)
m2m_changed.connect(update_num_votes, sender=models.Question.votes.through)
m2m_changed.connect(update_num_votes, sender=models.Story.votes.through)
post_save.connect(answer_created, sender=models.Answer)
post_delete.connect(answer_deleted, sender=models.Answer)
