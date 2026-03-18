import React from 'react'
import {
  LayoutDashboard,
  FolderOpen,
  Shield,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bot,
  GraduationCap
} from 'lucide-react'
import './Sidebar.css'

const menuItems = [
  { id: 'dashboard', label: 'Übersicht', icon: LayoutDashboard },
  { id: 'cases', label: 'Fallmanagement', icon: FolderOpen },
  { id: 'ai-advisor', label: 'KI-Beratung', icon: Bot, highlight: true },
  { id: 'prevention', label: 'Prävention', icon: Shield },
  { id: 'workshop-guide', label: 'Workshop-Begleiter', icon: GraduationCap },
  { id: 'resources', label: 'Ressourcen', icon: BookOpen },
  { id: 'settings', label: 'Einstellungen', icon: Settings },
]

function Sidebar({ currentPage, onNavigate, collapsed, onToggleCollapse, isOpen }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Heart size={24} />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <span className="logo-title">SafeSpace</span>
              <span className="logo-subtitle">Cybermobbing Hilfe</span>
            </div>
          )}
        </div>
        <button 
          className="collapse-btn"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Sidebar erweitern' : 'Sidebar einklappen'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <button
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                  {isActive && <div className="active-indicator" />}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="help-box">
            <p className="help-text">Brauchen Sie Hilfe?</p>
            <a href="tel:147" className="help-link">
              📞 Rat auf Draht: 147
            </a>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
