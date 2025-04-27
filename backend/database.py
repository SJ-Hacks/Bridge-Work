import os
from motor.motor_asyncio import AsyncIOMotorClient

class Database:
    client: AsyncIOMotorClient = None
    db = None

    async def connect_to_database(self):
        mongo_uri = os.getenv("MONGO_URI", "mongodb://root:example@localhost:27017/bridgework_db?authSource=admin")
        self.client = AsyncIOMotorClient(mongo_uri)
        self.db = self.client.get_database()

    async def close_database_connection(self):
        if self.client:
            self.client.close()

db = Database()
