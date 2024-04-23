from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied

class HasRolePermission(BasePermission):
    """
    Custom permission class that checks if a user has a specific role permission.
    """
    def has_permission(self, request, view):
        permission_name = getattr(view, 'permission_name', None)
        if not permission_name:
            raise ValueError("Permission name not provided in the view.")
        if request.user.is_anonymous:
            return False
        if request.user.role and not request.user.role.has_permission_recursive(permission_name):
            raise PermissionDenied("You do not have permission to access this view.")
        return True