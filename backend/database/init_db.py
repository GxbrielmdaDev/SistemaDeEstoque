from models.product import Base as ProductBase
from models.client import Base as ClientBase
from models.sale import Base as SaleBase
from database.connection import engine

ProductBase.metadata.create_all(bind=engine)
ClientBase.metadata.create_all(bind=engine)
SaleBase.metadata.create_all(bind=engine)
