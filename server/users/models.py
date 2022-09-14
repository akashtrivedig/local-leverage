from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.


def setImageName(instance, filename):
    return ''.join(['F:/github/e-commerce/e-commerce-backend/media/profile-images/', instance.id, '/', filename])


class LocalUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=10, null=False, unique=True)
    password = models.CharField(max_length=255, null=False)

    # other details
    dob = models.DateField(null=True)
    address = models.CharField(max_length=128, null=False, default='')
    pincode = models.CharField(max_length=6, null=False, default='')
    city = models.CharField(max_length=64, null=False, default='')
    state = models.CharField(max_length=64, null=False, default='')
    ipAddress = models.GenericIPAddressField(default='http://127.0.0.1')
    browser = models.CharField(
        max_length=255, null=False, default='localhost:chrome')
    isPublisher = models.BooleanField(null=False, default=False)
    profilePhoto = models.ImageField(upload_to=setImageName,
                                     null=True, default='F:/github/e-commerce/e-commerce-backend/media/profile-images/photos/default.jpg')

    def __str__(self) -> str:
        data = f'id {self.id}, username {self.username}, password {self.password}, is_superuser {self.is_superuser}'
