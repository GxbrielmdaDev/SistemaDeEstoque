# Documentação do Banco de Dados - Python com SQLite

Banco de dados relacional utilizando **SQLite** com **SQLAlchemy ORM** para gerenciamento de estoque, clientes e vendas.

---

## Índice

- [👁️ Visão Geral](#-visão-geral)
- [🗺️ Modelo Entidade-Relacionamento](#-modelo-entidade-relacionamento)
- [📊 Tabelas](#-tabelas)
- [🔗 Relacionamentos](#-relacionamentos)
- [📈 Índices](#-índices)
- [⚡ Triggers e Constraints](#-triggers-e-constraints)
- [💾 Backup e Migração](#-backup-e-migração)
- [📊 Consultas Úteis](#-consultas-úteis)
- [🔒 Segurança](#-segurança)

---

## 👁️ Visão Geral

- **SGBD:** SQLite 3  
- **ORM:** SQLAlchemy  
- **Localização:** `backend/estoque.db`  
- **Versão do Schema:** 1.0  

### Características

- Banco relacional leve e eficiente  
- Suporte a transações ACID  
- Uso de chaves estrangeiras  
- Índices para otimização de consultas  

---

## Modelo Entidade-Relacionamento

```

CLIENTES ────< VENDAS ────< ITENS_VENDA >──── PRODUTOS

````

---

## 📊 Tabelas

### 👥 Tabela: `clientes`

| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | INTEGER | Identificador único |
| nome | VARCHAR | Nome |
| cpf_cnpj | VARCHAR | Documento |
| cidade | VARCHAR | Cidade |
| estado | VARCHAR | Estado |
| created_at | DATETIME | Data de cadastro |

---

### 📦 Tabela: `produtos`

| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | INTEGER | Identificador único |
| nome | VARCHAR | Nome do produto |
| categoria | VARCHAR | Categoria |
| quantidade | INTEGER | Estoque |
| valor_venda | DECIMAL | Preço de venda |
| valor_compra | DECIMAL | Preço de custo |
| descricao | TEXT | Descrição |
| created_at | DATETIME | Criação |
| updated_at | DATETIME | Atualização |

---

### 💰 Tabela: `vendas`

| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | INTEGER | Identificador único |
| cliente_id | INTEGER | FK cliente |
| data | DATETIME | Data |
| valor_total | DECIMAL | Total |
| lucro_total | DECIMAL | Lucro |

---

### 🧾 Tabela: `itens_venda`

| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | INTEGER | Identificador único |
| venda_id | INTEGER | FK venda |
| produto_id | INTEGER | FK produto |
| quantidade | INTEGER | Quantidade |
| valor_unitario | DECIMAL | Preço unitário |
| subtotal | DECIMAL | Total do item |

---

## Relacionamentos

- **Cliente → Vendas:** 1:N  
- **Venda → Itens:** 1:N  
- **Produto → Itens:** 1:N  

---

## Índices

```sql
CREATE INDEX idx_clientes_nome ON clientes(nome);
CREATE INDEX idx_produtos_nome ON produtos(nome);
CREATE INDEX idx_produtos_categoria ON produtos(categoria);
CREATE INDEX idx_vendas_cliente_id ON vendas(cliente_id);
CREATE INDEX idx_itens_venda_id ON itens_venda(venda_id);
````

---

## ⚡ Triggers e Constraints

### Atualização automática de estoque

```sql
CREATE TRIGGER update_estoque
AFTER INSERT ON itens_venda
BEGIN
    UPDATE produtos
    SET quantidade = quantidade - NEW.quantidade
    WHERE id = NEW.produto_id;
END;
```

---

### Validação de estoque

```sql
CREATE TRIGGER check_estoque
BEFORE INSERT ON itens_venda
BEGIN
    SELECT CASE
        WHEN (SELECT quantidade FROM produtos WHERE id = NEW.produto_id) < NEW.quantidade
        THEN RAISE(ABORT, 'Estoque insuficiente')
    END;
END;
```

---

## Backup e Migração

### Backup

```bash
cp backend/database/estoque.db backup.db
```

---

### Restauração

```bash
sqlite3 estoque.db < backup.sql
```

---

### Migração para PostgreSQL

1. Instalar driver:

```bash
pip install psycopg2-binary
```

2. Alterar variável:

```env
DATABASE_URL=postgresql://user:pass@localhost/estoquepim
```

3. Executar migração

---

## Consultas Úteis

### Produtos com estoque baixo

```sql
SELECT nome, quantidade
FROM produtos
WHERE quantidade < 10;
```

---

### Produtos mais vendidos

```sql
SELECT p.nome, SUM(i.quantidade) as total
FROM itens_venda i
JOIN produtos p ON p.id = i.produto_id
GROUP BY p.id
ORDER BY total DESC
LIMIT 10;
```

---

### Vendas por período

```sql
SELECT DATE(data), SUM(valor_total)
FROM vendas
GROUP BY DATE(data);
```

---
