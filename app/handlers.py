from django.db.models.signals import m2m_changed
from django.db.models.signals import post_save
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
        q = answer_created.for_question
        q.num_answers = F('num_answers') + 1
        q.save()
        for follower in q.followers:
            n = models.Notification(
                owner=follower, message='New answer to ' + q.title, url='question/' + q.id)
            n.save()

m2m_changed.connect(update_num_votes, sender=models.Answer.votes.through)
m2m_changed.connect(update_num_votes, sender=models.Question.votes.through)
m2m_changed.connect(update_num_votes, sender=models.Story.votes.through)
