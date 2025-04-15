from sqlalchemy import Table, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db import metadata

course = Table(
    "course",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("course_name", String, nullable=False),
    Column("course_description", String, nullable=False),
    Column("course_image", String, nullable=False),
    Column("course_major", String, nullable=False),
    Column("created_at", DateTime, server_default=func.now(), nullable=False),
)

userCourse = Table(
    "user_course",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", Integer, nullable=False),
    Column("course_id", Integer, nullable=False),
    Column("progress", Integer, nullable=False),
    Column("status", String, nullable=False),
    Column("created_at", DateTime, server_default=func.now(), nullable=False),
)

courseSections = Table(
    "course_sections",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("course_id", Integer, nullable=False),
    Column("section_number", Integer, nullable=False),
    Column("section_title", String, nullable=False),
    Column("section_description", String, nullable=False),
    Column("section_content", String, nullable=False),
    Column("created_at", DateTime, server_default=func.now(), nullable=False),
)