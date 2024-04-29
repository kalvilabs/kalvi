from django.urls import path
from permission.views import CustomPermissionViewSet, RoleViewSet, AssignRoleToUserView, ServiceViewSet, AssociatedViewsViewSet, MethodNameViewSet

urlpatterns = [
    path('permissions/', CustomPermissionViewSet.as_view({'get': 'list', 'post': 'create'}), name='permissions-list'),
    path('permissions/<int:pk>/', CustomPermissionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='permission-detail'),
    path('roles/', RoleViewSet.as_view({'get': 'list', 'post': 'create'}), name='roles-list'),
    path('roles/<int:pk>/', RoleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='role-detail'),
    path('services/', ServiceViewSet.as_view({'get': 'list', 'post': 'create'}), name='services-list'),
    path('services/<int:pk>/', ServiceViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='service-detail'),
    path('MethodName/', MethodNameViewSet.as_view({'get': 'list', 'post': 'create'}), name='http-methods-list'),
    path('MethodName/<int:pk>/', MethodNameViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='http-method-detail'),
    path('AccessControlViews/', AssociatedViewsViewSet.as_view({'get': 'list', 'post': 'create'}), name='http-methods-list'),
    path('AccessControlViews/<int:pk>/', AssociatedViewsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='http-method-detail'),
    path('users/<int:user_id>/assign-role/', AssignRoleToUserView.as_view(), name='assign-role')
]
