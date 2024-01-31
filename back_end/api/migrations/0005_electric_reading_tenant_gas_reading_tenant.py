# Generated by Django 4.2.6 on 2023-11-16 16:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_insurance_company'),
    ]

    operations = [
        migrations.AddField(
            model_name='electric_reading',
            name='tenant',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.tenant'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='gas_reading',
            name='tenant',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.tenant'),
            preserve_default=False,
        ),
    ]
