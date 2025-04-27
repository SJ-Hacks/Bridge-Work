from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import RedirectResponse
import requests
import urllib.parse

from api.auth.auth import create_access_token
from api.user_service import get_or_create_user
from main import app

# === Google OAuth 2 settings ===
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET"
GOOGLE_REDIRECT_URI = "http://localhost:8000/auth/google/callback"

# Google's endpoints
GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo"


# === Route: start Google Login ===
@app.get("/auth/google/login")
def google_login():
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "response_type": "code",
        "scope": "openid email profile",
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "prompt": "consent",  # force to show account selection
        "access_type": "offline"
    }
    url = f"{GOOGLE_AUTH_URL}?{urllib.parse.urlencode(params)}"
    return RedirectResponse(url)


@app.get("/auth/google/callback")
def google_callback(request: Request):
    code = request.query_params.get("code")

    if not code:
        raise HTTPException(status_code=400, detail="No code provided by Google")

    # Exchange code for tokens
    token_data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code"
    }

    token_response = requests.post(GOOGLE_TOKEN_URL, data=token_data)
    if token_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to get access token")

    token_json = token_response.json()
    access_token = token_json.get("access_token")

    # Fetch user info
    userinfo_response = requests.get(
        GOOGLE_USERINFO_URL,
        headers={"Authorization": f"Bearer {access_token}"}
    )

    if userinfo_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch user info")

    userinfo = userinfo_response.json()

    # Here: Create or Fetch User
    user = get_or_create_user(userinfo)

    # Create a token for this user
    access_token = create_access_token(data={"sub": user["email"]})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "name": user["name"],
            "picture": user.get("picture")
        }
    }
