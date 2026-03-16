import React, { useState, useRef } from 'react'
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  HelpCircle,
  Save,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { useData } from '../context/DataContext'
import './Settings.css'

function Settings() {
  const {
    settings,
    updateSettings,
    exportData,
    importData,
    clearAllData,
    cases
  } = useData()

  const [localSettings, setLocalSettings] = useState({
    userName: settings.userName || '',
    userEmail: settings.userEmail || '',
    organization: settings.organization || '',
    notifications: settings.notifications || {
      emailNewCase: true,
      reminderOverdue: true,
      weeklyReport: false
    }
  })

  const [saveStatus, setSaveStatus] = useState(null) // 'saved', 'error'
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [importStatus, setImportStatus] = useState(null)
  const fileInputRef = useRef(null)

  const handleSaveSettings = () => {
    updateSettings(localSettings)
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleNotificationChange = (key) => {
    setLocalSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handleExportJSON = () => {
    exportData()
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const success = importData(event.target.result)
        if (success) {
          setImportStatus('success')
          setTimeout(() => setImportStatus(null), 3000)
        } else {
          setImportStatus('error')
          setTimeout(() => setImportStatus(null), 3000)
        }
      } catch (error) {
        setImportStatus('error')
        setTimeout(() => setImportStatus(null), 3000)
      }
    }
    reader.readAsText(file)
    e.target.value = '' // Reset input
  }

  const handleDeleteAllData = () => {
    clearAllData()
    setShowDeleteConfirm(false)
    setLocalSettings({
      userName: '',
      userEmail: '',
      organization: '',
      notifications: {
        emailNewCase: true,
        reminderOverdue: true,
        weeklyReport: false
      }
    })
  }

  return (
    <div className="settings fade-in">
      <header className="page-header">
        <div className="page-header-content">
          <div>
            <h1>Einstellungen</h1>
            <p>Anwendungseinstellungen und Konfiguration</p>
          </div>
          {saveStatus === 'saved' && (
            <div className="save-indicator success">
              <CheckCircle size={16} />
              Einstellungen gespeichert
            </div>
          )}
        </div>
      </header>

      <div className="settings-grid">
        <section className="card settings-section">
          <h3 className="card-title">
            <User size={20} />
            Benutzerprofil
          </h3>
          <div className="settings-form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ihr Name"
                value={localSettings.userName}
                onChange={(e) => setLocalSettings({ ...localSettings, userName: e.target.value })}
              />
              <span className="form-hint">Wird in Fallprotokollen als Bearbeiter angezeigt</span>
            </div>
            <div className="form-group">
              <label className="form-label">E-Mail</label>
              <input
                type="email"
                className="form-input"
                placeholder="ihre.email@example.at"
                value={localSettings.userEmail}
                onChange={(e) => setLocalSettings({ ...localSettings, userEmail: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Einrichtung</label>
              <input
                type="text"
                className="form-input"
                placeholder="Name der Einrichtung"
                value={localSettings.organization}
                onChange={(e) => setLocalSettings({ ...localSettings, organization: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSaveSettings}>
              <Save size={16} />
              Einstellungen speichern
            </button>
          </div>
        </section>

        <section className="card settings-section">
          <h3 className="card-title">
            <Bell size={20} />
            Benachrichtigungen
          </h3>
          <div className="settings-options">
            <label className="toggle-option">
              <span>E-Mail bei neuen Fällen</span>
              <input
                type="checkbox"
                checked={localSettings.notifications.emailNewCase}
                onChange={() => handleNotificationChange('emailNewCase')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label className="toggle-option">
              <span>Erinnerung bei überfälligen Fällen</span>
              <input
                type="checkbox"
                checked={localSettings.notifications.reminderOverdue}
                onChange={() => handleNotificationChange('reminderOverdue')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label className="toggle-option">
              <span>Wöchentlicher Zusammenfassungsbericht</span>
              <input
                type="checkbox"
                checked={localSettings.notifications.weeklyReport}
                onChange={() => handleNotificationChange('weeklyReport')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <p className="settings-note">
            Hinweis: E-Mail-Benachrichtigungen erfordern eine Server-Anbindung,
            die in dieser lokalen Version nicht verfügbar ist.
          </p>
        </section>

        <section className="card settings-section">
          <h3 className="card-title">
            <Shield size={20} />
            Datenschutz & Sicherheit
          </h3>
          <div className="settings-info">
            <p>Diese Anwendung speichert alle Daten lokal auf Ihrem Gerät. Es werden keine personenbezogenen Daten an externe Server übermittelt.</p>
            <div className="security-badges">
              <span className="security-badge">DSGVO-konform</span>
              <span className="security-badge">Lokale Speicherung</span>
              <span className="security-badge">Keine Cloud</span>
            </div>
          </div>

          <div className="data-stats">
            <h4>Gespeicherte Daten</h4>
            <div className="stats-row">
              <span>Anzahl Fälle:</span>
              <strong>{cases.length}</strong>
            </div>
            <div className="stats-row">
              <span>Speicherort:</span>
              <strong>Browser LocalStorage</strong>
            </div>
          </div>
        </section>

        <section className="card settings-section">
          <h3 className="card-title">
            <Database size={20} />
            Daten & Backup
          </h3>

          {importStatus && (
            <div className={`import-status ${importStatus}`}>
              {importStatus === 'success' ? (
                <>
                  <CheckCircle size={16} />
                  Daten erfolgreich importiert
                </>
              ) : (
                <>
                  <AlertTriangle size={16} />
                  Fehler beim Import. Bitte prüfen Sie die Datei.
                </>
              )}
            </div>
          )}

          <div className="settings-actions">
            <button className="btn btn-secondary" onClick={handleExportJSON}>
              <Download size={16} />
              Daten exportieren (JSON)
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportFile}
            />
            <button className="btn btn-secondary" onClick={handleImportClick}>
              <Upload size={16} />
              Daten importieren
            </button>

            <button
              className="btn btn-danger-outline"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} />
              Alle Daten löschen
            </button>
          </div>

          <p className="settings-note warning">
            Erstellen Sie regelmäßig Backups Ihrer Daten. Bei Löschung der Browser-Daten
            gehen alle Fälle verloren.
          </p>
        </section>

        <section className="card settings-section full-width">
          <h3 className="card-title">
            <HelpCircle size={20} />
            Über SafeSpace
          </h3>
          <div className="about-info">
            <p><strong>SafeSpace - Cybermobbing Prävention & Intervention</strong></p>
            <p>Version 1.0.0</p>
            <p className="about-description">
              Diese Anwendung wurde als Lehrprojekt an der KPH Edith Stein entwickelt.
              Die Inhalte werden von Studierenden im Rahmen eines Seminars zur
              digitalen inklusiven Pädagogik erarbeitet.
            </p>
            <div className="about-credits">
              <p><strong>Projektleitung:</strong> Prof. Bernhard Strobl</p>
              <p><strong>Entwicklung:</strong> In Zusammenarbeit mit KI-Unterstützung (Claude)</p>
              <p><strong>Inhaltliche Beiträge:</strong> Studierende der KPH Edith Stein</p>
            </div>

            <div className="about-features">
              <h4>Alleinstellungsmerkmale</h4>
              <ul>
                <li>Spezialisierung auf Cybermobbing (nicht generisches Case Management)</li>
                <li>DSGVO-konform und lokal lauffähig</li>
                <li>KI-gestützt für Beratung und Dokumentation</li>
                <li>Integrierte Prävention – nicht nur Reaktion</li>
                <li>Von Praktiker:innen entwickelt</li>
                <li>Open Source möglich - nachhaltig, anpassbar</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon danger">
              <Trash2 size={32} />
            </div>
            <h2>Alle Daten löschen?</h2>
            <p>
              Möchten Sie wirklich <strong>alle {cases.length} Fälle</strong> und Einstellungen löschen?
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                Abbrechen
              </button>
              <button className="btn btn-danger" onClick={handleDeleteAllData}>
                <Trash2 size={16} />
                Endgültig löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
