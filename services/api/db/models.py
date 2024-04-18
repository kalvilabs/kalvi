from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.conf import settings
from django.core.validators import URLValidator
import pytz

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **kwargs):
        if not email or not name:
            raise ValueError('User must have an email address and a name')
        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        Profile.objects.create(user=user)  # Create a profile for the user
        return user

    def create_superuser(self, email, name, password=None):
        user = self.create_user(
            email,
            password=password,
            name=name,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(unique=True, primary_key=True)
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Created At"
    )
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="Last Modified At")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    last_active = models.DateTimeField(default=timezone.now, null=True)
    last_logout_time = models.DateTimeField(null=True)
    last_logout_ip = models.GenericIPAddressField(null=True, blank=True)
    auth_provider = models.CharField(
            max_length=255, blank=False,
            null= False, default="email"
        )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = "users"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.name} <{self.email}>"

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, max_length=500)
    date_of_birth= models.DateField(blank=True, null=True)
    theme = models.JSONField(default=dict)
    profile_image_url = models.URLField(blank=True, null=True, max_length=800, validators=[URLValidator])  # Accepts valid URLs

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'
        db_table = "Profiles"

    def __str__(self):
        return f"{self.user.name} <{self.user.email}>"
    
class OrganizationSettings(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.URLField(blank=True, null=True, max_length=800, validators=[URLValidator])
    icon = models.URLField(blank=True, null=True, max_length=800, validators=[URLValidator])
    brand = models.JSONField(default=dict)  
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