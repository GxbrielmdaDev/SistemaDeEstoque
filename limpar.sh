#!/bin/bash

echo "🧹 Limpando projeto..."

echo "Removendo node_modules..."
rm -rf frontend/node_modules

echo "Removendo build/dist..."
rm -rf frontend/dist

echo "Removendo ambiente virtual..."
rm -rf backend/venv
rm -rf backend/estoque.db

echo "Removendo cache Python..."
find backend -type d -name "__pycache__" -exec rm -r {} +
find backend -type f -name "*.pyc" -delete

echo "Removendo logs..."
find . -type f -name "*.log" -delete

echo "Removendo arquivos temporários..."
find . -type f -name "*.tmp" -delete

echo "Removendo Bin/Obj do C#..."
rm -rf relatorio-service/bin
rm -rf relatorio-service/obj

echo "✅ Limpeza concluída!"