# 📊 Documentação dos Gráficos do Dashboard

## Visão Geral

O dashboard do ESTOQUEPIM agora inclui dois gráficos interativos e responsivos que proporcionam uma visualização clara do desempenho do negócio:

1. **Gráfico de Pizza (Lucro vs Prejuízo)**
2. **Gráfico de Barras (Produtos por Categoria)**

---

## 🎨 Gráfico de Lucro vs Prejuízo

### Descrição
Exibe visualmente o desempenho financeiro total do sistema, comparando lucros (em verde) com prejuízos (em vermelho).

### Dados
- **Lucro Total**: Soma de todos os lucros das vendas
- **Prejuízo Total**: Soma do valor absoluto de vendas com lucro negativo

### Características
- 📊 Tipo: Gráfico de Pizza (Pie Chart)
- 🎨 Cores: Verde (#10b981) para lucro, Vermelho (#ef4444) para prejuízo
- 💾 Atualização: Em tempo real ao carregar o dashboard
- ♿ Acessível: Suporta tooltips com valores em R$

### Endpoint da API
```
GET /sales/analytics/profit-loss
```

### Exemplo de Resposta
```json
{
  "lucro": 5230.50,
  "prejuizo": 250.00
}
```

### Casos de Uso
- Identificar rapidamente a saúde financeira da empresa
- Avaliar o impacto de vendas com prejuízo
- Tomar decisões estratégicas com base em dados visuais

---

## 📈 Gráfico de Produtos por Categoria

### Descrição
Exibe a distribuição de produtos cadastrados por categoria, permitindo visualizar facilmente quais categorias têm mais produtos.

### Dados
- **Categoria**: Nome da categoria de produtos
- **Quantidade**: Número total de produtos naquela categoria

### Características
- 📊 Tipo: Gráfico de Barras Horizontal (Horizontal Bar Chart)
- 🎨 Cores: Paleta colorida variada para cada categoria
- 💾 Atualização: Em tempo real ao carregar o dashboard
- ♿ Acessível: Labels claros e valores inteiros

### Endpoint da API
```
GET /sales/analytics/products-by-category
```

### Exemplo de Resposta
```json
[
  {
    "categoria": "Eletrônicos",
    "quantidade": 25
  },
  {
    "categoria": "Acessórios",
    "quantidade": 18
  },
  {
    "categoria": "Peças",
    "quantidade": 42
  }
]
```

### Casos de Uso
- Identificar categorias com maior volume de estoque
- Avaliar a diversidade de produtos por categoria
- Planejar estratégias de reposição por categoria

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18**: Framework para componentes interativos
- **Chart.js**: Biblioteca de gráficos
- **react-chartjs-2**: Wrapper React para Chart.js

### Backend
- **FastAPI**: Framework web Python
- **SQLAlchemy**: ORM para agregação de dados
- **SQLite**: Banco de dados (migrável para PostgreSQL/MySQL)

---

## 💻 Componentes Frontend

### `Charts.jsx`
Componente reutilizável que contém:
- `ProfitLossChart`: Renderiza o gráfico de pizza
- `ProductsByCategoryChart`: Renderiza o gráfico de barras

### `Dashboard.jsx`
Integra os gráficos com:
- Carregamento paralelo de dados
- Estado de loading
- Tratamento de erros
- Responsividade

### Estilos
- `.charts-section`: Container principal dos gráficos
- `.chart-panel`: Painel individual para cada gráfico
- `.chart-container`: Container do gráfico propriamente dito

---

## 📱 Responsividade

Os gráficos são totalmente responsivos e se adaptam a diferentes tamanhos de tela:

- **Desktop (>1024px)**: Dois gráficos lado a lado
- **Tablet (768-1024px)**: Dois gráficos lado a lado com ajustes
- **Mobile (<768px)**: Um gráfico por linha

---

## 🎯 Padrões Reconhecidos

O sistema reconhece e adapta-se aos seguintes padrões:

### 1. Lucro/Prejuízo
- Detecta automaticamente vendas com lucro positivo ou negativo
- Agrega dados corretamente mesmo com múltiplas vendas
- Exibe zero quando não há dados

### 2. Categorias de Produtos
- Agrupa automaticamente produtos por categoria
- Conta o número de produtos em cada categoria
- Suporta qualquer número de categorias
- Ordena alfabeticamente as categorias

### 3. Dados Vazios
- Exibe mensagem amigável quando não há dados
- Trata corretamente divisões por zero
- Mantém a UI consistente mesmo sem dados

---

## 🔄 Fluxo de Dados

```
Dashboard Component
  ├── useEffect (carregamento)
  │   ├── listProducts()
  │   ├── listSales()
  │   ├── listClients()
  │   ├── getProfitLossData()
  │   └── getProductsByCategory()
  │
  ├── ProfitLossChart
  │   └── Renderiza gráfico de pizza
  │
  └── ProductsByCategoryChart
      └── Renderiza gráfico de barras
```

---

## 📊 Cores do Sistema

| Elemento | Cor | Uso |
|----------|-----|-----|
| Lucro | `#10b981` (Verde) | Valores positivos |
| Prejuízo | `#ef4444` (Vermelho) | Valores negativos |
| Grid | `#374151` (Cinza) | Referência visual |
| Texto | `#d0d0d0` (Cinza claro) | Legibilidade |

---

## 🚀 Próximas Melhorias

- [ ] Filtro por período de tempo
- [ ] Exportação de gráficos em PDF
- [ ] Comparativo com período anterior
- [ ] Gráficos de tendências
- [ ] Alertas automáticos baseados em métricas

---

## 📞 Suporte

Para dúvidas ou sugestões sobre os gráficos, consulte a documentação completa da API em `docs/API.md`.
