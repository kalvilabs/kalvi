from django.db import models

class MethodName(models.Model):
    name = models.CharField(max_length=100, unique=True)   #eg: bulk_update , get, put , role_view
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'MethodName'
        verbose_name_plural = 'MethodNames'
        db_table = "MethodNames"

class AssociatedViews(models.Model):
    name = models.CharField(max_length=100)        #eg: name of viewset, profileAPIview
    methods_name = models.ManyToManyField(MethodName)    #eg : list of functions/methods inside APIview
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'AssociatedViews'
        verbose_name_plural = 'AssociatedViews'
        db_table = "AssociatedViews"

    def add_MethodNames(self, MethodNames):
        self.methods_name.clear()
        for method in MethodNames:
            if MethodName.objects.filter(name=method).exists():
                method = MethodName.objects.get(name=method)
                self.methods_name.add(method)
            else:
                raise ValueError("name of class view does not exist in code base.")
            
class Service(models.Model):   #this is for hirarchial control if needed
    name = models.CharField(max_length=100, unique=True)
    parent_service = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
        db_table = "service"

    def get_all_children(self):
        children = list(self.children.all())
        for child in self.children.all():
            children.extend(child.get_all_children())
        return children


class CustomPermission(models.Model):
    name = models.CharField(max_length=100, unique=True)    #eg : name_of_permission : "can edit assessment"
    AssociatedViews = models.ManyToManyField(AssociatedViews, blank=True)  #eg: list of APIs name 

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'CustomPermission'
        verbose_name_plural = 'CustomPermissions'
        db_table = "CustomPermission"
    
    def add_AssociatedViews(self, AccessViews):
        self.AssociatedViews.clear()
        for AccessView in AccessViews:
            if AssociatedViews.objects.filter(name=AccessView).exists():
                view = AssociatedViews.objects.get(name=AccessView)
                self.AssociatedViews.add(view)
            else:
                raise ValueError("name of class view does not exist in code base.")
            
class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)     #eg: name of role like "teacher"
    services = models.ManyToManyField(Service, blank=True)   #for hirarchial control if needed
    custom_permissions = models.ManyToManyField(CustomPermission, blank=True)  #list of available permissions like "can edit assessment".

    def __str__(self):
        return self.name

    def add_custom_permission(self, permission_data):
        self.custom_permissions.clear()
        for permission_name in permission_data:
            if CustomPermission.objects.filter(name=permission_name).exists():
                permission = CustomPermission.objects.get(name=permission_name)
                self.custom_permissions.add(permission)
            else:
                raise ValueError("Custom Permission does not exist.")
    
    def add_services(self, services_data):
        self.services.clear()
        for service_name in services_data:
            if Service.objects.filter(name=service_name).exists():
                service = Service.objects.get(name=service_name)
                self.services.add(service)
            else:
                raise ValueError("Service does not exist.")
            
    def has_service_recursive(self, service_name):
        # Check if the current role has the services
        if self.services.filter(name=service_name).exists():
            return True
        # Check services from children roles
        for child_service in self.services.all():
            for child in child_service.get_all_children():
                if child.name == service_name:
                    return True
        return False

    class Meta:
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'
        db_table = "role"
