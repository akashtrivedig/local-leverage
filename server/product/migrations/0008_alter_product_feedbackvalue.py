# Generated by Django 4.0.3 on 2022-03-29 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_product_tagid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='feedBackValue',
            field=models.FloatField(default=0.0, null=True),
        ),
    ]