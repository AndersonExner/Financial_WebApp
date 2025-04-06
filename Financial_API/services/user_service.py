import bcrypt
from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserResponse, UserLogin, TransactionResponse, TransactionCreate
from repositories import UserRepository, TransactionRepository
from fastapi import HTTPException
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.secret_key = os.getenv("SECRET_KEY")
        self.algorithm = "HS256"
        self.access_token_expire_minutes = 60
    
    def create_user(self, user: UserCreate) -> UserResponse:
        existing_user = self.db.query(User).filter(User.login == user.login).first()
        if existing_user:
            return UserResponse( 
                id= 0, 
                login= "", 
                message="Login inválido", 
                success=False 
            )
        
        user.password = user.hashed_password()

        new_user = UserRepository.create_user(self.db, user)

        return UserResponse( 
            id=new_user.id, 
            login=new_user.login, 
            message="Usuário criado com sucesso", 
            success=True 
        )
    
    def login(self, user_login: UserLogin) -> UserResponse:
        user = UserRepository.get_user_by_login(self.db, user_login.login)
        if not user:
            return UserResponse(
                id=0,
                login="",
                message="Usuário não encontrado",
                success=False
            )
        
        # Validar senha
        if not bcrypt.checkpw(user_login.password.encode('utf-8'), user.password.encode('utf-8')):
            return UserResponse(
                id=0,
                login="",
                message="Senha incorreta",
                success=False
            )

        # Gerar token de acesso
        try:
            access_token_expires = timedelta(minutes=self.access_token_expire_minutes)
            access_token = self.create_access_token(
                    data={"sub": user.id},
                    expires_delta=access_token_expires
                )
        except Exception as e:
            return UserResponse(
                id=0,
                login="",
                message=f"Erro ao gerar o token: {str(e)}",
                success=False
            )

        
        return UserResponse(
            id=user.id,
            login=user.login,
            message="Logado com sucesso",
            success=True,
            data={  
                "access_token": access_token,
            }
        )

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(hours=1)
        
        to_encode.update({"exp": expire})

        print("Payload antes da codificação JWT:", to_encode)

        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt
    
    def get_user_transactions(self, token: str) -> list[TransactionResponse]:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            user_id: int = int(payload.get("sub"))
            if user_id is None:
                raise HTTPException(status_code=401, detail="Token inválido")
            
            transactions = TransactionRepository.get_transactions_by_user_id(self.db, user_id)
            return transactions
        
        except JWTError:
            raise HTTPException(status_code=401, detail="Não autorizado")
        
    def add_transaction(self, token: str, transaction_data: TransactionCreate):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            user_id: int = int(payload.get("sub"))

            if not user_id:
                raise HTTPException(status_code=401, detail="Token inválido")

            transaction = TransactionRepository.add_transaction(self.db, user_id, transaction_data)
            return {
                "success": True,
                "message": "Transação adicionada com sucesso",
                "data": {
                    "id": transaction.id
                }
            }
        except JWTError:
            raise HTTPException(status_code=401, detail="Não autorizado")