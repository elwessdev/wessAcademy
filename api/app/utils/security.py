from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Password hashing
def hash_password(password: str):
    return pwd_context.hash(password)

# Password verification
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# JWT token
def create_token(data: str):
    expire = datetime.now().astimezone() + timedelta(30)
    return jwt.encode(
        {
            "sub": data,
            "exp": expire,
            "iat": datetime.now().astimezone()
        }, 
        os.getenv("SECRET_KEY"),
        "HS256"
    )

def verify_and_decode_token(token: str):
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
        if payload["exp"] < datetime.now().astimezone():
            return None
        return payload
    except jwt.JWTError:
        return None
