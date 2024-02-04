from fastapi import APIRouter,Depends, status,HTTPException
import schemas,models
from passlib.context import CryptContext
from database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm,OAuth2PasswordBearer
from jose import jwt,JWTError
from datetime import timedelta, datetime



router = APIRouter(
     prefix='/auth',
     tags=['auth']
)


SECRET_KEY = '5f05227d8856cd0efbe9b88fd6d3491da174a93ef653d10c8184acd0dfb0ce99'
ALGORITHM = 'HS256'


Bcrypt_context = CryptContext(schemes=['bcrypt'],deprecated = 'auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')


def get_db():
    db = SessionLocal()  #
    try:
        yield db
    finally:
        db.close()  

db_dependency = Annotated[Session, Depends(get_db)]
# dependency end

# signup

@router.post('/',status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency,
                      userrequest: schemas.UsersRequest):
     create_user_model = models.Users(
          email = userrequest.email,
          username = userrequest.username,
          firstname = userrequest.firstname,
          lastname = userrequest.lastname,
          role = userrequest.role,
          hashed_password = Bcrypt_context.hash(userrequest.hashed_password),
          is_active = userrequest.is_active

     )
     db.add(create_user_model)
     db.commit()
     return create_user_model

def authenticate_user(username: str, password: str, db):
    user = db.query(models.Users).filter(models.Users.username == username).first()
    if not user:
        return False
    if not Bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str,user_id: int, role: str,expires_delta: timedelta = timedelta(minutes=10) ):
    encode = {'sub': username, 'id': user_id, 'role': role}
    expires = datetime.utcnow() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode,SECRET_KEY,algorithm=ALGORITHM)

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        user_role: int = payload.get('role')
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate user")
        return {"username": username, "id": user_id, "role": user_role}
    except JWTError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate user")





@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    user = authenticate_user(username=form_data.username, password=form_data.password, db=db)
    if not user:
          raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate user")

    token = create_access_token(username=user.username,user_id=user.id,role=user.role,expires_delta=timedelta(minutes=20))
    return {"access_token": token, "token_type": "bearer"}
