# Generated by Django 4.2.6 on 2024-03-30 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_property_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mortgage',
            name='lender_name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
