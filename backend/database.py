from motor.motor_asyncio import AsyncIOMotorClient
from models import Job
from typing import List


class Database:
    client: AsyncIOMotorClient = None
    db = None

    async def connect_to_database(self):
        self.client = AsyncIOMotorClient("mongodb://admin:password123@localhost:27017/admin")
        self.db = self.client.bridgeworks

    async def close_database_connection(self):
        if self.client:
            self.client.close()


db = Database()