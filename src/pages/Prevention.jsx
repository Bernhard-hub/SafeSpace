import React, { useState } from 'react'
import { Shield, BookOpen, Users, Clock, Download, Play, ExternalLink, FileText, ChevronDown, ChevronRight, Copy, CheckCircle, MessageCircle, Lightbulb, Heart, Table, HelpCircle, Smartphone } from 'lucide-react'
import './Prevention.css'

const workshopModules = [
  {
    id: 1,
    title: 'Sicher surfen – smart reagieren',
    duration: '100 Min',
    targetGroup: 'Sekundarstufe 12–14 Jahre',
    description: 'Schüler:innen erkennen Gefahren wie Cybergrooming, Sextortion, Doxing. Sie kennen Warnzeichen von Manipulation, wissen wie sie sich online schützen können und an wen sie sich bei Problemen wenden können.',
    materials: ['Beamer/Smartboard', 'Präsentation (PowerPoint/Canva)', 'Flipchart & Marker', 'Moderationskarten', 'Arbeitsblätter mit Fallbeispielen', 'Stickerpunkte (bunt)', 'A4-Plakate mit Plattform-Logos', 'Kahoot-Quiz (vorbereitet)', 'Info-Flyer Beratungsstellen'],
    phases: [
      { time: '0–5 Min', phase: '1 – Begrüßung & Rahmen', content: 'Begrüßung, Vorstellung, Ablauf erklären. Vertraulichkeitsregel: „Was hier besprochen wird, bleibt hier." Ziel: Sicherer Raum schaffen.' },
      { time: '5–15 Min', phase: '2 – Sensibilisierung', content: 'Spiel: Verpixelte Bilder von Online-Plattformen erraten lassen. A4-Plakate der Logos (Instagram, TikTok, Snapchat, WhatsApp, YouTube, Discord) im Raum verteilen. Schüler:innen kleben Stickerpunkte auf die Plattformen, die sie nutzen. Reflexionsfrage: „Was macht ihr täglich im Internet?" – kurzer Austausch.' },
      { time: '15–30 Min', phase: '3 – Input: Gefahren erkennen', content: 'Kurze, altersgerechte Inputs mit Präsentation zu: Cybergrooming (Manipulationsstrategien, Warnzeichen), Sextortion (Erpressung mit intimen Bildern), Doxing (Veröffentlichung privater Daten), Cybermobbing (systematische Belästigung). An der Tafel/Flipchart: Begriffe sammeln und gemeinsam erklären. Diskussion: „Was ist erlaubt und was nicht?" – Rechtliche Grundlagen altersgerecht.' },
      { time: '30–50 Min', phase: '4 – Gruppenarbeit: Fallbeispiele', content: 'Klasse in 4–5 Kleingruppen teilen. Jede Gruppe erhält ein Arbeitsblatt mit einem realistischen Fallbeispiel (z.B. Fake-Profil, verdächtige Kontaktaufnahme, peinliches Video geteilt). Leitfragen: Was ist passiert? Wer ist betroffen? Was würdet ihr tun? An wen könnt ihr euch wenden? Ergebnisse auf Flipchart-Poster festhalten.' },
      { time: '50–60 Min', phase: '5 – Präsentation & Diskussion', content: 'Jede Gruppe stellt ihr Fallbeispiel und ihre Lösungsvorschläge vor (je 2 Min). Gemeinsame Diskussion: Welche Lösungen waren besonders gut? Was hat gefehlt? Lehrkraft ergänzt fehlende Aspekte und korrigiert Fehlinformationen.' },
      { time: '60–75 Min', phase: '6 – Schutzstrategien erarbeiten', content: 'Gemeinsam Schutzstrategien sammeln: Privatsphäre-Einstellungen (live zeigen auf Beamer), Passwort-Sicherheit und 2FA, Was tun bei verdächtigen Nachrichten?, Beweissicherung (Screenshots mit Zeitstempel). Moderationskarten: Schüler:innen schreiben je 1 eigene Schutzstrategie auf, an Pinnwand sammeln.' },
      { time: '75–85 Min', phase: '7 – Anlaufstellen & Hilfe', content: 'Vorstellung konkreter Anlaufstellen: Rat auf Draht 147 (kostenlos, anonym, 24/7), Saferinternet.at (Infos und Materialien), ZARA – #GegenHassimNetz (Meldestelle), Stopline.at (illegale Inhalte melden), Schulische Ansprechpersonen benennen. Info-Flyer austeilen.' },
      { time: '85–100 Min', phase: '8 – Quiz & Feedback', content: 'Kahoot-Quiz mit 8–10 Fragen zur Wiederholung der wichtigsten Inhalte. Blitzlicht-Runde: „Was nehme ich heute mit?" (1 Satz pro Person). Feedbackbogen austeilen (3 Fragen: Was war neu? Was war hilfreich? Was wünschst du dir noch?). Verabschiedung und Hinweis auf Beratungsangebote.' },
    ]
  },
  {
    id: 2,
    title: 'Einführung Cybermobbing',
    duration: '45 Min',
    targetGroup: 'Sekundarstufe I',
    description: 'Grundlagen, Definitionen und Erkennungsmerkmale von Cybermobbing. Unterschiede zu analogem Mobbing. Erste Handlungsstrategien.',
    materials: ['Präsentation', 'Arbeitsblätter', 'Video'],
    phases: []
  },
  {
    id: 3,
    title: 'Digitale Zivilcourage',
    duration: '45 Min',
    targetGroup: 'Alle Altersstufen',
    description: 'Wie man als Bystander reagieren kann, Unterstützung anbieten, Zivilcourage im digitalen Raum zeigen.',
    materials: ['Rollenspiel-Szenarien', 'Diskussionskarten'],
    phases: []
  },
  {
    id: 4,
    title: 'Elternabend: Kinder im Netz',
    duration: '90 Min',
    targetGroup: 'Eltern',
    description: 'Überblick für Eltern: Risiken erkennen, Gespräche führen, Hilfe holen. Aktuelle Trends und Plattformen.',
    materials: ['Präsentation', 'Handout', 'FAQ'],
    phases: []
  },
  {
    id: 5,
    title: 'Sicherer Umgang im Netz – Datenschutz & Privatsphäre',
    duration: '180 Min (4 Einheiten)',
    targetGroup: 'Kinder ab 10 Jahren',
    description: 'Bewusstsein für digitale Identität schaffen; Kontrolle über eigene Daten im Netz; Privatsphäre-Einstellungen in sozialen Netzwerken verstehen; Wissen über Datenschutz und das Recht am eigenen Bild erlangen.',
    materials: ['Internetzugang (Smartphone/Tablet/Laptop)', 'Beamer', 'Arbeitsblatt Datenschutz', 'Zugriff auf Suchmaschinen', 'Quiz-Tools (Mentimeter/Kahoot)', 'Infosheets für Eltern'],
    phases: [
      { time: 'Einheit 1 (45 Min)', phase: 'Privatsphäre', content: '10 Min: Einstieg – Übung „My AI weiß alles über mich" (interaktive Online-Übung). 10 Min: Bewusstsein schaffen – Diskussion zur digitalen Identität (Brainstorming). 10 Min: Spurensuche – Namenssuche, Google Alert und umgekehrte Bildersuche (Eigenrecherche). 15 Min: Privatsphäre-Themenblock – Definition, Schutz persönlicher Daten, Umgang mit Fotos, Recht am eigenen Bild (Vortrag & Diskussion). Abschluss: Infoblatt für Eltern & Kinder über Privatsphäre-Einstellungen.' },
      { time: 'Einheit 2 (45 Min)', phase: 'Datenschutz', content: '5 Min: Einstieg – Inhaltsabfrage über Privatsphäre, Austausch über Eltern-Gespräche (Reflexion). 20 Min: Datenschutz – Definition & Datensammlung: Wer sammelt was? (Interaktiver Vortrag). 20 Min: Wichtige Einstellungen – Menti-Abfrage: Welche sozialen Netzwerke werden genutzt? Schüler:innen erstellen aus Infosheets Präsentationen und zeigen Mitschüler:innen wichtige Einstellungen. 10 Min: Internetspuren am Computer beseitigen (Vortrag). 10 Min: Abschluss – Arbeitsblatt Datenschutz „Was gehört ins Netz?" und Infoblatt für Eltern.' },
      { time: 'Einheit 3 (45 Min)', phase: 'Sichere Kommunikation', content: '5 Min: Rückblick – Inhaltsabfrage der letzten Einheit, Eltern-Gespräche, neue Erkenntnisse (Reflexion). 15 Min: Einstieg – Wie kommunizieren Jugendliche im Internet? (Interaktive Umfrage über Menti + Fakteneinstieg). 10 Min: Emojis und ihre Bedeutungen. 10 Min: Urheberrecht. 10 Min: Digital Services Act. Abschluss: Notfallplan – Was tun bei Hackangriffen?' },
      { time: 'Einheit 4 (85–90 Min)', phase: 'Abschluss & Quiz', content: 'Reflexion und spielerisches Quiz: Safer Internet Schnitzeljagd (Online-Quiz). Wiederholung aller Inhalte der vorherigen Einheiten. Feedback-Runde.' },
    ]
  },
]

const myAIExercise = {
  title: 'Übung: My AI weiß alles über mich',
  subtitle: 'Zielgruppe: Schüler:innen die Snapchat nutzen',
  goals: [
    'Informationskompetenz der Schüler:innen stärken',
    'Verstehen, warum Privatsphäre & Datenschutz wichtig ist',
    'Wissen, wie man seine Daten schützen kann',
    'Neue Tools im Internet einschätzen und nutzen können'
  ],
  preparation: 'Erheben Sie, wie viele Kinder in der Klasse Snapchat verwenden und welche Tools (z. B. Streaks, Snapmap) sie dort nutzen. Diskutieren Sie mit jenen Kindern, die MyAI nutzen, was sie daran mögen und was nicht.',
  tableRows: [
    { knows: 'wo ich wohne', why: 'durch den Standort', action: 'Standort deaktivieren' },
    { knows: 'welche Sprache(n) ich spreche', why: 'durch den Standort und wie ich in MyAI schreibe', action: 'Standort deaktivieren' },
    { knows: 'was mich interessiert (Hobbies, Vorlieben)', why: 'könnte bei „Interessen" angeklickt sein oder im Chat besprochen', action: 'Interessen verändern, nicht darüber schreiben' },
    { knows: 'wo ich mich gerade befinde', why: 'durch die Snapmap', action: 'Snapmap und Standort deaktivieren' },
    { knows: 'wie es mir geht', why: 'habe ich im Chat besprochen', action: 'nicht darüber schreiben' },
    { knows: 'wer meine Freund:innen sind', why: 'habe ich im Chat besprochen', action: 'nicht darüber schreiben' },
  ],
  discussion: 'Überlegen Sie gemeinsam mit den Schüler:innen, welche Vor- und Nachteile Tools wie MyAI haben können. Brainstorming auf Tafel/Whiteboard. Diskutieren Sie die Ergebnisse und gehen Sie auf mögliche Ängste der Schüler:innen ein.'
}

const conversationGuide = {
  sections: [
    {
      title: '2.1 Eröffnung des Gesprächs',
      goal: 'Vertrauen schaffen und Ängste nehmen',
      examples: [
        '„Es ist wirklich mutig und gut, dass du heute zu mir gekommen bist, um darüber zu reden."',
        '„Ich höre dir jetzt ganz ruhig zu. Wir finden gemeinsam eine Lösung, ohne dass du Vorwürfe befürchten musst."'
      ]
    },
    {
      title: '2.2 Wichtige Fragen zur Situationserfassung',
      goal: 'Den technischen und sozialen Status sachlich klären',
      examples: [
        '„Kannst du mir beschreiben, was genau passiert ist?"',
        '„Hast du im Moment noch Zugriff auf dein Profil oder wurde das Passwort schon geändert?"',
        '„Sind in deinem Namen schon Nachrichten verschickt worden, von denen du nichts weißt?"'
      ]
    },
    {
      title: '2.3 Empathische Reaktionen',
      goal: 'Emotionale Unterstützung signalisieren',
      examples: [
        '„Ich kann verstehen, dass dich das gerade sehr belastet. So etwas kann leider auch Erwachsenen passieren."',
        '„Du bist nicht schuld daran, dass jemand anderes deine Daten missbraucht oder dich bedrängt."'
      ]
    },
    {
      title: '2.4 Abschluss und nächste Schritte',
      goal: 'Handlungsfähigkeit wiederherstellen',
      examples: [
        '„Wir ändern jetzt sofort deine Passwörter und aktivieren die Zwei-Faktor-Authentifizierung."',
        '„Wir informieren deine engsten Freunde, damit sie nicht auf Fake-Nachrichten hereinfallen."',
        '„Ich begleite dich dabei, den Vorfall direkt bei der Plattform zu melden."'
      ]
    }
  ]
}

const textTemplates = {
  einleitung: [
    'Im vorliegenden Bericht wird ein gemeldeter Vorfall von Cybermobbing dokumentiert. Die betroffene Person schilderte wiederholte belastende Nachrichten bzw. Inhalte auf einer digitalen Plattform.',
    'Die folgende Dokumentation beschreibt einen gemeldeten Cybermobbing-Fall. Ziel ist es, den Vorfall, den bisherigen Verlauf sowie die gesetzten Maßnahmen nachvollziehbar festzuhalten.',
    'Am [Datum] wurde ein Vorfall im Zusammenhang mit digitaler Belästigung gemeldet. Die betroffene Person berichtete über beleidigende bzw. verletzende Inhalte auf einer Online-Plattform.',
    'Der vorliegende Bericht dient der strukturierten Dokumentation eines gemeldeten Vorfalls im digitalen Raum. Dabei werden die Situation der betroffenen Person sowie erste Einschätzungen festgehalten.',
  ],
  intervention: [
    'Nach Eingang der Meldung wurde der Vorfall dokumentiert und ein erstes Gespräch mit der betroffenen Person geführt, um den Verlauf und die Auswirkungen zu klären.',
    'Zur Sicherung der Vorfälle wurden vorhandene Inhalte dokumentiert (z. B. Screenshots). Die betroffene Person wurde über mögliche weitere Schritte informiert.',
    'Es erfolgte eine erste Einschätzung der Situation sowie eine Beratung der betroffenen Person hinsichtlich möglicher Schutzmaßnahmen.',
    'Die Inhalte wurden auf der jeweiligen Plattform gemeldet. Parallel dazu wurde die betroffene Person über Unterstützungsangebote informiert.',
    'Bei Bedarf wurden weitere Bezugspersonen bzw. Institutionen einbezogen, um eine angemessene Unterstützung sicherzustellen.',
  ],
  empfehlung: [
    'Es wird empfohlen, die Situation weiterhin zu beobachten und bei weiteren Vorfällen erneut Kontakt mit der Beratungsstelle aufzunehmen.',
    'Die betroffene Person wurde darüber informiert, belastende Inhalte zu dokumentieren und gegebenenfalls erneut zu melden.',
    'Weitere Beratungsgespräche können zur Stabilisierung und Unterstützung der betroffenen Person beitragen.',
    'Bei anhaltenden Vorfällen wird empfohlen, zusätzliche Schritte zu prüfen, etwa weitere Meldungen an Plattformbetreiber oder rechtliche Beratung.',
    'Ziel der weiteren Maßnahmen ist es, die betroffene Person zu schützen und zukünftige digitale Übergriffe möglichst zu verhindern.',
  ]
}

const externalResources = [
  { name: 'Saferinternet.at', url: 'https://www.saferinternet.at', description: 'Österreichs Initiative für sicheres Internet' },
  { name: 'Klicksafe.de', url: 'https://www.klicksafe.de', description: 'EU-Initiative für Medienkompetenz' },
  { name: 'Rat auf Draht', url: 'https://www.rataufdraht.at', description: 'Beratung für Kinder und Jugendliche' },
  { name: 'ZARA – #GegenHassimNetz', url: 'https://www.zara.or.at', description: 'Beratung und Meldung bei Hasspostings' },
]

function Prevention() {
  const [expandedWorkshop, setExpandedWorkshop] = useState(null)
  const [expandedTemplates, setExpandedTemplates] = useState({})
  const [copiedId, setCopiedId] = useState(null)

  const toggleWorkshop = (id) => {
    setExpandedWorkshop(prev => prev === id ? null : id)
  }

  const toggleTemplate = (id) => {
    setExpandedTemplates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="prevention fade-in">
      <header className="page-header">
        <h1>Prävention & Workshops</h1>
        <p>Workshop-Materialien, Präventionskonzepte und Textbausteine für die pädagogische Praxis</p>
      </header>

      {/* Workshop-Module */}
      <section className="section">
        <h2 className="section-title">
          <BookOpen size={24} />
          Workshop-Module
        </h2>

        <div className="workshop-grid">
          {workshopModules.map((workshop) => (
            <div key={workshop.id} className={`workshop-card card ${expandedWorkshop === workshop.id ? 'expanded' : ''}`}>
              <div className="workshop-header">
                <h3>{workshop.title}</h3>
                <div className="workshop-meta">
                  <span className="meta-item">
                    <Clock size={14} />
                    {workshop.duration}
                  </span>
                  <span className="meta-item">
                    <Users size={14} />
                    {workshop.targetGroup}
                  </span>
                </div>
              </div>

              <p className="workshop-description">{workshop.description}</p>

              <div className="workshop-materials">
                <span className="materials-label">Materialien:</span>
                <div className="materials-list">
                  {workshop.materials.map((material, idx) => (
                    <span key={idx} className="material-tag">{material}</span>
                  ))}
                </div>
              </div>

              {workshop.phases.length > 0 && (
                <>
                  <button
                    className="btn btn-secondary btn-sm toggle-phases-btn"
                    onClick={() => toggleWorkshop(workshop.id)}
                  >
                    {expandedWorkshop === workshop.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    {expandedWorkshop === workshop.id ? 'Ablaufplan ausblenden' : 'Ablaufplan anzeigen'}
                  </button>

                  {expandedWorkshop === workshop.id && (
                    <div className="workshop-phases">
                      <table className="phases-table">
                        <thead>
                          <tr>
                            <th>Zeit</th>
                            <th>Phase</th>
                            <th>Inhalt / Aktivität</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workshop.phases.map((phase, idx) => (
                            <tr key={idx}>
                              <td className="phase-time">{phase.time}</td>
                              <td className="phase-name">{phase.phase}</td>
                              <td>{phase.content}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Übungen & Aktivitäten */}
      <section className="section">
        <h2 className="section-title">
          <Lightbulb size={24} />
          Übungen & Aktivitäten
        </h2>

        {/* My AI Exercise */}
        <div className="card" style={{ marginBottom: '1rem' }}>
          <button className="template-group-header" onClick={() => toggleTemplate('myai')}>
            <h3><Smartphone size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />{myAIExercise.title}</h3>
            {expandedTemplates['myai'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedTemplates['myai'] && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>{myAIExercise.subtitle}</p>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Lernziele:</h4>
                <ul style={{ paddingLeft: '1.2rem' }}>
                  {myAIExercise.goals.map((goal, i) => (
                    <li key={i} style={{ padding: '0.2rem 0', fontSize: '0.95rem' }}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#fef3c7', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <strong>Vorbereitung:</strong> {myAIExercise.preparation}
              </div>

              <h4 style={{ marginBottom: '0.8rem' }}>Phase 1 – Tabelle erstellen:</h4>
              <div style={{ overflowX: 'auto' }}>
                <table className="phases-table" style={{ marginBottom: '1.5rem' }}>
                  <thead>
                    <tr>
                      <th>Was weiß MyAI über mich?</th>
                      <th>Warum weiß MyAI das?</th>
                      <th>Was könnte ich dagegen tun?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myAIExercise.tableRows.map((row, i) => (
                      <tr key={i}>
                        <td>{row.knows}</td>
                        <td>{row.why}</td>
                        <td>{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ background: '#ede9fe', borderRadius: '8px', padding: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <strong>Phase 2 – Diskussion:</strong> {myAIExercise.discussion}
              </div>
            </div>
          )}
        </div>

        {/* Gesprächsleitfaden */}
        <div className="card" style={{ marginBottom: '1rem' }}>
          <button className="template-group-header" onClick={() => toggleTemplate('gespraechsleitfaden')}>
            <h3><MessageCircle size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />Gesprächsleitfaden für Betroffene</h3>
            {expandedTemplates['gespraechsleitfaden'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedTemplates['gespraechsleitfaden'] && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Dieser Leitfaden basiert auf dem pädagogischen Grundsatz: <strong>Aufklären statt verurteilen.</strong>
              </p>
              {conversationGuide.sections.map((section, i) => (
                <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: i % 2 === 0 ? '#f0fdf4' : '#eff6ff', borderRadius: '8px' }}>
                  <h4 style={{ marginBottom: '0.3rem' }}>{section.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                    <Heart size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
                    Ziel: {section.goal}
                  </p>
                  {section.examples.map((example, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <MessageCircle size={14} style={{ flexShrink: 0, marginTop: '3px', color: '#6366f1' }} />
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{example}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Textbausteine für Fallberichte */}
      <section className="section">
        <h2 className="section-title">
          <FileText size={24} />
          Textbausteine für Fallberichte
        </h2>
        <p className="section-intro">Vorgefertigte Textbausteine zum Kopieren für die Falldokumentation.</p>

        <div className="templates-container">
          {/* Einleitung */}
          <div className="template-group card">
            <button className="template-group-header" onClick={() => toggleTemplate('einleitung')}>
              <h3>Einleitung eines Fallberichts</h3>
              {expandedTemplates['einleitung'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {expandedTemplates['einleitung'] && (
              <div className="template-list">
                {textTemplates.einleitung.map((text, idx) => (
                  <div key={idx} className="template-item">
                    <p>{text}</p>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(text, `einleitung-${idx}`)}
                      title="In Zwischenablage kopieren"
                    >
                      {copiedId === `einleitung-${idx}` ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interventionsmaßnahmen */}
          <div className="template-group card">
            <button className="template-group-header" onClick={() => toggleTemplate('intervention')}>
              <h3>Beschreibung der Interventionsmaßnahmen</h3>
              {expandedTemplates['intervention'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {expandedTemplates['intervention'] && (
              <div className="template-list">
                {textTemplates.intervention.map((text, idx) => (
                  <div key={idx} className="template-item">
                    <p>{text}</p>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(text, `intervention-${idx}`)}
                      title="In Zwischenablage kopieren"
                    >
                      {copiedId === `intervention-${idx}` ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Empfehlungen */}
          <div className="template-group card">
            <button className="template-group-header" onClick={() => toggleTemplate('empfehlung')}>
              <h3>Empfehlungen und nächste Schritte</h3>
              {expandedTemplates['empfehlung'] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {expandedTemplates['empfehlung'] && (
              <div className="template-list">
                {textTemplates.empfehlung.map((text, idx) => (
                  <div key={idx} className="template-item">
                    <p>{text}</p>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(text, `empfehlung-${idx}`)}
                      title="In Zwischenablage kopieren"
                    >
                      {copiedId === `empfehlung-${idx}` ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Externe Ressourcen */}
      <section className="section">
        <h2 className="section-title">
          <ExternalLink size={24} />
          Externe Ressourcen
        </h2>

        <div className="resources-list">
          {externalResources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-item card"
            >
              <div>
                <h4>{resource.name}</h4>
                <p>{resource.description}</p>
              </div>
              <ExternalLink size={20} />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Prevention
