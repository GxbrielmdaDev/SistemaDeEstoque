import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Produtos', path: '/products' },
  { label: 'Clientes', path: '/clients' },
  { label: 'Vendas', path: '/sales' },
]

export default function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-dot" />
          <div>
            <div className="brand-title">Autopeças Gerencial</div>
            <div style={{ fontSize: '0.75rem', color: '#a8a8a8' }}>Painel de Controle</div>
          </div>
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
