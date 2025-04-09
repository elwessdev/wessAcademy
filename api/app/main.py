from fastapi import FastAPI
from app.db import engine, metadata, database
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router

# FastAPI app
app = FastAPI()
origins = [
    "http://localhost:3000"
]

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB
metadata.create_all(bind=engine)
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Main route
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Routers
app.include_router(auth_router.router, prefix="/api/auth", tags=["Auth"])