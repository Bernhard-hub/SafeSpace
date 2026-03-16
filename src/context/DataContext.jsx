import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext(null)

// Initiale Demo-Daten
const initialCases = [
  {
    id: 1,
    caseNumber: '2026-001',
    victimInitials: 'S.P.',
    age: 14,
    type: 'Cybermobbing',
    platform: 'Instagram',
    analogViolence: 'Verbale Gewalt, Ausgrenzung',
    status: 'akut',
    priority: 'hoch',
    assignedTo: 'Anna M.',
    createdAt: '2026-02-10',
    lastUpdate: '2026-02-12',
    description: 'S.P. wird seit zwei Wochen über Instagram gemobbt. Mitschüler:innen haben ein Fake-Profil erstellt und posten beleidigende Kommentare unter ihren Bildern. In der Klassen-WhatsApp-Gruppe wird sie ausgegrenzt. S.P. zeigt Rückzugsverhalten und möchte nicht mehr in die Schule gehen.',
    timeline: [
      { date: '2026-02-10', action: 'Fall angelegt – Meldung durch Klassenlehrerin', user: 'Anna M.' },
      { date: '2026-02-10', action: 'Erstgespräch mit S.P. geführt', user: 'Anna M.' },
      { date: '2026-02-11', action: 'Screenshots des Fake-Profils gesichert', user: 'Anna M.' },
      { date: '2026-02-12', action: 'Elterngespräch vereinbart', user: 'Anna M.' },
    ],
    notes: [
      { id: 1, date: '2026-02-10', content: 'S.P. ist sehr belastet, weint im Gespräch. Vertraut sich erstmals einer Erwachsenen an. Rat auf Draht empfohlen.', user: 'Anna M.' },
    ]
  },
  {
    id: 2,
    caseNumber: '2026-002',
    victimInitials: 'G.S.',
    age: 13,
    type: 'Cybermobbing',
    platform: 'TikTok',
    analogViolence: 'Verbale Gewalt',
    status: 'bearbeitung',
    priority: 'mittel',
    assignedTo: 'Thomas B.',
    createdAt: '2026-02-15',
    lastUpdate: '2026-02-18',
    description: 'G.S. wurde auf TikTok in einem viralen Video bloßgestellt. Ein Mitschüler hat ein heimlich aufgenommenes Video von G.S. in einer peinlichen Situation gepostet. Das Video wurde über 500 Mal geteilt. G.S. wird in der Schule darauf angesprochen und ausgelacht.',
    timeline: [
      { date: '2026-02-15', action: 'Fall angelegt – Meldung durch Schüler:in', user: 'Thomas B.' },
      { date: '2026-02-16', action: 'Video bei TikTok gemeldet', user: 'Thomas B.' },
      { date: '2026-02-18', action: 'TikTok hat Video entfernt', user: 'Thomas B.' },
    ],
    notes: [
      { id: 1, date: '2026-02-16', content: 'G.S. möchte nicht, dass die Eltern informiert werden. Situation beobachten, Vertrauensaufbau.', user: 'Thomas B.' },
    ]
  },
  {
    id: 3,
    caseNumber: '2026-003',
    victimInitials: 'V.M.',
    age: 12,
    type: 'Cybergrooming',
    platform: 'Snapchat',
    status: 'akut',
    priority: 'hoch',
    assignedTo: 'Maria K.',
    createdAt: '2026-03-01',
    lastUpdate: '2026-03-03',
    description: 'V.M. wurde über Snapchat von einer unbekannten Person kontaktiert, die sich als 15-jährig ausgab. Nach mehreren Wochen Kontakt wurden intime Fragen gestellt und ein Treffen vorgeschlagen. V.M. hat sich einer Freundin anvertraut, die es der Lehrerin meldete.',
    timeline: [
      { date: '2026-03-01', action: 'Fall angelegt – Meldung durch Mitschülerin', user: 'Maria K.' },
      { date: '2026-03-01', action: 'Sofortiges Erstgespräch mit V.M.', user: 'Maria K.' },
      { date: '2026-03-02', action: 'Eltern informiert und einbezogen', user: 'Maria K.' },
      { date: '2026-03-03', action: 'Polizeiliche Anzeige erstattet (§ 208a StGB)', user: 'Maria K.' },
    ],
    notes: [
      { id: 1, date: '2026-03-01', content: 'V.M. hat den Kontakt noch nicht blockiert. Alle Chatverläufe als Beweismittel gesichert. Psychologische Betreuung über Rat auf Draht eingeleitet.', user: 'Maria K.' },
    ]
  },
]

const initialSettings = {
  userName: '',
  userEmail: '',
  organization: '',
  notifications: {
    emailNewCase: true,
    reminderOverdue: true,
    weeklyReport: false
  }
}

// LocalStorage Keys
const STORAGE_KEYS = {
  CASES: 'safespace_cases',
  SETTINGS: 'safespace_settings',
  LAST_CASE_NUMBER: 'safespace_last_case_number'
}

export function DataProvider({ children }) {
  const [cases, setCases] = useState([])
  const [settings, setSettings] = useState(initialSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  // Laden der Daten aus LocalStorage beim Start
  useEffect(() => {
    try {
      const savedCases = localStorage.getItem(STORAGE_KEYS.CASES)
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS)

      if (savedCases) {
        setCases(JSON.parse(savedCases))
      } else {
        setCases(initialCases)
        localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(initialCases))
      }

      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }

      setIsLoaded(true)
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error)
      setCases(initialCases)
      setIsLoaded(true)
    }
  }, [])

  // Speichern bei Änderungen
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases))
    }
  }, [cases, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
    }
  }, [settings, isLoaded])

  // Generiere neue Fallnummer
  const generateCaseNumber = () => {
    const year = new Date().getFullYear()
    const lastNumber = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_CASE_NUMBER) || '0')
    const newNumber = lastNumber + 1
    localStorage.setItem(STORAGE_KEYS.LAST_CASE_NUMBER, newNumber.toString())
    return `${year}-${String(newNumber).padStart(3, '0')}`
  }

  // Fall hinzufügen
  const addCase = (newCaseData) => {
    const newCase = {
      id: Date.now(),
      caseNumber: generateCaseNumber(),
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      status: 'akut',
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          action: 'Fall angelegt',
          user: settings.userName || 'System'
        }
      ],
      notes: [],
      ...newCaseData
    }

    setCases(prev => [newCase, ...prev])
    return newCase
  }

  // Fall aktualisieren
  const updateCase = (caseId, updates) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          ...updates,
          lastUpdate: new Date().toISOString().split('T')[0]
        }
      }
      return c
    }))
  }

  // Fall löschen
  const deleteCase = (caseId) => {
    setCases(prev => prev.filter(c => c.id !== caseId))
  }

  // Timeline-Eintrag hinzufügen
  const addTimelineEntry = (caseId, action) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          lastUpdate: new Date().toISOString().split('T')[0],
          timeline: [
            ...c.timeline,
            {
              date: new Date().toISOString().split('T')[0],
              action,
              user: settings.userName || 'System'
            }
          ]
        }
      }
      return c
    }))
  }

  // Notiz hinzufügen
  const addNote = (caseId, noteContent) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          lastUpdate: new Date().toISOString().split('T')[0],
          notes: [
            ...c.notes,
            {
              id: Date.now(),
              date: new Date().toISOString().split('T')[0],
              content: noteContent,
              user: settings.userName || 'System'
            }
          ]
        }
      }
      return c
    }))
  }

  // Einstellungen aktualisieren
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  // Statistiken berechnen
  const getStats = () => {
    const aktiv = cases.filter(c => c.status === 'akut').length
    const bearbeitung = cases.filter(c => c.status === 'bearbeitung').length
    const abgeschlossen = cases.filter(c => c.status === 'abgeschlossen').length
    const total = cases.length

    return { aktiv, bearbeitung, abgeschlossen, total }
  }

  // Fall nach ID finden
  const getCaseById = (id) => {
    return cases.find(c => c.id === parseInt(id))
  }

  // Daten exportieren
  const exportData = () => {
    const data = {
      cases,
      settings,
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `safespace_backup_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Daten importieren
  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData)
      if (data.cases) {
        setCases(data.cases)
      }
      if (data.settings) {
        setSettings(data.settings)
      }
      return true
    } catch (error) {
      console.error('Fehler beim Importieren:', error)
      return false
    }
  }

  // Alle Daten löschen
  const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.CASES)
    localStorage.removeItem(STORAGE_KEYS.SETTINGS)
    localStorage.removeItem(STORAGE_KEYS.LAST_CASE_NUMBER)
    setCases(initialCases)
    setSettings(initialSettings)
  }

  const value = {
    cases,
    settings,
    isLoaded,
    addCase,
    updateCase,
    deleteCase,
    addTimelineEntry,
    addNote,
    updateSettings,
    getStats,
    getCaseById,
    exportData,
    importData,
    clearAllData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export default DataContext
