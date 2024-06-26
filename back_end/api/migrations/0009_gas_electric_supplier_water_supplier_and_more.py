# Generated by Django 4.2.6 on 2023-12-16 22:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_tenancy_scheme_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gas_Electric_Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=13)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Water_Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=13)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.AddField(
            model_name='property',
            name='electric_account_number',
            field=models.CharField(default='1234', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='property',
            name='gas_account_number',
            field=models.CharField(default='1234', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='property',
            name='water_account_number',
            field=models.CharField(default='1234', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase_details',
            name='purchase_price',
            field=models.FloatField(default=270000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tenancy',
            name='tenancy_renewal_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
