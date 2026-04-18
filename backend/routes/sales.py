from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.sale import Sale, SaleCreate, SaleUpdate
from models.product import Product
from database.connection import get_db

router = APIRouter(prefix="/sales", tags=["sales"])

@router.get("/")
def list_sales(db: Session = Depends(get_db)):
    return db.query(Sale).all()

@router.post("/")
def create_sale(sale: SaleCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == sale.produto_id).first()
    if not db_product or db_product.quantidade < sale.quantidade:
        raise HTTPException(status_code=400, detail="Produto não disponível em estoque")
    db_product.quantidade -= sale.quantidade
    db_sale = Sale(**sale.dict())
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale
