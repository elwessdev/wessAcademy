from urllib import request
from fastapi import APIRouter, Depends, HTTPException
# from app.schemas.auth_schema import UserSignup, UserSignin
from app.controllers import course_controller
from app.utils.security import auth_required

router = APIRouter()

# Get Courses
@router.get("/coursesList")
async def get_courses(userID=Depends(auth_required)):
    return await course_controller.getCourses(userID)

# Enroll Course
@router.post("/enrollCourse")
async def enroll_course(courseID: int, userID=Depends(auth_required)):
    return await course_controller.enrollCourse(courseID, userID)