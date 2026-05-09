from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.sale import Sale, SaleCreate, SaleUpdate
from models.product import Product
from database.connection import get_db

router = APIRouter(prefix="/sales", tags=["sales"])

@router.get("/analytics/profit-loss")
def get_profit_loss_data(db: Session = Depends(get_db)):
    """
    Retorna dados de lucro e prejuízo para o gráfico de pizza.
    Calcula o lucro total e prejuízo total (caso haja vendas com lucro negativo).
    """
    sales_data = db.query(Sale).all()
    
    total_profit = 0
    total_loss = 0
    
    for sale in sales_data:
        if sale.lucro > 0:
            total_profit += sale.lucro
        else:
            total_loss += abs(sale.lucro)
    
    return {
        "lucro": round(total_profit, 2),
        "prejuizo": round(total_loss, 2)
    }

@router.get("/analytics/products-by-category")
def get_products_by_category(db: Session = Depends(get_db)):
    """
    Retorna a quantidade de produtos por categoria.
    """
    categories_data = db.query(
        Product.categoria,
        func.count(Product.id).label('quantidade')
    ).group_by(Product.categoria).all()
    
    result = []
    for categoria, quantidade in categories_data:
        result.append({
            "categoria": categoria,
            "quantidade": quantidade
        })
    
    return result

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
