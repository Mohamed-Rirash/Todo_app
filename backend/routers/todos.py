from fastapi import APIRouter, Depends, HTTPException, status,Path


# dependency start

from sqlalchemy.orm import Session
from backend import models, schemas
from backend.database import  SessionLocal
from typing import Annotated
from .auth import get_current_user



router = APIRouter(
     tags=['todos']
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


@router.get('/todos/', status_code=status.HTTP_200_OK)
async def get_all_todos(user: user_dependency, db: db_dependency):
     if user is None:
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication field")
     return db.query(models.Todos).filter(models.Todos.owner_id == user.get('id')).all()


@router.get("/todo/{todo_id}/", status_code=status.HTTP_200_OK)
async def read_todo_by_id(user: user_dependency, db: db_dependency, todo_id: int = Path(...,gt=0, description="ID of the todo item")):
    if user is None:
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication field")
    todo_model =  db.query(models.Todos).filter(models.Todos.id == todo_id).filter(models.Todos.owner_id == user.get('id')).first()
    if todo_model is not None:
        return todo_model
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="todo is not found ")




@router.post("/todos")
async def create_new_todo(user: user_dependency, db: db_dependency, todorequest: schemas.TodoRequest):
    if user is None:
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication field")
    todo_model = models.Todos(**todorequest.dict(), owner_id=user.get("id"))
    db.add(todo_model)
    db.commit()
    return {'message': "todo added successfull"}


@router.put("/todo/{todo_id}", status_code=status.HTTP_200_OK)
async def update_todo(user: user_dependency, db: db_dependency,
                      todorequest: schemas.TodoRequest, 
                      todo_id: int = Path(..., description="ID of the todo item you want to alter")):
    
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="authentication filled")
        todo_model =  db.query(models.Todos).filter(models.Todos.id == todo_id).filter(models.Todos.owner_id == user.get('id')).first()
        if todo_model is  None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="todo is not found ")

        todo_model.title = todorequest.title
        todo_model.description = todorequest.description
        todo_model.priority = todorequest.priority
        todo_model.complete = todorequest.complete

        db.add(todo_model)
        db.commit()

@router.delete("/todo/{todo_id}",status_code=status.HTTP_200_OK)
async def delete_todo(db: db_dependency,
                      user: user_dependency,
                      todorequest: schemas.TodoRequest, 
                      todo_id: int = Path(..., description="ID of the todo item you want to Delete")):
        if user is None:
             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="authentiaction filled")
        
        todo_model =  db.query(models.Todos).filter(models.Todos.id == todo_id).filter(models.Todos.owner_id == user.get('id')).first()
        if todo_model is  None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="todo is not found ")
        db.query(models.Todos).filter(models.Todos.id == todo_id).filter(models.Todos.owner_id == user.get('id')).delete()

        db.commit()