from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from kalvi.api.views.auth import get_redis_connection
from django.http import JsonResponse

class CustomOutstandingTokenMiddleware:
    """
    This middleware checks for blacklisted tokens in Redis. It does not perform any token validation.
    """
    def __init__(self, get_response=None):
        self.get_response = get_response

    def __call__(self, request):
        try:
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return self.get_response(request)
            token = auth_header.split()[1]
            token_obj = str(AccessToken(token))
            redis_conn = get_redis_connection()
            # Check if the token is blacklisted in Redis
            if redis_conn.exists(token_obj):
                return JsonResponse({'error': "Access token is blacklisted"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return self.get_response(request)
        except Exception:
            return self.get_response(request)
