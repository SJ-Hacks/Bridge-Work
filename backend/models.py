from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from pydantic import GetCoreSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema
from bson import ObjectId



class JobBase(BaseModel):
    title: str
    description: str
    location: str
    points: int
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Job(JobBase):
    id: str = Field(default_factory=str, alias="_id")
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class VolunteerJob(JobBase):
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    organization: Optional[str] = None  # Example additional field for volunteer jobs

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class GigJob(JobBase):
    # created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    duration: Optional[str] = None  # Example additional field for gig jobs

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
