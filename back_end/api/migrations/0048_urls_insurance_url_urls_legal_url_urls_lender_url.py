# Generated by Django 4.2.6 on 2024-05-12 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0047_rename_contractor_responsible_purchases_trade_supplier_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='urls',
            name='insurance_url',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='urls',
            name='legal_url',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='urls',
            name='lender_url',
            field=models.TextField(blank=True),
        ),
    ]
