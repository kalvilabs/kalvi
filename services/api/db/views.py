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
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
        
    def post(self, request):
        try:
            organization_settings = OrganizationSettings.objects.first()  #this returns none automatically if there is no object instance
            if organization_settings:
                return Response({'error': "organization already exists"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = OrganizationSettingsSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'error': 'Please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        try:
            organization_settings = OrganizationSettings.objects.get()
            serializer = OrganizationSettingsSerializer(organization_settings, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except OrganizationSettings.DoesNotExist:
            return Response({'error': "Sorry! we couldn't find organization"}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response({'error': 'Please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

