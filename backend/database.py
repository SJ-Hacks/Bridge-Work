from motor.motor_asyncio import AsyncIOMotorClient
from .models import User, Gig, PyObjectId
from typing import List, Optional
from datetime import datetime

class Database:
    client: AsyncIOMotorClient = None
    db = None

    async def connect_to_database(self):
        self.client = AsyncIOMotorClient("mongodb://admin:password123@localhost:27017")
        self.db = self.client.bridge_works

    async def close_database_connection(self):
        if self.client:
            self.client.close()

    # User operations
    async def get_users(self) -> List[User]:
        users = []
        cursor = self.db.users.find()
        async for document in cursor:
            users.append(User(**document))
        return users

    async def get_user(self, user_id: str) -> Optional[User]:
        document = await self.db.users.find_one({"_id": PyObjectId(user_id)})
        return User(**document) if document else None

    async def get_user_by_email(self, email: str) -> Optional[User]:
        document = await self.db.users.find_one({"email": email})
        return User(**document) if document else None

    async def create_user(self, user: User) -> User:
        document = user.dict(by_alias=True)
        result = await self.db.users.insert_one(document)
        return await self.get_user(str(result.inserted_id))

    async def update_user(self, user_id: str, user: User) -> User:
        document = user.dict(by_alias=True)
        await self.db.users.update_one(
            {"_id": PyObjectId(user_id)},
            {"$set": document}
        )
        return await self.get_user(user_id)

    # Gig operations
    async def get_gigs(self, is_active: bool = True) -> List[Gig]:
        gigs = []
        cursor = self.db.gigs.find({"is_active": is_active})
        async for document in cursor:
            gigs.append(Gig(**document))
        return gigs

    async def get_gig(self, gig_id: str) -> Optional[Gig]:
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

    async def assign_gig(self, gig_id: str, user_id: str) -> Gig:
        gig = await self.get_gig(gig_id)
        if not gig:
            return None
        gig.assigned_to = PyObjectId(user_id)
        return await self.update_gig(gig_id, gig)

    async def complete_gig(self, gig_id: str) -> Gig:
        gig = await self.get_gig(gig_id)
        if not gig:
            return None
        gig.completed_at = datetime.utcnow()
        gig.is_active = False
        return await self.update_gig(gig_id, gig) 