from rest_framework import serializers
from .models import Contractor, Insurance, Issues, Mortgage, Property, Tenancy, Tenant, Purchase_details, Agent, Urls, Gas_Supplier, Electric_Supplier, Water_Supplier, Deposit_scheme, Electric_Reading, Gas_Reading, Tenant_history, AgentHistory


class AgentHistorySerializer(serializers.ModelSerializer):
    property = serializers.StringRelatedField()
    agent = serializers.StringRelatedField()

    class Meta:
        model = AgentHistory
        fields = '__all__'

class AgentHistoryAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all())

    class Meta:
        model = AgentHistory
        fields = '__all__'

#Return all issues
class IssuesSerializer(serializers.ModelSerializer):
    property = serializers.StringRelatedField()

    class Meta:
        model = Issues
        fields = '__all__'

#Return all issues
class IssuesWIthIDSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issues
        fields = '__all__'

class IssuesAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Issues
        fields = '__all__'
    
#Return list of properties
class PropertyAddressSerializer(serializers.ModelSerializer):
    current_tenant = serializers.StringRelatedField()

    class Meta:
        model = Property
        fields = ['id', 'address_line_1', 'country', 'current_tenant']

#Property details
class FullPropertySerializer(serializers.ModelSerializer):
    current_tenant_id = serializers.PrimaryKeyRelatedField(source='current_tenant', queryset=Tenant.objects.all())
    current_tenant = serializers.StringRelatedField()
    agent_id = serializers.PrimaryKeyRelatedField(source='agent', queryset=Agent.objects.all())
    agent = serializers.StringRelatedField()
    gas_supplier_id = serializers.PrimaryKeyRelatedField(source='gas_supplier_details', queryset=Gas_Supplier.objects.all())
    gas_supplier_details = serializers.StringRelatedField()
    electric_supplier_id = serializers.PrimaryKeyRelatedField(source='electric_supplier_details', queryset=Electric_Supplier.objects.all())
    electric_supplier_details = serializers.StringRelatedField()
    water_supplier_id = serializers.PrimaryKeyRelatedField(source='water_supplier_details', queryset=Water_Supplier.objects.all())
    water_supplier_details = serializers.StringRelatedField()

    class Meta:
        model = Property
        fields = '__all__'

class PropertyAddSerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = '__all__'

#Tenant details
class TenantSerializer(serializers.ModelSerializer):
    address_line_1 = serializers.SerializerMethodField()

    def get_address_line_1(self, obj):
        return obj.properties.first().address_line_1 if obj.properties.first() else 'No Property Listed'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['full_name'] = instance.full_name
        data['address_line_1'] = self.get_address_line_1(instance)
        return data

    class Meta:
        model = Tenant
        fields = '__all__'

class TenantListSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)
    address_line_1 = serializers.SerializerMethodField()

    class Meta:
        model = Tenant
        fields = '__all__'

    def get_address_line_1(self, obj):
        return obj.properties.first().address_line_1 if obj.properties.first() else 'No Property Listed'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['full_name'] = instance.full_name
        data['address_line_1'] = self.get_address_line_1(instance)
        return data

#Returns all urls
class UrlSerializer(serializers.ModelSerializer):
    property = serializers.CharField(source='property.address_line_1', read_only=True)
    
    class Meta:
        model = Urls
        fields = '__all__'

class UrlAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    
    class Meta:
        model = Urls
        fields = '__all__'

#Tenancy details
class TenancyDetailsSerializer(serializers.ModelSerializer):
    property_name = serializers.CharField(source='property.address_line_1', read_only=True)
    scheme_name = serializers.StringRelatedField()
    scheme_id = serializers.PrimaryKeyRelatedField(source='scheme_name', queryset=Deposit_scheme.objects.all())

    class Meta:
        model = Tenancy
        fields = '__all__'

class TenancyAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Tenancy
        fields = '__all__'

#Contractor details
class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = '__all__'

#Dashboard items
class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['address_line_1', 
                  'country', 
                  'epc_renewal_date', 
                  'gas_certificate_renewal_date', 
                  'electrical_inspection_date',
                  'council_license_date',
                  ]

#Insurance details
class InsuranceSerializer(serializers.ModelSerializer):
    property = serializers.CharField(source='property.address_line_1', read_only=True)

    class Meta:
        model = Insurance
        fields = '__all__'

#Insurance details
class InsuranceAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Insurance
        fields = '__all__'

#Mortgage details
class MortgageSerializer(serializers.ModelSerializer):
    property = serializers.CharField(source='property.address_line_1', read_only=True)

    class Meta:
        model = Mortgage
        fields = '__all__'

class MortgageAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Mortgage
        fields = '__all__'

#Purchase details
class PurchaseDetailsSerializer(serializers.ModelSerializer):
    property = serializers.CharField(source='property.address_line_1', read_only=True)

    class Meta:
        model = Purchase_details
        fields = '__all__'

class PurchaseDetailsAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Purchase_details
        fields = '__all__'

#Agent details
class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'

#Gas
class GasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gas_Supplier
        fields = '__all__'

#Electric
class ElectricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Electric_Supplier
        fields = '__all__'

#Water
class WaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Water_Supplier
        fields = '__all__'

#Deposit scheme

class DepositSchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposit_scheme
        fields = '__all__'

#Gas history get
class GasHistorySerializer(serializers.ModelSerializer):
    property = serializers.CharField(source='property.address_line_1', read_only=True)
    tenant = serializers.CharField(source='tenant.full_name', read_only=True)

    class Meta:
        model = Gas_Reading
        fields = '__all__'

#Gas history add
class GasHistoryAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    tenant = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all())

    class Meta:
        model = Gas_Reading
        fields = '__all__'

#Electric history get
class ElectricHistorySerializer(serializers.ModelSerializer):
    property = serializers.CharField(source='property.address_line_1', read_only=True)
    tenant = serializers.CharField(source='tenant.full_name', read_only=True)

    class Meta:
        model = Electric_Reading
        fields = '__all__'

#Electric history add
class ElectricHistoryAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    tenant = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all())

    class Meta:
        model = Electric_Reading
        fields = '__all__'

#Tenant history get
class TenantHistorySerializer(serializers.ModelSerializer):
    property = serializers.CharField(source='property.address_line_1', read_only=True)
    tenant = serializers.CharField(source='tenant.full_name', read_only=True)

    class Meta:
        model = Tenant_history
        fields = '__all__'

#Tenant history add
class TenantHistoryAddSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    tenant = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all())

    class Meta:
        model = Tenant_history
        fields = '__all__'