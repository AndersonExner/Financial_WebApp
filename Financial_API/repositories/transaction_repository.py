from sqlalchemy.orm import Session 
from sqlalchemy.orm.exc import NoResultFound
from models import Transaction
from schemas import TransactionResponse, TransactionCreate

class TransactionRepository:
    @staticmethod
    def get_transactions_by_user_id(db: Session, user_id: int) -> list[TransactionResponse]:
        try:
            return db.query(Transaction).filter(Transaction.user_id == user_id).order_by(Transaction.date.desc()).all()
        except NoResultFound:
            return []

    @staticmethod
    def add_transaction(db: Session, user_id: int, transaction_data: TransactionCreate):
        transaction = Transaction(
            user_id=user_id,
            category_id=transaction_data.category_id,
            amount=transaction_data.amount,
            description=transaction_data.description,
            type=transaction_data.type,
            date=transaction_data.date
        )
        db.add(transaction)
        db.commit()
        db.refresh(transaction)
        return transaction