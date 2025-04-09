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
        password=hashed_pwd
    )
    await database.execute(query)
    return {"message": "User created successfully"}

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
    token = create_token(str(db_user["id"]) + "LPSDOIOUAOPEUY")
    return {"message":"login successfully", "token": "bearer "+token}