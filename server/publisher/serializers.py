# date-created: 20-feb-2022
# usage:
# calling function: publisher/views.py

from rest_framework import serializers
from .models import Shop


class ShopSerializer(serializers.ModelSerializer):
    '''
    serialize the instance into json and json to istance, for the coressponding model provided in the Meta class
    '''
    class Meta:
        '''
        this class tells the serializer to return the list of fields equal to fields attribute given and model equal to model provided
        '''
        model = Shop
        fields = '__all__'

    def create(self, validated_data, publisherId):
        shop = Shop.objects.create(
            name=validated_data['name'],
            pincode=validated_data['pincode'],
            address=validated_data['address'],
            city=validated_data['city'],
            state=validated_data['state'],
            id_id=publisherId
        )
        shop.save()
        print('new shop created!')
        return shop
