# custom_middleware.py
from rest_framework import status
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import UntypedToken
from db.models import User
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

class AdminUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return self.get_response(request)
        try:
            token = UntypedToken(token = auth_header.split()[1])
        except (InvalidToken, TokenError):
            return JsonResponse({'error': "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)
        is_superuser = token.payload.get('is_superuser')
        is_admin = '/api/admin/' in request.path
        is_user = '/api/user/' in request.path
        # If the user is trying to access the wrong API, return Forbidden
        if is_admin and not is_superuser:
            return JsonResponse({'error': "Access is not allowed"}, status=status.HTTP_403_FORBIDDEN)
        if is_user and is_superuser:
            return JsonResponse({'error': "Access is not allowed"}, status=status.HTTP_403_FORBIDDEN)
        return self.get_response(request)
