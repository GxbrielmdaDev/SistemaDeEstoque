import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const data = await login(username, password)
      localStorage.setItem('token', data.access_token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-brand">
          <span />
          <div>
            <strong>Sistema de Estoque</strong>
            <p>Autopeças - Acesso seguro</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Usuário
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin ou funcionario"
              required
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
            />
          </label>
          {error && <div className="alert">{error}</div>}
          <button type="submit" className="primary-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
