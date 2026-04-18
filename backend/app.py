from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import products, clients, sales
from database.connection import Base, engine
import models

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(clients.router)
app.include_router(sales.router)

@app.get("/")
def root():
    return {"message": "API iniciada com sucesso!"}