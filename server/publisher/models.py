# date-created: 17-feb-2022
# usage: all the tables related to the publisher and its shops
# calling function: -

from django.utils import timezone
from django.db import models
from users.models import LocalUser


class Shop(models.Model):
    # primary key
    shopId = models.AutoField(primary_key=True)

    # foreign key
    id = models.ForeignKey(
        LocalUser, on_delete=models.CASCADE, related_name='publisher_shop')

    # other details
    name = models.CharField(max_length=64, null=False)
    pincode = models.CharField(max_length=6, null=False)
    address = models.CharField(max_length=255, default='-')
    city = models.CharField(max_length=64, null=False)
    state = models.CharField(max_length=64, null=False)
    sales = models.IntegerField(null=False, default=0)
    productCount = models.IntegerField(null=False, default=0)
    registrationDate = models.DateTimeField(default=timezone.now)

class OrderHistory(models.Model):
    pass