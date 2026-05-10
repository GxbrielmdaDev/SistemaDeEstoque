import { useEffect, useState } from 'react'
import { listClients, createClient, updateClient, deleteClient } from '../services/api'

const emptyForm = {
  nome: '',
  cpf_cnpj: '',
  cidade: '',
  estado: '',
}

export default function Clients() {
  const [clients, setClients] = useState([])
  const [formValues, setFormValues] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      setClients(await listClients())
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (editingId) {
        await updateClient(editingId, formValues)
        setSuccess('Cliente atualizado com sucesso.')
      } else {
        await createClient(formValues)
        setSuccess('Cliente cadastrado com sucesso.')
      }
      setFormValues(emptyForm)
      setEditingId(null)
      loadClients()
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (client) => {
    setEditingId(client.id)
    setFormValues({
      nome: client.nome,
      cpf_cnpj: client.cpf_cnpj,
      cidade: client.cidade,
      estado: client.estado,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este cliente?')) return
    try {
      await deleteClient(id)
      loadClients()
      setSuccess('Cliente excluído com sucesso.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>
            Controle de clientes e histórico de cadastros.
          </p>
        </div>
      </div>

      <div className="panel">
        <h2>{editingId ? 'Editar cliente' : 'Novo cliente'}</h2>
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
            CPF/CNPJ
            <input
              type="text"
              value={formValues.cpf_cnpj}
              onChange={(e) => setFormValues({ ...formValues, cpf_cnpj: e.target.value })}
              required
            />
          </label>
          <label>
            Cidade
            <input
              type="text"
              value={formValues.cidade}
              onChange={(e) => setFormValues({ ...formValues, cidade: e.target.value })}
              required
            />
          </label>
          <label>
            Estado
            <input
              type="text"
              value={formValues.estado}
              onChange={(e) => setFormValues({ ...formValues, estado: e.target.value })}
              required
            />
          </label>
          <button type="submit" className="primary-button">
            {editingId ? 'Salvar alterações' : 'Cadastrar cliente'}
          </button>
        </form>
        {(error || success) && (
          <div className="alert" style={{ color: success ? 'var(--success-color)' : '', backgroundColor: success ? 'rgba(255, 110, 107, 0.1)' : '', padding: success ? '12px' : '0', borderRadius: success ? '8px' : '0' }}>
            <span style={{ color: success ? 'var(--success-text)' : '' }}>{error || success}</span>
          </div>
        )}
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Lista de clientes</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF/CNPJ</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.nome}</td>
                  <td>{client.cpf_cnpj}</td>
                  <td>{client.cidade}</td>
                  <td>{client.estado}</td>
                  <td>
                    <button className="secondary-button" onClick={() => startEdit(client)}>
                      Editar
                    </button>
                    <button className="secondary-button" onClick={() => handleDelete(client.id)} style={{ marginLeft: 8 }}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '18px 12px', color: 'var(--text-tertiary)' }}>
                    Nenhum cliente cadastrado.
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
