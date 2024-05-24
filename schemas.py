from pydantic import BaseModel, Field
from datetime import date

class ConferenceCreate(BaseModel):
    pass

class ConferenceResponse(BaseModel):
    pass

class UserBase(BaseModel):
    email: str
    name: str
    login: str
    role: str

class UserLogin(BaseModel):
    login: str
    password: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
