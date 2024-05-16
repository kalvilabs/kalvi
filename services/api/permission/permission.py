from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from permission.models import Service
class HasRolePermission(BasePermission):
    """
    Custom permission class that checks if a user has a specific role permission.
    """
    def has_permission(self, request, view):
        view_class_name = view.__class__.__name__
        service_name = getattr(view, 'service_name', None)
        requested_action = getattr(view, 'action', None)
        if requested_action is None:
            requested_action = request.method
        if not service_name:
            return True
        if request.user.role:
            role = request.user.role
            """
            we can check here if user has access to any particular service else this recursive line could be omitted 
            and it will still work to check api access (class name with action) with respect to role.
            """
            if role.has_service_recursive(service_name):
                for permission in role.custom_permissions.all():
                    for AssociatedView in permission.AssociatedViews.all():
                        if view_class_name == AssociatedView.name:
                            for method in AssociatedView.methods_name.all():
                                if requested_action.lower() == method.name:
                                    return True
                        return False
            return False
   
    def has_object_permission(self, request, view, obj):
        # Check if the object has an owner field
        if not hasattr(obj, 'owner'):
            return False
        # Allow access only if the request user is the object's owner
        return obj.owner == request.user or request.user.is_superuser
