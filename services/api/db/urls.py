from django.urls import path
from db.views import ProfileViewSet, OrganizationSettingsViewSet
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('bio/', ProfileViewSet.as_view({'get': 'bio', 'post': 'bio', 'put': 'bio', 'delete': 'bio'})),
    path('date_of_birth/', ProfileViewSet.as_view({'get': 'date_of_birth', 'post': 'date_of_birth', 'put': 'date_of_birth', 'delete': 'date_of_birth'})),
    path('profile_image/', ProfileViewSet.as_view({'get': 'profile_image', 'post': 'profile_image', 'put': 'profile_image', 'delete': 'profile_image'})),
    path('organization-settings/', OrganizationSettingsViewSet.as_view({
        'get': 'retrieve',
        'post': 'create'
    }), name='organization-settings-detail'),

    path('organization-settings/update/<str:field_name>/', OrganizationSettingsViewSet.as_view({
        'post': 'update_field'
    }), name='organization-settings-update-field')
]

urlpatterns = format_suffix_patterns(urlpatterns)