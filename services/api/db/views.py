from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from db.models import Profile, OrganizationSettings
from db.userSerializers import ProfileSerializer, OrganizationSettingsSerializer
from db.renderer import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, ValidationError
from django.core.exceptions import ObjectDoesNotExist



class ProfileViewSet(ViewSet):
    serializer_class = ProfileSerializer
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            user_profile = Profile.objects.get(user=self.request.user)
            return user_profile
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def retrieve(self, request, field_name=None):
        try:
            instance = self.get_queryset()
            if field_name:
                field_value = getattr(instance, field_name, None)
                if field_value is None:
                    return Response({'error': f'Field "{field_name}" not found'}, status=status.HTTP_404_NOT_FOUND)
                return Response({field_name: field_value})
            serializer = self.serializer_class(instance)
            return Response(serializer.data)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Something went wrong! Please try after some time"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update_field(self, request, field_name):
        instance = self.get_queryset()
        value = request.data.get(field_name)
        if value is None:
            return Response({'error': {field_name: ["This field is required."]}}, status=status.HTTP_400_BAD_REQUEST)
        setattr(instance, field_name, value)
        try:
            instance.save()
            serializer = self.serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "We couldn't save choices"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class OrganizationSettingsViewSet(ViewSet):
    serializer_class = OrganizationSettingsSerializer
    renderer_classes = [UserRenderer]
    permission_classes = [IsAdminUser, IsAuthenticated]  # Assuming IsAdminUser is your custom permission class

    def get_object(self):
        instance = OrganizationSettings.objects.filter(user=self.request.user).first()
        if instance is None:
            return Response({'error': 'OrganizationSettings not found'}, status=status.HTTP_404_NOT_FOUND)
        return instance
    
    def retrieve(self, request):
        try:
            instance = self.get_object()
            serializer = self.serializer_class(instance)
            return Response(serializer.data)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Something went wrong! Please try after some time"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        try:
            request.data['user'] = request.user.id
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "We couldn't save choices"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def update_field(self, request, field_name):
        instance = self.get_object()
        value = request.data.get(field_name)
        if value is None:
            return Response({'error': {field_name: ["This field is required."]}}, status=status.HTTP_400_BAD_REQUEST)
        setattr(instance, field_name, value)
        try:
            instance.save()
            serializer = self.serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "We couldn't save choices"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)