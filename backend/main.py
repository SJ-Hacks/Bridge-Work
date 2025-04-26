from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .models import User, UserCreate, Gig, GigCreate, SkillLevel
from .database import Database
from typing import List
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import os

app = FastAPI(title="Bridge Works API")
db = Database()

# Security configuration
SECRET_KEY = "your-secret-key"  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await db.connect_to_database()

@app.on_event("shutdown")
async def shutdown_db_client():
    await db.close_database_connection()

# Authentication functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await db.get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

# Authentication endpoints
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.get_user_by_email(form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# User endpoints
@app.post("/api/users", response_model=User)
async def create_user(user: UserCreate):
    existing_user = await db.get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = user.dict()
    user_dict["password"] = get_password_hash(user.password)
    return await db.create_user(User(**user_dict))

@app.get("/api/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# Gig endpoints
@app.get("/api/gigs", response_model=List[Gig])
async def get_gigs(is_active: bool = True):
    return await db.get_gigs(is_active)

@app.get("/api/gigs/{gig_id}", response_model=Gig)
async def get_gig(gig_id: str):
    gig = await db.get_gig(gig_id)
    if gig is None:
        raise HTTPException(status_code=404, detail="Gig not found")
    return gig

@app.post("/api/gigs", response_model=Gig)
async def create_gig(gig: GigCreate, current_user: User = Depends(get_current_user)):
    gig_dict = gig.dict()
    gig_dict["created_by"] = current_user.id
    return await db.create_gig(Gig(**gig_dict))

@app.put("/api/gigs/{gig_id}", response_model=Gig)
async def update_gig(gig_id: str, gig: GigCreate, current_user: User = Depends(get_current_user)):
    existing_gig = await db.get_gig(gig_id)
    if existing_gig is None:
        raise HTTPException(status_code=404, detail="Gig not found")
    if existing_gig.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this gig")
    return await db.update_gig(gig_id, Gig(**gig.dict(), created_by=current_user.id))

@app.post("/api/gigs/{gig_id}/assign")
async def assign_gig(gig_id: str, current_user: User = Depends(get_current_user)):
    gig = await db.get_gig(gig_id)
    if gig is None:
        raise HTTPException(status_code=404, detail="Gig not found")
    if gig.assigned_to:
        raise HTTPException(status_code=400, detail="Gig already assigned")
    return await db.assign_gig(gig_id, str(current_user.id))

@app.post("/api/gigs/{gig_id}/complete")
async def complete_gig(gig_id: str, current_user: User = Depends(get_current_user)):
    gig = await db.get_gig(gig_id)
    if gig is None:
        raise HTTPException(status_code=404, detail="Gig not found")
    if gig.assigned_to != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to complete this gig")
    return await db.complete_gig(gig_id) 