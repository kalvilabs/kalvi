from django.contrib.auth import authenticate
from db.models import User
import random
from rest_framework.exceptions import AuthenticationFailed
from kalvi.api.views.auth import get_tokens_for_user


def generate_username(name):
    name = "".join(name.split(' ')).lower()
    if not User.objects.filter(name=name).exists():
        return name
    else:
        random_name = name + str(random.randint(0, 1000))
        return generate_username(random_name)

def register_social_user(provider, email, name):
    filtered_user_by_email = User.objects.filter(email=email)
    if filtered_user_by_email.exists():
        if provider == filtered_user_by_email[0].auth_provider:
            registered_user = authenticate(email=email, password="SECRET")
            if not registered_user:
                raise AuthenticationFailed(
                    detail='Authentication failed! Please Try after some time'
                )
            return {
                'name': registered_user.name,
                'email': registered_user.email,
                'tokens': get_tokens_for_user(registered_user)}
        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)
    else:
        #TODO: We need to provide a unique secret password for each social authentication user.
        user = {
            'name': generate_username(name), 'email': email,
            'password': "SECRET" , 'confirm_password' : "SECRET"}
        user = User.objects.create_user(**user)
        if not user:
            raise Exception ("We couldn't register user due to intenal issues! Please try after some time")
        user.auth_provider = provider
        user.save()
        new_user = authenticate(
            email=email, password="SECRET")
        if not new_user:
                raise AuthenticationFailed(
                    detail='Internal authentication failed! Please Try after some time')
        return {
            'email': new_user.email,
            'username': new_user.name,
            'tokens': get_tokens_for_user(registered_user)
        }