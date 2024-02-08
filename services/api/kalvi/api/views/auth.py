from rest_framework.views import APIView
from rest_framework.response import Response


class SignUpEndPoint(APIView):
    def post(self, request):
        return Response("SIGNUP ENDPOINT")


class SignInEndPoint(APIView):
    def post(self, request):
        return Response("SIGNIN ENDPOINT")
