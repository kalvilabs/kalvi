from rest_framework import serializers
from django.contrib.auth.models import User
from permission.models import Role, CustomPermission, Service, AssociatedViews, MethodName

class MethodNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = MethodName
        fields = '__all__'

class AssociatedViewsSerializer(serializers.ModelSerializer):
    methods_name = MethodNameSerializer(many=True, required=False, allow_empty=True)
    class Meta:
        model = AssociatedViews
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    parent_service = serializers.CharField(required=False)
    class Meta:
        model = Service
        fields = '__all__'

    def create(self, validated_data):
        parent_service = validated_data.pop('parent_service', None)
        if parent_service:
            parent = Service.objects.get(name=parent_service)
            validated_data['parent_service'] = parent
        return super().create(validated_data)
    
class CustomPermissionSerializer(serializers.ModelSerializer):
    AssociatedViews = AssociatedViewsSerializer(many=True, required=False, allow_empty=True)
    class Meta:
        model = CustomPermission
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, required=False, allow_empty=True)
    custom_permissions = CustomPermissionSerializer(many=True, required=False, allow_empty=True)
    class Meta:
        model = Role
        fields = '__all__'

