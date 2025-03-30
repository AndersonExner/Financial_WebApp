from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound
from schemas import UserCreate, UserResponse
from models import User


class UserRepository:
    @staticmethod
    def get_user_by_login(db: Session, login: str) -> UserResponse:
        try:
            return db.query(User).filter(User.login == login).first()
        except NoResultFound:
            return None

    @staticmethod
    def create_user(db: Session, user: UserCreate) -> User:
        try:

            new_user = User(
                login=user.login,
                password=user.password
            )    

            db.add(new_user) 
            db.commit()   
            db.refresh(new_user)
            return new_user  
        except Exception as e:
            db.rollback()  
            raise  
