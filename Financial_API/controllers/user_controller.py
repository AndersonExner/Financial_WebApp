from fastapi import APIRouter, Depends, HTTPException, Request
from schemas import UserCreate, UserResponse, TransactionResponse, TransactionCreate
from services import UserService
from database import get_db
from typing import List


class UserController:
    def __init__(self):
        self.router = APIRouter(prefix="/user", tags=["user"])
        self.router.add_api_route("/createUser", self.create_user_route, methods=["POST"])
        self.router.add_api_route("/login", self.login_route, methods=["POST"])
        self.router.add_api_route("/transactions", self.get_user_transactions_route, methods=["POST"])

    async def create_user_route(self, user: UserCreate, db=Depends(get_db)) -> UserResponse:
        self.user_service = UserService(db)
        user_saved = self.user_service.create_user(user=user)
        return user_saved
    
    async def login_route(self, user: UserCreate, db=Depends(get_db)):
        user_service = UserService(db)
        loginResponse = user_service.login(user)
        return loginResponse
    
    async def get_user_transactions_route(self, request: Request, db=Depends(get_db)) -> dict:
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            raise HTTPException(status_code=401, detail="Token não fornecido")
        
        user_service = UserService(db)
        transactions: List[TransactionResponse] = user_service.get_user_transactions(token)

        return {
            "success": True,
            "message": "Transações carregadas com sucesso",
            "data": transactions
        }

    async def add_transaction_route(self, request: Request, transaction: TransactionCreate, db=Depends(get_db)):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        user_service = UserService(db)
        return user_service.add_transaction(token, transaction)
