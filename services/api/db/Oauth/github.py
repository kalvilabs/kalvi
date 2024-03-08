import requests
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from requests.exceptions import HTTPError



class Github():
    @staticmethod
    def exchange_code_for_token(code):
        try:
            params_payload = {"client_id": settings.GITHUB_CLIENT_ID, "client_secret": settings.GITHUB_SECRET, "code": code}
            get_access_token = requests.post("https://github.com/login/oauth/access_token", params=params_payload, headers={'Accept': 'application/json'})
            get_access_token.raise_for_status()  # Raise exception for HTTP errors
            payload = get_access_token.json()
            token = payload.get('access_token')
            if not token:
                raise AuthenticationFailed("No access token found in the response")
            return token
        except requests.exceptions.RequestException:
            raise AuthenticationFailed("Failed to retrieve access token")

    @staticmethod
    def get_github_user(access_token):
        try:
            headers = {'Authorization': f'Bearer {access_token}'}
            resp = requests.get('https://api.github.com/user', headers=headers)
            resp.raise_for_status()  # Raise exception for HTTP errors
            user_data = resp.json()
            return user_data
        except requests.exceptions.RequestException:
            raise AuthenticationFailed("Failed to retrieve user data")