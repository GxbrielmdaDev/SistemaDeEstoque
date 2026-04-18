from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    categoria = Column(String, nullable=False)
    quantidade = Column(Integer, nullable=False)
    valor_venda = Column(Float, nullable=False)
    valor_compra = Column(Float, nullable=False)
    descricao = Column(String, nullable=True)

class ProductCreate(BaseModel):
    nome: str
    categoria: str
    quantidade: int
    valor_venda: float
    valor_compra: float
    descricao: str = None

class ProductUpdate(BaseModel):
    nome: str = None
    categoria: str = None
    quantidade: int = None
    valor_venda: float = None
    valor_compra: float = None
    descricao: str = None
