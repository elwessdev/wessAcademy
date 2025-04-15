from fastapi import APIRouter
from app.controllers import admin_controller

router = APIRouter()

###### Overview Page ######
# Get Total Users, Courses, and Majors
@router.get("/get_total")
async def getTotal():
    return await admin_controller.getTotal()

# Major Statistics
@router.get("/get_major_statistics")
async def getMajorStatistics():
    return await admin_controller.getMajorStatistics()

# Course Enrollment
@router.get("/get_course_enrollment")
async def getCourseEnrollment():
    return await admin_controller.getCourseEnrollment()

###### Course Page ######
# Get All Courses
@router.get("/get_all_courses")
async def getAllCourses():
    return await admin_controller.getAllCourses()

# Delete Course
@router.delete("/delete_course/{course_id}")
async def deleteCourse(course_id: int):
    return await admin_controller.deleteCourse(course_id)

# Add Course
@router.post("/add_course")
async def addCourse(course: dict):
    return await admin_controller.addCourse(course)


###### Users Page ######
# Get Users
@router.get("/get_users")
async def getUsers():
    return await admin_controller.getUsers()

# Block User
@router.put("/block_user/{user_id}")
async def blockUser(user_id: int):
    return await admin_controller.blockUser(user_id)