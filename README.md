# ATLAS CONTROL - Sistema de Gestão de Estoque

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema completo de gestão de estoque desenvolvido para otimizar o controle de produtos, clientes e vendas, proporcionando métricas e insights valiosos para tomada de decisões estratégicas.

---

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🚀 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#-tecnologias)
- [📦 Pré-requisitos](#-pré-requisitos)
- [🔧 Instalação e Configuração](#-instalação-e-configuração)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [📖 Documentação](#-documentação)
- [🎨 Design e UX](#-design-e-ux)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)
- [📞 Contato](#-contato)

---

## 🎯 Sobre o Projeto

O **ATLAS CONTROL** é uma solução moderna e intuitiva para gerenciamento de estoque, com foco em **usabilidade, performance e escalabilidade**.

A aplicação permite o controle completo do ciclo de vendas, desde o cadastro de produtos até a geração de relatórios financeiros.

### ✨ Destaques

- 🖥️ Interface responsiva e moderna  
- 📊 Dashboard com métricas em tempo real  
- 🔐 Autenticação de usuários  
- 📱 Compatível com dispositivos móveis  
- 🚀 API RESTful rápida e eficiente  
- 💾 Banco SQLite (com fácil migração para PostgreSQL/MySQL)  

---

## 🚀 Funcionalidades

### 📊 Dashboard Gerencial
- KPIs principais (produtos, vendas, lucro)
- Gráficos de desempenho
- Alertas de estoque baixo

### 📦 Gestão de Produtos
- Cadastro com categorias
- Controle de entrada e saída
- Cálculo automático de lucro
- Busca e filtros avançados

### 👥 Controle de Clientes
- Cadastro PF e PJ
- Histórico de compras
- Informações de contato

### 💰 Registro de Vendas
- Processo simplificado
- Cálculo automático
- Geração de comprovantes
- Relatórios financeiros

---

## 🛠️ Tecnologias

### 🔙 Backend
- Python 3.8+
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### 🎨 Frontend
- React 18
- Vite
- CSS3
- Axios

### ⚙️ Ferramentas
- Git
- npm / yarn

---

## 📦 Pré-requisitos

- Python 3.8+
- Node.js 16+
- npm ou yarn
- Git

---

## 🔧 Instalação e Configuração

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/estoquepim.git
cd estoquepim
````

---

### 2️⃣ Backend

```bash
cd backend

python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt

python database/init_db.py

python app.py
```

📍 Backend: [http://localhost:8000](http://localhost:8000)

---

### 3️⃣ Frontend

```bash
cd frontend

npm install
npm run dev
```

📍 Frontend: [http://localhost:5173](http://localhost:5173)

---

### 4️⃣ Scripts úteis

```bash
# Rodar tudo
./iniciar.sh

# Limpar projeto
./limpar.sh
```

---

## 📁 Estrutura do Projeto

```bash
ESTOQUEPIM/
│
├── backend/
│   ├── database/
│   │   ├── connection.py
│   │   └── init_db.py
│   │
│   ├── models/
│   │   ├── client.py
│   │   ├── product.py
│   │   └── sale.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── clients.py
│   │   ├── products.py
│   │   ├── sales.py
│   │   └── app.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docs/
├── arquitetura.md
├── iniciar.sh
├── limpar.sh
└── README.md
```

---

## 📖 Documentação

* 📌 Documentação da API
* 📌 Documentação do Banco de Dados
* 📌 Arquitetura do Sistema

---

## 🎨 Design e UX

### 🎨 Paleta de cores

* 🔴 Primária: `#DC2626`
* ⚪ Secundária: `#FFFFFF`
* ⚫ Texto: `#1F2937`

### 📐 Princípios

* Minimalista
* Responsivo
* Acessível
* Consistente

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit

```bash
git commit -m "Add AmazingFeature"
```

4. Push

```bash
git push origin feature/AmazingFeature
```

5. Abra um Pull Request

---

## 📄 Licença

Distribuído sob licença MIT. Veja `LICENSE` para mais informações.


---
