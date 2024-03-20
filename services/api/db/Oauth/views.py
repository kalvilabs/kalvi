from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from db.Oauth.serializers import GoogleSocialAuthSerializer, GithubSocialAuthSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny

class GoogleSocialAuthView(GenericAPIView):
    serializer_class = GoogleSocialAuthSerializer
    permission_classes = [AllowAny]
    def post(self, request):
        """
        POST with "auth_token"
        Send an idtoken as from google to get user information
        """
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        data = serializer.validated_data.get('auth_token')
        if data:
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Missing auth_token in validated data'}, status=status.HTTP_400_BAD_REQUEST)
        
class GithubSocialAuthView(GenericAPIView):
    serializer_class=GithubSocialAuthSerializer
    permission_classes = [AllowAny]
    def post(self, request):
        """
        POST with "code"
        Send an code as from github to get user information
        """
        try:
            serializer=self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        data=((serializer.validated_data)['code'])
        if data:
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Missing code in validated data'}, status=status.HTTP_400_BAD_REQUEST)

        

