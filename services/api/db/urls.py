from django.urls import path
from db.views import ProfileViewSet, OrganizationSettingsViewSet
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('user-profile/', ProfileViewSet.as_view({'get': 'retrieve'}), name='profile-detail'),
    path('user-profile/<str:field_name>/', ProfileViewSet.as_view({'get': 'retrieve'}), name='profile-detail-field'),
    path('user-profile/update/<str:field_name>/', ProfileViewSet.as_view({'post': 'update_field'}), name='profile-update-field'),
    path('organization-settings/', OrganizationSettingsViewSet.as_view({
        'get': 'retrieve',
        'post': 'create'
    }), name='organization-settings-detail'),

    path('organization-settings/update/<str:field_name>/', OrganizationSettingsViewSet.as_view({
        'post': 'update_field'
    }), name='organization-settings-update-field')
]

urlpatterns = format_suffix_patterns(urlpatterns)