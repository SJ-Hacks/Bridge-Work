from backend.api.base import BaseCRUDAPI, T
from fastapi import Body
from backend.models import GigJob, VolunteerJob, Job, PyObjectId
from models import Application


class JobAPI(BaseCRUDAPI[Job]):
    def __init__(self):
        super().__init__(Job, "job")


class GigJobAPI(BaseCRUDAPI[GigJob]):
    def __init__(self):
        super().__init__(GigJob, "gigs")


class VolunteerJobAPI(BaseCRUDAPI[VolunteerJob]):
    def __init__(self):
        super().__init__(VolunteerJob, "volunteers")


class ApplicationCrud(BaseCRUDAPI[Application]):
    def __init__(self):
        super().__init__(Application, "application")
        # self.router.put("/{item_id}/accept", response_model=self.model)(self.accept)
        # self.router.put("/{item_id}/reject", response_model=self.model)(self.reject)

    # async def accept(self, item_id: PyObjectId, body: dict = Body(...)):
    #     document = await self.db.db[self.collection_name].find_one({"_id": item_id})
    #     if not document:
    #         raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
    #     document["status"] = "accepted"
    #     await self.db.db[self.collection_name].update_one({"_id": item_id}, {"$set": document})
    #     return self.model(**document)
    #
    # async def reject(self, item_id: PyObjectId, body: dict = Body(...)):
    #     document = await self.db.db[self.collection_name].find_one({"_id": item_id})
    #     if not document:
    #         raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
    #     document["status"] = "accepted"
    #     await self.db.db[self.collection_name].update_one({"_id": item_id}, {"$set": document})
    #     return self.model(**document)


