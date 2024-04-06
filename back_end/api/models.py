from django.db import models

class Tenant(models.Model):
    full_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True)
    phone_number_2 = models.CharField(max_length=13, blank=True)
    email = models.EmailField(blank=True)
    email_2 = models.EmailField(blank=True)
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
    address_line_2 = models.TextField(blank=True)
    city = models.CharField(max_length=20, blank=True)
    county = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=20, blank=True)
    post_code = models.CharField(max_length=10, blank=True)
    current_tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='properties', blank=True, null=True)
    current_value = models.CharField(max_length=10, blank=True)
    epc_renewal_date = models.CharField(max_length=10, blank=True)
    gas_certificate_renewal_date = models.CharField(max_length=10, blank=True)
    electrical_inspection_date = models.CharField(max_length=10, blank=True)
    council_license_date = models.CharField(max_length=10, blank=True)
    gas_supplier_details = models.CharField(max_length=50, blank=True, null=True)
    gas_account_number = models.CharField(max_length=20, blank=True)
    electric_supplier_details = models.CharField(max_length=50, blank=True, null=True)
    electric_account_number = models.CharField(max_length=20, blank=True, null=True)
    water_supplier_details = models.CharField(max_length=50, blank=True, null=True)
    water_account_number = models.CharField(max_length=20, blank=True)
    entry_code = models.CharField(max_length=10, blank=True)
    agent = models.CharField(max_length=50, blank=True, null=True)
    agent_start_date = models.CharField(max_length=10, blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, blank=True)
    type =  models.CharField(max_length=50, blank=True)

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
    insurance_number = models.CharField(max_length=20, blank=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    company = models.CharField(max_length=30, blank=True)
    premium = models.CharField(max_length=10, blank=True)
    previous_premium = models.CharField(max_length=10, blank=True)
    renewal_due = models.CharField(max_length=10, blank=True)
    company_phone_number = models.CharField(max_length=20, blank=True)
    company_email = models.CharField(max_length=50, blank=True)
    company_address = models.CharField(max_length=50, blank=True)

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
    account_number = models.CharField(max_length=20, blank=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    amount_borrowed = models.CharField(max_length=10, blank=True)
    interest_rate = models.CharField(max_length=10, blank=True)
    term = models.CharField(max_length=10, blank=True)
    renewal_date = models.CharField(max_length=10, blank=True)
    lender_name = models.CharField(max_length=50, blank=True)
    lender_address = models.TextField(blank=True)
    lender_email = models.EmailField(blank=True)
    lender_phone_number = models.CharField(max_length=13, blank=True)
    mortgage_type = models.CharField(max_length=20, blank=True) # Add choices for mortgage type
    monthly_amount = models.CharField(max_length=10, blank=True)


    def __str__(self):
        return f'{self.property.address_line_1} {self.lender_name}'

# Purchase details model
class Purchase_details(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    purchase_price = models.CharField(max_length=10, blank=True)
    purchase_date = models.CharField(max_length=10, blank=True)
    purchase_method = models.CharField(max_length=20, blank=True) # Add choices for method
    purchase_type = models.CharField(max_length=20, blank=True) # Add choices for cash/mortgage

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
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, blank=True, null=True)
    move_in_date = models.CharField(max_length=10, blank=True)
    contract_term = models.CharField(max_length=10, blank=True)
    initial_rent_amount = models.CharField(max_length=10, blank=True)
    current_rent_amount = models.CharField(max_length=10, blank=True)
    payment_method = models.CharField(max_length=16, blank=True) # options of cash or dd
    amount_paid = models.CharField(max_length=10, blank=True)
    rent_review_date = models.CharField(max_length=10, blank=True)
    tenancy_renewal_date = models.CharField(max_length=10, blank=True)
    deposit_amount = models.CharField(max_length=10, blank=True)
    deposit_lodged_with_dps = models.BooleanField(default=False, blank=True)
    scheme_name = models.CharField(max_length=50, blank=True, null=True)
    scheme_policy_number = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f'{self.property.address_line_1}'

# URL modal
class Urls(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    ast_url = models.TextField(blank=True)
    epc_url = models.TextField(blank=True)
    electrical_cert_url = models.TextField(blank=True)
    gas_safety_url = models.TextField(blank=True)
    inventory_url = models.TextField(blank=True)
    other_docs_url = models.TextField(blank=True)

    def __str__(self):
        return self.property.address_line_1