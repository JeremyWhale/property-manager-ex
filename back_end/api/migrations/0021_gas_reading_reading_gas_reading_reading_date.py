# Generated by Django 4.2.6 on 2024-01-17 22:35

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_remove_gas_reading_reading_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='gas_reading',
            name='reading',
            field=models.CharField(default=1234, max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='gas_reading',
            name='reading_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]