from django.urls import path, include
from kalvi.api.views import SignInEndPoint, SignUpEndPoint, UserProfileView, UserChangePasswordView, SendPasswordResetEmailView, UserPasswordResetView


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
    path(
        "user/",
        UserProfileView.as_view(),
        name="user-detail",
    ),
    path(
        "update-password/",
        UserChangePasswordView.as_view(),
        name="password-update",
    ),
    path(
        "send-reset-password-email/",
        SendPasswordResetEmailView.as_view(),
        name="send-reset-email",
    ),
    path(
        "reset-password/<str:uid>/<str:token>/",
        UserPasswordResetView.as_view(),
        name="reset-password-through-mail",
    ),
    path("profile/", include("db.urls"))
]
