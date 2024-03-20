from django.urls import path, include
from kalvi.api.views import SignInEndPoint, SignUpEndPoint, UserProfileView, UserChangePasswordView, SendPasswordResetEmailView, UserPasswordResetView, SignOutEndpoint, TokenRefreshView, MagicGenerateEndpoint, MagicSignInEndpoint
from db.Oauth.views import GoogleSocialAuthView, GithubSocialAuthView

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
    path("profile/", include("db.urls")),
    path(
        "google/",
        GoogleSocialAuthView.as_view(),
        name="google-sign-in"
    ),
    path(
        "github/",
        GithubSocialAuthView.as_view(),
        name="github-sign-in"
    ),
    path('token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    path("sign-out/",
        SignOutEndpoint.as_view(),
        name="sign-out"
    ),
    path(
        "magic-generate/",
        MagicGenerateEndpoint.as_view(),
        name="magic-generate",
    ),
    path(
        "magic-sign-in/",
        MagicSignInEndpoint.as_view(),
        name="magic-sign-in"
    )
]
