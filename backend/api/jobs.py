from backend.api.base import BaseCRUDAPI, T
from fastapi import Body
from backend.models import GigJob, VolunteerJob, Job


class JobAPI(BaseCRUDAPI[Job]):
    def __init__(self):
        super().__init__(Job, "job")


class GigJobAPI(BaseCRUDAPI[GigJob]):
    def __init__(self):
        super().__init__(GigJob, "gigs")


class VolunteerJobAPI(BaseCRUDAPI[VolunteerJob]):
    def __init__(self):
        super().__init__(VolunteerJob, "volunteers")
