from rest_framework import serializers
from db.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', "date_of_birth", "profile_image_url"]