from requests import request, HTTPError
from django.core.files.base import ContentFile
from django.contrib.auth import logout


def save_profile(backend, user, is_new, response, *args, **kwargs):
    profile = user.profile
    if not user.is_active:
        # do later
        return None
    if(backend.name == 'google-oauth2'):
        if is_new:
            image = response.get('image')
            if(not image.get('isDefault')):
                try:
                    response_img = request('GET', image.get('url'))
                    response_img.raise_for_status()
                except HTTPError:
                    pass
                else:
                    profile.profile_image.save('{0}_google.jpg'.format(user.username),
                                               ContentFile(response_img.content))
            profile.display_name = response.get('displayName')
            name = response.get('name')
            profile.first_name = name.get('givenName')
            profile.last_name = name.get('familyName')
            if(response.get('domain') == 'srmuniv.edu.in'):
                profile.register_no = name.get('familyName')
            profile.save()

    if(backend.name == 'facebook'):
        if is_new:
            url = 'http://graph.facebook.com/{0}/picture'.format(response['id'])
            try:
                response_img = request('GET', url)
                response_img.raise_for_status()
            except HTTPError:
                pass
            else:
                profile.profile_image.save('{0}_facebook.jpg'.format(user.username),
                                           ContentFile(response_img.content))
            profile.display_name = response.get('username')
            profile.first_name = response.get('first_name')
            profile.last_name = response.get('last_name')
            profile.save()


def social_user(backend, uid, user=None, *args, **kwargs):
    '''OVERRIDED: It will logout the current user
    instead of raise an exception '''

    provider = backend.name
    social = backend.strategy.storage.user.get_social_auth(provider, uid)
    if social:
        if user and social.user != user:
            logout(backend.strategy.request)
            # msg = 'This {0} account is already in use.'.format(provider)
            # raise AuthAlreadyAssociated(backend, msg)
        user = social.user
    return {'social': social,
            'user': user,
            'is_new': user is None,
            'new_association': False}
