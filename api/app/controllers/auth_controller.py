from app.utils.security import hash_password, verify_password, create_token
from fastapi import HTTPException
from app.db import database
from app.models.user import users
from sqlalchemy import select

# Signup
async def signup(user):
    # check email
    query = select(users).where(users.c.email == user.email)
    existing_user = await database.fetch_one(query)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Check username
    query = select(users).where(users.c.username == user.username)
    existing_username = await database.fetch_one(query)
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")
    # insert new user
    hashed_pwd = hash_password(user.password)
    query = users.insert().values(
        username=user.username,
        email=user.email,
        major=user.major,
        password=hashed_pwd
    )
    save = await database.execute(query)
    if not save:
        raise HTTPException(status_code=500, detail="User creation failed")
    # Retrieve the inserted user's ID
    query = select(users.c.id).where(users.c.email == user.email)
    inserted_user = await database.fetch_one(query)
    if not inserted_user:
        raise HTTPException(status_code=500, detail="Failed to retrieve user ID")
    token = create_token(str(inserted_user["id"]) + "LPSDOIOUAOPEUY",2*60)
    return {"message": "User created successfully", "token": token}

# Signin
async def signin(user):
    query = select(users).where((users.c.email == user.email) | (users.c.username == user.email))
    db_user = await database.fetch_one(query)
    # check user credentials
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email/username or password"
        )
    # generate token
    tokenTime = 30
    if user.remember:
        tokenTime = 3 * 24 * 60
    token = create_token(str(db_user["id"]) + "LPSDOIOUAOPEUY",tokenTime)
    return {
        "user":{
            "id": db_user["id"],
            "username": db_user["username"],
            "email": db_user["email"],
            "major": db_user["major"],
            "created_at": db_user["created_at"]
        }, 
        "token":token
    }

# Get User Data
async def getUserData(userID):
    query = select(users).where(users.c.id == userID)
    db_user = await database.fetch_one(query)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": db_user["id"],
        "username": db_user["username"],
        "email": db_user["email"],
        "major": db_user["major"],
        "created_at": db_user["created_at"]
    }