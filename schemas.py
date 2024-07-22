from pydantic import BaseModel, Field
from datetime import date

class ConferenceCreate(BaseModel):
    loja: int
    checagem: str
    setor: str
    data_ocorrencia_erro: date
    codigo_do_item: int
    motivo: str
    quantidade: float
    valor: float
    responsavel_pelo_erro: str

class ConferenceResponse(BaseModel):
    id: int
    loja: int
    checagem: str
    setor: str
    data_ocorrencia_erro: date
    data_cadastro_erro: date
    data_correcao_erro: date
    codigo_do_item: int
    motivo: str
    quantidade: float
    valor: float
    obs1: str
    obs2: str
    obs_correcao: str
    responsavel_pelo_erro: str
    usuario_lancamento_erro: str
    
class ConferenceUpdate(BaseModel):
    loja: int
    checagem: str
    setor: str
    data_ocorrencia_erro: date
    data_correcao_erro: date
    codigo_do_item: int
    motivo: str
    quantidade: float
    valor: float
    obs1: str
    obs2: str
    obs_correcao: str
    responsavel_pelo_erro: str
    usuario_lancamento_erro: str

class UserBase(BaseModel):
    email: str
    name: str
    login: str
    role: str
    password: str

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
