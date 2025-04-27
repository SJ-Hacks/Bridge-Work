from backend.models import UserBase
from datetime import datetime
from backend.database import db  # Ensure your database connection is imported

def get_or_create_user(userinfo: dict) -> dict:
    # Validate input data using UserBase
    user_data = UserBase(
        name=userinfo["name"],
        about_me=userinfo.get("about_me", ""),
        location=userinfo.get("location", "Unknown"),
        rating=userinfo.get("rating", 0),
        phone=userinfo.get("phone", 0),
        email=userinfo["email"]
    )

    # Check if the user already exists in the database
    user = db.users.find_one({"email": user_data.email})

    if not user:
        # Create a new user
        new_user = user_data.model_dump()
        new_user["created_at"] = datetime.utcnow()
        result = db.users.insert_one(new_user)
        new_user["_id"] = str(result.inserted_id)
        return new_user
    else:
        return user