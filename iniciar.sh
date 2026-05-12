#!/bin/bash

set -e

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$BASE_DIR/backend"
FRONTEND_DIR="$BASE_DIR/frontend"
RELATORIO_DIR="$BASE_DIR/relatorio-service"

echo "====================================="
echo "🚀 Iniciando projeto"
echo "====================================="


# MATAR PROCESSOS ANTIGOS

echo "🛑 Encerrando processos antigos..."

fuser -k 8000/tcp 2>/dev/null || true
fuser -k 5173/tcp 2>/dev/null || true
fuser -k 5000/tcp 2>/dev/null || true


# BACKEND

cd "$BACKEND_DIR"

echo "📦 Preparando ambiente Python..."

if [ ! -d "venv" ]; then
    echo "Criando venv..."
    python3 -m venv venv
fi

echo "Atualizando pip..."
"$BACKEND_DIR/venv/bin/pip" install --upgrade pip

echo "Instalando dependências backend..."
"$BACKEND_DIR/venv/bin/pip" install fastapi uvicorn sqlalchemy pydantic

echo "🔥 Subindo backend (porta 8000)..."

nohup "$BACKEND_DIR/venv/bin/python" -m uvicorn app:app \
--host 0.0.0.0 --port 8000 \
> "$BACKEND_DIR/backend.log" 2>&1 &

BACKEND_PID=$!

# Espera o backend subir
sleep 2

# Testa se backend respondeu
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Backend iniciado com sucesso!"
else
    echo "❌ Backend não respondeu. Verifique o log:"
    echo "$BACKEND_DIR/backend.log"
fi

# Testa se docs estão disponíveis
if curl -s http://localhost:8000/docs > /dev/null; then
    DOCS_STATUS="✅ disponível"
else
    DOCS_STATUS="⚠️ não respondeu ainda"
fi


# FRONTEND

cd "$FRONTEND_DIR"

echo "📦 Instalando dependências frontend..."
npm install

echo "🔥 Subindo frontend (porta 5173)..."

nohup npm run dev -- --host 0.0.0.0 --port 5173 \
> "$FRONTEND_DIR/frontend.log" 2>&1 &

FRONTEND_PID=$!

cd "$BASE_DIR"

# RELATORIO SERVICE (C#)

echo "📦 Preparando serviço de relatórios..."

if [ -d "$RELATORIO_DIR" ]; then
    cd "$RELATORIO_DIR"
    
    echo "🔥 Subindo serviço de relatórios (porta 5000)..."
    
    nohup dotnet run > "$RELATORIO_DIR/relatorio.log" 2>&1 &
    
    RELATORIO_PID=$!
    
    sleep 2
    
    if curl -s http://localhost:5000 > /dev/null 2>&1; then
        echo "✅ Serviço de relatórios iniciado com sucesso!"
    else
        echo "⚠️ Serviço de relatórios pode estar carregando..."
    fi
fi

cd "$BASE_DIR"

echo "====================================="
echo "✅ Projeto rodando!"
echo "====================================="
echo "Backend:   http://localhost:8000 (PID: $BACKEND_PID)"
echo "📚 Docs:   http://localhost:8000/docs ($DOCS_STATUS)"
echo "Frontend:  http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""
echo "📄 Logs:"
echo "Backend:    $BACKEND_DIR/backend.log"
echo "Frontend:   $FRONTEND_DIR/frontend.log"
if [ -d "$RELATORIO_DIR" ]; then
    echo "Relatórios: $RELATORIO_DIR/relatorio.log"
fi
echo ""
echo "💡 Para acompanhar logs em tempo real:"
echo "tail -f $BACKEND_DIR/backend.log"