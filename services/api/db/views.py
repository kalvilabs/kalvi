from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from db.userSerializers import ProfileSerializer, OrganizationSettingsSerializer
from db.models import OrganizationSettings
from rest_framework.permissions import IsAdminUser
from rest_framework.exceptions import ValidationError

class ProfileAPIView(APIView):
    def get(self, request):
        try:
            profile = request.user.profile
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        try:
            profile = request.user.profile
            serializer = ProfileSerializer(profile, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"error" : e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'error': 'Please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrganizationSettingsAPIView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        try:
            organization_settings = OrganizationSettings.objects.get()
            serializer = OrganizationSettingsSerializer(organization_settings)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except OrganizationSettings.DoesNotExist:
            return Response({'error': "Sorry! we couldn't find organization"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            organization_settings, created = OrganizationSettings.objects.get_or_create(
                defaults=request.data
            )
            if not created:
                serializer = OrganizationSettingsSerializer(organization_settings, data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                serializer = OrganizationSettingsSerializer(organization_settings)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'error': 'Please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
