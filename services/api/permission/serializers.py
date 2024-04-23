from rest_framework import serializers
from django.contrib.auth.models import User
from permission.models import Role, CustomPermission

class CustomPermissionSerializer(serializers.ModelSerializer):
    parent_name = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomPermission
        fields = ['id', 'name', 'description', 'parent_name']

    def create(self, validated_data):
        parent_name = validated_data.pop('parent_name', None)
        if parent_name:
            parent = CustomPermission.objects.get(name=parent_name)
            validated_data['parent'] = parent
        return super().create(validated_data)

class RoleSerializer(serializers.ModelSerializer):
    custom_permissions = CustomPermissionSerializer(many=True, required=False, allow_empty=True)

    class Meta:
        model = Role
        fields = ('id', 'name', 'custom_permissions')

