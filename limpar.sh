#!/bin/bash

echo "🧹 Limpando projeto..."

# 🔥 Frontend (Vite / React)
echo "Removendo node_modules..."
rm -rf frontend/node_modules

echo "Removendo build/dist..."
rm -rf frontend/dist

# 🔥 Backend (Python)
echo "Removendo ambiente virtual..."
rm -rf backend/venv

# 🔥 Cache Python
echo "Removendo cache Python..."
find backend -type d -name "__pycache__" -exec rm -r {} +
find backend -type f -name "*.pyc" -delete

# 🔥 Logs
echo "Removendo logs..."
find . -type f -name "*.log" -delete

# 🔥 Arquivos temporários
echo "Removendo arquivos temporários..."
find . -type f -name "*.tmp" -delete

echo "✅ Limpeza concluída!"