# Generated by Django 4.2.6 on 2024-04-26 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0042_alter_issues_contractor_responsible'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issues',
            name='contractor_responsible',
            field=models.CharField(blank=True, default=1, max_length=8),
            preserve_default=False,
        ),
    ]