from urllib import request
from fastapi import APIRouter, Depends, HTTPException
# from app.schemas.auth_schema import UserSignup, UserSignin
from app.controllers import course_controller
from app.utils.security import verify_and_get_user

router = APIRouter()

# Middleware for authentication
# @router.middleware("http")
# async def authentication_middleware(request, call_next):
#     authorization = request.headers.get("authorization")
#     if not authorization.startswith("Bearer "):
#         raise HTTPException(status_code=401, detail="Invalid token")
#     token = authorization.split("Bearer ")[1]
#     userValid = await verify_and_get_user(token)
#     if not userValid:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     request.state.user = userValid
#     response = await call_next(request)
#     return response


# # Get Courses
# @router.get("/coursesList", dependencies=[Depends(authentication_middleware)])
# async def get_user_data():
#     return await auth_controller.getUserData(request.state.user)

# Get Courses
@router.get("/coursesList")
async def get_courses():
    return await course_controller.getCourses(21)