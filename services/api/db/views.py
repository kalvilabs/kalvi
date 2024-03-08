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



class ProfileViewSet(ViewSet):
    serializer_class = ProfileSerializer
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try: 
            user_profile =  Profile.objects.filter(user=self.request.user)
            return user_profile
        except NotFound as e:
            return Response({'error': e.detail}, status=status.HTTP_404_NOT_FOUND)

    def update_profile_field(self, request, field_name):
        try:
            profile = self.get_queryset().first()   #This query returns 404 not found error on failing as provided in get_queryset method.
            field_value = getattr(profile, field_name)
            if request.method == 'GET':
                return Response(field_value, status=status.HTTP_200_OK)
            elif request.method in ['POST', 'PUT']:
                try:
                    new_field_value = request.data.get(field_name)
                except ValidationError:
                    return Response({"error" : f"{field_name.capitalize()} field is required"}, status=status.HTTP_400_BAD_REQUEST)
                setattr(profile, field_name, new_field_value)
                profile.save()
                return Response(f"{field_name.capitalize()} updated successfully", status=status.HTTP_200_OK)
            elif request.method == 'DELETE':
                setattr(profile, field_name, None)
                profile.save()
                return Response(f"{field_name.capitalize()} deleted successfully", status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': "Something went wrong! Please try after some time"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get', 'post', 'put', 'delete'])
    def bio(self, request):
        return self.update_profile_field(request, 'bio')

    @action(detail=False, methods=['get', 'post', 'put', 'delete'])
    def date_of_birth(self, request):
        return self.update_profile_field(request, 'date_of_birth')

    @action(detail=False, methods=['get', 'post', 'put', 'delete'])
    def profile_image(self, request):
        return self.update_profile_field(request, 'profile_image_url')

class OrganizationSettingsViewSet(ViewSet):
    serializer_class = OrganizationSettingsSerializer
    renderer_classes = [UserRenderer]
    permission_classes = [IsAdminUser, IsAuthenticated]  # Assuming IsAdminUser is your custom permission class

    def get_object(self):
        try:
            instance = OrganizationSettings.objects.filter(user=self.request.user).first()
            return instance  # Assuming there's only one OrganizationSettings instance
        except NotFound as e:
            return Response({'error': e.detail}, status=status.HTTP_404_NOT_FOUND)
        
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
            return Response({field_name: ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        setattr(instance, field_name, value)
        try:
            instance.save()
            serializer = self.serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "We couldn't save choices"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)