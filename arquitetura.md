# Sistema de Gestão de Estoque para Autopeças

## Sobre o Projeto

Este projeto consiste em um sistema completo de **gestão de estoque para autopeças**, desenvolvido com o objetivo de facilitar o controle de produtos, clientes e vendas, além de fornecer métricas importantes para tomada de decisão.

A aplicação possui uma interface moderna, responsiva e intuitiva, permitindo o uso tanto em desktop quanto em dispositivos móveis.

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

## strutura do Projeto

```
autopecas-estoque/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── models/
│   ├── database/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── main.jsx
│
└── README.md
```

---

## Funcionalidades

### Dashboard

Página inicial com visão geral do sistema:

* Total de produtos cadastrados
* Quantidade em estoque
* Total de vendas
* Lucro total
* Gráficos de desempenho (vendas, estoque, etc.)

---

### Produtos

Gerenciamento completo de produtos:

**Campos do cadastro:**

* Nome
* Categoria
* Quantidade em estoque
* Valor de venda
* Valor de compra/produção
* Descrição

**Funcionalidades:**

* Criar produto
* Editar produto
* Deletar produto
* Listagem com filtros

---

### 👤 Clientes

Cadastro e gestão de clientes:

**Campos:**

* Nome
* CPF/CNPJ
* Cidade
* Estado

**Funcionalidades:**

* Criar cliente
* Editar cliente
* Remover cliente
* Listagem

---

### 💰 Vendas

Controle e análise de vendas:

**Informações:**

* Itens vendidos
* Valor total das vendas
* Lucro obtido
* Histórico de vendas

**Funcionalidades:**

* Registrar venda
* Visualizar histórico
* Relatórios financeiros

---

## 🎨 Design e UX

* Paleta de cores:

  * 🔴 Vermelho
  * ⚪ Branco

* Estilo:

  * Clean e moderno
  * Interface intuitiva
  * Layout organizado

* Responsividade:

  * Desktop
  * Tablet
  * Mobile

---

## 🔌 API (Endpoints) 


### Produtos

```
GET    /products
POST   /products
PUT    /products/:id
DELETE /products/:id
```

### Clientes

```
GET    /clients
POST   /clients
PUT    /clients/:id
DELETE /clients/:id
```

### Vendas

```
GET    /sales
POST   /sales
```

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