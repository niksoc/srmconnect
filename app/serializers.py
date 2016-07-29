from rest_framework import serializers
from . import models


class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = models.UserProfile
        fields = ('first_name', 'last_name', 'display_name', 'register_no',
                  'course', 'department', 'year', 'campus', 'oneliner',
                  'profile_image', 'moderator',)

    def get_profile_image(self, UserProfile):
        try:
            photo_url = UserProfile.profile_image.url
        except ValueError:
            return ''
        return photo_url
