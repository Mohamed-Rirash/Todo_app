from fastapi import APIRouter, Depends, HTTPException, status,Path

import models
import schemas
# dependency start

from sqlalchemy.orm import Session
from database import  SessionLocal
from typing import Annotated
from .auth import get_current_user



router = APIRouter(
     prefix='/admin',
     tags=['admin']
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



@router.get('/', status_code=status.HTTP_200_OK)
async def get_all_todos1(user: user_dependency, db: db_dependency):
     if user is None or user.get('role') != 'admin':
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication field")
     return db.query(models.Todos).all()



@router.delete('/delete{todo_id}')
async def  delete_todo(user: user_dependency, db: db_dependency, todo_id: int = Annotated[...,Path(gt=0)]):
    if not user or user.get('role') != 'admin':
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication field")
    todo_model = db.query(models.Todos).filter(models.Todos.id == todo_id)
    if todo_model is None:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="todo is not found")
    db.query(models.Todos).filter(models.Todos.id == todo_id).delete()
    db.commit()
        