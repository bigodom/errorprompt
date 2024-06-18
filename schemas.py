from pydantic import BaseModel, Field
from datetime import date

class ConferenceCreate(BaseModel):
    loja: int
    id_checagem: int
    setor: str
    data_ocorrencia_erro: date
    codigo_do_item: int
    id_motivo: int
    quantidade: float
    valor: float
    resposavel_pelo_erro: str

class ConferenceResponse(BaseModel):
    id: int
    loja: int
    id_checagem: int
    setor: str
    data_ocorrencia_erro: date
    codigo_do_item: int
    id_motivo: int
    quantidade: float
    valor: float
    resposavel_pelo_erro: str

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
