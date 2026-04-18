from sqlalchemy import Column, Integer, String
from database.connection import Base 
from pydantic import BaseModel

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
    nome: str | None = None
    cpf_cnpj: str | None = None
    cidade: str | None = None
    estado: str | None = None