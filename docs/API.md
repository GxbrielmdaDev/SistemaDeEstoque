
# Documentação da API - Python com FastAPI

API RESTful desenvolvida com FastAPI para gerenciamento de estoque, clientes e vendas.

- **Base URL:** `http://localhost:8000`
- **Versão:** 1.0.0
- **Formato:** JSON

---

## Índice

- [🔐 Autenticação](#-autenticação)
- [📦 Produtos](#-produtos)
- [👥 Clientes](#-clientes)
- [💰 Vendas](#-vendas)
- [📊 Códigos de Status](#-códigos-de-status-http)
- [⚠️ Erros](#-erros)
- [⚙️ Configurações](#-configurações)

---

## 📦 Produtos

### ➤ Listar Categorias

**GET** `/products/categories/list`

**Resposta:**
```json
[
  "Eletrônicos",
  "Acessórios",
  "Peças",
  "Manutenção"
]
```

**Descrição:** Retorna todas as categorias de produtos já cadastradas no sistema. Utilizado no autocomplete do formulário de produtos.

---

### ➤ Listar Produtos

**GET** `/products`

**Query Parameters:**

* `skip` (int, opcional)
* `limit` (int, opcional)
* `categoria` (string, opcional)

---

### ➤ Buscar Produto por ID

**GET** `/products/{id}`

---

### ➤ Criar Produto

**POST** `/products`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "nome": "Produto",
  "categoria": "Categoria",
  "quantidade": 100,
  "valor_venda": 50.0,
  "valor_compra": 30.0,
  "descricao": "Descrição do produto"
}
```

---

### ➤ Atualizar Produto

**PUT** `/products/{id}`

---

### ➤ Deletar Produto

**DELETE** `/products/{id}`

---

## 👥 Clientes

### ➤ Listar Clientes

**GET** `/clients`

---

### ➤ Buscar Cliente por ID

**GET** `/clients/{id}`

---

### ➤ Criar Cliente

**POST** `/clients`

**Request Body:**

```json
{
  "nome": "Cliente",
  "cpf_cnpj": "000.000.000-00",
  "cidade": "Cidade",
  "estado": "SP"
}
```

---

### ➤ Atualizar Cliente

**PUT** `/clients/{id}`

---

### ➤ Deletar Cliente

**DELETE** `/clients/{id}`

---

## 💰 Vendas

### ➤ Listar Vendas

**GET** `/sales`

---

### ➤ Criar Venda

**POST** `/sales`

**Body:**
```json
{
  "produto_id": 1,
  "cliente_id": 1,
  "quantidade": 5,
  "valor_total": 150.00,
  "lucro": 50.00
}
```

---

### ➤ Análise de Lucro e Prejuízo

**GET** `/sales/analytics/profit-loss`

**Resposta:**
```json
{
  "lucro": 5000.00,
  "prejuizo": 500.00
}
```

**Descrição:** Retorna o total de lucro e prejuízo das vendas realizadas. Utilizado para o gráfico de pizza no dashboard.

---

### ➤ Produtos por Categoria

**GET** `/sales/analytics/products-by-category`

**Resposta:**
```json
[
  {
    "categoria": "Eletrônicos",
    "quantidade": 15
  },
  {
    "categoria": "Acessórios",
    "quantidade": 8
  }
]
```

**Descrição:** Retorna a quantidade de produtos cadastrados por categoria. Utilizado para o gráfico de barras no dashboard.

---

### ➤ Registrar Venda

**POST** `/sales`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "cliente_id": 1,
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2
    }
  ]
}
```

---

### ➤ Buscar Venda por ID

**GET** `/sales/{id}`

---

### ➤ Dashboard

**GET** `/sales/dashboard`

Retorna métricas consolidadas do sistema.

---

## Códigos de Status HTTP

| Código | Descrição             |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 204    | No Content            |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 422    | Unprocessable Entity  |
| 500    | Internal Server Error |

---

## Erros

Formato padrão:

```json
{
  "detail": "Mensagem de erro"
}
```

Erro de validação:

```json
{
  "detail": [
    {
      "loc": ["body", "campo"],
      "msg": "erro de validação",
      "type": "validation_error"
    }
  ]
}
```

---

## ⚙️ Configurações

Variáveis de ambiente:

```env
DATABASE_URL=sqlite:///estoque.db
SECRET_KEY=sua_chave_secreta
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
