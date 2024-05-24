from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    login = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)

class Conference(Base):
    __tablename__ = 'conference'

    id = Column(Integer, primary_key=True, index=True, autoincrement='auto')
    store = Column(String)
    id_check = Column(Integer)
    sector = Column(String)
    date = Column(Date, default=datetime.now)
    item_code = Column(Integer)
    ticket = Column(String)
    id_reason = Column(Integer)
    quantity = Column(Float)
    value = Column(Float)
    obs = Column(String)
    responsabel = Column(String)
    login_user = Column(String)