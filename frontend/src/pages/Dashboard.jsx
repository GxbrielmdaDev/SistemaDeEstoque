import { useEffect, useState } from 'react'
import { listProducts, listSales, listClients } from '../services/api'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [clients, setClients] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, salesData, clientsData] = await Promise.all([
          listProducts(),
          listSales(),
          listClients(),
        ])
        setProducts(productsData)
        setSales(salesData)
        setClients(clientsData)
      } catch (err) {
        setError(err.message)
      }
    }
    loadData()
  }, [])

  const totalStock = products.reduce((sum, product) => sum + Number(product.quantidade || 0), 0)
  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.valor_total || 0), 0)
  const totalProfit = sales.reduce((sum, sale) => sum + Number(sale.lucro || 0), 0)

  return (
    <div>
      <div className="header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p style={{ color: '#b9b9b9', margin: '6px 0 0' }}>
            Visão geral do estoque e vendas.
          </p>
        </div>
      </div>

      <div className="card-grid">
        <div className="stat-card">
          <p className="stat-title">Produtos cadastrados</p>
          <p className="stat-value">{products.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-title">Quantidade em estoque</p>
          <p className="stat-value">{totalStock}</p>
        </div>
        <div className="stat-card">
          <p className="stat-title">Vendas realizadas</p>
          <p className="stat-value">{sales.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-title">Lucro total</p>
          <p className="stat-value">R$ {totalProfit.toFixed(2)}</p>
        </div>
      </div>

      <div className="panel">
        <h2>Resumo de operações</h2>
        <p style={{ color: '#d0d0d0', marginBottom: 18 }}>
          Acompanhe o inventário, vendas e clientes cadastrados no mesmo lugar.
        </p>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total de clientes</span>
            <span>{clients.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Receita total</span>
            <strong>R$ {totalRevenue.toFixed(2)}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Média de lucro por venda</span>
            <strong>
              R$ {sales.length ? (totalProfit / sales.length).toFixed(2) : '0.00'}
            </strong>
          </div>
        </div>
      </div>
      {error && <div className="alert">{error}</div>}
    </div>
  )
}
