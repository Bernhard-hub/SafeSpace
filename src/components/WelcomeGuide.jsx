import React, { useState, useEffect } from 'react'
import {
  X,
  Shield,
  Database,
  Download,
  Upload,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  Smartphone
} from 'lucide-react'
import './WelcomeGuide.css'

const slides = [
  {
    icon: Shield,
    title: 'Willkommen bei SafeSpace',
    content: `SafeSpace ist ein professionelles Tool für Cybermobbing-Prävention und Intervention für Alle.

Diese Anwendung wurde an der KPH Edith Stein entwickelt und steht kostenlos zur Verfügung.`,
    highlight: 'DSGVO-konform & Open Source'
  },
  {
    icon: Database,
    title: 'Ihre Daten bleiben bei Ihnen',
    content: `Alle Daten werden ausschließlich in Ihrem Browser gespeichert (LocalStorage).

• Keine Cloud-Speicherung
• Keine Übertragung an Server
• Keine Anmeldung erforderlich
• Vollständige Datenkontrolle`,
    highlight: 'Wichtig: Daten sind geräte- und browsergebunden'
  },
  {
    icon: Download,
    title: 'Backup erstellen',
    content: `Da Ihre Daten nur lokal gespeichert werden, ist regelmäßiges Backup wichtig!

So erstellen Sie ein Backup:
1. Gehen Sie zu "Einstellungen"
2. Klicken Sie auf "Daten exportieren (JSON)"
3. Speichern Sie die Datei sicher ab

Empfehlung: Wöchentliches Backup`,
    highlight: 'Bei Browser-Löschung gehen Daten verloren!'
  },
  {
    icon: Upload,
    title: 'Daten wiederherstellen',
    content: `Auf einem neuen Gerät oder nach Datenverlust:

1. Gehen Sie zu "Einstellungen"
2. Klicken Sie auf "Daten importieren"
3. Wählen Sie Ihre Backup-Datei

Ihre Fälle und Einstellungen werden wiederhergestellt.`,
    highlight: 'Tipp: Backup auch auf USB-Stick speichern'
  },
  {
    icon: Smartphone,
    title: 'Schnellzugriff einrichten',
    content: `So haben Sie SafeSpace immer griffbereit:

Chrome/Edge (empfohlen):
• Klicken Sie auf das Install-Symbol in der Adressleiste
• App wird wie ein Programm installiert

Firefox/Safari Desktop:
• Lesezeichen anlegen (Strg+D)
• In Lesezeichenleiste ziehen

Smartphone (alle Browser):
• Menü öffnen → "Zum Startbildschirm"`,
    highlight: 'Tipp: Chrome oder Edge für beste Erfahrung'
  },
  {
    icon: CheckCircle,
    title: 'Bereit zum Start!',
    content: `Sie können jetzt:

• Neue Fälle dokumentieren
• KI-Beratung für Gesprächsführung nutzen
• Präventionsmaterial einsehen
• Berichte als PDF exportieren

Bei Fragen: Einstellungen → Über SafeSpace`,
    highlight: 'Viel Erfolg bei Ihrer wichtigen Arbeit!'
  }
]

function WelcomeGuide({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('safespace_hideWelcome', 'true')
    }
    onClose()
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <button className="welcome-close" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="welcome-progress">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'completed' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <div className="welcome-content">
          <div className="welcome-icon">
            <Icon size={48} />
          </div>

          <h2>{slide.title}</h2>

          <div className="welcome-text">
            {slide.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {slide.highlight && (
            <div className="welcome-highlight">
              <AlertTriangle size={16} />
              {slide.highlight}
            </div>
          )}
        </div>

        <div className="welcome-footer">
          {currentSlide === slides.length - 1 ? (
            <label className="dont-show-checkbox">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <span>Nicht mehr anzeigen</span>
            </label>
          ) : (
            <div />
          )}

          <div className="welcome-nav">
            {currentSlide > 0 && (
              <button className="btn btn-secondary" onClick={handlePrev}>
                <ChevronLeft size={18} />
                Zurück
              </button>
            )}

            {currentSlide < slides.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Weiter
                <ChevronRight size={18} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleClose}>
                <CheckCircle size={18} />
                Los geht's!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeGuide
