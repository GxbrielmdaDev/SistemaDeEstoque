from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database.connection import Base
from datetime import datetime
from pydantic import BaseModel
from models.product import Product
from models.client import Client

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    produto_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    cliente_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    quantidade = Column(Integer, nullable=False)
    valor_total = Column(Float, nullable=False)
    lucro = Column(Float, nullable=False)
    data = Column(DateTime, default=datetime.utcnow)

    produto = relationship(Product)
    cliente = relationship(Client)

class SaleCreate(BaseModel):
    produto_id: int
    cliente_id: int
    quantidade: int
    valor_total: float
    lucro: float

class SaleUpdate(BaseModel):
    quantidade: int | None = None
    valor_total: float | None = None
    lucro: float | None = None