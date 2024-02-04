from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


SQLALCHEMY_DATABASE_URL = "postgresql://tododb_5em2_user:iUf4CoM1gfKQHSL0RxL16qp60kA8noVk@dpg-cmvn86acn0vc73aprdig-a.oregon-postgres.render.com/tododb_5em2"


engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit= False, autoflush = False, bind = engine)

Base = declarative_base()
