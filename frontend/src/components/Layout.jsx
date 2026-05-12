import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'
import RelatoryModal from './RelatoryModal'
import './Layout.css'
import logo from '../../assets/Atlas-Control-logo.png'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Produtos', path: '/products' },
  { label: 'Clientes', path: '/clients' },
  { label: 'Vendas', path: '/sales' },
]

export default function Layout() {
  const { isDark, toggleTheme } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="ATLAS CONTROL Logo" className="brand-logo" />
          <div>
            <div className="brand-title">ATLAS CONTROL</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Gestão de Estoque</div>
          </div>
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button 
          className="relatory-button"
          onClick={() => setIsModalOpen(true)}
          title="Gerar Relatórios"
        >
           Relatório
        </button>
        <button className="theme-toggle" onClick={toggleTheme} title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
          {isDark ? '☀️' : '🌙'}
        </button>
        <RelatoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
