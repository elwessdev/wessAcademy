from fastapi import APIRouter
from app.schemas.auth_schema import UserSignup, UserSignin
from app.controllers import auth_controller

router = APIRouter()

# Signup Route
@router.post("/signup", response_model=dict)
async def register(user: UserSignup):
    return await auth_controller.signup(user)

# Signin Route
@router.post("/signin")
async def login(user: UserSignin):
    return await auth_controller.signin(user)