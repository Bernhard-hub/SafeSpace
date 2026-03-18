import React, { useState } from 'react'
import {
  Shield,
  Search,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Key,
  AlertTriangle,
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  HelpCircle,
  Fingerprint,
  Globe
} from 'lucide-react'
import '../styles/WorkshopGuide.css'

const detectiveMethoden = [
  {
    title: 'Namenssuche',
    icon: Search,
    description: 'Gib deinen Namen in Anführungszeichen in eine Suchmaschine ein, z.\u00A0B. "Max Mustermann". So findest du genau die Ergebnisse, die deinen vollen Namen enthalten.'
  },
  {
    title: 'Google Alerts',
    icon: Globe,
    description: 'Richte einen Google Alert für deinen Namen ein (google.com/alerts). Du bekommst eine E-Mail, sobald dein Name irgendwo im Netz auftaucht.'
  },
  {
    title: 'Umgekehrte Bildersuche',
    icon: Eye,
    description: 'Lade ein Foto von dir bei Google Bilder oder TinEye hoch. Du siehst sofort, auf welchen Seiten dein Bild verwendet wird.'
  }
]

const datenKategorien = [
  {
    begriff: 'Privatsphäre',
    definition: 'Alles, was nicht öffentlich ist und nur dich selbst etwas angeht.',
    beispiele: 'Gedanken, Tagebuch, Gespräche mit engen Freunden'
  },
  {
    begriff: 'Personenbezogene Daten',
    definition: 'Informationen, mit denen man dich eindeutig identifizieren kann.',
    beispiele: 'Name, Adresse, Telefonnummer, Geburtsdatum, Schule, Beruf'
  },
  {
    begriff: 'Sensible Daten',
    definition: 'Daten aus deinem persönlichsten Lebensbereich; extrem schützenswert.',
    beispiele: 'Gesundheit, Religion, politische Meinung, ethnische Herkunft'
  }
]

const instagramTipps = [
  { title: 'Privat-Profil', text: 'Konto auf \u201ePrivat\u201c schalten \u2013 nur bestätigte Follower sehen deine Beiträge.' },
  { title: 'Aktivitätsstatus aus', text: 'Deaktivieren, dass andere sehen, wann du zuletzt online warst.' },
  { title: 'Stories & Kommentare', text: 'Stories vor bestimmten Personen verbergen, Kommentar-Filter nutzen.' },
  { title: 'Likes ausblenden', text: 'Like-Zahlen unsichtbar machen \u2013 weniger Druck, mehr Freiheit.' }
]

const snapchatTipps = [
  { title: 'Geistmodus aktivieren', text: 'In Snap Map auf den Geist tippen, damit niemand deinen Standort sieht.' },
  { title: 'Nur Freunde', text: 'Nur bestätigten Freund:innen erlauben, dich zu kontaktieren und deine Story zu sehen.' },
  { title: 'Handynummer-Suche deaktivieren', text: 'Damit dich nicht jeder über deine Nummer finden kann.' },
  { title: 'Datensparmodus aktivieren', text: 'Weniger Datenverbrauch und weniger Tracking im Hintergrund.' }
]

const passwortTipps = [
  {
    icon: Shield,
    title: 'Zwei-Faktor-Authentifizierung (2FA)',
    text: 'Aktiviere 2FA in jeder App. Selbst wenn jemand dein Passwort knackt, kommt er ohne den zweiten Code nicht rein.'
  },
  {
    icon: Key,
    title: 'Passwort-Check',
    text: 'Lange Passwörter mit Sonderzeichen verwenden. Sofort ändern bei Verdacht, dass jemand es kennt.'
  },
  {
    icon: Smartphone,
    title: 'Login-Aktivität',
    text: 'Unter \u201eSicherheit\u201c prüfen, welche Geräte eingeloggt sind. Fremdes Gerät? Sofort abmelden!'
  }
]

const beratungsstellen = [
  {
    name: 'Rat auf Draht',
    detail: '147 (anonym & kostenlos)',
    description: 'Krisenhilfe für Kinder und Jugendliche \u2013 auch Trusted Flagger',
    url: 'https://www.rataufdraht.at'
  },
  {
    name: 'Saferinternet.at',
    detail: 'Alle Infos und aktuelle Tipps',
    description: 'Österreichs Initiative für sicheres Internet',
    url: 'https://www.saferinternet.at'
  },
  {
    name: 'Internet Ombudsstelle',
    detail: 'Kostenlose Hilfe bei Fotos/Fake-Konten',
    description: 'Schlichtung und Beratung bei Online-Problemen',
    url: 'https://www.ombudsstelle.at'
  },
  {
    name: 'KommAustria (RTR)',
    detail: 'Aufsichtsbehörde für Medien',
    description: 'Regulierungsbehörde für Rundfunk und Telekomm',
    url: 'https://www.rtr.at'
  }
]

const datentabelleItems = [
  'Mein Name',
  'Die Kontonummer meiner Eltern',
  'Meine Adresse',
  'Mein Spitzname',
  'Mein Lieblingsessen',
  'Was mich interessiert',
  'Mein Geburtsdatum ohne Geburtsjahr',
  'Was ich wirklich gut kann',
  'Meine Schule',
  'Aktuelles Spielelevel in meinem Lieblingsspiel',
  'Das Profilbild in meiner Lieblings-App',
  'Meine schlechteste Schulnote',
  'Mein Smartphone-Modell',
  'Die Augenfarbe meiner Oma',
  'Die Anzahl meiner Follower:innen',
  'Ein Bild das meine Eltern süß finden ich aber nicht',
  'Mein peinlichstes Bild',
  'Mein Lieblingstier',
  'Namen und Beruf meiner Eltern',
  'Das Emoji das ich am öftesten verwende',
  'Was ich einmal beruflich machen möchte'
]

function WorkshopGuide() {
  const [expandedSections, setExpandedSections] = useState({})
  const [itemStates, setItemStates] = useState({})

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const cycleItemState = (index) => {
    setItemStates(prev => {
      const current = prev[index] || 'neutral'
      let next
      if (current === 'neutral') next = 'red'
      else if (current === 'red') next = 'blue'
      else next = 'neutral'
      return { ...prev, [index]: next }
    })
  }

  const redCount = Object.values(itemStates).filter(v => v === 'red').length
  const blueCount = Object.values(itemStates).filter(v => v === 'blue').length

  return (
    <div className="workshop-guide fade-in">
      {/* Header */}
      <header className="page-header workshop-guide-header">
        <div className="wg-header-icon">
          <Shield size={40} />
        </div>
        <h1>Workshop-Begleiter: Deine Privatsphäre &amp; Sicherheit im Netz</h1>
        <p className="wg-subtitle">Dein Guide für die digitale Welt &ndash; Du bist der Boss deiner Daten!</p>
      </header>

      {/* 1. Digitale Identität */}
      <section className="section wg-section">
        <h2 className="section-title">
          <Fingerprint size={24} />
          Digitale Identität
        </h2>
        <div className="card wg-content-card">
          <p>
            Stell dir deine digitale Identität wie ein <strong>Puzzle</strong> vor: Jedes Bild, das du postest, jeder Kommentar, jedes Like und jede Anmeldung ist ein Puzzleteil. Zusammen ergeben sie ein Bild von dir &ndash; und dieses Bild sehen andere.
          </p>
          <div className="wg-definition-box">
            <div className="wg-definition-label">
              <Globe size={18} />
              Digital Footprint
            </div>
            <p>
              Alle Spuren, die du im Internet hinterlässt, werden gespeichert &ndash; von Suchmaschinen, von Plattformen, von Apps. Das ist dein <strong>digitaler Fußabdruck</strong>. Selbst wenn du etwas löschst, kann es bereits kopiert, gespeichert oder geteilt worden sein.
            </p>
          </div>
          <div className="wg-visual-metaphor">
            <div className="wg-puzzle-pieces">
              <span className="wg-puzzle-piece">Fotos</span>
              <span className="wg-puzzle-piece">Likes</span>
              <span className="wg-puzzle-piece">Kommentare</span>
              <span className="wg-puzzle-piece">Standort</span>
              <span className="wg-puzzle-piece">Suchanfragen</span>
              <span className="wg-puzzle-piece">Chats</span>
            </div>
            <p className="wg-metaphor-text">Jedes Puzzleteil verrät etwas über dich. Zusammen ergeben sie dein digitales Ich.</p>
          </div>
        </div>
      </section>

      {/* 2. Spurensuche */}
      <section className="section wg-section">
        <h2 className="section-title">
          <Search size={24} />
          Spurensuche &ndash; Detektivarbeit
        </h2>
        <p className="section-intro">Finde heraus, was das Internet über dich weiß! Hier sind drei Methoden:</p>
        <div className="wg-methods-grid">
          {detectiveMethoden.map((methode, idx) => {
            const Icon = methode.icon
            return (
              <div key={idx} className="card wg-method-card">
                <div className="wg-method-icon">
                  <Icon size={28} />
                </div>
                <h3>{methode.title}</h3>
                <p>{methode.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Daten-Kategorien */}
      <section className="section wg-section">
        <h2 className="section-title">
          <Lock size={24} />
          Daten-Kategorien
        </h2>
        <div className="card wg-table-card">
          <div className="table-container">
            <table className="table wg-data-table">
              <thead>
                <tr>
                  <th>Begriff</th>
                  <th>Definition</th>
                  <th>Beispiele</th>
                </tr>
              </thead>
              <tbody>
                {datenKategorien.map((row, idx) => (
                  <tr key={idx}>
                    <td className="wg-table-term"><strong>{row.begriff}</strong></td>
                    <td>{row.definition}</td>
                    <td className="wg-table-examples">{row.beispiele}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Recht & Ordnung */}
      <section className="section wg-section">
        <h2 className="section-title">
          <Shield size={24} />
          Recht &amp; Ordnung: Was darfst du posten?
        </h2>

        {/* Recht am eigenen Bild */}
        <div className="card wg-expandable-card">
          <button className="wg-expand-header" onClick={() => toggleSection('recht-bild')}>
            <div className="wg-expand-title">
              <Eye size={20} />
              <h3>Recht am eigenen Bild</h3>
            </div>
            {expandedSections['recht-bild'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections['recht-bild'] && (
            <div className="wg-expand-content">
              <ul className="wg-checklist">
                <li>
                  <CheckCircle size={18} className="wg-check-icon" />
                  <span><strong>Frage immer nach!</strong> Bevor du ein Foto oder Video postest, auf dem andere zu sehen sind, brauchst du deren Erlaubnis.</span>
                </li>
                <li>
                  <CheckCircle size={18} className="wg-check-icon" />
                  <span><strong>Markierungen:</strong> Viele mögen es nicht, ungefragt markiert zu werden. Frage vorher nach.</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Urheberrecht */}
        <div className="card wg-expandable-card">
          <button className="wg-expand-header" onClick={() => toggleSection('urheberrecht')}>
            <div className="wg-expand-title">
              <Lock size={20} />
              <h3>Urheberrecht</h3>
            </div>
            {expandedSections['urheberrecht'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections['urheberrecht'] && (
            <div className="wg-expand-content">
              <ul className="wg-checklist">
                <li>
                  <XCircle size={18} className="wg-x-icon" />
                  <span><strong>Fremde Werke sind geschützt!</strong> Bilder, Musik und Videos gehören dem, der sie gemacht hat.</span>
                </li>
                <li>
                  <CheckCircle size={18} className="wg-check-icon" />
                  <span><strong>Kostenlose Bilder:</strong> Pixabay.com, Pexels.com, Unsplash.com</span>
                </li>
                <li>
                  <HelpCircle size={18} className="wg-info-icon" />
                  <span><strong>Instagram-Musik:</strong> Nur innerhalb der App nutzbar (z.B. für Reels).</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 5. App-Einstellungen */}
      <section className="section wg-section">
        <h2 className="section-title">
          <Smartphone size={24} />
          App-Einstellungen &ndash; Dein Schlachtplan
        </h2>

        {/* Instagram */}
        <div className="card wg-expandable-card wg-app-card">
          <button className="wg-expand-header" onClick={() => toggleSection('instagram')}>
            <div className="wg-expand-title">
              <EyeOff size={20} />
              <h3>Instagram: Deine Regeln!</h3>
            </div>
            {expandedSections['instagram'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections['instagram'] && (
            <div className="wg-expand-content">
              <div className="wg-tipps-list">
                {instagramTipps.map((tipp, idx) => (
                  <div key={idx} className="wg-tipp-item">
                    <CheckCircle size={16} className="wg-check-icon" />
                    <div>
                      <strong>{tipp.title}:</strong> {tipp.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Snapchat */}
        <div className="card wg-expandable-card wg-app-card">
          <button className="wg-expand-header" onClick={() => toggleSection('snapchat')}>
            <div className="wg-expand-title">
              <EyeOff size={20} />
              <h3>Snapchat: Sicher snappen!</h3>
            </div>
            {expandedSections['snapchat'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections['snapchat'] && (
            <div className="wg-expand-content">
              <div className="wg-tipps-list">
                {snapchatTipps.map((tipp, idx) => (
                  <div key={idx} className="wg-tipp-item">
                    <CheckCircle size={16} className="wg-check-icon" />
                    <div>
                      <strong>{tipp.title}:</strong> {tipp.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="wg-warning-box">
                <AlertTriangle size={18} />
                <span><strong>Achtung Kostenfalle:</strong> Snapchat+ und Flammen kosten echtes Geld!</span>
              </div>
              <div className="wg-warning-box">
                <AlertTriangle size={18} />
                <span><strong>My AI &amp; Screenshots:</strong> Keine Geheimnisse an My AI &ndash; alles wird gespeichert!</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Passwörter & 2FA */}
      <section className="section wg-section">
        <h2 className="section-title">
          <Key size={24} />
          Passwörter &amp; 2FA
        </h2>
        <div className="wg-tipps-grid">
          {passwortTipps.map((tipp, idx) => {
            const Icon = tipp.icon
            return (
              <div key={idx} className="card wg-password-card">
                <div className="wg-password-icon">
                  <Icon size={28} />
                </div>
                <h3>{tipp.title}</h3>
                <p>{tipp.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 7. Notfallplan */}
      <section className="section wg-section wg-emergency-section">
        <h2 className="section-title wg-emergency-title">
          <AlertTriangle size={24} />
          Notfallplan
        </h2>

        {/* Sofort-Hilfe bei Hack */}
        <div className="card wg-expandable-card wg-emergency-card">
          <button className="wg-expand-header" onClick={() => toggleSection('hack')}>
            <div className="wg-expand-title">
              <Lock size={20} />
              <h3>Sofort-Hilfe bei Hack</h3>
            </div>
            {expandedSections['hack'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections['hack'] && (
            <div className="wg-expand-content">
              <ol className="wg-steps-list">
                <li>
                  <span className="wg-step-label">Check:</span> Kommst du noch rein? Wenn ja: Passwort sofort ändern + 2FA einschalten.
                </li>
                <li>
                  <span className="wg-step-label">Rettung:</span> Wenn nicht: &bdquo;Passwort vergessen&ldquo;-Funktion oder Hilfeseite der Plattform nutzen.
                </li>
                <li>
                  <span className="wg-step-label">Warnung:</span> Kontakten Bescheid sagen, dass dein Account gehackt wurde.
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Mobbing & Belästigung */}
        <div className="card wg-expandable-card wg-emergency-card">
          <button className="wg-expand-header" onClick={() => toggleSection('mobbing')}>
            <div className="wg-expand-title">
              <Shield size={20} />
              <h3>Erste Schritte bei Mobbing &amp; Belästigung</h3>
            </div>
            {expandedSections['mobbing'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections['mobbing'] && (
            <div className="wg-expand-content">
              <ol className="wg-steps-list">
                <li>
                  <span className="wg-step-label">Stopp:</span> Nicht auf Beleidigungen reagieren.
                </li>
                <li>
                  <span className="wg-step-label">Beweise:</span> Screenshots von allem (mit Datum und Name!).
                </li>
                <li>
                  <span className="wg-step-label">Melden:</span> Person blockieren und Profil bei der App melden.
                </li>
                <li>
                  <span className="wg-step-label">Reden:</span> Vertrau dich Erwachsenen an!
                </li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* 8. Beratungsstellen */}
      <section className="section wg-section">
        <h2 className="section-title">
          <Phone size={24} />
          Beratungsstellen
        </h2>
        <div className="wg-beratung-grid">
          {beratungsstellen.map((stelle, idx) => (
            <a
              key={idx}
              href={stelle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card wg-beratung-card"
            >
              <div>
                <h3>{stelle.name}</h3>
                <p className="wg-beratung-detail">{stelle.detail}</p>
                <p className="wg-beratung-desc">{stelle.description}</p>
              </div>
              <ExternalLink size={18} className="wg-external-icon" />
            </a>
          ))}
        </div>
      </section>

      {/* 9. Datentabelle Exercise */}
      <section className="section wg-section">
        <h2 className="section-title">
          <HelpCircle size={24} />
          Übung: Was gehört ins Netz?
        </h2>
        <p className="section-intro">
          Bewerte die folgenden Daten &ndash; Klicke auf eine Karte, um sie einzufärben:
        </p>
        <div className="wg-exercise-legend">
          <span className="wg-legend-item wg-legend-red">Geht auf keinen Fall</span>
          <span className="wg-legend-item wg-legend-blue">Könnte blöd ausgehen</span>
          <span className="wg-legend-item wg-legend-neutral">Noch nicht bewertet</span>
        </div>

        <div className="wg-datentabelle-grid">
          {datentabelleItems.map((item, idx) => {
            const state = itemStates[idx] || 'neutral'
            return (
              <button
                key={idx}
                className={`wg-daten-item wg-daten-${state}`}
                onClick={() => cycleItemState(idx)}
              >
                <span className="wg-daten-indicator">
                  {state === 'red' && <XCircle size={18} />}
                  {state === 'blue' && <AlertTriangle size={18} />}
                  {state === 'neutral' && <HelpCircle size={18} />}
                </span>
                <span className="wg-daten-label">{item}</span>
              </button>
            )
          })}
        </div>

        <div className="wg-exercise-summary card">
          <h3>Deine Auswertung</h3>
          <div className="wg-summary-counts">
            <div className="wg-summary-item wg-summary-red">
              <XCircle size={20} />
              <span><strong>{redCount}</strong> Geht auf keinen Fall</span>
            </div>
            <div className="wg-summary-item wg-summary-blue">
              <AlertTriangle size={20} />
              <span><strong>{blueCount}</strong> Könnte blöd ausgehen</span>
            </div>
            <div className="wg-summary-item wg-summary-neutral">
              <HelpCircle size={20} />
              <span><strong>{datentabelleItems.length - redCount - blueCount}</strong> Noch nicht bewertet</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkshopGuide
