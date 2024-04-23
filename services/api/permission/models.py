from django.db import models

class CustomPermission(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Custom Permission'
        verbose_name_plural = 'Custom Permissions'
        db_table = "custom_permission"

    def get_all_children(self):
        children = list(self.children.all())
        for child in self.children.all():
            children.extend(child.get_all_children())
        return children

class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    custom_permissions = models.ManyToManyField(CustomPermission, blank=True)

    def __str__(self):
        return self.name

    def add_custom_permission(self, permission_data):
        for permission in permission_data:
            permission_name = permission.get('name')
            if CustomPermission.objects.filter(name=permission_name).exists():
                permission = CustomPermission.objects.get(name=permission_name)
                self.custom_permissions.add(permission)
            else:
                raise ValueError("Custom Permission does not exist.")
            
    def has_permission_recursive(self, permission_name):
        # Check if the current role has the permission
        if self.custom_permissions.filter(name=permission_name).exists():
            return True
        # Check permissions from children roles
        for child_permission in self.custom_permissions.all():
            for child in child_permission.get_all_children():
                if child.name == permission_name:
                    return True
        return False

    class Meta:
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'
        db_table = "role"
