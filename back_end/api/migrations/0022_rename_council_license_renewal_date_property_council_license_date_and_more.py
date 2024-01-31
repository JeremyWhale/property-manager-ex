# Generated by Django 4.2.6 on 2024-01-18 00:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_gas_reading_reading_gas_reading_reading_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='council_license_renewal_date',
            new_name='council_license_date',
        ),
        migrations.AlterField(
            model_name='property',
            name='current_tenant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='api.tenant'),
        ),
    ]