from rest_framework import serializers
from db.Oauth import google
from db.Oauth import github
from db.Oauth.register import register_social_user
import os
from rest_framework.exceptions import AuthenticationFailed


class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()
    def validate_auth_token(self, auth_token):
        user_data = google.Google.validate(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )
        if user_data['aud'] != os.environ.get('GOOGLE_CLIENT_ID'):
            raise AuthenticationFailed("We are unable to recognize your credentials at this time.")
        email = user_data['email']
        name = user_data['name']
        provider = 'google'
        return register_social_user(
            provider=provider, email=email, name=name)

class GithubSocialAuthSerializer(serializers.Serializer):
    code = serializers.CharField()
    def validate_code(self, code):   
        access_token = github.Github.exchange_code_for_token(code)
        if access_token:
            user_data=github.Github.get_github_user(access_token)
            if not user_data:
                 raise serializers.ValidationError('The token is invalid or expired. Please login again.')
            name = user_data['login']
            email = user_data['email']
            provider='github'
            return register_social_user(provider=provider, email=email, name=name)
        else:
           raise AuthenticationFailed("We are unable to recognize your credentials at this time.") 