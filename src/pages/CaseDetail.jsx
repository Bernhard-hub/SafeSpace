import React, { useState } from 'react'
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  Upload,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Edit3,
  Trash2,
  Save,
  X,
  Plus,
  ChevronDown,
  Download
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { exportCaseToPDF } from '../utils/pdfExport'
import './CaseDetail.css'

const gespraechsleitfaden = {
  'Cybermobbing': {
    erstgespraech: ['Es tut mir leid, dass du das erlebst.', 'Was im Netz passiert, kann genauso wehtun wie im echten Leben.', 'Du bist nicht schuld daran.', 'Magst du mir erzählen, was genau passiert ist?'],
    fragen: ['Auf welcher Plattform passiert das?', 'Seit wann geht das schon so?', 'Wer ist daran beteiligt?', 'Hast du Screenshots gemacht?', 'Wissen deine Eltern Bescheid?'],
    sofortmassnahmen: ['Screenshots sichern (mit Datum/Uhrzeit)', 'Täter:in blockieren und melden', 'Privatsphäre-Einstellungen überprüfen', 'Vertrauensperson einbeziehen', 'Bei Bedarf: Polizeiliche Anzeige'],
  },
  'Cybergrooming': {
    erstgespraech: ['Danke, dass du dein Gefühl ernst nimmst.', 'Wenn sich etwas unangenehm anfühlt, ist das wichtig.', 'Du bist nicht schuld, wenn jemand dein Vertrauen missbraucht.', 'Magst du erzählen, was passiert ist?'],
    fragen: ['Wie hast du die Person kennengelernt?', 'Hat die Person um Geheimhaltung gebeten?', 'Gab es intime Fragen oder Forderungen?', 'Wurde ein Treffen vorgeschlagen?', 'Besteht aktuell noch Kontakt?'],
    sofortmassnahmen: ['Kontakt sofort beenden', 'Profil blockieren und melden', 'Alle Chatverläufe als Beweise sichern', 'Eltern einbeziehen', 'Anzeige bei der Polizei (§ 208a StGB)', 'Psychologische Unterstützung organisieren'],
  },
  'Sexting/Sextortion': {
    erstgespraech: ['Das ist eine sehr schwierige Situation.', 'Du hast richtig gehandelt, dir Hilfe zu suchen.', 'Niemals auf Forderungen eingehen.', 'Wir finden gemeinsam eine Lösung.'],
    fragen: ['Wie ist der Kontakt entstanden?', 'Welche Forderungen werden gestellt?', 'Wurden bereits Inhalte verbreitet?', 'Besteht aktuell Kontakt zur erpressenden Person?'],
    sofortmassnahmen: ['Nicht auf Forderungen eingehen', 'Profil melden und blockieren', 'Alle Passwörter ändern', 'Anzeige bei der Polizei erstatten', 'Bei Minderjährigen: Eltern einbeziehen'],
  },
  'Hassrede': {
    erstgespraech: ['Niemand sollte so angegriffen werden.', 'Hasskommentare können sehr verletzend sein.', 'Du hast ein Recht auf Würde und Respekt.'],
    fragen: ['Welche Aussagen wurden gemacht?', 'Wer verbreitet diese Inhalte?', 'Werden sie weitergeteilt?', 'Wie fühlst du dich damit?'],
    sofortmassnahmen: ['Beweise sichern (Screenshots)', 'Hasskommentare melden', 'Meldung bei ZARA – #GegenHassimNetz', 'In schweren Fällen: rechtliches Vorgehen'],
  },
  'Identitätsdiebstahl': {
    erstgespraech: ['Identitätsdiebstahl kann sehr verunsichern.', 'Du hast richtig gehandelt, indem du reagierst.'],
    fragen: ['Wurde ein Fake-Profil erstellt?', 'Welche Plattformen sind betroffen?', 'Hast du deine Passwörter bereits geändert?'],
    sofortmassnahmen: ['Sofort alle Passwörter ändern', 'Zwei-Faktor-Authentifizierung aktivieren', 'Fake-Profil auf der Plattform melden', 'Screenshots sichern', 'Polizeiliche Anzeige (§ 120 StGB)'],
  },
  'Cyberstalking': {
    erstgespraech: ['Deine Sicherheit steht an erster Stelle.', 'Du hast ein Recht auf Privatsphäre.', 'Du übertreibst nicht.'],
    fragen: ['Wie äußert sich das Verhalten?', 'Seit wann passiert das?', 'Gab es Drohungen?', 'Fühlst du dich aktuell sicher?'],
    sofortmassnahmen: ['Alle Nachrichten und Kontaktversuche sichern', 'Person auf allen Plattformen blockieren', 'Privatsphäre-Einstellungen überprüfen', 'Bei Bedrohung: sofort Polizei kontaktieren'],
  },
}

const statusOptions = [
  { value: 'akut', label: 'Akut', icon: AlertTriangle, color: 'danger' },
  { value: 'bearbeitung', label: 'In Bearbeitung', icon: Clock, color: 'warning' },
  { value: 'nachsorge', label: 'Nachsorge', icon: User, color: 'info' },
  { value: 'abgeschlossen', label: 'Abgeschlossen', icon: CheckCircle, color: 'success' },
]

const priorityOptions = [
  { value: 'hoch', label: 'Hoch' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'niedrig', label: 'Niedrig' },
]

function CaseDetail({ caseId, onNavigate }) {
  const { getCaseById, updateCase, deleteCase, addTimelineEntry, addNote } = useData()
  const caseData = getCaseById(caseId)

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showTimelineModal, setShowTimelineModal] = useState(false)
  const [showMassnahmeMenu, setShowMassnahmeMenu] = useState(false)
  const [showLeitfaden, setShowLeitfaden] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [newTimelineEntry, setNewTimelineEntry] = useState('')
  const [editedData, setEditedData] = useState({})

  const massnahmeOptions = [
    'Gespräch mit Betroffenen',
    'Gespräch mit Täter:in',
    'Gespräch mit Herkunftssystem',
    'Gespräch mit Einrichtung intern',
    'Gespräch mit Einrichtung extern',
  ]

  const handleAddMassnahme = (massnahme) => {
    addTimelineEntry(caseData.id, massnahme)
    setShowMassnahmeMenu(false)
  }

  // Fall nicht gefunden
  if (!caseData) {
    return (
      <div className="case-detail fade-in">
        <header className="case-detail-header">
          <button className="back-btn" onClick={() => onNavigate('cases')}>
            <ArrowLeft size={20} />
            Zurück zur Übersicht
          </button>
        </header>
        <div className="card not-found">
          <AlertTriangle size={48} />
          <h2>Fall nicht gefunden</h2>
          <p>Der angeforderte Fall existiert nicht oder wurde gelöscht.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('cases')}>
            Zur Fallübersicht
          </button>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const found = statusOptions.find(s => s.value === status)
    return found || statusOptions[0]
  }

  const currentStatus = getStatusBadge(caseData.status)
  const StatusIcon = currentStatus.icon

  const handleStartEdit = () => {
    setEditedData({
      status: caseData.status,
      priority: caseData.priority,
      assignedTo: caseData.assignedTo,
      description: caseData.description
    })
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    updateCase(caseData.id, editedData)
    addTimelineEntry(caseData.id, 'Fall aktualisiert')
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedData({})
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus) => {
    const oldStatus = getStatusBadge(caseData.status).label
    const newStatusLabel = getStatusBadge(newStatus).label
    updateCase(caseData.id, { status: newStatus })
    addTimelineEntry(caseData.id, `Status geändert: ${oldStatus} → ${newStatusLabel}`)
  }

  const handleDelete = () => {
    deleteCase(caseData.id)
    onNavigate('cases')
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return
    addNote(caseData.id, newNote)
    addTimelineEntry(caseData.id, 'Notiz hinzugefügt')
    setNewNote('')
    setShowNoteModal(false)
  }

  const handleAddTimelineEntry = () => {
    if (!newTimelineEntry.trim()) return
    addTimelineEntry(caseData.id, newTimelineEntry)
    setNewTimelineEntry('')
    setShowTimelineModal(false)
  }

  return (
    <div className="case-detail fade-in">
      <header className="case-detail-header">
        <button className="back-btn" onClick={() => onNavigate('cases')}>
          <ArrowLeft size={20} />
          Zurück zur Übersicht
        </button>

        <div className="case-title-section">
          <div className="case-title">
            <h1>Fall #{caseData.caseNumber}</h1>
            <span className={`badge badge-${currentStatus.color}`}>
              <StatusIcon size={14} />
              {currentStatus.label}
            </span>
            {caseData.priority === 'hoch' && (
              <span className="priority-badge">Hohe Priorität</span>
            )}
          </div>
          <p className="case-subtitle">{caseData.type} • {caseData.platform}</p>
        </div>

        <div className="header-actions">
          {!isEditing ? (
            <>
              <button className="btn btn-secondary" onClick={handleStartEdit}>
                <Edit3 size={16} />
                Bearbeiten
              </button>
              <button
                className="btn btn-danger-outline"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 size={16} />
                Löschen
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                <Save size={16} />
                Speichern
              </button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                <X size={16} />
                Abbrechen
              </button>
            </>
          )}
        </div>
      </header>

      <div className="case-detail-grid">
        {/* Hauptinformationen */}
        <section className="card case-info-card">
          <h3 className="card-title">
            <User size={20} />
            Fallinformationen
          </h3>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Betroffene/r</span>
              <span className="info-value">{caseData.victimInitials}, {caseData.age} Jahre</span>
            </div>
            <div className="info-item">
              <span className="info-label">Zuständig</span>
              {isEditing ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedData.assignedTo}
                  onChange={(e) => setEditedData({ ...editedData, assignedTo: e.target.value })}
                />
              ) : (
                <span className="info-value">{caseData.assignedTo || '-'}</span>
              )}
            </div>
            <div className="info-item">
              <span className="info-label">Angelegt am</span>
              <span className="info-value">{new Date(caseData.createdAt).toLocaleDateString('de-AT')}</span>
            </div>
            {caseData.analogViolence && (
              <div className="info-item info-item-full">
                <span className="info-label">Analoge Gewaltformen</span>
                <span className="info-value">{caseData.analogViolence || 'Keine'}</span>
              </div>
            )}
          </div>

          {/* Status-Änderung */}
          <div className="status-section">
            <h4>Status ändern</h4>
            <div className="status-buttons">
              {statusOptions.map((status) => {
                const Icon = status.icon
                return (
                  <button
                    key={status.value}
                    className={`status-btn status-${status.color} ${caseData.status === status.value ? 'active' : ''}`}
                    onClick={() => handleStatusChange(status.value)}
                  >
                    <Icon size={16} />
                    {status.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Priorität */}
          {isEditing && (
            <div className="edit-section">
              <h4>Priorität</h4>
              <div className="priority-buttons">
                {priorityOptions.map((p) => (
                  <button
                    key={p.value}
                    className={`priority-btn priority-${p.value} ${editedData.priority === p.value ? 'active' : ''}`}
                    onClick={() => setEditedData({ ...editedData, priority: p.value })}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="description-section">
            <h4>Beschreibung</h4>
            {isEditing ? (
              <textarea
                className="edit-textarea"
                value={editedData.description}
                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                rows={4}
              />
            ) : (
              <p>{caseData.description || 'Keine Beschreibung vorhanden.'}</p>
            )}
          </div>

          {/* Notizen */}
          <div className="notes-section">
            <div className="section-header">
              <h4>Notizen ({caseData.notes?.length || 0})</h4>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowNoteModal(true)}>
                <Plus size={14} />
                Notiz hinzufügen
              </button>
            </div>
            <div className="notes-list">
              {caseData.notes?.length > 0 ? (
                caseData.notes.map((note) => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <span className="note-user">{note.user}</span>
                      <span className="note-date">{new Date(note.date).toLocaleDateString('de-AT')}</span>
                    </div>
                    <p className="note-content">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="empty-notes">Noch keine Notizen vorhanden.</p>
              )}
            </div>
          </div>
        </section>

        {/* Aktionen & Timeline */}
        <div className="case-sidebar">
          <section className="card">
            <h3 className="card-title">
              <MessageSquare size={20} />
              Schnellaktionen
            </h3>
            <div className="action-buttons">
              <div className="massnahme-wrapper">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowMassnahmeMenu(!showMassnahmeMenu)}
                >
                  <Plus size={16} />
                  Maßnahme hinzufügen
                </button>
                {showMassnahmeMenu && (
                  <div className="massnahme-dropdown">
                    {massnahmeOptions.map((option, idx) => (
                      <button
                        key={idx}
                        className="massnahme-option"
                        onClick={() => handleAddMassnahme(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="btn btn-secondary" onClick={() => setShowLeitfaden(true)}>
                <MessageSquare size={16} />
                Gesprächsleitfaden
              </button>
              <button className="btn btn-secondary" onClick={() => setShowNoteModal(true)}>
                <Plus size={16} />
                Notiz hinzufügen
              </button>
              <button className="btn btn-secondary" onClick={() => setShowTimelineModal(true)}>
                <Clock size={16} />
                Aktivität eintragen
              </button>
              <button className="btn btn-secondary" onClick={() => exportCaseToPDF(caseData)}>
                <Download size={16} />
                Als PDF exportieren
              </button>
              <button className="btn btn-secondary" onClick={() => onNavigate('ai-advisor')}>
                <FileText size={16} />
                KI-Beratung öffnen
              </button>
            </div>
          </section>

          <section className="card">
            <div className="section-header">
              <h3 className="card-title">
                <Clock size={20} />
                Verlauf
              </h3>
            </div>
            <div className="timeline">
              {caseData.timeline?.length > 0 ? (
                [...caseData.timeline].reverse().map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker" />
                    <div className="timeline-content">
                      <span className="timeline-action">{item.action}</span>
                      <span className="timeline-meta">
                        {item.user} • {new Date(item.date).toLocaleDateString('de-AT')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-timeline">Noch keine Aktivitäten.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon danger">
              <Trash2 size={32} />
            </div>
            <h2>Fall löschen?</h2>
            <p>
              Möchten Sie Fall <strong>#{caseData.caseNumber}</strong> wirklich löschen?
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                Abbrechen
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                <Trash2 size={16} />
                Endgültig löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="modal note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Notiz hinzufügen</h2>
              <button className="close-btn" onClick={() => setShowNoteModal(false)}>
                <X size={24} />
              </button>
            </div>
            <textarea
              className="modal-textarea"
              placeholder="Ihre Notiz eingeben..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={5}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowNoteModal(false)}>
                Abbrechen
              </button>
              <button className="btn btn-primary" onClick={handleAddNote} disabled={!newNote.trim()}>
                <Save size={16} />
                Notiz speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Timeline Entry Modal */}
      {showTimelineModal && (
        <div className="modal-overlay" onClick={() => setShowTimelineModal(false)}>
          <div className="modal note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Aktivität eintragen</h2>
              <button className="close-btn" onClick={() => setShowTimelineModal(false)}>
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              className="modal-input"
              placeholder="z.B. Elterngespräch geführt, Screenshots gesichert..."
              value={newTimelineEntry}
              onChange={(e) => setNewTimelineEntry(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowTimelineModal(false)}>
                Abbrechen
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddTimelineEntry}
                disabled={!newTimelineEntry.trim()}
              >
                <Plus size={16} />
                Eintragen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gesprächsleitfaden Modal */}
      {showLeitfaden && (() => {
        const leitfaden = gespraechsleitfaden[caseData.type] || gespraechsleitfaden['Cybermobbing']
        return (
          <div className="modal-overlay" onClick={() => setShowLeitfaden(false)}>
            <div className="modal note-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', overflow: 'auto' }}>
              <div className="modal-header">
                <h2>Gesprächsleitfaden – {caseData.type}</h2>
                <button className="close-btn" onClick={() => setShowLeitfaden(false)}>
                  <X size={24} />
                </button>
              </div>
              <div style={{ padding: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Erstgespräch – Einstieg</h4>
                <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem' }}>
                  {leitfaden.erstgespraech.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem', fontStyle: 'italic' }}>„{item}"</li>
                  ))}
                </ul>

                <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Wichtige Fragen</h4>
                <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem' }}>
                  {leitfaden.fragen.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem' }}>{item}</li>
                  ))}
                </ul>

                <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Sofortmaßnahmen</h4>
                <ul style={{ paddingLeft: '1.2rem' }}>
                  {leitfaden.sofortmassnahmen.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowLeitfaden(false)}>
                  Schließen
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default CaseDetail
