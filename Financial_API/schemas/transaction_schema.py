from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class TransactionResponse(BaseModel):
    id: int
    amount: float
    description: Optional[str]
    type: int
    date: date
    category_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class TransactionCreate(BaseModel):
    category_id: int
    amount: float
    description: Optional[str] = None
    type: int  # 1 = Receita, 2 = Despesa
    date: date