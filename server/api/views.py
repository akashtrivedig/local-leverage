# author: akash trivedi
# date-created: 10-march-2022
# functionality: conatins the views related to utility for the website like sending otp
# caller: api\urls.py

import random
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import LocalUser


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.id
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RandomOtp(APIView):
    def get(self, request, contactNumber):
        try:
            # checks if the number already exists
            context = {
                'otpFromServer': 0,
                'status': 409
            }
            user = LocalUser.objects.filter(username=contactNumber).get()
            return Response(data=context, status=status.HTTP_409_CONFLICT)

        except LocalUser.DoesNotExist:
            # can be improved
            otp = random.randrange(100000, 999999)
            # below goes in terminal of the server
            print(f'otp for {contactNumber} is {otp}')
            context['otpFromServer'] = otp
            context['status'] = 200
            return Response(data=context, status=status.HTTP_200_OK)
