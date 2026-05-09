from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, distinct
from models.product import Product, ProductCreate, ProductUpdate
from database.connection import get_db

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/categories/list")
def get_categories(db: Session = Depends(get_db)):
    """
    Retorna todas as categorias de produtos já cadastradas.
    """
    categories = db.query(distinct(Product.categoria)).filter(
        Product.categoria.isnot(None),
        Product.categoria != ''
    ).order_by(Product.categoria).all()
    
    return [cat[0] for cat in categories]

@router.get("/")
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.post("/")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}")
def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    for key, value in product.dict(exclude_unset=True).items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db.delete(db_product)
    db.commit()
    return {"ok": True}
