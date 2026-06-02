import { useEffect, useState } from 'react'
import { listProducts, createProduct, updateProduct, deleteProduct, getCategories } from '../services/api'
import { useTheme } from '../contexts/ThemeContext'
import CategoryAutocomplete from '../components/CategoryAutocomplete'

const emptyForm = {
  nome: '',
  categoria: '',
  quantidade: '',
  valor_venda: '',
  valor_compra: '',
  descricao: '',
}

export default function Products() {
  const { isDark } = useTheme()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [formValues, setFormValues] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    try {
      setProducts(await listProducts())
    } catch (err) {
      setError(err.message)
    }
  }

  const loadCategories = async () => {
    try {
      const cats = await getCategories()
      setCategories(cats)
    } catch (err) {
      // Se houver erro, apenas iniciar com array vazio
      console.warn('Erro ao carregar categorias:', err.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    const createdData = {
      ...formValues,
      quantidade: Number(formValues.quantidade),
      valor_venda: Number(formValues.valor_venda),
      valor_compra: Number(formValues.valor_compra),
    }
    try {
      if (editingId) {
        await updateProduct(editingId, createdData)
        setSuccess('Produto editado com sucesso.')
      } else {
        await createProduct(createdData)
        setSuccess('Produto cadastrado com sucesso.')
      }
      setFormValues(emptyForm)
      setEditingId(null)
      loadProducts()
      loadCategories()
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (product) => {
    setEditingId(product.id)
    setFormValues({
      nome: product.nome,
      categoria: product.categoria,
      quantidade: product.quantidade,
      valor_venda: product.valor_venda,
      valor_compra: product.valor_compra,
      descricao: product.descricao || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este produto?')) return
    try {
      await deleteProduct(id)
      loadProducts()
      loadCategories()
      setSuccess('Produto excluído com sucesso.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1 className="page-title">Produtos</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>
            Cadastro e gerenciamento de peças no estoque.
          </p>
        </div>
      </div>

      <div className="panel">
        <h2>{editingId ? 'Editar produto' : 'Novo produto'}</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Nome
            <input
              type="text"
              value={formValues.nome}
              onChange={(e) => setFormValues({ ...formValues, nome: e.target.value })}
              required
            />
          </label>
          <label>
            Categoria
            <CategoryAutocomplete
              value={formValues.categoria}
              onChange={(newCategory) => setFormValues({ ...formValues, categoria: newCategory })}
              categories={categories}
            />
          </label>
          <label>
            Quantidade
            <input
              type="number"
              value={formValues.quantidade}
              onChange={(e) => setFormValues({ ...formValues, quantidade: e.target.value })}
              required
            />
          </label>
          <label>
            Valor de venda
            <input
              type="number"
              step="0.01"
              value={formValues.valor_venda}
              onChange={(e) => setFormValues({ ...formValues, valor_venda: e.target.value })}
              required
            />
          </label>
          <label>
            Valor de compra
            <input
              type="number"
              step="0.01"
              value={formValues.valor_compra}
              onChange={(e) => setFormValues({ ...formValues, valor_compra: e.target.value })}
              required
            />
          </label>
          <label style={{ gridColumn: '1 / -1' }}>
            Descrição
            <textarea
              rows="3"
              value={formValues.descricao}
              onChange={(e) => setFormValues({ ...formValues, descricao: e.target.value })}
            />
          </label>
          <button type="submit" className="primary-button">
            {editingId ? 'Salvar alterações' : 'Cadastrar produto'}
          </button>
        </form>
        {(error || success) && (
          <div className="alert" style={{ color: success ? 'var(--success-color)' : '', backgroundColor: success ? (isDark ? 'rgba(255, 110, 107, 0.1)' : 'rgba(37, 99, 235, 0.1)') : '', padding: success ? '12px' : '0', borderRadius: success ? '8px' : '0' }}>
            <span style={{ color: success ? 'var(--success-text)' : '' }}>{error || success}</span>
          </div>
        )}
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Lista de produtos</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Qnt</th>
                <th>Valor venda</th>
                <th>Valor compra</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nome}</td>
                  <td>{product.categoria}</td>
                  <td>{product.quantidade}</td>
                  <td>R$ {Number(product.valor_venda).toFixed(2)}</td>
                  <td>R$ {Number(product.valor_compra).toFixed(2)}</td>
                  <td>
                    <button className="secondary-button" onClick={() => startEdit(product)}>
                      Editar
                    </button>
                    <button className="secondary-button" onClick={() => handleDelete(product.id)} style={{ marginLeft: 8 }}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '18px 12px', color: 'var(--text-tertiary)' }}>
                    Nenhum produto cadastrado.
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
