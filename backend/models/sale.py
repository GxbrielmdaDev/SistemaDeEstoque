from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from datetime import datetime

Base = declarative_base()

class Sale(Base):
    __tablename__ = "sales"
    id = Column(Integer, primary_key=True, index=True)
    produto_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    cliente_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    quantidade = Column(Integer, nullable=False)
    valor_total = Column(Float, nullable=False)
    lucro = Column(Float, nullable=False)
    data = Column(DateTime, default=datetime.utcnow)

    produto = relationship("Product")
    cliente = relationship("Client")

class SaleCreate(BaseModel):
    produto_id: int
    cliente_id: int
    quantidade: int
    valor_total: float
    lucro: float

class SaleUpdate(BaseModel):
    quantidade: int = None
    valor_total: float = None
    lucro: float = None
