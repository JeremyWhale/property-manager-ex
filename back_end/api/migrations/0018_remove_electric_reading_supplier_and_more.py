# Generated by Django 4.2.6 on 2024-01-17 22:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_agenthistory_start_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='electric_reading',
            name='supplier',
        ),
        migrations.RemoveField(
            model_name='gas_reading',
            name='supplier',
        ),
    ]
