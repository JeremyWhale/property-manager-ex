# Generated by Django 4.2.6 on 2024-01-17 21:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_electric_reading_supplier_gas_reading_supplier'),
    ]

    operations = [
        migrations.AddField(
            model_name='agenthistory',
            name='start_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]