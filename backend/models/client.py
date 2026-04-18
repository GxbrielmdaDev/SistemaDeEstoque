from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    cpf_cnpj = Column(String, nullable=False)
    cidade = Column(String, nullable=False)
    estado = Column(String, nullable=False)

class ClientCreate(BaseModel):
    nome: str
    cpf_cnpj: str
    cidade: str
    estado: str

class ClientUpdate(BaseModel):
    nome: str = None
    cpf_cnpj: str = None
    cidade: str = None
    estado: str = None
