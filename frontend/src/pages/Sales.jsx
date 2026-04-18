import { useEffect, useState } from 'react'
import { listSales, createSale, listProducts, listClients } from '../services/api'

const emptyForm = {
  produto_id: '',
  cliente_id: '',
  quantidade: 1,
}

export default function Sales() {
  const [sales, setSales] = useState([])
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [formValues, setFormValues] = useState(emptyForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [salesData, productsData, clientsData] = await Promise.all([
        listSales(),
        listProducts(),
        listClients(),
      ])
      setSales(salesData)
      setProducts(productsData)
      setClients(clientsData)
    } catch (err) {
      setError(err.message)
    }
  }

  const selectedProduct = products.find((product) => product.id === Number(formValues.produto_id))
  const valorVenda = selectedProduct ? Number(selectedProduct.valor_venda) : 0
  const valorCompra = selectedProduct ? Number(selectedProduct.valor_compra) : 0
  const valorTotal = valorVenda * Number(formValues.quantidade || 0)
  const lucro = (valorVenda - valorCompra) * Number(formValues.quantidade || 0)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formValues.produto_id || !formValues.cliente_id) {
      setError('Escolha produto e cliente')
      return
    }
    try {
      await createSale({
        produto_id: Number(formValues.produto_id),
        cliente_id: Number(formValues.cliente_id),
        quantidade: Number(formValues.quantidade),
        valor_total: Number(valorTotal),
        lucro: Number(lucro),
      })
      setSuccess('Venda registrada com sucesso.')
      setFormValues(emptyForm)
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1 className="page-title">Vendas</h1>
          <p style={{ color: '#b9b9b9', marginTop: 6 }}>
            Registro de vendas e histórico financeiro.
          </p>
        </div>
      </div>

      <div className="panel">
        <h2>Registrar nova venda</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Produto
            <select
              value={formValues.produto_id}
              onChange={(e) => setFormValues({ ...formValues, produto_id: e.target.value })}
              required
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nome} - {product.categoria}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cliente
            <select
              value={formValues.cliente_id}
              onChange={(e) => setFormValues({ ...formValues, cliente_id: e.target.value })}
              required
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nome}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantidade
            <input
              type="number"
              min="1"
              value={formValues.quantidade}
              onChange={(e) => setFormValues({ ...formValues, quantidade: e.target.value })}
              required
            />
          </label>
          <div style={{ gridColumn: '1 / -1', display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ddd' }}>
              <span>Valor total</span>
              <strong>R$ {valorTotal.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ddd' }}>
              <span>Lucro estimado</span>
              <strong>R$ {lucro.toFixed(2)}</strong>
            </div>
          </div>
          <button type="submit" className="primary-button">
            Registrar venda
          </button>
        </form>
        {(error || success) && (
          <div className="alert" style={{ color: success ? '#8afc98' : '' }}>
            {error || success}
          </div>
        )}
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Histórico de vendas</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Cliente</th>
                <th>Quantidade</th>
                <th>Valor total</th>
                <th>Lucro</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.produto?.nome || sale.produto_id}</td>
                  <td>{sale.cliente?.nome || sale.cliente_id}</td>
                  <td>{sale.quantidade}</td>
                  <td>R$ {Number(sale.valor_total).toFixed(2)}</td>
                  <td>R$ {Number(sale.lucro).toFixed(2)}</td>
                  <td>{new Date(sale.data).toLocaleString('pt-BR')}</td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '18px 12px', color: '#aaa' }}>
                    Nenhuma venda registrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
