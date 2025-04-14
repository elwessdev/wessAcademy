from fastapi import HTTPException
from app.db import database
from app.models.user import users
from app.models.course import course, userCourse
from sqlalchemy import select


# Get Courses
async def getCourses(userID):
    query = select(users).where(users.c.id == userID)
    db_user = await database.fetch_one(query)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    user_major = db_user["major"]

    query = select(course).where(course.c.course_major == user_major)
    db_courses = await database.fetch_all(query)

    query = select(userCourse.join(course, userCourse.c.course_id == course.c.id)).where(userCourse.c.user_id == userID)
    db_user_courses = await database.fetch_all(query)

    db_courses = [
        course for course in db_courses
        if course["id"] not in {user_course["course_id"] for user_course in db_user_courses}
    ]

    return {"courses":db_courses,"myCourses":db_user_courses}

# Enroll Course
async def enrollCourse(courseID, userID):
    query = userCourse.insert().values(
        user_id=userID,
        course_id=courseID,
        progress=0,
        status="In Progress"
    )
    save = await database.execute(query)
    if not save:
        raise HTTPException(status_code=500, detail="Course enrollment failed")
    return {"message": "Course enrolled successfully"}