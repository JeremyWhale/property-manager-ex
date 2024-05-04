from django.contrib.auth import authenticate, login
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404, JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import Trade_Supplier, Purchases, Contractor, Issues, Property, Tenancy, Tenant, Purchase_details, Agent, Mortgage, Insurance, Urls, Gas_Supplier, Electric_Supplier, Water_Supplier, Deposit_scheme, Gas_Reading, Electric_Reading, Tenant_history, AgentHistory
from .serializers import PurchaseWithIDSerializer, TradeSerializer, PurchasesAddSerializer, PurchasesSerializer, ContractorSerializer, DashboardSerializer, FullPropertySerializer, InsuranceSerializer, IssuesSerializer, MortgageSerializer, PropertyAddressSerializer, TenancyDetailsSerializer, TenantSerializer, PurchaseDetailsSerializer, AgentSerializer, UrlSerializer, GasSerializer, ElectricSerializer, WaterSerializer, IssuesAddSerializer, DepositSchemeSerializer, InsuranceAddSerializer, PropertyAddSerializer, TenancyAddSerializer, PurchaseDetailsAddSerializer, MortgageAddSerializer, UrlAddSerializer, GasHistorySerializer, ElectricHistorySerializer, TenantHistorySerializer, TenantHistoryAddSerializer, AgentHistorySerializer, AgentHistoryAddSerializer, GasHistoryAddSerializer, ElectricHistoryAddSerializer, TenantListSerializer, IssuesWIthIDSerializer
from datetime import date, timedelta
from rest_framework import status
from rest_framework.views import APIView
from datetime import datetime
import base64

@csrf_exempt
def login_view(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            first_name = user.first_name

            login(request, user)
            return JsonResponse({'status': 'success', 'name': first_name})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials.'})
        
class DepositSchemeList(generics.ListAPIView):
    queryset = Deposit_scheme.objects.all()
    serializer_class = DepositSchemeSerializer

class DepositSchemeByName(generics.RetrieveAPIView):
    queryset = Deposit_scheme.objects.all()
    serializer_class = DepositSchemeSerializer
    lookup_field = 'scheme_name'

class IssuesList(generics.ListAPIView):
    queryset = Issues.objects.all()
    serializer_class = IssuesSerializer

class PurchasesList(generics.ListAPIView):
    queryset = Purchases.objects.all()
    serializer_class = PurchasesSerializer

class MortgageList(generics.ListAPIView):
    queryset = Mortgage.objects.all()
    serializer_class = MortgageSerializer

class InsuranceList(generics.ListAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class PropertyAddressListView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertyAddressSerializer

class PropertyByAddressView(generics.RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = FullPropertySerializer
    lookup_field = 'address_line_1'
    lookup_url_kwarg = 'address_line_1'

class TenantList(generics.ListAPIView):
    queryset = Tenant.objects.all()
    serializer_class = TenantListSerializer

class TenantDetailView(generics.RetrieveAPIView):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    lookup_field = 'full_name'

class TenancyDetailView(generics.RetrieveAPIView):
    serializer_class = TenancyDetailsSerializer
    queryset = Tenancy.objects.all()

    def get(self, request, address_line_1):
        tenancies = Tenancy.objects.filter(property__address_line_1=address_line_1)
        serializer = TenancyDetailsSerializer(tenancies, many=True)
        return JsonResponse(serializer.data, safe=False)

class ContractorDetail(generics.RetrieveAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    lookup_field = 'name'

class TradeSupplierDetail(generics.RetrieveAPIView):
    queryset = Trade_Supplier.objects.all()
    serializer_class = TradeSerializer
    lookup_field = 'name'

class GasCertificatesDueList(generics.ListAPIView):
    serializer_class = DashboardSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Property.objects.filter(gas_certificate_renewal_date__lte=three_months_from_now)
        return queryset
    
class EpcCertificatesDueList(generics.ListAPIView):
    serializer_class = DashboardSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Property.objects.filter(epc_renewal_date__lte=three_months_from_now)
        return queryset

class ElectricalInspectionsDueList(generics.ListAPIView):
    serializer_class = DashboardSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Property.objects.filter(electrical_inspection_date__lte=three_months_from_now)
        return queryset

class CouncilLicenseRenewalsDueList(generics.ListAPIView):
    serializer_class = DashboardSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Property.objects.filter(council_license_date__lte=three_months_from_now)
        return queryset

class RentReviewsDueList(generics.ListAPIView):
    serializer_class = TenancyDetailsSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Tenancy.objects.filter(rent_review_date__lte=three_months_from_now)
        return queryset

class TenantReviewsDueList(generics.ListAPIView):
    serializer_class = TenancyDetailsSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Tenancy.objects.filter(tenancy_renewal_date__lte=three_months_from_now)
        return queryset
    
class InsuranceRenewalsDueList(generics.ListAPIView):
    serializer_class = InsuranceSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Insurance.objects.filter(renewal_due__lte=three_months_from_now)
        return queryset

class MortgageRenewalsDueList(generics.ListAPIView):
    serializer_class = MortgageSerializer

    def get_queryset(self):
        day_range = self.kwargs.get('day_range', 90)
        # Calculate the date 3 months from today
        three_months_from_now = date.today() + timedelta(days=int(day_range))
        # Filter properties with gas certificate renewal date within the next 3 months
        queryset = Mortgage.objects.filter(renewal_date__lte=three_months_from_now)
        return queryset
    
class PurchaseDetailsByAddressView(generics.ListAPIView):
    serializer_class = PurchaseDetailsSerializer
    queryset = Purchase_details.objects.all()

    def get(self, request, address_line_1):
        details = Purchase_details.objects.filter(property__address_line_1=address_line_1)
        serializer = PurchaseDetailsSerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)

class MortgageDetailsByAddressView(generics.ListAPIView):
    serializer_class = MortgageSerializer
    queryset = Mortgage.objects.all()

    def get(self, request, address_line_1):
        details = Mortgage.objects.filter(property__address_line_1=address_line_1)
        serializer = MortgageSerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)

class AgentDetailsByAddressView(generics.RetrieveAPIView):
    serializer_class = AgentSerializer
    queryset = Agent.objects.all()
    lookup_field = 'name'

class InsuranceDetailsByAddressView(generics.ListAPIView):
    serializer_class = InsuranceSerializer
    queryset = Insurance.objects.all()

    def get(self, request, address_line_1):  # Update the parameter name here
        details = Insurance.objects.filter(property__address_line_1=address_line_1)
        serializer = InsuranceSerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)
    
class IssuesByAddressView(generics.ListAPIView):
    serializer_class = IssuesSerializer
    queryset = Issues.objects.all()

    def get(self, request, address_line_1):
        details = Issues.objects.filter(property__address_line_1=address_line_1)
        serializer = IssuesSerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)

class IssuesByIdView(generics.RetrieveAPIView):
    serializer_class = IssuesWIthIDSerializer
    queryset = Issues.objects.all()

    def get(self, request, pk, *args, **kwargs):
        # Assuming 'pk' is the primary key of the Issues model
        issue = self.get_object()
        serializer = IssuesWIthIDSerializer(issue)
        return JsonResponse(serializer.data)
    
class PurchasesByIdView(generics.RetrieveAPIView):
    serializer_class = PurchaseWithIDSerializer
    queryset = Purchases.objects.all()

    def get(self, request, pk, *args, **kwargs):
        # Assuming 'pk' is the primary key of the Issues model
        issue = self.get_object()
        serializer = PurchaseWithIDSerializer(issue)
        return JsonResponse(serializer.data)
    
class UrlsByAddressView(generics.ListAPIView):
    serializer_class = UrlSerializer
    queryset = Urls.objects.all()

    def get(self, request, address_line_1):
        details = Urls.objects.filter(property__address_line_1=address_line_1)
        serializer = UrlSerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)
    
class AgentList(generics.ListAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

class ContractorList(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer

#Add views
class TenantCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = TenantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TenantEdit(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        # 'id' is the primary key or record ID provided in the URL
        instance = self.get_object(id)
        serializer = TenantSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Tenant.objects.get(id=id)
        except Tenant.DoesNotExist:
            raise Http404

class TenantDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            tenant = Tenant.objects.get(id=id)
        except Tenant.DoesNotExist:
            raise Http404

        tenant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class IssueCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = IssuesAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IssueEdit(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        # 'id' is the primary key or record ID provided in the URL
        instance = self.get_object(id)
        serializer = IssuesAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Issues.objects.get(id=id)
        except Issues.DoesNotExist:
            raise Http404

class IssueDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            tenant = Issues.objects.get(id=id)
        except Issues.DoesNotExist:
            raise Http404

        tenant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PurchasesCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = PurchasesAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PurchasesEdit(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        # 'id' is the primary key or record ID provided in the URL
        instance = self.get_object(id)
        serializer = PurchasesAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Purchases.objects.get(id=id)
        except Purchases.DoesNotExist:
            raise Http404

class PurchasesDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            tenant = Purchases.objects.get(id=id)
        except Purchases.DoesNotExist:
            raise Http404

        tenant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ContractorCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = ContractorSerializer(data=request.data)
        if serializer.is_valid():
            contractor = serializer.save()
            new_id = contractor.id
            
            # Add the ID to the response headers
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            response['new_id'] = str(new_id)  # Use any custom header name you prefer
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContractorEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = ContractorSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Contractor.objects.get(id=id)
        except Contractor.DoesNotExist:
            raise Http404
        
class GasSupplierSerializer(generics.ListAPIView):
    queryset = Gas_Supplier.objects.all()
    serializer_class = GasSerializer

class GasSupplierCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = GasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GasSupplierEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = GasSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Gas_Supplier.objects.get(id=id)
        except Gas_Supplier.DoesNotExist:
            raise Http404

class ElectricSupplierSerializer(generics.ListAPIView):
    queryset = Electric_Supplier.objects.all()
    serializer_class = ElectricSerializer

class ElectricSupplierCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = ElectricSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ElectricSupplierEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = ElectricSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Electric_Supplier.objects.get(id=id)
        except Electric_Supplier.DoesNotExist:
            raise Http404

class WaterSupplierSerializer(generics.ListAPIView):
    queryset = Water_Supplier.objects.all()
    serializer_class = WaterSerializer

class WaterSupplierCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = WaterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WaterSupplierEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = WaterSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Water_Supplier.objects.get(id=id)
        except Water_Supplier.DoesNotExist:
            raise Http404

class DepositSchemeCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = DepositSchemeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DepositSchemeEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = DepositSchemeSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Deposit_scheme.objects.get(id=id)
        except Deposit_scheme.DoesNotExist:
            raise Http404
    
class AgentCreateView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = AgentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AgentEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = AgentSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Agent.objects.get(id=id)
        except Agent.DoesNotExist:
            raise Http404
        
class InsuranceCreateView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = InsuranceAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InsuranceEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = InsuranceAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Insurance.objects.get(id=id)
        except Insurance.DoesNotExist:
            raise Http404
        
class PropertyCreateView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        # Deserialize request data
        serializer = PropertyAddSerializer(data=request.data)
        
        # Check if data is valid
        if serializer.is_valid():
            # Save the valid data
            serializer.save()
            # Return a success response
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return error response if data is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PropertyEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = PropertyAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Property.objects.get(id=id)
        except Property.DoesNotExist:
            raise Http404

class PropertyDeleteView(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            property = Property.objects.get(id=id)
        except Property.DoesNotExist:
            raise Http404

        property.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TenancyCreateView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = TenancyAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TenancyEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = TenancyAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Tenancy.objects.get(id=id)
        except Tenancy.DoesNotExist:
            raise Http404
        
class PurchaseDetailsCreateView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = PurchaseDetailsAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class PurchaseDetailsEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = PurchaseDetailsAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Purchase_details.objects.get(id=id)
        except Purchase_details.DoesNotExist:
            raise Http404
        
class MortgageCreateView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = MortgageAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MortgageEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = MortgageAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Mortgage.objects.get(id=id)
        except Mortgage.DoesNotExist:
            raise Http404
          
class UrlCreateView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = UrlAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UrlEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = UrlAddSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Urls.objects.get(id=id)
        except Urls.DoesNotExist:
            raise Http404
          
class GasHistoryGet(generics.ListAPIView):
    serializer_class = GasHistorySerializer
    queryset = Gas_Reading.objects.all()

    def get(self, request, address_line_1):
        details = Gas_Reading.objects.filter(property__address_line_1=address_line_1)
        serializer = GasHistorySerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)

class ElectricHistoryGet(generics.ListAPIView):
    serializer_class = ElectricHistorySerializer
    queryset = Electric_Reading.objects.all()

    def get(self, request, address_line_1):
        details = Electric_Reading.objects.filter(property__address_line_1=address_line_1)
        serializer = ElectricHistorySerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)

class TenantHistoryGet(generics.ListAPIView):
    serializer_class = TenantHistorySerializer
    queryset = Tenant_history.objects.all()

    def get(self, request, address_line_1):
        details = Tenant_history.objects.filter(property__address_line_1=address_line_1)
        serializer = TenantHistorySerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)

class TenantHistoryAddView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = TenantHistoryAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AgentHistoryGet(generics.ListAPIView):
    serializer_class = AgentHistorySerializer
    queryset = AgentHistory.objects.all()

    def get(self, request, address_line_1):
        details = AgentHistory.objects.filter(property__address_line_1=address_line_1)
        serializer = AgentHistorySerializer(details, many=True)
        return JsonResponse(serializer.data, safe=False)

class AgentHistoryAddView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = AgentHistoryAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GasHistoryAddView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = GasHistoryAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ElectricHistoryAddView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = ElectricHistoryAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GasSupplierLookupSerializer(generics.RetrieveAPIView):
    queryset = Gas_Supplier.objects.all()
    serializer_class = GasSerializer
    lookup_field = 'name'

class ElectricSupplierLookupSerializer(generics.RetrieveAPIView):
    queryset = Electric_Supplier.objects.all()
    serializer_class = ElectricSerializer
    lookup_field = 'name'

class WaterSupplierLookupSerializer(generics.RetrieveAPIView):
    queryset = Water_Supplier.objects.all()
    serializer_class = WaterSerializer
    lookup_field = 'name'


class AgentDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            agent = Agent.objects.get(id=id)
        except Agent.DoesNotExist:
            raise Http404

        agent.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DepositSchemeDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            deposit_scheme = Deposit_scheme.objects.get(id=id)
        except Deposit_scheme.DoesNotExist:
            raise Http404

        deposit_scheme.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ContractorDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            contractor = Contractor.objects.get(id=id)
        except Contractor.DoesNotExist:
            raise Http404

        contractor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GasSupDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            supplier = Gas_Supplier.objects.get(id=id)
        except Gas_Supplier.DoesNotExist:
            raise Http404

        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ElectricSupDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            supplier = Electric_Supplier.objects.get(id=id)
        except Electric_Supplier.DoesNotExist:
            raise Http404

        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class WaterSupDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            supplier = Water_Supplier.objects.get(id=id)
        except Contractor.DoesNotExist:
            raise Http404

        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TradeSupplierList(generics.ListAPIView):
    queryset = Trade_Supplier.objects.all()
    serializer_class = TradeSerializer

class TradeSupplierCreate(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = TradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TradeSupplierEditView(APIView):
    @csrf_exempt
    def put(self, request, id, *args, **kwargs):
        instance = self.get_object(id)
        serializer = TradeSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_object(self, id):
        # Helper method to get the object based on the primary key (id)
        try:
            return Trade_Supplier.objects.get(id=id)
        except Trade_Supplier.DoesNotExist:
            raise Http404
        
class TradeSupDelete(APIView):
    @csrf_exempt
    def delete(self, request, id, *args, **kwargs):
        try:
            supplier = Trade_Supplier.objects.get(id=id)
        except Trade_Supplier.DoesNotExist:
            raise Http404

        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
