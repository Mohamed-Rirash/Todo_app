from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend import models

# 
from backend.database import engine
from backend.routers  import auth, todos,admin,users


app = FastAPI()
origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


models.Base.metadata.create_all(bind=engine)

# endpoint routers

app.include_router(auth.router)
app.include_router(todos.router)
app.include_router(admin.router)
app.include_router(users.router)



