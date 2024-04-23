from django.urls import path
from permission.views import CustomPermissionViewSet, RoleViewSet, AssignRoleToUserView

urlpatterns = [
    path('permissions/', CustomPermissionViewSet.as_view({'get': 'list', 'post': 'create'}), name='permissions-list'),
    path('permissions/<int:pk>/', CustomPermissionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='permission-detail'),
    path('roles/', RoleViewSet.as_view({'get': 'list', 'post': 'create'}), name='roles-list'),
    path('roles/<int:pk>/', RoleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='role-detail'),
    path('users/<int:user_id>/assign-role/', AssignRoleToUserView.as_view(), name='assign-role')
]
