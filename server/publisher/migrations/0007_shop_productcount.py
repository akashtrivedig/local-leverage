# Generated by Django 4.0.3 on 2022-03-23 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publisher', '0006_remove_shop_browser_remove_shop_ipaddress'),
    ]

    operations = [
        migrations.AddField(
            model_name='shop',
            name='productCount',
            field=models.IntegerField(default=0),
        ),
    ]
