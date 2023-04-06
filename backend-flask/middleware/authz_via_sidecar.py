import time
import requests
from jose import jwk, jwt
from jose.exceptions import JOSEError
from jose.utils import base64url_decode
from flask import request, jsonify
import functools
import os


HTTP_HEADER = "Authorization"

def extract_access_token(request_headers):
        access_token = None
        auth_header = request_headers.get(HTTP_HEADER)
        if auth_header and " " in auth_header:
            _, access_token = auth_header.split()
        return access_token
        
def cognito_verify_jwt_via_sidecar_given_token(cognito_jwt_token,app):
    def cognito_verify_jwt_via_sidecar(f):
        @functools.wraps(f)
        def wrapped(*args, **kwargs):
            access_token = extract_access_token(request.headers)
            app.logger.debug(access_token)
            url = os.getenv("JWT_VERIFY_URL")
            headers= {"authorization" : access_token}
            try:
                r = requests.get(url,headers=headers)
            except TokenVerifyError as e:
                return jsonify({'error': e})         
            return f(*args, **kwargs)
        return wrapped  
    return cognito_verify_jwt_via_sidecar
            
         
  
    