from backend.api.base import BaseCRUDAPI
from fastapi import Body
from backend.models import GigJob, VolunteerJob, Job


class JobAPI(BaseCRUDAPI[Job]):
    def __init__(self):
        super().__init__(Job, "job")

    async def create(self, item: Job = Body()):
        document = item.dict(by_alias=True)
        result = await self.db.db[self.collection_name].insert_one(document)
        return await self.get_one(str(result.inserted_id))


class GigJobAPI(BaseCRUDAPI[GigJob]):
    def __init__(self):
        super().__init__(GigJob, "gigs")


class VolunteerJobAPI(BaseCRUDAPI[VolunteerJob]):
    def __init__(self):
        super().__init__(VolunteerJob, "volunteers")
