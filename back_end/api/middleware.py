from datetime import datetime
import base64
from django.http import HttpResponseForbidden
from urllib import parse

from django.http import HttpResponseForbidden
from urllib import parse
from datetime import datetime
import base64

from django.http import HttpResponseForbidden
from datetime import datetime
import base64

from django.http import HttpResponseForbidden
from datetime import datetime
import base64

def AuthMiddleware(get_response):
    def middleware(request):

        if request.path.startswith('/admin'):
            return get_response(request)
        
        host = request.get_host()

        # Extract the token from the query parameters using request.GET
        token = request.GET.get('token')

        # Check if 'token' key exists in the query parameters
        if not token:
            return HttpResponseForbidden("Token is missing")

        date = datetime.now().strftime('%Y-%m-%d')

        string = 'for:http://' + host + ':authon' + date

        internal_encoded_bytes = base64.b64encode(string.encode('utf-8'))
        internal_auth_token = internal_encoded_bytes.decode('utf-8')

        if token != internal_auth_token:
            return HttpResponseForbidden("Invalid token")

        # Call the next middleware or view
        return get_response(request)

    return middleware

