from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.database import Database
from backend.api.jobs import GigJobAPI, VolunteerJobAPI, JobAPI, ApplicationCrud

from database import db
from models import Job


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    await db.connect_to_database()
    yield
    # Shutdown logic
    await db.close_database_connection()

app = FastAPI(
    title="Bridge Works API",
    description="API documentation for managing jobs, gigs, and volunteers.",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI endpoint
    redoc_url="/redoc",  # ReDoc endpoint
    openapi_url="/openapi.json", # OpenAPI schema endpoint
    lifespan=lifespan,  # Use async context manager for startup/shutdown
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
job_api = JobAPI()
gig_api = GigJobAPI()
volunteer_api = VolunteerJobAPI()
application_api = ApplicationCrud()



app.include_router(job_api.router, prefix="/api/job", tags=["Jobs"])
app.include_router(gig_api.router, prefix="/api/gig", tags=["Gigs"])
app.include_router(volunteer_api.router, prefix="/api/volunteer", tags=["Volunteers"])
app.include_router(application_api.router, prefix="/api/application", tags=["Application"])