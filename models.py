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
    id_checagem = Column(Integer)
    setor = Column(String)
    data_ocorrencia_erro = Column(Date)
    data_correcao_erro = Column(Date)
    data_cadastro_erro = Column(Date, default=datetime.now)
    codigo_do_item = Column(Integer)
    codigo_de_barras = Column(Integer)
    id_motivo = Column(Integer)
    quantidade = Column(Float)
    valor = Column(Float)
    obs = Column(String)
    responsavel_pelo_erro = Column(String)
    usuario_lancamento_erro = Column(String) #quem errou, quem ta lançando erro, obs, valor