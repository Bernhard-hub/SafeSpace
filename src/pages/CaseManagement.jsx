import React, { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  Calendar,
  ChevronDown,
  X,
  Save,
  Download
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { exportAllCasesToPDF } from '../utils/pdfExport'
import './CaseManagement.css'

const statusOptions = [
  { value: 'alle', label: 'Alle Status' },
  { value: 'akut', label: 'Akut' },
  { value: 'bearbeitung', label: 'In Bearbeitung' },
  { value: 'nachsorge', label: 'Nachsorge' },
  { value: 'abgeschlossen', label: 'Abgeschlossen' },
]

const typeOptions = [
  { value: 'alle', label: 'Alle Typen' },
  { value: 'Cybermobbing', label: 'Cybermobbing' },
  { value: 'Hassrede', label: 'Hassrede' },
  { value: 'Identitätsdiebstahl', label: 'Identitätsdiebstahl' },
  { value: 'Cyberstalking', label: 'Cyberstalking' },
  { value: 'Sexting/Sextortion', label: 'Sexting/Sextortion' },
  { value: 'Cybergrooming', label: 'Cybergrooming' },
]

const platformOptions = [
  'WhatsApp', 'Instagram', 'TikTok', 'Snapchat', 'Discord',
  'YouTube', 'Facebook', 'Twitter/X', 'Telegram', 'Andere'
]

const analogViolenceOptions = [
  'Verbale Gewalt', 'Physische Gewalt', 'Ausgrenzung',
  'Sachbeschädigung', 'Bedrohung', 'Erpressung', 'Andere'
]

const priorityOptions = [
  { value: 'hoch', label: 'Hoch' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'niedrig', label: 'Niedrig' },
]

function CaseManagement({ onNavigate }) {
  const { cases, addCase } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('alle')
  const [typeFilter, setTypeFilter] = useState('alle')
  const [showNewCaseModal, setShowNewCaseModal] = useState(false)
  const [newCase, setNewCase] = useState({
    victimInitials: '',
    age: '',
    type: 'Cybermobbing',
    platform: [],
    analogViolence: [],
    priority: 'mittel',
    assignedTo: '',
    description: ''
  })

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch =
      caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.victimInitials.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'alle' || caseItem.status === statusFilter
    const matchesType = typeFilter === 'alle' || caseItem.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'akut': { label: 'Akut', class: 'badge-danger', icon: AlertTriangle },
      'bearbeitung': { label: 'In Bearbeitung', class: 'badge-warning', icon: Clock },
      'nachsorge': { label: 'Nachsorge', class: 'badge-info', icon: User },
      'abgeschlossen': { label: 'Abgeschlossen', class: 'badge-success', icon: CheckCircle },
    }
    return statusMap[status] || { label: status, class: 'badge-info', icon: Clock }
  }

  const getPriorityClass = (priority) => {
    const priorityMap = {
      'hoch': 'priority-high',
      'mittel': 'priority-medium',
      'niedrig': 'priority-low',
    }
    return priorityMap[priority] || ''
  }

  const handlePlatformToggle = (platform) => {
    setNewCase(prev => ({
      ...prev,
      platform: prev.platform.includes(platform)
        ? prev.platform.filter(p => p !== platform)
        : [...prev.platform, platform]
    }))
  }

  const handleAnalogViolenceToggle = (type) => {
    setNewCase(prev => ({
      ...prev,
      analogViolence: prev.analogViolence.includes(type)
        ? prev.analogViolence.filter(t => t !== type)
        : [...prev.analogViolence, type]
    }))
  }

  const handleSubmitNewCase = (e) => {
    e.preventDefault()

    if (!newCase.victimInitials || !newCase.type) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.')
      return
    }

    addCase({
      ...newCase,
      age: parseInt(newCase.age) || 0,
      platform: newCase.platform.join(', '),
      analogViolence: newCase.analogViolence.join(', ')
    })

    setNewCase({
      victimInitials: '',
      age: '',
      type: 'Cybermobbing',
      platform: [],
      analogViolence: [],
      priority: 'mittel',
      assignedTo: '',
      description: ''
    })
    setShowNewCaseModal(false)
  }

  return (
    <div className="case-management fade-in">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Fallmanagement</h1>
            <p>Verwalten und dokumentieren Sie alle Cybermobbing-Fälle</p>
          </div>
          <div className="header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => exportAllCasesToPDF(cases)}
            >
              <Download size={18} />
              PDF Export
            </button>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setShowNewCaseModal(true)}
            >
              <Plus size={20} />
              Neuer Fall
            </button>
          </div>
        </div>
      </header>

      {/* Filter-Bereich */}
      <div className="filters-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Suchen nach Fallnummer, Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <div className="filter-select">
            <Filter size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>

          <div className="filter-select">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {typeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Fallübersicht */}
      <div className="cases-table-container card">
        <table className="cases-table">
          <thead>
            <tr>
              <th>Fall</th>
              <th>Betroffene/r</th>
              <th>Typ</th>
              <th>Plattform</th>
              <th>Status</th>
              <th>Zuständig</th>
              <th>Angelegt</th>
              <th>Aktualisiert</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem) => {
              const status = getStatusBadge(caseItem.status)
              const StatusIcon = status.icon
              return (
                <tr
                  key={caseItem.id}
                  onClick={() => onNavigate('case-detail', caseItem.id)}
                  className={getPriorityClass(caseItem.priority)}
                >
                  <td>
                    <div className="case-number">
                      <span className="number">#{caseItem.caseNumber}</span>
                      {caseItem.priority === 'hoch' && (
                        <span className="priority-indicator" title="Hohe Priorität">!</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="victim-info">
                      <span className="initials">{caseItem.victimInitials}</span>
                      <span className="details">{caseItem.age} Jahre</span>
                    </div>
                  </td>
                  <td>{caseItem.type}</td>
                  <td>
                    <span className="platform-tags">
                      {caseItem.platform}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${status.class}`}>
                      <StatusIcon size={14} />
                      {status.label}
                    </span>
                  </td>
                  <td>{caseItem.assignedTo}</td>
                  <td>
                    <span className="date">
                      <Calendar size={14} />
                      {new Date(caseItem.createdAt).toLocaleDateString('de-AT')}
                    </span>
                  </td>
                  <td>
                    <span className="date">
                      <Calendar size={14} />
                      {new Date(caseItem.lastUpdate).toLocaleDateString('de-AT')}
                    </span>
                  </td>
                  <td>
                    <button
                      className="more-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredCases.length === 0 && (
          <div className="empty-state">
            <Search size={48} />
            <h3>Keine Fälle gefunden</h3>
            <p>Versuchen Sie, Ihre Suchkriterien anzupassen</p>
          </div>
        )}
      </div>

      {/* Statistik Footer */}
      <div className="cases-footer">
        <span className="case-count">
          {filteredCases.length} von {cases.length} Fällen
        </span>
      </div>

      {/* New Case Modal */}
      {showNewCaseModal && (
        <div className="modal-overlay" onClick={() => setShowNewCaseModal(false)}>
          <div className="modal new-case-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Neuen Fall anlegen</h2>
              <button className="close-btn" onClick={() => setShowNewCaseModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitNewCase} className="new-case-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">Initialen des/der Betroffenen</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="z.B. M.S."
                    value={newCase.victimInitials}
                    onChange={(e) => setNewCase({ ...newCase, victimInitials: e.target.value })}
                    required
                    maxLength={5}
                  />
                  <span className="form-hint">Zum Datenschutz nur Initialen verwenden</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Alter</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="z.B. 14"
                    value={newCase.age}
                    onChange={(e) => setNewCase({ ...newCase, age: e.target.value })}
                    min={6}
                    max={25}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">Art des Vorfalls</label>
                  <select
                    className="form-input"
                    value={newCase.type}
                    onChange={(e) => setNewCase({ ...newCase, type: e.target.value })}
                    required
                  >
                    {typeOptions.slice(1).map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priorität</label>
                  <select
                    className="form-input"
                    value={newCase.priority}
                    onChange={(e) => setNewCase({ ...newCase, priority: e.target.value })}
                  >
                    {priorityOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Betroffene Plattformen</label>
                <div className="platform-selector">
                  {platformOptions.map(platform => (
                    <button
                      type="button"
                      key={platform}
                      className={`platform-tag ${newCase.platform.includes(platform) ? 'selected' : ''}`}
                      onClick={() => handlePlatformToggle(platform)}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Analoge Gewaltformen</label>
                <span className="form-hint">Begleitende analoge Gewalt (falls vorhanden)</span>
                <div className="platform-selector">
                  {analogViolenceOptions.map(type => (
                    <button
                      type="button"
                      key={type}
                      className={`platform-tag ${newCase.analogViolence.includes(type) ? 'selected' : ''}`}
                      onClick={() => handleAnalogViolenceToggle(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Zuständige Person</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name der zuständigen Person"
                  value={newCase.assignedTo}
                  onChange={(e) => setNewCase({ ...newCase, assignedTo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Beschreibung des Vorfalls</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Kurze Beschreibung des Vorfalls..."
                  value={newCase.description}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowNewCaseModal(false)}
                >
                  Abbrechen
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={18} />
                  Fall anlegen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CaseManagement
