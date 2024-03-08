from django.urls import path
from kalvi.api.views import SignInEndPoint, SignUpEndPoint, UserProfileView, UserChangePasswordView, SendPasswordResetEmailView, UserPasswordResetView
from db.Oauth.views import GoogleSocialAuthView

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
        "profile/",
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
    path(
        "google/",
        GoogleSocialAuthView.as_view(),
        name="GoogleSignIn"
    )
]
