from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from typing import List


class JobBase(BaseModel):
    title: str
    description: str
    location: str
    points: int
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    pay: int
    organization: str
    applied: bool = False
    skills: List[str]


class UserBase(BaseModel):
    name: str
    about_me: str
    location: str
    rating: int
    phone: int
    email: str


class HLUserBase(BaseModel):
    photo_b64: str

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PosterUserBase(BaseModel):
    organization: str

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Job(JobBase):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
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

