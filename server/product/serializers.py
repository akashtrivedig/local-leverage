# date-created: 19-feb-2022
# usage: convert the json data to object(data=) and vice versa()
# calling function/module: product/views.py

from rest_framework import serializers

from customer import models
from .models import Images, Product, Tag
from django.core.exceptions import *

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tagId', 'tagName')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

        extra_kwargs = {
            'timeStamp': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        print('creating new product...')
        print(validated_data)
        product1 = Product.objects.create(
            name=validated_data['name'],
            companyName=validated_data['companyName'],
            description=validated_data['description'],
            stock=validated_data['stock'],
            price=validated_data['price'],
            size=validated_data['size'],
            color=validated_data['color'],
            discount=validated_data['discount'],
            edition=validated_data['edition'],
            shopId_id=validated_data['shopId_id'],
            tagId_id=validated_data['tagId_id'],
        )
        product1.save()
        return product1

    def update(self, validated_data):
        print(validated_data)
        product = Product.objects.create(
            name=validated_data['name'],
            companyName=validated_data['companyName'],
            description=validated_data['description'],
            stock=validated_data['stock'],
            price=validated_data['price'],
            size=validated_data['size'],
            color=validated_data['color'],
            discount=validated_data['discount'],
            edition=validated_data['edition'],
            feedBackValue=validated_data['feedBackValue'],
            totalFeedbacks=validated_data['totalFeedbacks'],
            shopId=validated_data['shopId'],
            tagId_id=validated_data['tagId']
        )
        product.save()
        print('product updated')
        return product


class ImagesSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        print(validated_data)
        BASEURL = 'F:/github/e-commerce/e-commerce-backend/media/profile-images/'

        p = Images.objects.create(
            photo=validated_data['photo']
        )
        p.save()
        return p