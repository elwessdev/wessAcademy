from fastapi import APIRouter
from app.schemas.auth_schema import UserSignup, UserSignin
from app.controllers import auth_controller
from app.utils.security import verify_and_decode_token

router = APIRouter()

# Signup Route
@router.post("/signup", response_model=dict)
async def register(user: UserSignup):
    print(user)
    return await auth_controller.signup(user)

# Signin Route
@router.post("/signin")
async def login(user: UserSignin):
    return await auth_controller.signin(user)

# Get User Data
@router.get("/userData")
async def get_user_data(authorization: str):
    token = authorization.split("Bearer ")[1] if "Bearer " in authorization else authorization
    # payload = verify_and_decode_token(token)
    # user_id = payload.get("sub")
    # id = user_id.split("LPSDOIOUAOPEUY")[0]
    return token
    # return await auth_controller.get_user_data(user_id)