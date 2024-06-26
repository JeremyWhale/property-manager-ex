# Generated by Django 4.2.6 on 2024-02-28 22:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_alter_tenancy_payment_method'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='address',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='agent',
            name='phone_number',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='contractor',
            name='address',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='contractor',
            name='bank_account_number',
            field=models.CharField(blank=True, max_length=8),
        ),
        migrations.AlterField(
            model_name='contractor',
            name='bank_sort_code',
            field=models.CharField(blank=True, max_length=8),
        ),
        migrations.AlterField(
            model_name='contractor',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='contractor',
            name='phone_number',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='deposit_scheme',
            name='scheme_contact_number',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='deposit_scheme',
            name='scheme_email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='electric_supplier',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='electric_supplier',
            name='phone_number',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='gas_supplier',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='gas_supplier',
            name='phone_number',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='property',
            name='address_line_2',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='city',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='property',
            name='country',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='property',
            name='county',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='property',
            name='current_tenant',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='api.tenant'),
        ),
        migrations.AlterField(
            model_name='property',
            name='post_code',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='bank_account_number',
            field=models.CharField(blank=True, max_length=8),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='bank_sort_code',
            field=models.CharField(blank=True, max_length=8),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='emergency_contact_email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='emergency_contact_name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='emergency_contact_phone_number',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='phone_number',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='water_supplier',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='water_supplier',
            name='phone_number',
            field=models.CharField(blank=True, max_length=13),
        ),
    ]
