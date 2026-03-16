import React, { useState } from 'react'
import { Shield, BookOpen, Users, Clock, Download, Play, ExternalLink, FileText, ChevronDown, ChevronRight, Copy, CheckCircle } from 'lucide-react'
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
]

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
