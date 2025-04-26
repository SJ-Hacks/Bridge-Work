from motor.motor_asyncio import AsyncIOMotorClient
from .models import Gig, PyObjectId
from typing import List

class Database:
    client: AsyncIOMotorClient = None
    db = None

    async def connect_to_database(self):
        self.client = AsyncIOMotorClient("mongodb://admin:password123@localhost:27017")
        self.db = self.client.bridge_works

    async def close_database_connection(self):
        if self.client:
            self.client.close()

    # Gig CRUD operations
    async def get_gigs(self) -> List[Gig]:
        gigs = []
        cursor = self.db.gigs.find()
        async for document in cursor:
            gigs.append(Gig(**document))
        return gigs

    async def get_gig(self, gig_id: str) -> Gig:
        document = await self.db.gigs.find_one({"_id": PyObjectId(gig_id)})
        return Gig(**document) if document else None

    async def create_gig(self, gig: Gig) -> Gig:
        document = gig.dict(by_alias=True)
        result = await self.db.gigs.insert_one(document)
        return await self.get_gig(str(result.inserted_id))

    async def update_gig(self, gig_id: str, gig: Gig) -> Gig:
        document = gig.dict(by_alias=True)
        await self.db.gigs.update_one(
            {"_id": PyObjectId(gig_id)},
            {"$set": document}
        )
        return await self.get_gig(gig_id)

    async def delete_gig(self, gig_id: str):
        await self.db.gigs.delete_one({"_id": PyObjectId(gig_id)})
        return {"message": "Gig deleted successfully"} 