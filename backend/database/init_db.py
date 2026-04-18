from database.connection import engine, Base
from models.product import Product
from models.client import Client
from models.sale import Sale

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()