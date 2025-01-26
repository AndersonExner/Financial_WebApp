from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
import bcrypt

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

    def hashed_password(self):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(self.password.encode('utf-8'), salt).decode('utf-8')

class UserModel(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class UserLogin(UserBase):
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    success: bool
    message: Optional[str] = None  # Melhor usar Optional aqui

    class Config:
        orm_mode = True  # Garante que o Pydantic possa trabalhar com instâncias do SQLAlchemy
