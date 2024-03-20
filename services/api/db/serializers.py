from rest_framework import serializers
from db.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.conf import settings
from db.utils import  send_reset_password_email
from django.urls import reverse

#Method for validating password.
def validate_confirm_password(password,confirm_password):
    if password != confirm_password:
        return False
    return True

class SignUpEndPointSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    class Meta:
        model = User
        fields= ['email', 'name', 'password']
    #To validate whether the entered email and password are correct.
    def validate(self, data):
        email = data.get('email')
        if not email:
            raise ValidationError("Email field is required")
        password= data.get('password')
        if not password:
            raise ValidationError("password is empty")
        try:
            validate_email(email)
        except:
            raise serializers.ValidationError("Please provide a valid email address.")        
        return data
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
        
class SignInEndPointSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255,
                style={'input_type': 'email', 'placeholder': 'Email Address'})
    password = serializers.CharField(max_length=255,
                 style={'input_type' : 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'password']

class UserProfileSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']

class UserChangePasswordSerialiser(serializers.Serializer):
    #New password type could be customised here.
    password = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    confirm_password = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    class Meta:
        fields = ['password', 'confirm_password']
    def validate(self, attrs):
        password, confirm_password = attrs.get('password'), attrs.get('confirm_password')
        if not password or not confirm_password:
            raise ValidationError("Either password or confirm_password is empty")
        if validate_confirm_password(password,confirm_password):
            return attrs
        else:
            raise serializers.ValidationError("Password and confirm password don't match.")
  
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(
        max_length=255,
        style={'input_type': 'email', 'placeholder': 'Email Address'}
    )
    class Meta:
        fields = ['email']
    def validate(self, attrs):
        """
        Raises: ValidationError: If user is not registered, or token generation fails.
        """
        email = attrs.get('email')
        if not email:
            raise ValidationError("Email field is required")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Handle unregistered email in a user-friendly way
            raise ValidationError('No user with that email address exists. Please register first.')
        # Handle potential exceptions during encoding and token generation
        try:
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = self.context.get('current_site')
        except Exception:
            raise serializers.ValidationError("Failed to generate reset link")
        send_reset_password_email(user.email, uid, token, current_site)
        return attrs
    
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    confirm_password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password', 'confirm_password']       
    def validate(self, attrs):
        password, confirm_password = attrs.get('password'), attrs.get('confirm_password')
        if not password or not confirm_password:
            raise ValidationError("Either password or confirm_password is empty")
        if not validate_confirm_password(password,confirm_password):
            raise serializers.ValidationError("Password and confirm password don't match.") 
        else:
            try:
                uid = self.context.get('uid')
                if not uid:
                    raise ValidationError("Missing 'uid' value in context")
                token = self.context.get('token')
                if not token:
                    raise ValidationError("Missing 'token' value in context")
                try:
                    id = smart_str(urlsafe_base64_decode(uid))
                except DjangoUnicodeDecodeError as e:
                    raise ValueError("Invalid activation link: Character encoding error") from e
                try:
                    user = User.objects.get(id=id)
                except User.DoesNotExist:
                    # Handle unregistered email in a user-friendly way
                    raise ValidationError('No user with that email address exists')
            except Exception:
                raise serializers.ValidationError('Failed to validate')
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('Token is not Valid or Expired')
            return attrs