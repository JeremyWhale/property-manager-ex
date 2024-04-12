"""
URL configuration for back_end project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('api/', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('api/', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('api/blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import AgentDelete, ContractorDelete, DepositSchemeDelete, WaterSupDelete, ElectricSupDelete, GasSupDelete, TenancyEditView, PurchaseDetailsEditView, MortgageEditView, InsuranceEditView, UrlEditView, GasSupplierEditView, ElectricSupplierEditView, WaterSupplierEditView, ContractorEditView, DepositSchemeCreate, IssuesByAddressView, AgentDetailsByAddressView, InsuranceDetailsByAddressView, ContractorDetail, CouncilLicenseRenewalsDueList, ElectricalInspectionsDueList, EpcCertificatesDueList, GasCertificatesDueList, InsuranceRenewalsDueList, IssuesList, MortgageRenewalsDueList, PropertyAddressListView, PropertyByAddressView, RentReviewsDueList, TenancyDetailView, TenantDetailView, login_view, PurchaseDetailsByAddressView, MortgageDetailsByAddressView, UrlsByAddressView, AgentList, ContractorList, TenantCreate, IssueCreate, ContractorCreate, TenantReviewsDueList, GasSupplierCreate, ElectricSupplierCreate, WaterSupplierCreate, TenantList, DepositSchemeByName, GasSupplierSerializer, ElectricSupplierSerializer, WaterSupplierSerializer, DepositSchemeList, PropertyCreateView, TenancyCreateView, InsuranceCreateView, PurchaseDetailsCreateView, MortgageCreateView, UrlCreateView, AgentCreateView, GasHistoryGet, ElectricHistoryGet, TenantHistoryGet, TenantHistoryAddView, AgentHistoryGet, AgentHistoryAddView, GasHistoryAddView, ElectricHistoryAddView, GasSupplierLookupSerializer, ElectricSupplierLookupSerializer, WaterSupplierLookupSerializer, TenantEdit, TenantDelete, IssueEdit, IssueDelete, IssuesByIdView, PropertyEditView, PropertyDeleteView, DepositSchemeEditView, AgentEditView

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/login/', login_view, name='login_view'),
    path('api/issues/', IssuesList.as_view(), name='issues-list'),
    path('api/property-list/', PropertyAddressListView.as_view(), name='property-list'),
    path('api/property-details/<str:address_line_1>/', PropertyByAddressView.as_view(), name='property-details-by-address'),
    path('api/tenant-details/<str:full_name>/', TenantDetailView.as_view(), name='tenant-detail'),
    path('api/tenant-list', TenantList.as_view(), name='tenant-list'),
    path('api/tenancy-details/<str:address_line_1>/', TenancyDetailView.as_view(), name='tenancy-detail'),
    path('api/contractor-details/<str:name>/', ContractorDetail.as_view(), name='contractor-detail'),
    path('api/contractor-list', ContractorList.as_view(), name='contractor-list'),
    path('api/gas-certificates-due/<int:day_range>/', GasCertificatesDueList.as_view(), name='gas-certificates-due-list'),
    path('api/epc-certificates-due/<int:day_range>/', EpcCertificatesDueList.as_view(), name='epc-certificates-due-list'),
    path('api/rent-reviews-due/<int:day_range>/', RentReviewsDueList.as_view(), name='rent-reviews-due-list'),
    path('api/tenancy-reviews-due/<int:day_range>/', TenantReviewsDueList.as_view(), name='tenant-reviews-due-list'),
    path('api/electrical-inspections-due/<int:day_range>/', ElectricalInspectionsDueList.as_view(), name='electrical-inspections-due-list'),
    path('api/insurance-renewals-due/<int:day_range>/', InsuranceRenewalsDueList.as_view(), name='insurance-renewals-due-list'),
    path('api/mortgage-renewals-due/<int:day_range>/', MortgageRenewalsDueList.as_view(), name='mortgage-renewals-due-list'),
    path('api/council-license-renewals-due/', CouncilLicenseRenewalsDueList.as_view(), name='council-license-due-list'),
    path('api/purchase-details/<str:address_line_1>/', PurchaseDetailsByAddressView.as_view(), name='purchase-details-by-address'),
    path('api/mortgage-details/<str:address_line_1>/', MortgageDetailsByAddressView.as_view(), name='mortgage-details-by-address'),
    path('api/agent-details/<str:name>/', AgentDetailsByAddressView.as_view(), name='agent-details-by-name'),
    path('api/agents', AgentList.as_view(), name='agent-list'),
    path('api/insurance-details/<str:address_line_1>/', InsuranceDetailsByAddressView.as_view(), name='insurance-details-by-address'),
    path('api/insurance-details/<str:address_line_1>/', InsuranceDetailsByAddressView.as_view(), name='insurance-details-by-address'),
    path('api/issues/<str:address_line_1>/', IssuesByAddressView.as_view(), name='issues-by-address'),
    path('api/issue/<int:pk>/', IssuesByIdView.as_view(), name='issues-by-id'),
    path('api/urls/<str:address_line_1>/', UrlsByAddressView.as_view(), name='urls-by-address'),
    path('api/deposit-scheme-details/<str:scheme_name>/', DepositSchemeByName.as_view(), name='deposit-scheme-details-by-name'),
    path('api/deposit-scheme-list/', DepositSchemeList.as_view(), name='deposit-scheme-list'),
    path('api/gas-supplier-list/', GasSupplierSerializer.as_view(), name='gas-supplier-list'),
    path('api/electric-supplier-list/', ElectricSupplierSerializer.as_view(), name='electric-supplier-list'),
    path('api/water-supplier-list/', WaterSupplierSerializer.as_view(), name='water-supplier-list'),
    path('api/gas-history/<str:address_line_1>/', GasHistoryGet.as_view(), name='get-gas-history'),
    path('api/electric-history/<str:address_line_1>/', ElectricHistoryGet.as_view(), name='get-gas-history'),
    path('api/tenant-history/<str:address_line_1>/', TenantHistoryGet.as_view(), name='get-tenant-history'),
    path('api/agent-history/<str:address_line_1>/', AgentHistoryGet.as_view(), name='get-agent-history'),
    path('api/gas-supplier/<str:name>', GasSupplierLookupSerializer.as_view(), name='gas-supplier-info'),
    path('api/electric-supplier/<str:name>', ElectricSupplierLookupSerializer.as_view(), name='electric-supplier-info'),
    path('api/water-supplier/<str:name>', WaterSupplierLookupSerializer.as_view(), name='water-supplier-info'),
    #Create, edit, and delete views
    path('api/tenant-add/', TenantCreate.as_view(), name='create-tenant'),
    path('api/tenant-edit/<int:id>', TenantEdit.as_view(), name='edit-tenant'),
    path('api/tenant-delete/<int:id>', TenantDelete.as_view(), name='delete-tenant'),

    path('api/issue-add/', IssueCreate.as_view(), name='create-issue'),
    path('api/issue-edit/<int:id>', IssueEdit.as_view(), name='edit-issue'),
    path('api/issue-delete/<int:id>', IssueDelete.as_view(), name='delete-issue'),

    path('api/property-add/', PropertyCreateView.as_view(), name='create-property'),
    path('api/property-edit/<int:id>', PropertyEditView.as_view(), name='edit-property'),
    path('api/property-delete/<int:id>', PropertyDeleteView.as_view(), name='delete-property'),
    # Delete will cascade and remove where it features as a FK
    
    path('api/contractor-add/', ContractorCreate.as_view(), name='create-contractor'),
    path('api/contractor-edit/<int:id>', ContractorEditView.as_view(), name='edit-contractor'),
    path('api/contractor-delete/<int:id>', ContractorDelete.as_view(), name='delete-contractor'),

    path('api/tenancy-add/', TenancyCreateView.as_view(), name='create-tenancy'),
    path('api/tenancy-edit/<int:id>', TenancyEditView.as_view(), name='edit-tenancy'),

    path('api/purchase-details-add/', PurchaseDetailsCreateView.as_view(), name='create-purchase-details'),
    path('api/purchase-details-edit/<int:id>', PurchaseDetailsEditView.as_view(), name='edit-purchase-details'),

    path('api/mortgage-add/', MortgageCreateView.as_view(), name='create-mortgage'),
    path('api/mortgage-edit/<int:id>', MortgageEditView.as_view(), name='edit-mortgage'),

    path('api/insurance-add/', InsuranceCreateView.as_view(), name='create-insurance'),
    path('api/insurance-edit/<int:id>', InsuranceEditView.as_view(), name='edit-insurance'),

    path('api/url-add/', UrlCreateView.as_view(), name='create-urls'),
    path('api/url-edit/<int:id>', UrlEditView.as_view(), name='edit-urls'),

    path('api/agent-add/', AgentCreateView.as_view(), name='create-agent'),
    path('api/agent-edit/<int:id>', AgentEditView.as_view(), name='edit-agent'),
    path('api/agent-delete/<int:id>', AgentDelete.as_view(), name='delete-agent'),

    path('api/electric-history-add/', ElectricHistoryAddView.as_view(), name='create-electric-history'),
    path('api/gas-history-add/', GasHistoryAddView.as_view(), name='create-gas-history'),
    path('api/tenant-history-add/', TenantHistoryAddView.as_view(), name='create-tenant-history'),
    path('api/agent-history-add/', AgentHistoryAddView.as_view(), name='create-agent-history'),

    path('api/deposit-scheme-add/', DepositSchemeCreate.as_view(), name='create-deposit-scheme'),
    path('api/deposit-scheme-edit/<int:id>', DepositSchemeEditView.as_view(), name='edit-deposit-scheme'),
    path('api/deposit-scheme-delete/<int:id>', DepositSchemeDelete.as_view(), name='delete-deposit-scheme'),

    path('api/gas-supplier-add/', GasSupplierCreate.as_view(), name='create-gas-supplier'),
    path('api/gas-supplier-edit/<int:id>', GasSupplierEditView.as_view(), name='edit-gas-supplier'),
    path('api/gas-supplier-delete/<int:id>', GasSupDelete.as_view(), name='delete-gas-supplier'),

    path('api/electric-supplier-add/', ElectricSupplierCreate.as_view(), name='create-electric-supplier'),
    path('api/electric-supplier-edit/<int:id>', ElectricSupplierEditView.as_view(), name='edit-electric-supplier'),
    path('api/electric-supplier-delete/<int:id>', ElectricSupDelete.as_view(), name='delete-electric-supplier'),

    path('api/water-supplier-add/', WaterSupplierCreate.as_view(), name='create-water-supplier'),
    path('api/water-supplier-edit/<int:id>', WaterSupplierEditView.as_view(), name='edit-water-supplier'),
    path('api/water-supplier-delete/<int:id>', WaterSupDelete.as_view(), name='delete-water-supplier'),
]
