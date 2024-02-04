from pydantic import BaseModel,Field,EmailStr
from typing import Annotated



class UsersRequest(BaseModel):
    
    email:EmailStr
    username: str
    firstname: str
    lastname: str
    hashed_password: str
    role: str | None = 'user'
    is_active: bool

class UsersVerification(BaseModel):
    password: str
    new_password: str = Field(min_length=6)

class Token(BaseModel):
    access_token: str
    token_type: str






class TodoRequest(BaseModel):
    title: str = Field(min_length=3)
    description: str = Field(min_length=3, max_length=100)
    priority: str = Field(min_length=3)
    complete: bool | None = False
