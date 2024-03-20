from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from db.serializers import SignUpEndPointSerializer, SignInEndPointSerializer, UserProfileSerialiser, UserChangePasswordSerialiser, SendPasswordResetEmailSerializer, UserPasswordResetSerializer
from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView
from django.contrib.auth import authenticate
from db.renderer import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import AllowAny
from django.utils.encoding import smart_str
from django.core.validators import validate_email
from django.utils.http import urlsafe_base64_decode
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from db.models import User
import redis
import os
import time
import json
import random
import string
import uuid
import secrets
from kalvi import settings


# Generate stateless token for User
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

# Generate name from email
def generate_name_from_email(email):
    if "@" in email:
        name = email.split("@")[0]
        name = ''.join(filter(lambda char: char in string.ascii_letters + string.digits, name))  # Remove unnecessary characters
        random_number = ''.join(random.choices(string.digits, k=4))  # Generate a 4-digit random number
        return f"{name}_{random_number}"
    else:
        raise ValueError("Invalid email format")
    
# Get redis connection   
def get_redis_connection():
    retry_count = 0
    max_retries = 3
    while retry_count < max_retries:
        try:
            return redis.Redis(host=os.environ.get("REDIS_HOST"), port=os.environ.get("REDIS_PORT"))
        except redis.ConnectionError:
            # Wait for 1 second before retrying
            time.sleep(1)
            retry_count += 1
    raise Exception("Failed to connect to Redis after multiple attempts")

#viewset class for sign up
class SignUpEndPoint(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]  # Allow signup for unregistered users
    def post(self, request, format=None):
        serializer = SignUpEndPointSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = serializer.save()
                token = get_tokens_for_user(user)
                return Response({'token': token, 'message': 'user registered'}, status=status.HTTP_201_CREATED)
            except Exception:  # Catch potential errors during user creation
                return Response({"error": "Registration failed. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#viewset class for sign in 
class SignInEndPoint(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny] 
    def post(self, request, format=None):
        serializer = SignInEndPointSerializer(data=request.data)
        try:    
            serializer.is_valid(raise_exception=True)
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token' : token,'message' : 'Login Successful'}, status=status.HTTP_200_OK)
            else:
                #more specific error message to avoid revealing authentication mechanisms
                error_message = "Invalid credentials, you need to register first."
                return Response({'errors': error_message}, status=status.HTTP_401_UNAUTHORIZED)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)

#viewset class for changing password, only authenticated users could change password. 
class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerialiser(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = request.user
            if not user:
                return Response({'errors': "Unauthorised access denied"}, status=status.HTTP_401_UNAUTHORIZED)
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)

#viewset class for profile view of a user with get method using access tokens.
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, format=None):
        serializer = UserProfileSerialiser(request.user)
        try:
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          
#Viewset class for sending an email to reset the password in case of forgotten passwords.
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny] 
    def post(self, request, format=None):
        try:
            current_site = request.META.get("HTTP_ORIGIN")
            serializer = SendPasswordResetEmailSerializer(data=request.data, context={'current_site': current_site})
            serializer.is_valid(raise_exception=True)
            return Response({'message': 'Password Reset link sent. Please check your Email'}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'error': 'Please try after some time'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#viewset class for changing password from local browser after getting email rest link.
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny] 
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
        try:
            serializer.is_valid(raise_exception=True)
            try:
                id = smart_str(urlsafe_base64_decode(uid))
                user = User.objects.get(id=id)
            except ObjectDoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            except (ValueError, TypeError):
                return Response({'error': 'Invalid UID'}, status=status.HTTP_400_BAD_REQUEST)
            password = serializer.validated_data.get('password')
            user.set_password(password)
            user.save()
            return Response({'message':'Password Reset Successfully'}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        
# Viewset class for blocking refresh tokens after logging out.       
class SignOutEndpoint(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            try:
                # Connect to Redis
                redis_conn = get_redis_connection()
                token = str(RefreshToken(refresh_token))
                # Blacklist the token in Redis
                expiration_time = int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())
                redis_conn.set(token, 'blacklisted')
                redis_conn.expire(token, expiration_time)
                return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
            except Exception:
                return Response({'error': 'Please try after some time'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        
# Viewset class for getting access token from refresh token.       
class TokenRefreshView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        if refresh_token:
            try:
                # Connect to Redis
                redis_conn = get_redis_connection()
                token = str(refresh_token)
                # Check if the token is blacklisted in Redis
                if redis_conn.exists(token):
                    return Response({'error': 'Refresh token is blacklisted'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response({'error': 'Please try after some time'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            response = super().post(request, *args, **kwargs)
            return response
        except TokenError as e:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        
# Viewset class to generate magic link and sending it through email.       
class MagicGenerateEndpoint(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"error": "Please provide a valid email address"},
                status=status.HTTP_400_BAD_REQUEST )
        # Clean up the email
        email = email.strip().lower()
        validate_email(email)
        # check if the email exists not
        if not User.objects.filter(email=email).exists():
            # Create a user
            user = User.objects.create(email=email,name=generate_name_from_email(email=email))
            user.set_password(uuid.uuid4().hex)
            user.auth_provider = "magic-pin"
            user.save()
        ## Generate a random token
        token = "-".join([ "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(4)) for _ in range(3)])
        key = "magic_" + str(email)
        # Check if the key already exists in redis server
        redis_conn = get_redis_connection()
        if redis_conn.exists(key):
            data = json.loads(redis_conn.get(key))
            current_attempt = data["current_attempt"] + 1
            if data["current_attempt"] > 2:
                return Response({"error": "Max attempts exhausted. Please try again later."},status=status.HTTP_400_BAD_REQUEST)
            value = {
                "current_attempt": current_attempt,
                "email": email,
                "token": token,
            }
            expiry = 600
            redis_conn.set(key, json.dumps(value), ex=expiry)
        else:
            value = {"current_attempt": 0, "email": email, "token": token}
            expiry = 600    # We can set manually the expiration time of link.
            redis_conn.set(key, json.dumps(value), ex=expiry)
        #TODO : "Email configuration for sending magic links should be added here, hence the response will be modified"
        return Response({"key": key, "token": token}, status=status.HTTP_200_OK)

# viewset class for logging in with a magic link    
class MagicSignInEndpoint(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        user_token = request.data.get("token", "").strip()
        key = request.data.get("key", "").strip().lower()
        if not key or user_token == "":
            return Response({"error": "User token and key are required"},status=status.HTTP_400_BAD_REQUEST)
        redis_conn = get_redis_connection()
        if redis_conn.exists(key):
            data = json.loads(redis_conn.get(key))
            token = data["token"]
            email = data["email"]
            if str(token) == str(user_token):
                user = User.objects.get(email=email)
                token = get_tokens_for_user(user)
                return Response({'token': token, 'message': 'user registered'}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Your login code was incorrect. Please try again."},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The magic code/link has expired please try again"},status=status.HTTP_400_BAD_REQUEST)