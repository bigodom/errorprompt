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
    loja = Column(Integer)
    checagem = Column(String)
    setor = Column(String)
    data_ocorrencia_erro = Column(Date)
    data_correcao_erro = Column(Date, default='1999-01-01')
    data_cadastro_erro = Column(Date, default=datetime.now)
    codigo_do_item = Column(Integer)
    motivo = Column(String)
    quantidade = Column(Float)
    valor = Column(Float)
    obs1 = Column(String, default='')
    obs2 = Column(String, default='')
    obs_correcao = Column(String, default='')
    responsavel_pelo_erro = Column(String)
    usuario_lancamento_erro = Column(String, default='') #quem errou, quem ta lançando erro, obs, valor