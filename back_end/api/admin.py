from django.contrib import admin

from .models import Property, Tenancy, Tenant, Gas_Reading, Electric_Reading, Mortgage, Purchase_details, Issues, Tenant_history, Contractor, Insurance, Agent, Urls, Deposit_scheme, AgentHistory, Gas_Supplier, Electric_Supplier, Water_Supplier

admin.site.register(Property)
admin.site.register(Tenancy)
admin.site.register(Tenant)
admin.site.register(Gas_Reading)
admin.site.register(Electric_Reading)
admin.site.register(Mortgage)
admin.site.register(Purchase_details)
admin.site.register(Issues)
admin.site.register(Tenant_history)
admin.site.register(Contractor)
admin.site.register(Insurance)
admin.site.register(Agent)
admin.site.register(Urls)
admin.site.register(Deposit_scheme)
admin.site.register(AgentHistory)
admin.site.register(Gas_Supplier)
admin.site.register(Electric_Supplier)
admin.site.register(Water_Supplier)