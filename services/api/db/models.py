from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser, PermissionsMixin
from django.core.validators import URLValidator
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
import pytz

#TODO: This entire class will be modified later based on the frontend integration.

#  Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **kwargs):
        """
        Creates and saves a User with the given email, name and password.
        """
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        Profile.objects.create(user=user)  # Create a profile for the user
        return user

    def create_superuser(self, email, name, password=None):
        """
        Creates and saves a superuser with the given email, name and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
AUTH_PROVIDERS = {'email': 'email'}

#  Custom User Model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
            )
    name = models.CharField(max_length=200)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(
            max_length=255, blank=False,
            null= False, default=AUTH_PROVIDERS.get('email')
        )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = "users"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.name} <{self.email}>"

class OrganizationSettings(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    logo = models.URLField(blank=True, null=True, max_length=800, validators=[URLValidator])
    icon = models.URLField(blank=True, null=True, max_length=800, validators=[URLValidator])
    theme = models.CharField(max_length=20)  # Assuming you have predefined themes
    email = models.EmailField(max_length=50)
    url = models.URLField(blank=True, null=True, max_length=800, validators=[URLValidator])
    TIMEZONE_CHOICES = tuple(zip(pytz.all_timezones, pytz.all_timezones))
    timezone = models.CharField(
        max_length=255, default="UTC", choices=TIMEZONE_CHOICES
    )
    class Meta:
        verbose_name = 'OrganizationSettings'
        verbose_name_plural = 'OrganizationSettings'
        db_table = "OrganizationSettings"

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True, max_length=500)
    date_of_birth= models.DateField(blank=True, null=True)
    profile_image_url = models.URLField(blank=True, null=True, max_length=800, validators=[URLValidator])  # Accepts valid URLs
    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'
        db_table = "Profiles"

    def __str__(self):
        return f"{self.user.name} <{self.user.email}>"

    
    
    