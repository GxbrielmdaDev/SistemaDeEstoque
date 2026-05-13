# 🏗️ ATLAS CONTROL - Arquitetura do Sistema

## Sobre o Projeto

Este projeto consiste em um **sistema completo e moderno de gestão de estoque**, desenvolvido com o objetivo de facilitar o controle eficiente de produtos, clientes e vendas, além de fornecer métricas e insights importantes para tomada de decisão estratégica.

A aplicação possui uma interface moderna, responsiva e intuitiva, permitindo o uso tanto em desktop quanto em dispositivos móveis, com alto desempenho e segurança.

---

## Objetivos

* Manter um perfil único de usuário no sistema
* Gerenciar produtos de forma eficiente
* Controlar estoque em tempo real
* Registrar e acompanhar vendas
* Manter cadastro de clientes
* Exibir métricas e indicadores importantes

---

## 🛠️ Tecnologias Utilizadas

### Backend

* **Python**
* API REST (FastAPI)
* SQLite (banco de dados leve e local)

### 🎨 Frontend

* **React**
* **Vite**
* CSS (ou biblioteca como Tailwind)

### Banco de Dados

* **SQLite**

---

## Estrutura do Projeto

```
EstoquePIM/
│
├── backend/                      # API REST (FastAPI)
│   ├── app.py                    # Aplicação principal
│   ├── requirements.txt          # Dependências Python
│   │
│   ├── database/
│   │   ├── connection.py         # Conexão e configuração do BD
│   │   └── init_db.py            # Inicialização das tabelas
│   │
│   ├── models/
│   │   ├── client.py             # Modelo de Cliente
│   │   ├── product.py            # Modelo de Produto
│   │   └── sale.py               # Modelo de Venda
│   │
│   └── routes/
│       ├── auth.py               # Autenticação
│       ├── clients.py            # Endpoints de clientes
│       ├── products.py           # Endpoints de produtos
│       └── sales.py              # Endpoints de vendas
│
├── frontend/                     # Interface React
│   ├── src/
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── pages/                # Páginas da aplicação
│   │   ├── services/             # Serviços de API
│   │   ├── contexts/             # Contextos React
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── assets/                   # Recursos estáticos
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── relatorio-service/            # Microserviço de Relatórios (.NET/C#)
│   ├── Program.cs
│   ├── appsettings.json
│   ├── Controllers/
│   └── Services/
│
├── docs/                         # Documentação
│   ├── API.md
│   ├── BancoDeDados.md
│   └── GRAFICOS.md
│
├── arquitetura.md
├── iniciar.sh
├── limpar.sh
└── README.md
```

---

## Funcionalidades Principais

### 📊 Dashboard

Página inicial com visão geral completa do sistema:

* **Métricas Principais (KPIs)**
  * Total de produtos cadastrados
  * Quantidade total em estoque
  * Total de vendas do período
  * Lucro bruto e líquido
  * Margem de lucro

* **Visualizações**
  * Gráficos de desempenho (vendas por período)
  * Gráficos de estoque por categoria
  * Alertas de produtos com baixo estoque
  * Produtos mais vendidos

---

### 📦 Produtos

Gerenciamento completo do catálogo de produtos:

**Campos do Cadastro:**

* Nome do produto
* Categoria
* SKU/Código
* Quantidade em estoque
* Preço de custo
* Preço de venda
* Margem de lucro (automática)
* Descrição
* Data de cadastro

**Funcionalidades:**

* ✅ Criar/Cadastrar novo produto
* ✅ Editar informações
* ✅ Deletar produto
* ✅ Listagem com paginação
* ✅ Filtros por categoria
* ✅ Busca por nome/código
* ✅ Controle de entrada e saída de estoque

---

### � Clientes

Cadastro e gestão centralizada de clientes:

**Campos:**

* Nome completo / Razão Social
* Tipo (PF - Pessoa Física / PJ - Pessoa Jurídica)
* CPF/CNPJ
* Email
* Telefone
* Cidade
* Estado
* Endereço
* Data de cadastro

**Funcionalidades:**

* ✅ Criar cliente
* ✅ Editar informações
* ✅ Remover cliente
* ✅ Listagem com filtros
* ✅ Busca por nome/CPF
* ✅ Histórico de compras
* ✅ Relatório de clientes

---

### 💰 Vendas

Sistema completo de controle e análise de vendas:

**Informações da Venda:**

* Cliente
* Produtos (itens, quantidades, preços)
* Valor total
* Descontos aplicados
* Lucro obtido
* Data e hora
* Forma de pagamento

**Funcionalidades:**

* ✅ Registrar nova venda
* ✅ Visualizar histórico de vendas
* ✅ Calcular automático de totais
* ✅ Gerar comprovante/recibo
* ✅ Relatórios financeiros
* ✅ Análise por período
* ✅ Filtros e busca avançada

---

## 🎨 Design e UX

### Paleta de Cores

* 🔴 **Primária**: Vermelho (#DC2626) - Ação principal, atenção
* ⚪ **Secundária**: Branco (#FFFFFF) - Fundo, clareza
* ⚫ **Texto**: Cinza Escuro (#1F2937) - Legibilidade
* 🟢 **Sucesso**: Verde (#10B981) - Confirmação
* 🟠 **Aviso**: Laranja (#F59E0B) - Atenção
* 🔴 **Erro**: Vermelho Escuro (#EF4444) - Erro

### Estilo Visual

* **Abordagem**: Clean e moderno
* **Interface**: Intuitiva e amigável
* **Layout**: Organizado em módulos
* **Tipografia**: Legível e profissional
* **Ícones**: Universais e reconhecíveis

### Responsividade

* ✅ **Desktop** (1920px+) - Experiência completa
* ✅ **Tablet** (768px - 1023px) - Interface adaptada
* ✅ **Mobile** (320px - 767px) - Touch-friendly

---

## 🔌 API REST (Endpoints)

### Autenticação

```http
POST   /auth/login            # Login do usuário
POST   /auth/logout           # Logout
POST   /auth/register         # Registrar novo usuário
GET    /auth/me               # Dados do usuário autenticado
```

### Produtos

```http
GET    /products              # Listar todos os produtos
GET    /products/:id          # Detalhes de um produto
POST   /products              # Criar novo produto
PUT    /products/:id          # Atualizar produto
DELETE /products/:id          # Deletar produto
GET    /products/category/:cat # Filtrar por categoria
```

### Clientes

```http
GET    /clients               # Listar todos os clientes
GET    /clients/:id           # Detalhes de um cliente
POST   /clients               # Criar novo cliente
PUT    /clients/:id           # Atualizar cliente
DELETE /clients/:id           # Deletar cliente
GET    /clients/:id/sales     # Histórico de vendas do cliente
```

### Vendas

```http
GET    /sales                 # Listar todas as vendas
GET    /sales/:id             # Detalhes de uma venda
POST   /sales                 # Registrar nova venda
GET    /sales/report/period   # Relatório por período
GET    /sales/report/summary  # Resumo financeiro
```

---

## 🏗️ Arquitetura do Sistema

### Padrão de Arquitetura

O projeto utiliza uma **arquitetura em camadas (Layered Architecture)** com separação clara de responsabilidades:

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│      Interface com usuário (UI/UX)      │
└────────────────┬────────────────────────┘
                 │ HTTP/JSON
┌────────────────▼────────────────────────┐
│      API REST (FastAPI + Python)        │
│  Roteamento, Validação, Autenticação    │
├─────────────────────────────────────────┤
│      Camada de Negócios (Services)      │
│  Lógica de regras do negócio            │
├─────────────────────────────────────────┤
│      Camada de Dados (Models/ORM)       │
│  SQLAlchemy, Pydantic, Validações       │
├─────────────────────────────────────────┤
│        Banco de Dados (SQLite)          │
│  Persistência de dados                  │
└─────────────────────────────────────────┘
```

### Fluxo de Requisição

```
1. Usuário interage com interface (React)
   ↓
2. Frontend faz requisição HTTP/JSON
   ↓
3. FastAPI recebe e valida a requisição
   ↓
4. Router encaminha para o endpoint correto
   ↓
5. Lógica de negócio é executada
   ↓
6. Dados são persistidos/recuperados (SQLAlchemy)
   ↓
7. Resposta é formatada (Pydantic)
   ↓
8. JSON é enviado de volta ao frontend
   ↓
9. Interface atualiza com os dados
```

---

## 🗄️ Banco de Dados

### Tabelas Principais

#### Users (Usuários)
- id (PK)
- username
- email
- password_hash
- created_at

#### Products (Produtos)
- id (PK)
- name
- category
- quantity
- cost_price
- selling_price
- created_at

#### Clients (Clientes)
- id (PK)
- name
- type (PF/PJ)
- cpf_cnpj
- email
- phone
- city
- state
- created_at

#### Sales (Vendas)
- id (PK)
- client_id (FK)
- total_value
- profit
- created_at

#### SaleItems (Itens da Venda)
- id (PK)
- sale_id (FK)
- product_id (FK)
- quantity
- unit_price
- subtotal

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.8+** - Linguagem principal
- **FastAPI** - Framework web
- **SQLAlchemy** - ORM
- **Pydantic** - Validação
- **SQLite** - Banco de dados

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **React Router** - Roteamento
- **Chart.js** - Gráficos
- **CSS3** - Estilos

### DevOps
- **Git** - Controle de versão
- **npm/yarn** - Gerenciador frontend
- **pip** - Gerenciador Python

---

---

## 🗃️ Modelo de Banco de Dados

### Tabela: Produtos

* id
* nome
* categoria
* quantidade
* valor_venda
* valor_compra
* descricao

### Tabela: Clientes

* id
* nome
* cpf_cnpj
* cidade
* estado

### Tabela: Vendas

* id
* produto_id
* cliente_id
* quantidade
* valor_total
* lucro
* data

---