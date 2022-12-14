# Generated by Django 4.0.3 on 2022-03-17 21:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Shop',
            fields=[
                ('shopId', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=64)),
                ('pincode', models.CharField(max_length=6)),
                ('address', models.CharField(default='-', max_length=255)),
                ('ipAddress', models.GenericIPAddressField(default='127.0.0.1')),
                ('browser', models.CharField(default='localhost:chrome', max_length=255)),
                ('registrationDate', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
