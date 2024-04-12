from rest_framework import serializers
from db.models import Profile, OrganizationSettings

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', "date_of_birth", "theme", "profile_image_url"]

class OrganizationSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationSettings
        fields = '__all__'
