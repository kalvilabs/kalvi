from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from django.db import transaction
from db.models import User
from permission.models import CustomPermission, Role, AssociatedViews, Service, MethodName
from permission.serializers import CustomPermissionSerializer, RoleSerializer, AssociatedViewsSerializer, ServiceSerializer, MethodNameSerializer
from db.serializers import UserProfileSerialiser

class MethodNameViewSet(viewsets.ModelViewSet):
    queryset = MethodName.objects.all()
    serializer_class = MethodNameSerializer

class AssociatedViewsViewSet(viewsets.ModelViewSet):
    queryset = AssociatedViews.objects.all()
    serializer_class = AssociatedViewsSerializer
    def create(self, request, *args, **kwargs):
        MethodNames = request.data.pop('MethodNames', [])
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    AssociatedViews = serializer.save()
                    AssociatedViews.add_MethodNames(MethodNames)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        MethodNames = request.data.pop('MethodNames', [])
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    self.perform_update(serializer)
                    instance.add_MethodNames(MethodNames)           
                return Response(serializer.data)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class CustomPermissionViewSet(viewsets.ModelViewSet):
    queryset = CustomPermission.objects.all()
    serializer_class = CustomPermissionSerializer
    def create(self, request, *args, **kwargs):
        AccessViews = request.data.pop('AccessViews', [])
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    CustomPermission = serializer.save()
                    CustomPermission.add_AssociatedViews(AccessViews)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        AccessViews = request.data.pop('AccessViews', [])
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    self.perform_update(serializer)
                    instance.add_AssociatedViews(AccessViews)
                return Response(serializer.data)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    def create(self, request, *args, **kwargs):
        permissions_data = request.data.pop('permissions_data', [])
        services_data = request.data.pop('services_data', [])
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    role = serializer.save()
                    role.add_custom_permission(permissions_data)
                    role.add_services(services_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        permissions_data = request.data.pop('permissions_data', [])
        services_data = request.data.pop('services_data', [])
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    self.perform_update(serializer)
                    instance.add_custom_permission(permissions_data)
                    instance.add_services(services_data)
                return Response(serializer.data)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AssignRoleToUserView(APIView):
    # permission_classes = [IsAdminUser]  # Only admins can assign roles

    def post(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            role_name = request.data.get('role')
            role = Role.objects.get(name=role_name)
            # Validation (optional): Ensure role exists and user object is valid
            if not user or not role:
                return Response({'error': 'Invalid user or role ID'}, status=status.HTTP_400_BAD_REQUEST)
            user.role = role
            user.save()
            # Consider including the updated user data in the response
            serializer = UserProfileSerialiser(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
