# Generated by Django 4.2.6 on 2024-01-17 20:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_remove_agent_start_date_property_agent_start_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='electric_reading',
            name='supplier',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.electric_supplier'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='gas_reading',
            name='supplier',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.gas_supplier'),
            preserve_default=False,
        ),
    ]
