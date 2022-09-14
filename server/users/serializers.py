from rest_framework.serializers import ModelSerializer
from . models import LocalUser


class LocalUserSerializer(ModelSerializer):
    class Meta():
        model = LocalUser
        fields = '__all__'

        option = {'write_only': True}
        extra_kwargs = {
            'username': option,
            'last_login': option,
            'is_superuser': option,
            'is_staff': option,
            'is_active': option,
            'date_joined': option,
            'password': option,
            'ipAddress': option,
            'browser': option,
            'groups': option,
            'user_permissions': option
        }

    def create(self, validated_data, isPublisher=True):
        user = LocalUser.objects.create(
            isPublisher=isPublisher,
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        if isPublisher:
            print('new publisher created!')
        else:
            print('new customer created!')
        return user

    def update(self, instance, validated_data):

        BASEURL = 'F:/github/e-commerce/e-commerce-backend/media/profile-images/'

        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        instance.pincode = validated_data['pincode']
        instance.city = validated_data['city']
        instance.state = validated_data['state']
        instance.address = validated_data['address']
        instance.profilePhoto = validated_data['profilePhoto']
        instance.save()
        return instance
