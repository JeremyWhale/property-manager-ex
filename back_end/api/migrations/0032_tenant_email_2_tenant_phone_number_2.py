# Generated by Django 4.2.6 on 2024-03-29 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_property_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='tenant',
            name='email_2',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AddField(
            model_name='tenant',
            name='phone_number_2',
            field=models.CharField(blank=True, max_length=13),
        ),
    ]
