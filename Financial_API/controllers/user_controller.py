from fastapi import APIRouter, Depends, HTTPException
from schemas import UserCreate, UserResponse
from services import UserService
from database import get_db


class UserController:
    def __init__(self):
        self.router = APIRouter(prefix="/users", tags=["users"])
        self.router.add_api_route("/createUser", self.create_user_route, methods=["POST"])
        self.router.add_api_route("/login", self.login_route, methods=["POST"])

    async def create_user_route(self, user: UserCreate, db=Depends(get_db)) -> UserResponse:
        self.user_service = UserService(db)
        user_saved = self.user_service.create_user(user=user)
        return user_saved
    
    async def login_route(self, user: UserCreate, db=Depends(get_db)):
        user_service = UserService(db)
        token = user_service.login(user)
        return {"access_token": token, "token_type": "bearer"}

