from fastapi import HTTPException
from app.db import database
from app.models.user import users
from app.models.course import course, userCourse, courseSections, courseProgress
from sqlalchemy import select, update


# Get Courses
async def getCourses(userID):
    query = select(users).where(users.c.id == userID)
    db_user = await database.fetch_one(query)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    user_major = db_user["major"]

    query = select(course).where(course.c.course_major.like(f"%{user_major}%"))
    db_courses = await database.fetch_all(query)

    query = select(userCourse.join(course, userCourse.c.course_id == course.c.id).join(courseProgress, userCourse.c.course_id == courseProgress.c.course_id)).where(userCourse.c.user_id == userID).order_by(courseProgress.c.last_progress.desc())
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
    
    query = select(courseSections).where(courseSections.c.course_id == courseID)
    db_sections = await database.fetch_all(query)
    
    query = courseProgress.insert().values(
        user_id=userID,
        course_id=courseID,
        last_progress=0,
        total_sections=len(db_sections)+1
    )
    save = await database.execute(query)
    if not save:
        raise HTTPException(status_code=500, detail="Course progress initialization failed")

    return {"message": "Course enrolled successfully"}

# Get Course Details
async def getCourseDetails(courseID, userID):
    query = select(course).where(course.c.id == courseID)
    db_course = await database.fetch_one(query)
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    query = select(courseSections).where(courseSections.c.course_id == courseID).order_by(courseSections.c.section_number)
    db_sections = await database.fetch_all(query)
    if not db_sections:
        raise HTTPException(status_code=404, detail="Course sections not found")
    
    query = select(courseProgress).where(courseProgress.c.course_id == courseID and courseProgress.c.user_id == userID)
    db_progress = await database.fetch_one(query)
    # if not db_progress:
    #     raise HTTPException(status_code=404, detail="Course progress not found")

    return {"course":db_course, "sections":db_sections, "progress":db_progress}

# Update Course Progress
async def updateCourseProgress(courseID, progress, userID):
    query = update(courseProgress).where(courseProgress.c.course_id == courseID and courseProgress.c.user_id == userID).values(
        last_progress=progress
    )
    save = await database.execute(query)
    print(save)
    return {"message": "Course progress updated successfully"}