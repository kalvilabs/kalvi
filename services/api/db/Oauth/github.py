import requests
from rest_framework.exceptions import AuthenticationFailed
from requests.exceptions import HTTPError
import os



class Github():
    @staticmethod
    def exchange_code_for_token(code):
        if not code:
            raise ValueError("The request token has to be supplied!")   
        client_id, client_secret =  os.environ.get('GITHUB_CLIENT_ID'), os.environ.get('GITHUB_SECRET')
        try:
            url = f"https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}"
            headers = {"accept": "application/json"}
            get_access_token = requests.post(url, headers=headers)
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
            resp_email = requests.get('https://api.github.com/user/emails', headers=headers)
            resp_email.raise_for_status()  # Raise exception for HTTP errors
            email_data = resp_email.json()
            user_data['email'] = email_data[0]['email']
            return user_data
        except requests.exceptions.RequestException:
            raise AuthenticationFailed("Failed to retrieve user data")