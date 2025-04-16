from fastapi import HTTPException
from app.db import database
from app.models.user import users
from app.models.course import course, userCourse, courseSections, majorsTable
from sqlalchemy import select, func


# Get Total Users, Courses, and Majors
async def getTotal():
    try:
        numberUsers = await database.fetch_val(select(func.count()).select_from(users))
        numberCourses = await database.fetch_val(select(func.count()).select_from(course))

        if numberUsers is None or numberCourses is None:
            raise HTTPException(status_code=404, detail="Could not fetch counts")
        
        total = {
            "users": numberUsers,
            "courses": numberCourses
        }

        return total
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Major Statistics
async def getMajorStatistics():
    try:
        query = select(users.c.major, func.count()).group_by(users.c.major)
        majorStatistics = await database.fetch_all(query)

        if majorStatistics is None:
            raise HTTPException(status_code=404, detail="Could not fetch major statistics")
        
        return majorStatistics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Course Enrollment
async def getCourseEnrollment():
    try:
        query = (
            select(
                course.c.course_name,
                func.count(userCourse.c.user_id).label("enrollment_count")
            )
            .join(userCourse, course.c.id == userCourse.c.course_id)
            .group_by(course.c.id, course.c.course_name)
            .order_by(func.count(userCourse.c.user_id).desc())
            .limit(5)
        )

        course_enrollment = await database.fetch_all(query)

        if course_enrollment is None:
            raise HTTPException(status_code=404, detail="Could not fetch course enrollment")
        
        return course_enrollment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Majors
async def getMajors():
    try:
        query = select(majorsTable.c.major_name)
        majors = await database.fetch_all(query)
        if majors is None:
            raise HTTPException(status_code=404, detail="Could not fetch majors")
        return majors
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get All Courses
async def getAllCourses():
    try:
        query = select(course)
        allCourses = await database.fetch_all(query)

        if allCourses is None:
            raise HTTPException(status_code=404, detail="Could not fetch courses")
        
        return allCourses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Delete Course
async def deleteCourse(course_id: int):
    try:
        query = courseSections.delete().where(courseSections.c.course_id == course_id)
        result = await database.execute(query)

        # if result is None:
        #     raise HTTPException(status_code=404, detail="Could not delete course sections")

        query = course.delete().where(course.c.id == course_id)
        result = await database.execute(query)

        # print(result)
        
        # if result is None:
        #     raise HTTPException(status_code=404, detail="Could not delete course")
        
        return {"message": "Course deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add Course
async def addCourse(course_data: dict):
    try:
        query = course.insert().values(
            course_image=course_data["courseImage"],
            course_name=course_data["title"],
            course_description=course_data["description"],
            course_major=course_data["majors"]
        )
        result = await database.execute(query)

        if result is None:
            raise HTTPException(status_code=404, detail="Could not add course")

        for section in course_data["sections"]:
            query = courseSections.insert().values(
                course_id=result,
                section_number=section["number"],
                section_title=section["title"],
                section_description=section["description"],
                section_content=section["content"],
            )
            await database.execute(query)
        
        return {"message": "Course added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get Users
async def getUsers():
    try:
        query = select(users.c.id, users.c.username, users.c.email, users.c.major, users.c.created_at, users.c.blocked)
        allUsers = await database.fetch_all(query)

        if allUsers is None:
            raise HTTPException(status_code=404, detail="Could not fetch users")
        
        return allUsers
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Block User
async def blockUser(user_id: int):
    try:
        query = users.update().where(users.c.id == user_id).values(blocked=True)
        await database.execute(query)
        
        return {"message": "User blocked successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Unblock User
async def unblockUser(user_id: int):
    try:
        query = users.update().where(users.c.id == user_id).values(blocked=False)
        await database.execute(query)
        
        return {"message": "User unblocked successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))







