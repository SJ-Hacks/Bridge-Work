from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import Gig, GigCreate
from .database import Database
from typing import List

app = FastAPI(title="Bridge Works API")
db = Database()

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

# Gig CRUD endpoints
@app.get("/api/gigs", response_model=List[Gig])
async def get_gigs():
    return await db.get_gigs()

@app.get("/api/gigs/{gig_id}", response_model=Gig)
async def get_gig(gig_id: str):
    gig = await db.get_gig(gig_id)
    if gig is None:
        raise HTTPException(status_code=404, detail="Gig not found")
    return gig

@app.post("/api/gigs", response_model=Gig)
async def create_gig(gig: GigCreate):
    return await db.create_gig(Gig(**gig.dict()))

@app.put("/api/gigs/{gig_id}", response_model=Gig)
async def update_gig(gig_id: str, gig: GigCreate):
    existing_gig = await db.get_gig(gig_id)
    if existing_gig is None:
        raise HTTPException(status_code=404, detail="Gig not found")
    return await db.update_gig(gig_id, Gig(**gig.dict()))

@app.delete("/api/gigs/{gig_id}")
async def delete_gig(gig_id: str):
    existing_gig = await db.get_gig(gig_id)
    if existing_gig is None:
        raise HTTPException(status_code=404, detail="Gig not found")
    return await db.delete_gig(gig_id) 