from datetime import datetime
import base64
from django.http import HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt

def AuthMiddleware(get_response):
    def middleware(request):
        # Allow requests to '/api/admin' without authentication
        if request.path.startswith('/api/admin'):
            return get_response(request)
        
        # Exempt CSRF protection for PUT, POST, and DELETE requests
        if request.method in ['PUT', 'POST', 'DELETE']:
            return csrf_exempt(get_response)(request)

        host = "/api"

        # Extract the token from the query parameters using request.GET
        token = request.GET.get('token')

        # Check if 'token' key exists in the query parameters
        if not token:
            return HttpResponseForbidden("403: AUTHENTICATION FAILED")

        date = datetime.now().strftime('%Y-%m-%d')

        string = 'for:' + host + ':authon' + date

        internal_encoded_bytes = base64.b64encode(string.encode('utf-8'))
        internal_auth_token = internal_encoded_bytes.decode('utf-8')

        print('token is:', token)
        print('token should be:', internal_auth_token)

        if token != internal_auth_token:
            return HttpResponseForbidden("403: AUTHENTICATION FAILED")

        # Call the next middleware or view
        return get_response(request)

    return middleware
