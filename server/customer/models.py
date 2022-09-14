# date-created: 22-feb-2022
# usage: all the tables related to the customer and its related data
# calling function: -

from django.db import models
from django.utils import timezone
from product.models import Product
from users.models import LocalUser
from publisher.models import Shop


class Address(models.Model):
    # primary key
    addressId = models.AutoField(primary_key=True)

    # foriegn key
    id = models.ForeignKey(
        LocalUser, on_delete=models.CASCADE, related_name='user_address')

    # other details
    address = models.CharField(max_length=255, default='-')
    pincode = models.CharField(max_length=6, null=False)
    city = models.CharField(max_length=64, null=True)
    state = models.CharField(max_length=64, null=True)
    registrationDate = models.DateTimeField(default=timezone.now)


class Feedback(models.Model):
    # primary key
    feedbackId = models.AutoField(primary_key=True)

    # foreign key
    id = models.ForeignKey(
        LocalUser, on_delete=models.SET_NULL, null=True, related_name='customer_feedback')
    productId = models.ForeignKey(Product, on_delete=models.CASCADE)
    shopId = models.ForeignKey(Shop, on_delete=models.CASCADE)

    # other details
    starValue = models.IntegerField(null=False)
    timeStamp = models.DateTimeField(default=timezone.now)
    heading = models.CharField(max_length=64, default='', null=False)
    review = models.TextField(max_length=600)
    ipAddress = models.GenericIPAddressField(default='127.0.0.1')
    browser = models.CharField(
        max_length=255, null=False, default='localhost:chrome')


class OrderSummary(models.Model):
    # primary key
    orderId = models.AutoField(primary_key=True)

    # foreign key
    id = models.ForeignKey(
        LocalUser, on_delete=models.DO_NOTHING, null=True, related_name='customer_order')
    addressId = models.ForeignKey(Address, on_delete=models.DO_NOTHING)

    # unique key
    transactionId = models.CharField(max_length=255, null=False)

    # other details
    orderPlaceTime = models.DateTimeField(timezone.now, null=False)
    orderDispatchTime = models.DateTimeField(null=True)
    orderShippedTime = models.DateTimeField(null=True)
    orderDeliveryTime = models.DateTimeField(null=True)
    paymentTime = models.DateTimeField(null=True)
    status = models.CharField(max_length=10, null=False, default='placed')
    pincode = models.CharField(max_length=6, null=False)
    paymentOption = models.CharField(max_length=16, null=False)
    paymentDone = models.BooleanField(default=False)
    paymentGateway = models.CharField(max_length=64, null=False)
    ipAddress = models.GenericIPAddressField(default='127.0.0.1')
    browser = models.CharField(
        max_length=255, null=False, default='localhost:chrome')
