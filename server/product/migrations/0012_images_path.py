# Generated by Django 4.0.3 on 2022-04-01 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0011_images_alternate'),
    ]

    operations = [
        migrations.AddField(
            model_name='images',
            name='path',
            field=models.CharField(default='/default.jpg', max_length=100),
        ),
    ]
