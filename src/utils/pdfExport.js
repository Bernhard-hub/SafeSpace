import { jsPDF } from 'jspdf'

// Deutsche Umlaute-Mapping für PDF (jsPDF hat Probleme mit UTF-8)
const replaceUmlauts = (text) => {
  if (!text) return ''
  return text
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
}

const getStatusLabel = (status) => {
  const statusMap = {
    'akut': 'Akut',
    'bearbeitung': 'In Bearbeitung',
    'nachsorge': 'Nachsorge',
    'abgeschlossen': 'Abgeschlossen',
  }
  return statusMap[status] || status
}

const getPriorityLabel = (priority) => {
  const priorityMap = {
    'hoch': 'Hoch',
    'mittel': 'Mittel',
    'niedrig': 'Niedrig',
  }
  return priorityMap[priority] || priority
}

export const exportCaseToPDF = (caseData, settings = {}) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let yPos = 20

  // Header
  doc.setFontSize(10)
  doc.setTextColor(128, 128, 128)
  doc.text('VERTRAULICH - SafeSpace Fallbericht', margin, yPos)
  doc.text(new Date().toLocaleDateString('de-AT'), pageWidth - margin - 30, yPos)

  yPos += 15

  // Titel
  doc.setFontSize(22)
  doc.setTextColor(45, 125, 125) // Primary color
  doc.text(replaceUmlauts(`Fall #${caseData.caseNumber}`), margin, yPos)

  yPos += 10

  // Falltyp
  doc.setFontSize(12)
  doc.setTextColor(90, 107, 107)
  doc.text(replaceUmlauts(`${caseData.type} - ${caseData.platform}`), margin, yPos)

  yPos += 15

  // Trennlinie
  doc.setDrawColor(226, 221, 213)
  doc.line(margin, yPos, pageWidth - margin, yPos)

  yPos += 15

  // Fallinformationen
  doc.setFontSize(14)
  doc.setTextColor(44, 62, 62)
  doc.text('Fallinformationen', margin, yPos)

  yPos += 10

  doc.setFontSize(10)
  const infoItems = [
    ['Status:', getStatusLabel(caseData.status)],
    ['Prioritaet:', getPriorityLabel(caseData.priority)],
    ['Betroffene/r:', `${caseData.victimInitials}, ${caseData.age} Jahre`],
    ['Zustaendig:', caseData.assignedTo || '-'],
    ['Angelegt am:', new Date(caseData.createdAt).toLocaleDateString('de-AT')],
    ['Letzte Aktualisierung:', new Date(caseData.lastUpdate).toLocaleDateString('de-AT')],
  ]

  infoItems.forEach(([label, value]) => {
    doc.setTextColor(138, 154, 154)
    doc.text(replaceUmlauts(label), margin, yPos)
    doc.setTextColor(44, 62, 62)
    doc.text(replaceUmlauts(value), margin + 50, yPos)
    yPos += 7
  })

  yPos += 10

  // Beschreibung
  doc.setFontSize(14)
  doc.setTextColor(44, 62, 62)
  doc.text('Beschreibung', margin, yPos)

  yPos += 8

  doc.setFontSize(10)
  doc.setTextColor(90, 107, 107)
  const description = replaceUmlauts(caseData.description || 'Keine Beschreibung vorhanden.')
  const descriptionLines = doc.splitTextToSize(description, pageWidth - 2 * margin)
  doc.text(descriptionLines, margin, yPos)
  yPos += descriptionLines.length * 5 + 10

  // Notizen
  if (caseData.notes && caseData.notes.length > 0) {
    // Prüfen ob neue Seite benötigt wird
    if (yPos > 230) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.setTextColor(44, 62, 62)
    doc.text(`Notizen (${caseData.notes.length})`, margin, yPos)

    yPos += 10

    caseData.notes.forEach((note, index) => {
      if (yPos > 260) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(9)
      doc.setTextColor(45, 125, 125)
      doc.text(replaceUmlauts(`${note.user} - ${new Date(note.date).toLocaleDateString('de-AT')}`), margin, yPos)

      yPos += 5

      doc.setTextColor(44, 62, 62)
      const noteLines = doc.splitTextToSize(replaceUmlauts(note.content), pageWidth - 2 * margin)
      doc.text(noteLines, margin, yPos)
      yPos += noteLines.length * 4 + 8
    })
  }

  // Verlauf/Timeline
  if (caseData.timeline && caseData.timeline.length > 0) {
    if (yPos > 200) {
      doc.addPage()
      yPos = 20
    }

    yPos += 5

    doc.setFontSize(14)
    doc.setTextColor(44, 62, 62)
    doc.text('Verlauf', margin, yPos)

    yPos += 10

    doc.setFontSize(9)
    caseData.timeline.forEach((item, index) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }

      doc.setTextColor(138, 154, 154)
      doc.text(new Date(item.date).toLocaleDateString('de-AT'), margin, yPos)

      doc.setTextColor(44, 62, 62)
      doc.text(replaceUmlauts(item.action), margin + 25, yPos)

      doc.setTextColor(138, 154, 154)
      doc.text(replaceUmlauts(`(${item.user})`), margin + 25 + doc.getTextWidth(replaceUmlauts(item.action)) + 3, yPos)

      yPos += 6
    })
  }

  // Footer auf jeder Seite
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(138, 154, 154)
    doc.text(
      `SafeSpace - Erstellt am ${new Date().toLocaleDateString('de-AT')} um ${new Date().toLocaleTimeString('de-AT')}`,
      margin,
      doc.internal.pageSize.getHeight() - 10
    )
    doc.text(
      `Seite ${i} von ${totalPages}`,
      pageWidth - margin - 25,
      doc.internal.pageSize.getHeight() - 10
    )

    // DSGVO Hinweis
    doc.setFontSize(7)
    doc.text(
      'Dieses Dokument enthaelt vertrauliche Informationen. Bitte gemaess DSGVO behandeln.',
      margin,
      doc.internal.pageSize.getHeight() - 5
    )
  }

  // Download
  doc.save(`SafeSpace_Fall_${caseData.caseNumber}_${new Date().toISOString().split('T')[0]}.pdf`)
}

export const exportAllCasesToPDF = (cases, settings = {}) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let yPos = 20

  // Header
  doc.setFontSize(10)
  doc.setTextColor(128, 128, 128)
  doc.text('VERTRAULICH - SafeSpace Falluebersicht', margin, yPos)
  doc.text(new Date().toLocaleDateString('de-AT'), pageWidth - margin - 30, yPos)

  yPos += 15

  // Titel
  doc.setFontSize(22)
  doc.setTextColor(45, 125, 125)
  doc.text('Falluebersicht', margin, yPos)

  yPos += 10

  // Statistik
  doc.setFontSize(12)
  doc.setTextColor(90, 107, 107)
  const stats = {
    total: cases.length,
    akut: cases.filter(c => c.status === 'akut').length,
    bearbeitung: cases.filter(c => c.status === 'bearbeitung').length,
    abgeschlossen: cases.filter(c => c.status === 'abgeschlossen').length,
  }
  doc.text(`Gesamt: ${stats.total} | Akut: ${stats.akut} | In Bearbeitung: ${stats.bearbeitung} | Abgeschlossen: ${stats.abgeschlossen}`, margin, yPos)

  yPos += 15

  // Trennlinie
  doc.setDrawColor(226, 221, 213)
  doc.line(margin, yPos, pageWidth - margin, yPos)

  yPos += 10

  // Tabellenkopf
  doc.setFontSize(9)
  doc.setTextColor(138, 154, 154)
  doc.text('Fall', margin, yPos)
  doc.text('Betroffene/r', margin + 25, yPos)
  doc.text('Typ', margin + 55, yPos)
  doc.text('Status', margin + 95, yPos)
  doc.text('Datum', margin + 130, yPos)

  yPos += 3
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 7

  // Fälle
  doc.setFontSize(9)
  cases.forEach((caseItem, index) => {
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    doc.setTextColor(44, 62, 62)
    doc.text(`#${caseItem.caseNumber}`, margin, yPos)
    doc.text(replaceUmlauts(caseItem.victimInitials), margin + 25, yPos)
    doc.text(replaceUmlauts(caseItem.type.substring(0, 20)), margin + 55, yPos)
    doc.text(replaceUmlauts(getStatusLabel(caseItem.status)), margin + 95, yPos)
    doc.text(new Date(caseItem.lastUpdate).toLocaleDateString('de-AT'), margin + 130, yPos)

    yPos += 7
  })

  // Footer
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(138, 154, 154)
    doc.text(
      `SafeSpace Falluebersicht - Erstellt am ${new Date().toLocaleDateString('de-AT')}`,
      margin,
      doc.internal.pageSize.getHeight() - 10
    )
    doc.text(
      `Seite ${i} von ${totalPages}`,
      pageWidth - margin - 25,
      doc.internal.pageSize.getHeight() - 10
    )
  }

  doc.save(`SafeSpace_Falluebersicht_${new Date().toISOString().split('T')[0]}.pdf`)
}
