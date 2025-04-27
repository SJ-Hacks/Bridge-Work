from fastapi import APIRouter, HTTPException
from typing import Type, TypeVar, Generic, List
from pydantic import BaseModel
from backend.database import Database
from bson import ObjectId
from fastapi import Body

T = TypeVar("T", bound=BaseModel)

class BaseCRUDAPI(Generic[T]):
    def __init__(self, model: Type[T], collection_name: str):
        self.model = model
        self.collection_name = collection_name
        self.router = APIRouter()
        self.db = Database()

        self.router.get("/", response_model=List[self.model])(self.get_all)
        self.router.get("/{item_id}", response_model=self.model)(self.get_one)
        self.router.post("/", response_model=self.model)(self.create)
        self.router.put("/{item_id}", response_model=self.model)(self.update)
        self.router.delete("/{item_id}")(self.delete)


    async def get_one(self, item_id: str, **kwargs):
        document = await self.db.db[self.collection_name].find_one({"_id": ObjectId(item_id), **kwargs})
        if not document:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
        return self.model(**document)

    async def get_all(self, **kwargs):
        items = []
        cursor = self.db.db[self.collection_name].find(**kwargs)
        async for document in cursor:
            items.append(self.model(**document))
        return items

    async def create(self, item: T=Body()):
        document = item.dict(by_alias=True)
        result = await self.db.db[self.collection_name].insert_one(document)
        return await self.get_one(str(result.inserted_id))

    async def update(self, item_id: str, item: T):
        document = item.dict(by_alias=True)
        result = await self.db.db[self.collection_name].update_one(
            {"_id": ObjectId(item_id)}, {"$set": document}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
        return await self.get_one(item_id)

    async def delete(self, item_id: str):
        result = await self.db.db[self.collection_name].delete_one({"_id": ObjectId(item_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
        return {"message": f"{self.model.__name__} deleted successfully"}