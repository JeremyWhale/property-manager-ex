from django.db import models

class Tenant(models.Model):
    full_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True)
    email = models.EmailField(blank=True)
    bank_sort_code = models.CharField(max_length=8, blank=True)
    bank_account_number = models.CharField(max_length=8, blank=True)
    emergency_contact_name = models.CharField(max_length=50, blank=True)
    emergency_contact_phone_number = models.CharField(max_length=13, blank=True)
    emergency_contact_email = models.EmailField(blank=True)

    def __str__(self):
        return self.full_name

# Agent model
class Agent(models.Model):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Gas_Supplier(models.Model):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name

class Electric_Supplier(models.Model):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name

class Water_Supplier(models.Model):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name

# Property model
class Property(models.Model):
    address_line_1 = models.TextField()
    address_line_2 = models.TextField()
    city = models.CharField(max_length=20)
    county = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    post_code = models.CharField(max_length=10)
    current_tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='properties')
    current_value = models.FloatField()
    epc_renewal_date = models.DateField()
    gas_certificate_renewal_date = models.DateField()
    electrical_inspection_date = models.DateField()
    council_license_date = models.DateField()
    gas_supplier_details = models.ForeignKey(Gas_Supplier, on_delete=models.CASCADE)
    gas_account_number = models.CharField(max_length=20)
    electric_supplier_details = models.ForeignKey(Electric_Supplier, on_delete=models.CASCADE)
    electric_account_number = models.CharField(max_length=20)
    water_supplier_details = models.ForeignKey(Water_Supplier, on_delete=models.CASCADE)
    water_account_number = models.CharField(max_length=20)
    entry_code = models.CharField(max_length=10)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE)
    agent_start_date = models.DateField()

    def __str__(self):
        return self.address_line_1

class AgentHistory(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.agent.name

# Insurance model
class Insurance(models.Model):
    insurance_number = models.CharField(max_length=20)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    company = models.CharField(max_length=30)
    premium = models.FloatField()
    previous_premium = models.FloatField()
    renewal_due = models.DateField()

    def __str__(self):
        return self.insurance_number

# Gas reading model
class Gas_Reading(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    reading = models.CharField(max_length=20)
    reading_date = models.DateField()

    def __str__(self):
        return f'{self.property.address_line_1} {self.reading_date}'
    
# Electric reading model
class Electric_Reading(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    reading = models.CharField(max_length=20)
    reading_date = models.DateField()

    def __str__(self):
        return f'{self.property.address_line_1} {self.reading_date}'

# Mortgage model
class Mortgage(models.Model):
    account_number = models.CharField(max_length=20)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    amount_borrowed = models.FloatField()
    interest_rate = models.FloatField()
    term = models.PositiveIntegerField()
    renewal_date = models.DateField()
    lender_name = models.CharField(max_length=20)
    lender_address = models.TextField()
    lender_email = models.EmailField()
    lender_phone_number = models.CharField(max_length=13)
    mortgage_type = models.CharField(max_length=20) # Add choices for mortgage type
    monthly_amount = models.FloatField()


    def __str__(self):
        return f'{self.property.address_line_1} {self.lender_name}'

# Purchase details model
class Purchase_details(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    purchase_price = models.FloatField()
    purchase_date = models.DateField()
    purchase_method = models.CharField(max_length=20) # Add choices for method
    purchase_type = models.CharField(max_length=20) # Add choices for cash/mortgage

    def __str__(self):
        return self.property.address_line_1

# Contractors model
class Contractor(models.Model):
    name = models.CharField(max_length=30)
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=13, blank=True)
    email = models.EmailField(blank=True)
    bank_sort_code = models.CharField(max_length=8, blank=True)
    bank_account_number = models.CharField(max_length=8, blank=True)

    def __str__(self):
        return self.name

# Issues model
class Issues(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    problem = models.TextField()
    date_reported = models.DateField()
    # 01-01-2000 for Unallocated, 02-01-2000 for Allocated
    date_fixed = models.DateField() 
    contractor_responsible = models.ForeignKey(Contractor, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.property.address_line_1} {self.date_reported}'
    
# Tenant history model
class Tenant_history(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    move_in_date = models.DateField()
    move_out_date = models.DateField()
    initial_rent_amount = models.FloatField()
    final_rent_amount = models.FloatField()

    def __str__(self):
        return f'{self.property.address_line_1} {self.tenant}'

#Deposit scheme name
class Deposit_scheme(models.Model):
    scheme_name = models.CharField(max_length=50)
    scheme_contact_number = models.CharField(max_length=13, blank=True)
    scheme_email = models.EmailField(blank=True)

    def __str__(self):
        return self.scheme_name

# Tenancy model
class Tenancy(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    move_in_date = models.DateField()
    contract_term = models.PositiveIntegerField() # in months
    initial_rent_amount = models.FloatField()
    current_rent_amount = models.FloatField()
    payment_method = models.CharField(max_length=16) # options of cash or dd
    amount_paid = models.FloatField()
    rent_review_date = models.DateField()
    tenancy_renewal_date = models.DateField()
    deposit_amount = models.FloatField()
    deposit_lodged_with_dps = models.BooleanField(default=False)
    scheme_name = models.ForeignKey(Deposit_scheme, on_delete=models.CASCADE)
    scheme_policy_number = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.property.address_line_1} {self.tenant}'

# URL modal
class Urls(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    ast_url = models.TextField()
    epc_url = models.TextField()
    electrical_cert_url = models.TextField()
    gas_safety_url = models.TextField()
    inventory_url = models.TextField()
    other_docs_url = models.TextField()

    def __str__(self):
        return self.property.address_line_1