# Generated by Django 4.0.3 on 2022-04-01 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0013_alter_images_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='photo',
            field=models.ImageField(default='F:/github/e-commerce/e-commerce-backend/media/product-images/photos/default.jpg', null=True, upload_to='photos'),
        ),
        migrations.DeleteModel(
            name='Images',
        ),
    ]
