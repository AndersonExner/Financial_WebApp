from typing import Optional
from pydantic import BaseModel
from datetime import datetime
import bcrypt

class UserBase(BaseModel):
    login: str

class UserCreate(UserBase):
    password: str

    def hashed_password(self):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(self.password.encode('utf-8'), salt).decode('utf-8')

class UserModel(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(UserBase):
    password: str

class UserResponse(BaseModel):
    id: int
    login: str
    success: bool
    message: Optional[str] = None
    data: Optional[object] = None 
    class Config:
        from_attributes = True  
