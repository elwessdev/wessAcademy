from fastapi import APIRouter, Header, HTTPException
from app.schemas.auth_schema import UserSignup, UserSignin
from app.controllers import auth_controller
from app.utils.security import verify_and_get_user

router = APIRouter()

# Signup Route
@router.post("/signup")
async def register(user: UserSignup):
    return await auth_controller.signup(user)

# Signin Route
@router.post("/signin")
async def login(user: UserSignin):
    return await auth_controller.signin(user)

# Get User Data
@router.get("/userData")
async def get_user_data(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token")
    token = authorization.split("Bearer ")[1]
    userValid = await verify_and_get_user(token)
    if not userValid:
        raise HTTPException(status_code=401, detail="Invalid token")
    return await auth_controller.getUserData(userValid)