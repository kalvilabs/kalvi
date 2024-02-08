from django.urls import path
from kalvi.api.views import SignInEndPoint, SignUpEndPoint

urlpatterns = [
    path(
        "sign-up/",
        SignUpEndPoint.as_view(),
        name="kalvi-sign-up",
    ),
    path(
        "sign-in/",
        SignInEndPoint.as_view(),
        name="kalvi-sign-in",
    ),
]
