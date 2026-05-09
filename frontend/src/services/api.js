const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const request = async (path, options = {}) => {
  const headers = {
    ...(options.headers || {}),
  }

  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    // resposta sem JSON
  }

  if (!response.ok) {
    throw new Error(data?.detail || `Erro HTTP ${response.status}`)
  }

  return data
}

// Produtos
export const listProducts = () => request('/products')
export const createProduct = (product) =>
  request('/products', { method: 'POST', body: JSON.stringify(product) })
export const updateProduct = (id, product) =>
  request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) })
export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: 'DELETE' })

// Clientes
export const listClients = () => request('/clients')
export const createClient = (client) =>
  request('/clients', { method: 'POST', body: JSON.stringify(client) })
export const updateClient = (id, client) =>
  request(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(client) })
export const deleteClient = (id) =>
  request(`/clients/${id}`, { method: 'DELETE' })

// Vendas
export const listSales = () => request('/sales')
export const createSale = (sale) =>
  request('/sales', { method: 'POST', body: JSON.stringify(sale) })

// Analytics
export const getProfitLossData = () => request('/sales/analytics/profit-loss')
export const getProductsByCategory = () => request('/sales/analytics/products-by-category')