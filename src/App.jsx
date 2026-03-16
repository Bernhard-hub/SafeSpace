import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import WelcomeGuide from './components/WelcomeGuide'
import Dashboard from './pages/Dashboard'
import CaseManagement from './pages/CaseManagement'
import CaseDetail from './pages/CaseDetail'
import Prevention from './pages/Prevention'
import Resources from './pages/Resources'
import Settings from './pages/Settings'
import AIAdvisor from './pages/AIAdvisor'
import { DataProvider } from './context/DataContext'
import './styles/App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedCaseId, setSelectedCaseId] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showDatenschutz, setShowDatenschutz] = useState(false)

  useEffect(() => {
    // Show welcome guide on first visit
    const hideWelcome = localStorage.getItem('safespace_hideWelcome')
    if (!hideWelcome) {
      setShowWelcome(true)
    }
    // Show privacy notice on first visit
    const datenschutzAccepted = localStorage.getItem('safespace_datenschutz_accepted')
    if (!datenschutzAccepted) {
      setShowDatenschutz(true)
    }
  }, [])

  const acceptDatenschutz = () => {
    localStorage.setItem('safespace_datenschutz_accepted', 'true')
    setShowDatenschutz(false)
  }

  const navigateTo = (page, caseId = null) => {
    setCurrentPage(page)
    if (caseId) setSelectedCaseId(caseId)
    setSidebarOpen(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />
      case 'cases':
        return <CaseManagement onNavigate={navigateTo} />
      case 'case-detail':
        return <CaseDetail caseId={selectedCaseId} onNavigate={navigateTo} />
      case 'prevention':
        return <Prevention />
      case 'resources':
        return <Resources />
      case 'ai-advisor':
        return <AIAdvisor />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard onNavigate={navigateTo} />
    }
  }

  return (
    <DataProvider>
      <div className={`app-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Menü öffnen"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}
        <Sidebar
          currentPage={currentPage}
          onNavigate={navigateTo}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isOpen={sidebarOpen}
        />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>

      {showWelcome && (
        <WelcomeGuide onClose={() => setShowWelcome(false)} />
      )}

      {showDatenschutz && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 10000, padding: '1rem'
        }}>
          <div style={{
            background: 'white', borderRadius: '16px', maxWidth: '520px',
            width: '100%', padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', fontSize: '24px'
              }}>&#x1f512;</div>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem' }}>Datenschutz-Hinweis</h2>
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#374151' }}>
              <p style={{ marginBottom: '0.8rem' }}>
                <strong>SafeSpace</strong> speichert alle Daten <strong>ausschließlich lokal</strong> in Ihrem Browser (LocalStorage).
                Es werden <strong>keine Daten an externe Server übertragen</strong>.
              </p>
              <p style={{ marginBottom: '0.8rem' }}>
                <strong>Wichtig für den Schulbetrieb:</strong>
              </p>
              <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.8rem' }}>
                <li>Verwenden Sie nur <strong>Initialen</strong>, keine vollen Namen</li>
                <li>Speichern Sie <strong>keine Fotos</strong> von Betroffenen in der App</li>
                <li>Löschen Sie Fälle nach Abschluss gemäß Ihrer Aufbewahrungspflichten</li>
                <li>Nutzen Sie die App nur auf <strong>dienstlichen/geschützten Geräten</strong></li>
              </ul>
              <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                Diese App erfüllt die Anforderungen der DSGVO/DSG durch das Prinzip der Datensparsamkeit
                und lokalen Verarbeitung. Keine Registrierung erforderlich.
              </p>
            </div>
            <button
              onClick={acceptDatenschutz}
              style={{
                width: '100%', marginTop: '1.5rem', padding: '0.8rem',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white', border: 'none', borderRadius: '8px',
                fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
              }}
            >
              Verstanden – App verwenden
            </button>
          </div>
        </div>
      )}
    </DataProvider>
  )
}

export default App
