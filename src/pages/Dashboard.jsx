import React from 'react'
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  Plus,
  ArrowRight,
  TrendingUp,
  Calendar,
  FileText,
  Bot
} from 'lucide-react'
import { useData } from '../context/DataContext'
import './Dashboard.css'

const quickActions = [
  { label: 'Neuen Fall anlegen', icon: Plus, action: 'new-case' },
  { label: 'KI-Beratung', icon: Bot, action: 'ai-advisor' },
  { label: 'Workshop planen', icon: Calendar, action: 'workshop' },
]

function Dashboard({ onNavigate }) {
  const { cases, getStats } = useData()
  const stats = getStats()

  const statCards = [
    {
      label: 'Aktive Fälle',
      value: stats.aktiv,
      icon: AlertTriangle,
      color: 'danger',
      trend: 'Erfordern sofortige Aufmerksamkeit'
    },
    {
      label: 'In Bearbeitung',
      value: stats.bearbeitung,
      icon: Clock,
      color: 'warning',
      trend: 'Laufende Betreuung'
    },
    {
      label: 'Abgeschlossen',
      value: stats.abgeschlossen,
      icon: CheckCircle,
      color: 'success',
      trend: 'Erfolgreich bearbeitet'
    },
    {
      label: 'Gesamt Fälle',
      value: stats.total,
      icon: Users,
      color: 'info',
      trend: 'Total dokumentiert'
    },
  ]

  // Sortiere nach Datum und nimm die neuesten 4
  const recentCases = [...cases]
    .sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))
    .slice(0, 4)

  const getStatusBadge = (status) => {
    const statusMap = {
      'akut': { label: 'Akut', class: 'badge-danger' },
      'bearbeitung': { label: 'In Bearbeitung', class: 'badge-warning' },
      'nachsorge': { label: 'Nachsorge', class: 'badge-info' },
      'abgeschlossen': { label: 'Abgeschlossen', class: 'badge-success' },
    }
    return statusMap[status] || { label: status, class: 'badge-info' }
  }

  return (
    <div className="dashboard fade-in">
      <header className="page-header">
        <h1>Willkommen zurück</h1>
        <p>Hier ist Ihre aktuelle Übersicht für heute, {new Date().toLocaleDateString('de-AT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </header>

      {/* Statistik-Karten */}
      <section className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`stat-card stat-${stat.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-trend">{stat.trend}</span>
              </div>
            </div>
          )
        })}
      </section>

      <div className="dashboard-grid">
        {/* Aktuelle Fälle */}
        <section className="card recent-cases-card">
          <div className="card-header">
            <h3 className="card-title">
              <FileText size={20} />
              Aktuelle Fälle
            </h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('cases')}
            >
              Alle anzeigen
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="cases-list">
            {recentCases.map((caseItem) => {
              const status = getStatusBadge(caseItem.status)
              return (
                <div
                  key={caseItem.id}
                  className="case-item"
                  onClick={() => onNavigate('case-detail', caseItem.id)}
                >
                  <div className="case-info">
                    <span className="case-name">Fall #{caseItem.caseNumber}</span>
                    <span className="case-type">{caseItem.type} - {caseItem.platform}</span>
                  </div>
                  <div className="case-meta">
                    <span className={`badge ${status.class}`}>{status.label}</span>
                    <span className="case-date">
                      {new Date(caseItem.lastUpdate).toLocaleDateString('de-AT')}
                    </span>
                  </div>
                </div>
              )
            })}
            {recentCases.length === 0 && (
              <div className="empty-state-small">
                <p>Noch keine Fälle angelegt</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate('cases')}
                >
                  <Plus size={16} />
                  Ersten Fall anlegen
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="card quick-actions-card">
          <div className="card-header">
            <h3 className="card-title">
              <TrendingUp size={20} />
              Schnellaktionen
            </h3>
          </div>

          <div className="quick-actions">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.action}
                  className="quick-action-btn"
                  onClick={() => {
                    if (action.action === 'new-case') onNavigate('cases')
                    else if (action.action === 'ai-advisor') onNavigate('ai-advisor')
                    else if (action.action === 'workshop') onNavigate('prevention')
                  }}
                >
                  <div className="action-icon">
                    <Icon size={24} />
                  </div>
                  <span>{action.label}</span>
                </button>
              )
            })}
          </div>

          {/* Hilfe-Hotlines */}
          <div className="hotlines-section">
            <h4>Wichtige Hotlines</h4>
            <div className="hotline-list">
              <a href="tel:147" className="hotline-item">
                <span className="hotline-name">Rat auf Draht</span>
                <span className="hotline-number">147</span>
              </a>
              <a href="tel:+4315879900" className="hotline-item">
                <span className="hotline-name">Stopline Österreich</span>
                <span className="hotline-number">+43 1 587 99 00</span>
              </a>
              <a href="tel:116111" className="hotline-item">
                <span className="hotline-name">Kinder- & Jugendtelefon</span>
                <span className="hotline-number">116 111</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
