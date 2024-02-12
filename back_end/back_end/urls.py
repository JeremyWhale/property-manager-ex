"""
URL configuration for back_end project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import TenancyEditView, PurchaseDetailsEditView, MortgageEditView, InsuranceEditView, UrlEditView, GasSupplierEditView, ElectricSupplierEditView, WaterSupplierEditView, ContractorEditView, DepositSchemeCreate, IssuesByAddressView, AgentDetailsByAddressView, InsuranceDetailsByAddressView, ContractorDetail, CouncilLicenseRenewalsDueList, ElectricalInspectionsDueList, EpcCertificatesDueList, GasCertificatesDueList, InsuranceRenewalsDueList, IssuesList, MortgageRenewalsDueList, PropertyAddressListView, PropertyByAddressView, RentReviewsDueList, TenancyDetailView, TenantDetailView, login_view, PurchaseDetailsByAddressView, MortgageDetailsByAddressView, UrlsByAddressView, AgentList, ContractorList, TenantCreate, IssueCreate, ContractorCreate, TenantReviewsDueList, GasSupplierCreate, ElectricSupplierCreate, WaterSupplierCreate, TenantList, DepositSchemeByName, GasSupplierSerializer, ElectricSupplierSerializer, WaterSupplierSerializer, DepositSchemeList, PropertyCreateView, TenancyCreateView, InsuranceCreateView, PurchaseDetailsCreateView, MortgageCreateView, UrlCreateView, AgentCreateView, GasHistoryGet, ElectricHistoryGet, TenantHistoryGet, TenantHistoryAddView, AgentHistoryGet, AgentHistoryAddView, GasHistoryAddView, ElectricHistoryAddView, GasSupplierLookupSerializer, ElectricSupplierLookupSerializer, WaterSupplierLookupSerializer, TenantEdit, TenantDelete, IssueEdit, IssueDelete, IssuesByIdView, PropertyEditView, PropertyDeleteView, DepositSchemeEditView, AgentEditView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login_view, name='login_view'),
    path('issues/', IssuesList.as_view(), name='issues-list'),
    path('property-list/', PropertyAddressListView.as_view(), name='property-list'),
    path('property-details/<str:address_line_1>/', PropertyByAddressView.as_view(), name='property-details-by-address'),
    path('tenant-details/<str:full_name>/', TenantDetailView.as_view(), name='tenant-detail'),
    path('tenant-list', TenantList.as_view(), name='tenant-list'),
    path('tenancy-details/<str:by_tenant_name>/', TenancyDetailView.as_view(), name='tenancy-detail'),
    path('contractor-details/<str:name>/', ContractorDetail.as_view(), name='contractor-detail'),
    path('contractor-list', ContractorList.as_view(), name='contractor-list'),
    path('gas-certificates-due/<int:day_range>/', GasCertificatesDueList.as_view(), name='gas-certificates-due-list'),
    path('epc-certificates-due/<int:day_range>/', EpcCertificatesDueList.as_view(), name='epc-certificates-due-list'),
    path('rent-reviews-due/<int:day_range>/', RentReviewsDueList.as_view(), name='rent-reviews-due-list'),
    path('tenancy-reviews-due/<int:day_range>/', TenantReviewsDueList.as_view(), name='tenant-reviews-due-list'),
    path('electrical-inspections-due/<int:day_range>/', ElectricalInspectionsDueList.as_view(), name='electrical-inspections-due-list'),
    path('insurance-renewals-due/<int:day_range>/', InsuranceRenewalsDueList.as_view(), name='insurance-renewals-due-list'),
    path('mortgage-renewals-due/<int:day_range>/', MortgageRenewalsDueList.as_view(), name='mortgage-renewals-due-list'),
    path('council-license-renewals-due/', CouncilLicenseRenewalsDueList.as_view(), name='council-license-due-list'),
    path('purchase-details/<str:address_line_1>/', PurchaseDetailsByAddressView.as_view(), name='purchase-details-by-address'),
    path('mortgage-details/<str:address_line_1>/', MortgageDetailsByAddressView.as_view(), name='mortgage-details-by-address'),
    path('agent-details/<str:name>/', AgentDetailsByAddressView.as_view(), name='agent-details-by-name'),
    path('agents', AgentList.as_view(), name='agent-list'),
    path('insurance-details/<str:address_line_1>/', InsuranceDetailsByAddressView.as_view(), name='insurance-details-by-address'),
    path('insurance-details/<str:address_line_1>/', InsuranceDetailsByAddressView.as_view(), name='insurance-details-by-address'),
    path('issues/<str:address_line_1>/', IssuesByAddressView.as_view(), name='issues-by-address'),
    path('issue/<int:pk>/', IssuesByIdView.as_view(), name='issues-by-id'),
    path('urls/<str:address_line_1>/', UrlsByAddressView.as_view(), name='urls-by-address'),
    path('deposit-scheme-details/<str:scheme_name>/', DepositSchemeByName.as_view(), name='deposit-scheme-details-by-name'),
    path('deposit-scheme-list/', DepositSchemeList.as_view(), name='deposit-scheme-list'),
    path('gas-supplier-list/', GasSupplierSerializer.as_view(), name='gas-supplier-list'),
    path('electric-supplier-list/', ElectricSupplierSerializer.as_view(), name='electric-supplier-list'),
    path('water-supplier-list/', WaterSupplierSerializer.as_view(), name='water-supplier-list'),
    path('gas-history/<str:address_line_1>/', GasHistoryGet.as_view(), name='get-gas-history'),
    path('electric-history/<str:address_line_1>/', ElectricHistoryGet.as_view(), name='get-gas-history'),
    path('tenant-history/<str:address_line_1>/', TenantHistoryGet.as_view(), name='get-tenant-history'),
    path('agent-history/<str:address_line_1>/', AgentHistoryGet.as_view(), name='get-agent-history'),
    path('gas-supplier/<str:name>', GasSupplierLookupSerializer.as_view(), name='gas-supplier-info'),
    path('electric-supplier/<str:name>', ElectricSupplierLookupSerializer.as_view(), name='electric-supplier-info'),
    path('water-supplier/<str:name>', WaterSupplierLookupSerializer.as_view(), name='water-supplier-info'),
    #Create, edit, and delete views
    path('tenant-add/', TenantCreate.as_view(), name='create-tenant'),
    path('tenant-edit/<int:id>', TenantEdit.as_view(), name='edit-tenant'),
    path('tenant-delete/<int:id>', TenantDelete.as_view(), name='delete-tenant'),

    path('issue-add/', IssueCreate.as_view(), name='create-issue'),
    path('issue-edit/<int:id>', IssueEdit.as_view(), name='edit-issue'),
    path('issue-delete/<int:id>', IssueDelete.as_view(), name='delete-issue'),

    path('property-add/', PropertyCreateView.as_view(), name='create-property'),
    path('property-edit/<int:id>', PropertyEditView.as_view(), name='edit-property'),
    path('property-delete/<int:id>', PropertyDeleteView.as_view(), name='delete-property'),
    # Delete will cascade and remove where it features as a FK
    
    path('contractor-add/', ContractorCreate.as_view(), name='create-contractor'),
    path('contractor-edit/<int:id>', ContractorEditView.as_view(), name='edit-contractor'),

    path('tenancy-add/', TenancyCreateView.as_view(), name='create-tenancy'),
    path('tenancy-edit/<int:id>', TenancyEditView.as_view(), name='edit-tenancy'),

    path('purchase-details-add/', PurchaseDetailsCreateView.as_view(), name='create-purchase-details'),
    path('purchase-details-edit/<int:id>', PurchaseDetailsEditView.as_view(), name='edit-purchase-details'),

    path('mortgage-add/', MortgageCreateView.as_view(), name='create-mortgage'),
    path('mortgage-edit/<int:id>', MortgageEditView.as_view(), name='edit-mortgage'),

    path('insurance-add/', InsuranceCreateView.as_view(), name='create-insurance'),
    path('insurance-edit/<int:id>', InsuranceEditView.as_view(), name='edit-insurance'),

    path('url-add/', UrlCreateView.as_view(), name='create-urls'),
    path('url-edit/<int:id>', UrlEditView.as_view(), name='edit-urls'),

    path('agent-add/', AgentCreateView.as_view(), name='create-agent'),
    path('agent-edit/<int:id>', AgentEditView.as_view(), name='edit-agent'),

    path('electric-history-add/', ElectricHistoryAddView.as_view(), name='create-electric-history'),
    path('gas-history-add/', GasHistoryAddView.as_view(), name='create-gas-history'),
    path('tenant-history-add/', TenantHistoryAddView.as_view(), name='create-tenant-history'),
    path('agent-history-add/', AgentHistoryAddView.as_view(), name='create-agent-history'),

    path('deposit-scheme-add/', DepositSchemeCreate.as_view(), name='create-deposit-scheme'),
    path('deposit-scheme-edit/<int:id>', DepositSchemeEditView.as_view(), name='edit-deposit-scheme'),

    path('gas-supplier-add/', GasSupplierCreate.as_view(), name='create-gas-supplier'),
    path('gas-supplier-edit/<int:id>', GasSupplierEditView.as_view(), name='edit-gas-supplier'),

    path('electric-supplier-add/', ElectricSupplierCreate.as_view(), name='create-electric-supplier'),
    path('electric-supplier-edit/<int:id>', ElectricSupplierEditView.as_view(), name='edit-electric-supplier'),

    path('water-supplier-add/', WaterSupplierCreate.as_view(), name='create-water-supplier'),
    path('water-supplier-edit/<int:id>', WaterSupplierEditView.as_view(), name='edit-water-supplier'),
]
