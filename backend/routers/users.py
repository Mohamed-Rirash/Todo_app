from fastapi import APIRouter, Depends, HTTPException, status,Path

from backend import models, schemas


from . import auth
# dependency start

from sqlalchemy.orm import Session
from backend.database import  SessionLocal
from typing import Annotated
from .auth import get_current_user




router = APIRouter(
     prefix='/users',
     tags=['users']
)


def get_db():
    db = SessionLocal()  
    try:
        yield db
    finally:
        db.close()  

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
# dependency end



@router.get('/userinfo', status_code=status.HTTP_200_OK)
async def get_all_info(user: user_dependency, db: db_dependency):
     if user is None :
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication field")
     return db.query(models.Users).filter(models.Users.id == user.get('id') ).first()



        
@router.put('/password',status_code=status.HTTP_200_OK)
async def change_password(user: user_dependency, 
                          db: db_dependency,
                          user_verification:schemas.UsersVerification):
    if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication field")
    user_model = db.query(models.Users).filter(models.Users.id == user.get('id')).first()
    if not auth.Bcrypt_context.verify(user_verification.password ,user_model.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Error on password change")
    user_model.hashed_password = auth.Bcrypt_context.hash(user_verification.new_password)
    db.add(user_model)
    db.commit()
         

