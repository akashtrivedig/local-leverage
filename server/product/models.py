# date-created: 19-feb-2022
# usage: contains all the models/tables related to product app
# calling function:

from django.db import models
from django.utils import timezone
from users.models import LocalUser
from publisher.models import Shop

tagChoices = [
    ('Electronics', 'Electronics'),
    ('Sports', 'Sports'),
    ('Cooking Utensiles', 'Cooking Utensils'),
    ('Men Clothing', 'Men Clothing'),
    ('Women Clothing', 'Women Clothing'),
    ('Children Clothing', 'Children Clothing'),
    ('Winter Clothing', 'Winter Clothing'),
    ('Gaming Accessories', 'Gaming Accessories'),
    ('Mobile Phone Accessories', 'Mobile Phone Accessories'),
    ('Travel', 'Travel'),
    ('Electronics and Communications', 'Electronics and Communications'),
]

size = {
    'none': 'none',
    's': 'Small',
    'm': 'Medium',
    'l': 'Large',
    'xl': 'XL',
    'xxl': 'XXL',
    'xxxl': 'XXXL',
}


class Tag(models.Model):
    # primary key
    tagId = models.AutoField(primary_key=True)

    # other details
    tagName = models.CharField(
        unique=True, choices=tagChoices, max_length=64, null=False)

    joinDate = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.tagName


def setImageName(instance, filename):
    return ''.join(['F:/github/e-commerce/e-commerce-backend/media/product-images/', instance.shopId, '/', instance.productName, '/', filename])

def setImageName1(instance, filename):
    return ''.join(['F:/github/e-commerce/e-commerce-backend/media/product-images/',filename])


class Product(models.Model):
    # primary key
    productId = models.AutoField(primary_key=True)

    # foreign keys
    tagId = models.ForeignKey(Tag, on_delete=models.CASCADE, null=True)
    shopId = models.ForeignKey(
        Shop, on_delete=models.CASCADE, related_name='publisher_product')

    # other details
    name = models.CharField(max_length=64, null=False)
    companyName = models.CharField(max_length=64, null=False)
    description = models.CharField(max_length=255, null=False)
    stock = models.IntegerField(null=False)
    price = models.IntegerField(null=False)
    size = models.CharField(max_length=8, null=True, default='abstract')
    color = models.CharField(max_length=32, null=False)
    discount = models.IntegerField(default=0, null=True)
    edition = models.CharField(max_length=32, default='-', null=True)
    feedBackValue = models.FloatField(null=True, default=0.0)
    totalFeedbacks = models.IntegerField(null=True, default=0)
    timeStamp = models.DateTimeField(null=False, default=timezone.now)
    photo = models.ImageField(upload_to=setImageName,
                              null=True, default='F:/github/e-commerce/e-commerce-backend/media/product-images/photos/default.jpg')


class Images(models.Model):
    id = models.AutoField(primary_key=True)
    photo = models.ImageField(upload_to=setImageName1, null=False)
