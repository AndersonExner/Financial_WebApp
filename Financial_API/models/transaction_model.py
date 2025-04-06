from sqlalchemy import Column, Integer, Numeric, Text, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    amount = Column(Numeric(12, 2), nullable=False)
    description = Column(Text)
    type = Column(Integer, nullable=False)  # 1 = receita, 2 = despesa
    date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.now)

    user = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")