import React, { useState } from 'react'
import {
  Bot,
  Send,
  Lightbulb,
  MessageCircle,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Copy,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import './AIAdvisor.css'

// Lokale KI-Wissensbasis - Gesprächsleitfaden Digitale Gewalt
// Erstellt von Studierenden der KPH Edith Stein, März 2026
const knowledgeBase = {
  cybermobbing: {
    erstgespraech: [
      "Danke, dass du dich meldest. Es ist gut, dass du darüber sprechen möchtest.",
      "Hier ist ein geschützter Raum. Du wirst nicht bewertet oder verurteilt.",
      "Was dir online passiert ist, ist nicht deine Schuld.",
      "Du bestimmst das Tempo. Wir gehen Schritt für Schritt vor.",
      "Magst du mir erzählen, was gerade passiert ist?",
      "Was hat dich heute dazu gebracht, Hilfe zu suchen?",
      "Wie geht es dir im Moment damit?"
    ],
    fragen: [
      "Was genau wurde geschrieben oder gepostet?",
      "Seit wann erlebst du diese Situation?",
      "Auf welchen Plattformen passiert das?",
      "Wer ist beteiligt?",
      "Wie oft kommt es vor?",
      "Wie fühlst du dich in diesen Momenten?",
      "Wie wirkt sich das auf deinen Alltag aus?",
      "Hast du bereits mit jemandem darüber gesprochen?",
      "Fühlst du dich aktuell sicher?"
    ],
    empathie: [
      "Das klingt sehr verletzend.",
      "Niemand hat das Recht, dich online herabzusetzen.",
      "Es ist nachvollziehbar, dass dich das belastet.",
      "Du bist nicht verantwortlich für das Verhalten anderer.",
      "Du musst da nicht alleine durch."
    ],
    sofortmassnahmen: [
      "Ich fasse kurz zusammen, was du geschildert hast.",
      "Ein möglicher nächster Schritt wäre, Beweise zu sichern.",
      "Möchtest du wissen, wie man Inhalte meldet oder blockiert?",
      "Du kannst jederzeit wieder Unterstützung suchen."
    ],
    elterngespraech: [
      "Informieren Sie sachlich über die Situation.",
      "Vermeiden Sie Schuldzuweisungen an das Kind.",
      "Erklären Sie typische Dynamiken bei Cybermobbing.",
      "Geben Sie konkrete Handlungsempfehlungen für zu Hause.",
      "Besprechen Sie gemeinsam mögliche Schutzmaßnahmen.",
      "Weisen Sie auf professionelle Beratungsstellen hin (z.B. Rat auf Draht 147)."
    ],
    dokumentation: [
      "Datum und Uhrzeit des Vorfalls",
      "Beteiligte Plattform(en)",
      "Art der Belästigung (Text, Bild, Video, Ausgrenzung)",
      "Screenshots mit Zeitstempel sichern",
      "Beteiligte Personen (anonymisiert)",
      "Emotionale Reaktion des/der Betroffenen",
      "Bereits ergriffene Maßnahmen"
    ]
  },
  sextortion: {
    erstgespraech: [
      "Danke, dass du dieses sehr persönliche Thema ansprichst.",
      "Viele Menschen empfinden in solchen Situationen Scham oder Angst.",
      "Wichtig ist: Wenn dich jemand unter Druck setzt, liegt die Verantwortung nicht bei dir.",
      "Du wirst hier nicht verurteilt.",
      "Magst du mir erzählen, was passiert ist?"
    ],
    fragen: [
      "Wurden intime Bilder freiwillig verschickt oder unter Druck?",
      "Wird mit Veröffentlichung gedroht?",
      "Wird Geld oder weiteres Material verlangt?",
      "Kennst du die Person im realen Leben?",
      "Wie fühlst du dich aktuell damit?",
      "Fühlst du dich bedroht?"
    ],
    empathie: [
      "Erpressung ist eine Form von Gewalt.",
      "Auch wenn du Bilder geteilt hast, rechtfertigt das keine Drohungen.",
      "Es ist verständlich, dass dich das stark belastet.",
      "Du bist nicht schuld."
    ],
    sofortmassnahmen: [
      "Gehe nicht auf weitere Forderungen ein.",
      "Sichere alle Nachrichten als Beweis.",
      "Es gibt Möglichkeiten, Inhalte entfernen zu lassen.",
      "Wir können gemeinsam überlegen, welcher Schritt sich für dich sicher anfühlt.",
      "NICHT zahlen – Erpresser fordern meist mehr.",
      "Profil/Account des Erpressers melden und blockieren.",
      "Passwörter aller Accounts ändern.",
      "Anzeige bei der Polizei erstatten.",
      "Bei Minderjährigen: Eltern einbeziehen."
    ],
    elterngespraech: [
      "Sachliche Information über die Situation, ohne Vorwürfe.",
      "Gemeinsame Besprechung von Sofortmaßnahmen.",
      "Stärkung der Kommunikation zu Hause.",
      "Information über Beratungsstellen (Rat auf Draht 147)."
    ],
    dokumentation: [
      "Art der Erpressung (Drohung, Forderung)",
      "Beteiligte Plattform(en) und Accounts",
      "Zeitverlauf der Kontaktaufnahme",
      "Screenshots aller Nachrichten und Drohungen",
      "Ob Zahlungen geleistet wurden",
      "Emotionale Auswirkungen"
    ]
  },
  cybergrooming: {
    erstgespraech: [
      "Danke, dass du dein Gefühl ernst nimmst.",
      "Manche Personen bauen gezielt Vertrauen auf, um es auszunutzen.",
      "Wenn sich etwas unangenehm anfühlt, ist das wichtig.",
      "Du bist nicht schuld, wenn jemand dein Vertrauen missbraucht.",
      "Magst du erzählen, was passiert ist?"
    ],
    fragen: [
      "Wie hast du die Person kennengelernt?",
      "Hat die Person um Geheimhaltung gebeten?",
      "Gab es intime Fragen oder Forderungen?",
      "Wurde ein Treffen vorgeschlagen?",
      "Besteht aktuell noch Kontakt?",
      "Fühlst du dich sicher?"
    ],
    empathie: [
      "Manipulation passiert oft schleichend.",
      "Es ist gut, dass du aufmerksam geworden bist.",
      "Dein Gefühl darf ernst genommen werden."
    ],
    sofortmassnahmen: [
      "Beende den Kontakt möglichst sofort.",
      "Blockiere und melde das Profil.",
      "Beziehe eine Vertrauensperson ein.",
      "Bei akuter Gefahr bitte sofort Hilfe holen.",
      "Alle Beweise sichern vor dem Blockieren.",
      "Sofortige Anzeige bei der Polizei (§ 208a StGB).",
      "Psychologische Unterstützung organisieren."
    ],
    warnzeichen: [
      "Übermäßiges Interesse an Alter und Aussehen",
      "Schnelle Vertrauensbildung und 'Geheimhaltung'",
      "Geschenke oder Versprechungen",
      "Isolation von Freunden und Familie",
      "Sexualisierte Gespräche oder Anfragen nach Bildern",
      "Druck zur heimlichen Kommunikation"
    ],
    elterngespraech: [
      "Kind nicht beschuldigen oder Vorwürfe machen.",
      "Ruhe bewahren trotz der Schwere der Situation.",
      "Gemeinsam nächste Schritte besprechen.",
      "Professionelle Beratung empfehlen (Rat auf Draht 147)."
    ],
    dokumentation: [
      "Plattform und Profilname des Kontakts",
      "Zeitverlauf der Kontaktaufnahme",
      "Art der Nachrichten (Screenshots)",
      "Ob persönliche Daten preisgegeben wurden",
      "Ob ein Treffen stattgefunden hat oder geplant war"
    ]
  },
  identitaetsdiebstahl: {
    erstgespraech: [
      "Identitätsdiebstahl kann sehr verunsichern.",
      "Es ist verständlich, wenn du dich ausgeliefert fühlst.",
      "Du hast richtig gehandelt, indem du reagierst.",
      "Magst du schildern, was genau passiert ist?"
    ],
    fragen: [
      "Wurde ein Fake-Profil erstellt?",
      "Wurden deine Daten missbraucht?",
      "Gab es finanzielle Schäden?",
      "Welche Plattformen sind betroffen?",
      "Hast du deine Passwörter bereits geändert?"
    ],
    empathie: [
      "Das Gefühl von Kontrollverlust ist belastend.",
      "Niemand darf deine Identität missbrauchen.",
      "Es ist gut, dass du Unterstützung suchst."
    ],
    sofortmassnahmen: [
      "Ändere sofort alle Passwörter.",
      "Aktiviere Zwei-Faktor-Authentifizierung.",
      "Informiere betroffene Plattformen.",
      "Bei finanziellen Schäden kontaktiere deine Bank.",
      "Fake-Profil auf der Plattform melden.",
      "Screenshots aller Inhalte des Fake-Profils sichern.",
      "Erwäge eine polizeiliche Anzeige (§ 120 StGB)."
    ],
    elterngespraech: [
      "Sachliche Information über den Vorfall.",
      "Gemeinsam Passwörter und Sicherheit überprüfen.",
      "Aufklärung über Schutz persönlicher Daten."
    ],
    dokumentation: [
      "Betroffene Plattformen und Accounts",
      "Art des Missbrauchs (Fake-Profil, Datenmissbrauch)",
      "Screenshots des Fake-Profils/der Aktivitäten",
      "Eventuelle finanzielle Schäden",
      "Bereits ergriffene Maßnahmen"
    ]
  },
  hassrede: {
    erstgespraech: [
      "Niemand sollte aufgrund seiner Identität angegriffen werden.",
      "Hasskommentare können sehr verletzend sein.",
      "Hier darfst du erzählen, was passiert ist.",
      "Du wirst hier nicht bewertet."
    ],
    fragen: [
      "Welche Aussagen wurden gemacht?",
      "Beziehen sie sich auf bestimmte persönliche Merkmale?",
      "Wer verbreitet diese Inhalte?",
      "Werden sie weitergeteilt oder kommentiert?",
      "Wie fühlst du dich damit?"
    ],
    empathie: [
      "Solche Angriffe können tief treffen.",
      "Du hast ein Recht auf Würde und Respekt.",
      "Deine Reaktion ist nachvollziehbar."
    ],
    sofortmassnahmen: [
      "Hasskommentare können gemeldet werden.",
      "Sichere Beweise durch Screenshots.",
      "In schweren Fällen ist rechtliches Vorgehen möglich.",
      "Meldung bei ZARA – #GegenHassimNetz (zara.or.at).",
      "Meldung bei der Stopline (stopline.at)."
    ],
    elterngespraech: [
      "Information über die Art der Hassrede.",
      "Gemeinsam Meldemöglichkeiten besprechen.",
      "Stärkung des Selbstbewusstseins zu Hause."
    ],
    dokumentation: [
      "Genaue Aussagen/Kommentare dokumentieren",
      "Plattform und Account des/der Täter:in",
      "Screenshots mit Zeitstempel",
      "Ob Inhalte weitergeteilt wurden",
      "Auswirkungen auf Betroffene/n"
    ]
  },
  datenschutz: {
    erstgespraech: [
      "Danke, dass du dich meldest. Datenschutz ist ein wichtiges Thema.",
      "Deine persönlichen Daten gehören dir – du bestimmst, wer sie sieht.",
      "Es ist gut, dass du dich informieren möchtest.",
      "Magst du erzählen, was passiert ist oder was du wissen möchtest?"
    ],
    fragen: [
      "Welche Daten wurden ohne dein Einverständnis weitergegeben?",
      "Auf welcher Plattform ist das passiert?",
      "Hast du bereits versucht, die Daten löschen zu lassen?",
      "Weißt du, wer deine Daten weitergegeben hat?",
      "Sind Fotos oder persönliche Informationen betroffen?"
    ],
    empathie: [
      "Es ist verständlich, dass du dich unwohl fühlst, wenn deine Daten missbraucht werden.",
      "Du hast das Recht auf Schutz deiner persönlichen Informationen.",
      "Niemand darf deine Daten ohne dein Einverständnis weitergeben."
    ],
    sofortmassnahmen: [
      "Überprüfe deine Privatsphäre-Einstellungen auf allen Plattformen.",
      "Mache dein Profil privat – nur bestätigte Kontakte sehen deine Inhalte.",
      "Lösche alte Accounts, die du nicht mehr nutzt.",
      "Nutze die umgekehrte Bildersuche, um zu prüfen, wo deine Fotos auftauchen.",
      "Richte Google Alerts für deinen Namen ein.",
      "Aktiviere die Zwei-Faktor-Authentifizierung auf allen Konten.",
      "Melde Datenschutzverstöße bei der Plattform und ggf. bei der Internet Ombudsstelle."
    ],
    elterngespraech: [
      "Gemeinsam die Privatsphäre-Einstellungen durchgehen.",
      "Profile standardmäßig auf 'privat' stellen.",
      "Sensible Daten niemals öffentlich sichtbar machen.",
      "Über das Recht am eigenen Bild aufklären.",
      "Beratungsstellen empfehlen: Rat auf Draht (147), Saferinternet.at"
    ],
    dokumentation: [
      "Welche Daten wurden preisgegeben oder missbraucht",
      "Auf welchen Plattformen sind die Daten sichtbar",
      "Screenshots der betroffenen Inhalte",
      "Zeitpunkt der Entdeckung",
      "Bereits unternommene Schritte (Meldungen, Löschanfragen)",
      "Auswirkungen auf die betroffene Person"
    ]
  },
  cyberstalking: {
    erstgespraech: [
      "Wenn dich jemand wiederholt online kontaktiert oder überwacht, kann das sehr beängstigend sein.",
      "Deine Sicherheit steht an erster Stelle.",
      "Du hast ein Recht auf Privatsphäre.",
      "Magst du schildern, was passiert?"
    ],
    fragen: [
      "Wie äußert sich das Verhalten konkret?",
      "Seit wann passiert das?",
      "Gab es Drohungen?",
      "Kennt die Person private Informationen?",
      "Fühlst du dich aktuell sicher?"
    ],
    empathie: [
      "Das kann starke Unsicherheit auslösen.",
      "Du übertreibst nicht.",
      "Es ist gut, dass du Unterstützung suchst."
    ],
    sofortmassnahmen: [
      "Sichere alle Nachrichten und Kontaktversuche.",
      "Blockiere die Person auf allen Plattformen.",
      "Überprüfe deine Privatsphäre-Einstellungen.",
      "Bei Bedrohung bitte sofort die Polizei kontaktieren.",
      "Dokumentiere alle Vorfälle mit Datum und Uhrzeit."
    ],
    elterngespraech: [
      "Information über die Schwere der Situation.",
      "Gemeinsam Sicherheitsmaßnahmen besprechen.",
      "Bei Bedrohung: Anzeige erwägen."
    ],
    dokumentation: [
      "Chronologie aller Kontaktversuche",
      "Alle Plattformen und Kommunikationswege",
      "Screenshots aller Nachrichten",
      "Ob persönliche Informationen bekannt sind",
      "Ob Drohungen ausgesprochen wurden",
      "Auswirkungen auf das Sicherheitsgefühl"
    ]
  }
}

const quickPrompts = [
  { label: 'Erstgespräch führen', icon: MessageCircle, category: 'gespraech' },
  { label: 'Fall dokumentieren', icon: FileText, category: 'dokumentation' },
  { label: 'Schutzmaßnahmen', icon: Shield, category: 'schutz' },
  { label: 'Elterngespräch', icon: Lightbulb, category: 'eltern' },
]

const caseTypes = [
  { value: 'cybermobbing', label: 'Cybermobbing' },
  { value: 'sextortion', label: 'Sexting/Sextortion' },
  { value: 'cybergrooming', label: 'Cybergrooming' },
  { value: 'identitaetsdiebstahl', label: 'Identitätsdiebstahl' },
  { value: 'hassrede', label: 'Hassrede/Hate Speech' },
  { value: 'cyberstalking', label: 'Cyberstalking' },
  { value: 'datenschutz', label: 'Datenschutz/Privatsphäre' },
]

function AIAdvisor() {
  const [selectedCaseType, setSelectedCaseType] = useState('cybermobbing')
  const [userInput, setUserInput] = useState('')
  const [conversation, setConversation] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  const generateResponse = (input, category = null) => {
    setIsTyping(true)

    // Simulierte KI-Antwort basierend auf lokaler Wissensbasis
    setTimeout(() => {
      let response = ''
      const caseData = knowledgeBase[selectedCaseType] || knowledgeBase.cybermobbing

      const inputLower = input.toLowerCase()

      if (inputLower.includes('erstgespräch') || inputLower.includes('gespräch') || category === 'gespraech') {
        response = `**Leitfaden für das Erstgespräch bei ${getCaseTypeName(selectedCaseType)}:**\n\n` +
          `**Einstieg:**\n` +
          caseData.erstgespraech.map((item, i) => `${i + 1}. ${item}`).join('\n') +
          `\n\n**Empathische Reaktionen:**\n` +
          (caseData.empathie || []).map((item) => `• ${item}`).join('\n') +
          `\n\n**Wichtige Fragen:**\n` +
          (caseData.fragen || []).map((item) => `• ${item}`).join('\n')
      } else if (inputLower.includes('dokumentation') || inputLower.includes('dokument') || category === 'dokumentation') {
        response = `**Dokumentations-Checkliste:**\n\n` +
          (caseData.dokumentation || [
            "Datum und Uhrzeit des Vorfalls",
            "Beteiligte Plattform(en)",
            "Art des Vorfalls mit Details",
            "Screenshots mit Zeitstempel",
            "Emotionale Auswirkungen auf Betroffene",
            "Bereits ergriffene Maßnahmen",
            "Geplante nächste Schritte"
          ]).map((item, i) => `☐ ${item}`).join('\n')
      } else if (inputLower.includes('eltern') || category === 'eltern') {
        response = `**Tipps für das Elterngespräch:**\n\n` +
          (caseData.elterngespraech || [
            "Sachliche Information über die Situation",
            "Gemeinsame Besprechung von Schutzmaßnahmen",
            "Vermeidung von Schuldzuweisungen",
            "Stärkung der Kommunikation zu Hause",
            "Information über Beratungsstellen"
          ]).map((item, i) => `${i + 1}. ${item}`).join('\n')
      } else if (inputLower.includes('schutz') || inputLower.includes('maßnahme') || category === 'schutz') {
        response = `**Empfohlene Schutzmaßnahmen:**\n\n` +
          (caseData.sofortmassnahmen || caseData.massnahmen || [
            "Beweissicherung (Screenshots, Chatverlauf)",
            "Täter:in blockieren und melden",
            "Privatsphäre-Einstellungen verstärken",
            "Passwörter ändern, 2FA aktivieren",
            "Vertrauensperson einbeziehen",
            "Bei Bedarf: Polizeiliche Anzeige"
          ]).map((item, i) => `• ${item}`).join('\n')
      } else if (inputLower.includes('anzeige') || inputLower.includes('polizei')) {
        response = `**Informationen zur Anzeige:**\n\n` +
          `Bei ${getCaseTypeName(selectedCaseType)} können folgende Straftatbestände relevant sein:\n\n` +
          `• Fortgesetzte Belästigung (§ 107c StGB)\n` +
          `• Üble Nachrede (§ 111 StGB)\n` +
          `• Kreditschädigung (§ 152 StGB)\n` +
          `• Bei sexuellen Inhalten: § 207a StGB\n\n` +
          `**Wichtig:** Alle Beweise vor der Anzeige sichern!`
      } else if (inputLower.includes('warnzeichen') || inputLower.includes('erkennen')) {
        response = `**Warnzeichen erkennen:**\n\n` +
          (caseData.warnzeichen || [
            "Rückzug aus sozialen Aktivitäten",
            "Verändertes Verhalten am Handy/PC",
            "Emotionale Reaktionen nach Online-Aktivität",
            "Leistungsabfall in der Schule",
            "Schlafstörungen oder Appetitlosigkeit"
          ]).map((item, i) => `• ${item}`).join('\n')
      } else {
        // Allgemeine Hilfe
        response = `**Beratungsassistent für ${getCaseTypeName(selectedCaseType)}**\n\n` +
          `Ich kann Ihnen bei folgenden Themen helfen:\n\n` +
          `• **Erstgespräch führen** - Leitfaden für Gespräche mit Betroffenen\n` +
          `• **Dokumentation** - Checkliste zur Falldokumentation\n` +
          `• **Elterngespräch** - Tipps für die Elternkommunikation\n` +
          `• **Schutzmaßnahmen** - Sofortmaßnahmen und Prävention\n` +
          `• **Anzeige** - Rechtliche Informationen\n\n` +
          `Stellen Sie mir eine konkrete Frage oder wählen Sie eine Schnellaktion.`
      }

      setConversation(prev => [...prev, { type: 'ai', content: response }])
      setIsTyping(false)
    }, 800)
  }

  const getCaseTypeName = (type) => {
    const found = caseTypes.find(t => t.value === type)
    return found ? found.label : type
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setConversation(prev => [...prev, { type: 'user', content: userInput }])
    generateResponse(userInput)
    setUserInput('')
  }

  const handleQuickPrompt = (prompt) => {
    setConversation(prev => [...prev, { type: 'user', content: prompt.label }])
    generateResponse(prompt.label, prompt.category)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.replace(/\*\*/g, '').replace(/☐/g, '[ ]'))
    // Optional: Toast notification
  }

  const resetConversation = () => {
    setConversation([])
  }

  return (
    <div className="ai-advisor fade-in">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>
              <Sparkles size={28} />
              KI-Beratungsassistent
            </h1>
            <p>Lokale KI-Unterstützung für Beratung und Dokumentation - DSGVO-konform</p>
          </div>
          <div className="privacy-badge">
            <Shield size={16} />
            100% Lokal - Keine Datenübertragung
          </div>
        </div>
      </header>

      {/* Falltyp-Auswahl */}
      <div className="case-type-selector">
        <label>Falltyp auswählen:</label>
        <div className="case-type-buttons">
          {caseTypes.map(type => (
            <button
              key={type.value}
              className={`case-type-btn ${selectedCaseType === type.value ? 'active' : ''}`}
              onClick={() => setSelectedCaseType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="advisor-container">
        {/* Chat-Bereich */}
        <div className="chat-section card">
          <div className="chat-messages">
            {conversation.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-icon">
                  <Bot size={48} />
                </div>
                <h3>Willkommen beim Beratungsassistenten</h3>
                <p>
                  Ich helfe Ihnen bei der Beratung und Dokumentation von {getCaseTypeName(selectedCaseType)}-Fällen.
                  Alle Daten werden ausschließlich lokal verarbeitet.
                </p>
                <div className="quick-prompts">
                  {quickPrompts.map((prompt, idx) => {
                    const Icon = prompt.icon
                    return (
                      <button
                        key={idx}
                        className="quick-prompt-btn"
                        onClick={() => handleQuickPrompt(prompt)}
                      >
                        <Icon size={18} />
                        {prompt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <>
                {conversation.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.type}`}>
                    <div className="message-avatar">
                      {msg.type === 'ai' ? <Bot size={20} /> : <MessageCircle size={20} />}
                    </div>
                    <div className="message-content">
                      <div className="message-text">
                        {msg.content.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line.startsWith('**') && line.endsWith('**') ? (
                              <strong>{line.replace(/\*\*/g, '')}</strong>
                            ) : line.startsWith('•') || line.startsWith('☐') ? (
                              <div className="list-item">{line}</div>
                            ) : line.match(/^\d+\./) ? (
                              <div className="numbered-item">{line}</div>
                            ) : (
                              line
                            )}
                            {i < msg.content.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                      {msg.type === 'ai' && (
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(msg.content)}
                          title="In Zwischenablage kopieren"
                        >
                          <Copy size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message ai typing">
                    <div className="message-avatar">
                      <Bot size={20} />
                    </div>
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input-Bereich */}
          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Stellen Sie eine Frage zur Beratung..."
              disabled={isTyping}
            />
            <button type="submit" className="send-btn" disabled={!userInput.trim() || isTyping}>
              <Send size={20} />
            </button>
            {conversation.length > 0 && (
              <button type="button" className="reset-btn" onClick={resetConversation} title="Gespräch zurücksetzen">
                <RotateCcw size={18} />
              </button>
            )}
          </form>
        </div>

        {/* Seitenleiste mit Tipps */}
        <aside className="advisor-sidebar">
          <div className="card tip-card">
            <h4>
              <Lightbulb size={18} />
              Schnelltipps
            </h4>
            <ul className="tip-list">
              <li>Fragen Sie nach "Erstgespräch" für Gesprächsleitfäden</li>
              <li>Fragen Sie nach "Dokumentation" für Checklisten</li>
              <li>Fragen Sie nach "Schutzmaßnahmen" für Sofortmaßnahmen</li>
              <li>Wählen Sie den passenden Falltyp für spezifische Tipps</li>
            </ul>
          </div>

          <div className="card warning-card">
            <h4>
              <AlertTriangle size={18} />
              Wichtiger Hinweis
            </h4>
            <p>
              Dieser Assistent ersetzt keine professionelle Beratung oder rechtliche Beratung.
              Bei akuter Gefährdung wenden Sie sich sofort an die Polizei (110) oder
              an <strong>Rat auf Draht: 147</strong>.
            </p>
          </div>

          <div className="card info-card">
            <h4>
              <CheckCircle size={18} />
              DSGVO-Hinweis
            </h4>
            <p>
              Alle Eingaben werden ausschließlich lokal in Ihrem Browser verarbeitet.
              Es werden keine Daten an externe Server übertragen.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AIAdvisor
