from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from django.db import transaction
from db.models import User
from permission.models import CustomPermission, Role
from permission.serializers import CustomPermissionSerializer, RoleSerializer
from db.serializers import UserProfileSerialiser

class CustomPermissionViewSet(viewsets.ModelViewSet):
    queryset = CustomPermission.objects.all()
    serializer_class = CustomPermissionSerializer
    # permission_classes = [IsAdminUser]  # Only authenticated users can manage permissions

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    def create(self, request, *args, **kwargs):
        custom_permissions_data = request.data.pop('custom_permissions', [])
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    role = serializer.save()
                    role.add_custom_permission(custom_permissions_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        custom_permissions_data = request.data.pop('custom_permissions', [])
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                with transaction.atomic():
                    self.perform_update(serializer)
                    instance.add_custom_permission(custom_permissions_data)
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
