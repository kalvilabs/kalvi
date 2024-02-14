from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from db.serializers import SignUpEndPointSerializer, SignInEndPointSerializer, UserProfileSerialiser, UserChangePasswordSerialiser, SendPasswordResetEmailSerializer, UserPasswordResetSerializer
from django.contrib.auth import authenticate
from db.renderer import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from db.models import User

# Generate stateless token for User
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

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
    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerialiser(request.user)
        try:
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          
#Viewset class for sending an email to reset the password in case of forgotten passwords.
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            return Response({'message': 'Password Reset link sent. Please check your Email'}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)

#viewset class for changing password from local browser after getting email rest link.
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
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
