import React, { useState } from 'react'
import {
  BookOpen,
  Search,
  ExternalLink,
  Phone,
  FileText,
  Scale,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Globe,
  Lock
} from 'lucide-react'
import './Resources.css'

const categories = [
  { id: 'hotlines', label: 'Hotlines & Beratung', icon: Phone },
  { id: 'legal', label: 'Rechtliche Grundlagen', icon: Scale },
  { id: 'platforms', label: 'Plattform-Meldemechanismen', icon: Globe },
  { id: 'phenomena', label: 'Phänomene & Begriffe', icon: AlertCircle },
  { id: 'datenschutz', label: 'Datenschutz', icon: Lock },
]

const datenschutzDefinitions = [
  { term: 'Datenschutz', definition: 'Das Recht, selbst zu entscheiden, wer wann welche persönlichen Daten einsehen darf, sowie der Schutz vor missbräuchlicher Datenverarbeitung.' },
  { term: 'Privatsphäre', definition: 'Der Bereich einer Person, der nicht öffentlich ist, sondern ausschließlich die eigene Person und den engsten Lebensbereich angeht.' },
  { term: 'Informationelle Selbstbestimmung', definition: 'Der verfassungsrechtliche Grundsatz, dass jeder Mensch grundsätzlich selbst bestimmen kann, wer was über ihn weiß.' },
  { term: 'Personenbezogene Daten', definition: 'Alle Informationen, die unmittelbar mit einer bestimmten Person in Verbindung gebracht werden können (Name, Adresse, Telefonnummer, Geburtsdatum, IP-Adresse).' },
  { term: 'Sensible Daten', definition: 'Besonders schützenswerte Daten, die den persönlichsten Lebensbereich betreffen; Nutzung ist streng reglementiert (ethnische Herkunft, politische Meinung, Gewerkschaftszugehörigkeit, religiöse Überzeugung, Gesundheit, Sexualleben).' },
  { term: 'Digitaler Fußabdruck (Digital Footprint)', definition: 'Die Gesamtheit aller Daten, die beim Surfen aktiv hinterlassen oder passiv gespeichert werden.' },
  { term: 'Digitale Identität', definition: 'Online-Abbild: Die Summe aller Informationen im Netz, die das Bild einer Person für andere prägen (Posts, Likes, Kommentare). Authentifizierung: Der technische Identitätsnachweis für Dienste (Handy-Signatur, Passwörter, Biometrie).' },
  { term: '2-Faktor-Authentifizierung', definition: 'Zusätzliche Sicherheitsmaßnahme zum Schutz von Benutzer:innenkonten. Selbst wenn Passwörter in falsche Hände gelangen, haben Unbefugte keinen Zugriff auf Accounts.' },
  { term: 'Creative Commons-Lizenz', definition: 'Ermöglicht Urheber:innen, Nutzungsrechte auf einfache Weise zu regeln. In der Regel erlauben die Lizenzen das kostenlose Kopieren, Teilen und Benutzen des Werkes für private bzw. nicht-kommerzielle Zwecke.' },
  { term: 'Urheberrecht', definition: 'Schützt alle Werke, die eine eigentümliche (individuelle, originelle) geistige Schöpfung darstellen. Kreative Werke sind automatisch geschützt und die Verwertungsrechte stehen ausschließlich dem/der Urheber:in zu.' },
  { term: 'Trusted Flagger', definition: 'Im Sinne des Digital Services Act anerkannte Meldestellen für illegale Hassrede und rechtswidrige Inhalte. Onlineplattformen sind verpflichtet, Meldungen von Trusted Flaggern prioritär nachzugehen. In Österreich: Rat auf Draht und Internet Ombudsstelle.' },
  { term: 'Digital Services Act (DSA)', definition: 'EU-Verordnung mit Haftungs- und Sicherheitsvorschriften für digitale Plattformen. Verpflichtet große Plattformen zu besonderem Schutz für Jugendliche: Werbeverbot für Minderjährige, Schutz vor Sucht-Design, Transparenz bei Algorithmen.' },
]

const datenschutzLegal = [
  { title: '§ 1 DSG – Grundrecht auf Datenschutz', content: 'Verankerung des Anspruchs auf Geheimhaltung personenbezogener Daten in der österreichischen Verfassung.' },
  { title: 'Artikel 8 EMRK – Achtung des Privatlebens', content: 'Das internationale Gebot der Achtung des Privat- und Familienlebens.' },
  { title: 'Betroffenenrechte laut DSG', content: 'Auskunft: Wer verarbeitet was, woher und wozu? Richtigstellung: Korrektur unrichtiger Daten. Löschung: Entfernung unzulässiger Daten („Recht auf Vergessenwerden"). Widerspruch: Untersagung der Weiterverwendung.' },
  { title: 'Digital Services Act (DSA) – Schutz für Minderjährige', content: 'Werbeverbot: Keine personalisierte Werbung für Minderjährige. Schutz vor Sucht-Design: Verbot von manipulativen Belohnungssystemen. Trusted Flagger: Rat auf Draht und Internet Ombudsstelle als prioritäre Meldestellen. Transparenz: Plattformen müssen Algorithmen offenlegen.' },
  { title: 'Recht am eigenen Bild', content: 'Die Veröffentlichung von Fotos ist unzulässig, wenn dadurch berechtigte Interessen verletzt werden. Bloßstellung ist unzulässig. Grundsatz: Vor dem Posten immer um Erlaubnis fragen!' },
]

const datenschutzFAQ = [
  { target: 'Betroffene', question: 'Wie kann man seine Spuren im Netz überprüfen?', answer: 'Regelmäßig nach dem eigenen Namen suchen, Google-Alert einrichten, umgekehrte Bildersuche nutzen.' },
  { target: 'Betroffene', question: 'Was kann ich tun, wenn mein Profil gehackt wurde?', answer: 'Sofort Passwort über „Passwort vergessen" zurücksetzen. Hinterlegte Daten kontrollieren und Zwei-Faktor-Authentifizierung aktivieren. Kontakte über den Hack informieren.' },
  { target: 'Betroffene', question: 'Wohin kann ich mich wenden, wenn meine Privatsphäre verletzt wurde?', answer: 'Inhalte direkt bei der Plattform melden. Bei Verstoß: Rat auf Draht (147), Internet Ombudsstelle, Digital Services Act Koordinator oder KommAustria kontaktieren.' },
  { target: 'Lehrkräfte', question: 'Wie erfahre ich, was das Internet über mich weiß?', answer: 'Suche regelmäßig nach deinem Namen in Anführungszeichen. Google Alert einrichten für automatische Benachrichtigungen bei neuen Inhalten.' },
  { target: 'Eltern', question: 'Ab wann darf mein Kind soziale Netzwerke nutzen?', answer: 'Das hängt vom Netzwerk ab. Der Digital Services Act (DSA) verpflichtet Plattformen, das Alter der Nutzer:innen besser zu prüfen, um Minderjährige vor ungeeigneten Inhalten zu schützen.' },
  { target: 'Eltern', question: 'Wie kann ich mein Kind beim Datenschutz unterstützen?', answer: 'Gemeinsam die Privatsphäre-Einstellungen durchgehen. Profile standardmäßig auf „privat" stellen. Sensible Daten wie Wohnadresse oder Telefonnummer niemals öffentlich sichtbar machen.' },
  { target: 'Eltern', question: 'Welche Einstellungen schützen die Privatsphäre meiner Kinder?', answer: 'Profil für Suchmaschinen unsichtbar machen. Sichtbarkeit persönlicher Daten einschränken. Sichtbarkeit der Inhalte checken: Je weniger, desto besser. Melden, Blockieren und Entfernen lernen.' },
  { target: 'Eltern', question: 'Was tun, wenn ein Social Media Profil gehackt wurde?', answer: 'Zugriff überprüfen. Wenn Einloggen funktioniert: Sofort Passwort ändern, hinterlegte Daten kontrollieren, letzte Aktivität prüfen. Wenn kein Zugriff: „Passwort vergessen" nutzen. Kontakte informieren und 2FA aktivieren.' },
]

const browserHygiene = [
  { title: 'Cookies löschen', description: 'Kleine Dateien, die das Surfverhalten protokollieren. In den Browsereinstellungen unter „Datenschutz und Sicherheit" regelmäßig löschen.' },
  { title: 'Cache und Verlauf leeren', description: 'Der Verlauf zeigt besuchte Seiten, der Cache speichert Teile davon. Leeren verhindert, dass Dritte Aktivitäten nachvollziehen.' },
  { title: 'Privater Modus nutzen', description: 'Inkognito / InPrivate: Keine Verlaufsdaten oder Cookies werden dauerhaft gespeichert.' },
  { title: 'HTTPS beachten', description: 'In der Adresszeile auf das Schlosssymbol und https:// achten – verschlüsselte Übertragung.' },
  { title: 'Öffentliches WLAN meiden', description: 'Keine unverschlüsselten öffentlichen Netzwerke für sensible Logins nutzen.' },
]

const securityTips = [
  'Nicht zu viel preisgeben: Einmal im Netz, bleibt es oft im Netz.',
  'Persönliche Daten geheim halten: Wohnadresse, Telefonnummer und Passwörter gehen Fremde nichts an.',
  'Sichere Passwörter: Mind. 10 Zeichen, Mix aus Zeichenarten, für jedes Konto ein eigenes.',
  'Computer schützen: Firewall, Antiviren-Programm und regelmäßige Updates sind Pflicht.',
  'Profile schützen: Privatsphäre-Einstellungen regelmäßig prüfen; Zugriff nur für Freunde.',
  'Vorsicht an öffentlichen PCs: Stets ausloggen, keine Login-Daten speichern.',
  'Inaktive Accounts löschen: Nicht mehr genutzte Profile entfernen.',
  'Recht am eigenen Bild: Vor dem Posten von Fotos anderer immer um Erlaubnis fragen.',
  'Nach sich selbst suchen: Regelmäßig das digitale Image per Suchmaschine kontrollieren.',
  'Festplatten sicher löschen: Vor Verkauf oder Entsorgung Daten mit einem Daten-Shredder vernichten.',
]

const hotlines = [
  {
    name: 'Rat auf Draht',
    number: '147',
    country: 'AT',
    specialization: 'Kinder, Jugendliche, Eltern',
    description: 'Krisenhilfe, Cybermobbing, digitale Gewalt – kostenlos, anonym, 24/7',
    url: 'https://www.rataufdraht.at'
  },
  {
    name: 'ZARA – #GegenHassimNetz',
    number: '',
    country: 'AT',
    specialization: 'Betroffene von Hass im Netz',
    description: 'Beratung, Meldung und Unterstützung bei Hasspostings',
    url: 'https://www.zara.or.at'
  },
  {
    name: 'Saferinternet.at',
    number: '',
    country: 'AT',
    specialization: 'Kinder, Jugendliche, Eltern, Lehrende',
    description: 'Prävention, Medienkompetenz, Cybermobbing',
    url: 'https://www.saferinternet.at'
  },
  {
    name: 'Stopline Österreich',
    number: '',
    country: 'AT',
    specialization: 'Allgemeine Öffentlichkeit',
    description: 'Meldestelle für illegale Inhalte im Internet',
    url: 'https://www.stopline.at'
  },
  {
    name: 'Frauenhelpline gegen Gewalt',
    number: '0800 222 555',
    country: 'AT',
    specialization: 'Frauen & Mädchen',
    description: 'Beratung bei Gewalt inkl. Online-Stalking',
    url: 'https://www.frauenhelpline.at'
  },
  {
    name: 'Internet Ombudsstelle',
    number: '',
    country: 'AT',
    specialization: 'Streitfälle und Probleme im Internet',
    description: 'Hilfe bei Online-Shopping-Betrug, Abo-Fallen, Urheberrechtsverletzungen',
    url: 'https://www.ombudsstelle.at'
  },
  {
    name: 'Antisemitismus Meldestelle',
    number: '',
    country: 'AT',
    specialization: 'Betroffene von Antisemitismus',
    description: 'Meldung und Dokumentation antisemitischer Vorfälle',
    url: 'https://www.antisemitismus-meldestelle.at'
  },
  {
    name: 'Nummer gegen Kummer',
    number: '116 111',
    country: 'DE',
    specialization: 'Kinder, Jugendliche, Eltern',
    description: 'Kinder- und Jugendtelefon – Cybermobbing, Online-Probleme',
    url: 'https://www.nummergegenkummer.de'
  },
  {
    name: 'jugendschutz.net',
    number: '',
    country: 'DE',
    specialization: 'Kinder & Jugendliche, Öffentlichkeit',
    description: 'Meldestelle für Hassrede & jugendgefährdende Inhalte',
    url: 'https://www.jugendschutz.net'
  },
  {
    name: 'Pro Juventute Beratung + Hilfe 147',
    number: '147',
    country: 'CH',
    specialization: 'Kinder & Jugendliche',
    description: 'Cybermobbing, Online-Belästigung, Beratung',
    url: 'https://www.147.ch'
  },
]

const legalInfo = [
  {
    title: 'Cybermobbing Straftatbestände (Österreich)',
    content: 'Fortgesetzte Belästigung im Wege der Telekommunikation (§ 107c StGB), Üble Nachrede (§ 111 StGB), Beleidigung (§ 115 StGB), Kreditschädigung (§ 152 StGB)',
    status: 'placeholder'
  },
  {
    title: 'DSGVO & Datenschutz',
    content: 'Recht auf Löschung, Auskunftsrecht, Beschwerdemöglichkeiten bei der Datenschutzbehörde',
    status: 'placeholder'
  },
  {
    title: 'Jugendschutzgesetz',
    content: 'Altersfreigaben, elterliche Aufsichtspflicht, Schulrecht',
    status: 'placeholder'
  },
]

const platforms = [
  { name: 'Instagram', url: 'https://www.instagram.com/safety/report/', description: 'Melden von Belästigung und Mobbing',
    steps: [
      { action: 'Beitrag melden', details: 'Beitrag öffnen → Drei Punkte (⋯) → „Melden" → Grund auswählen → Absenden' },
      { action: 'Kommentar melden', details: 'Kommentar nach links wischen (iPhone) oder gedrückt halten (Android) → Ausrufezeichen/„Melden" → Grund auswählen' },
      { action: 'Story melden', details: 'Story öffnen → Drei Punkte (⋯) → „Melden" → Grund auswählen → Absenden' },
      { action: 'Reel melden', details: 'Reel öffnen → Drei Punkte (⋯) → „Melden" → Grund angeben → Bestätigen' },
      { action: 'Profil melden', details: 'Profil öffnen → Drei Punkte (⋯) → „Melden" → „Konto melden" → Grund auswählen' },
    ]
  },
  { name: 'TikTok', url: 'https://www.tiktok.com/safety/report', description: 'Inhalte und Konten melden',
    steps: [
      { action: 'Video melden', details: 'Video öffnen → Teilen-Pfeil (→) → „Melden" → Grund auswählen → Absenden' },
      { action: 'Kommentar melden', details: 'Kommentar gedrückt halten → „Melden" → Grund angeben → Abschicken' },
      { action: 'Profil melden', details: 'Profil öffnen → Teilen-Symbol → „Melden" → Grund auswählen → Bestätigen' },
      { action: 'Livestream melden', details: 'Während des Livestreams Teilen-Symbol → „Melden" → Problem angeben → Absenden' },
    ]
  },
  { name: 'WhatsApp', url: 'https://www.whatsapp.com/contact/', description: 'Kontakte blockieren und melden',
    steps: [
      { action: 'Kontakt melden', details: 'Chat öffnen → Namen tippen → Nach unten scrollen → „Kontakt melden"' },
      { action: 'Gruppe melden', details: 'Gruppenchat öffnen → Gruppennamen tippen → Nach unten scrollen → „Gruppe melden"' },
      { action: 'Status melden', details: 'Status öffnen → Drei Punkte (⋯) → „Melden" → Bestätigen' },
    ]
  },
  { name: 'Snapchat', url: 'https://support.snapchat.com/en-US/i-need-help', description: 'Missbrauch melden',
    steps: [
      { action: 'Profil melden', details: 'Profil öffnen → Drei Punkte (⋯) → „Melden" → Grund auswählen → Absenden' },
      { action: 'Chat-Nachricht melden', details: 'Nachricht gedrückt halten → „Melden" → Grund auswählen → Bestätigen' },
      { action: 'Snap/Story melden', details: 'Snap/Story öffnen → Gedrückt halten oder Drei Punkte → „Melden" → Grund angeben' },
      { action: 'Spotlight/Discover melden', details: 'Video öffnen → Gedrückt halten oder Drei Punkte → „Melden" → Grund auswählen' },
    ]
  },
  { name: 'Discord', url: 'https://dis.gd/report', description: 'Trust & Safety melden',
    steps: [
      { action: 'Nachricht melden', details: 'Nachricht gedrückt halten (Handy) oder Rechtsklick (PC) → „Nachricht melden" → Grund auswählen → Absenden. Discord benötigt Nachrichten-ID, Server-ID und Benutzer-ID.' },
    ]
  },
  { name: 'YouTube', url: 'https://support.google.com/youtube/answer/2802027', description: 'Inhalte und Nutzer melden',
    steps: [
      { action: 'Video melden', details: 'Video öffnen → Drei Punkte (⋯) unter dem Video → „Melden" → Grund auswählen → Absenden' },
      { action: 'Kommentar melden', details: 'Drei Punkte (⋯) neben dem Kommentar → „Melden" → Grund angeben → Absenden' },
      { action: 'Kanal melden', details: 'Kanal öffnen → Drei Punkte → „Nutzer melden" → Grund auswählen → Absenden' },
    ]
  },
  { name: 'X (Twitter)', url: 'https://help.twitter.com/en/safety-and-security/report-abusive-behavior', description: 'Beiträge und Accounts melden',
    steps: [
      { action: 'Post melden', details: 'Drei Punkte (⋯) → „Post melden" → Grund auswählen → Absenden' },
      { action: 'Direktnachricht melden', details: 'Chat öffnen → Nachricht gedrückt halten → „Melden" → Grund auswählen → Bestätigen' },
      { action: 'Account melden', details: 'Profil öffnen → Drei Punkte (⋯) → „Melden" → Grund auswählen → Absenden' },
    ]
  },
  { name: 'Facebook', url: 'https://www.facebook.com/help/181495968648557', description: 'Beiträge, Kommentare und Profile melden',
    steps: [
      { action: 'Beitrag melden', details: 'Drei Punkte (⋯) → „Beitrag melden" → Grund auswählen → Absenden' },
      { action: 'Kommentar melden', details: 'Kommentar gedrückt halten → „Kommentar melden" → Grund auswählen → Absenden' },
      { action: 'Profil melden', details: 'Profil öffnen → Drei Punkte → „Profil melden" → Grund auswählen → Bestätigen' },
      { action: 'Gruppe melden', details: 'Gruppe öffnen → Drei Punkte → „Gruppe melden" → Grund auswählen → Absenden' },
    ]
  },
  { name: 'Reddit', url: 'https://www.reddit.com/report', description: 'Beiträge und Nutzer melden',
    steps: [
      { action: 'Post melden', details: 'Unter dem Beitrag auf „…" → „Report / Melden" → Grund auswählen → Absenden' },
      { action: 'Kommentar melden', details: 'Unter dem Kommentar „…" → „Report / Melden" → Grund auswählen → Absenden' },
      { action: 'Nutzer melden', details: 'Profil öffnen → „More Options" → „Report User" → Grund auswählen → Bestätigen' },
    ]
  },
  { name: 'Tumblr', url: 'https://www.tumblr.com/abuse', description: 'Beiträge und Blogs melden',
    steps: [
      { action: 'Post melden', details: 'Drei Punkte (⋯) im Post → „Melden" → Grund auswählen → Absenden' },
      { action: 'Blog/Account melden', details: 'Blog/Profil öffnen → Drei Punkte (⋯) → „Melden" → Grund auswählen → Bestätigen' },
    ]
  },
  { name: 'BeReal', url: 'https://bereal.zendesk.com/hc/en-us', description: 'Beiträge und Accounts melden',
    steps: [
      { action: 'Beitrag melden', details: 'Beitrag öffnen → Drei Punkte (⋯) → „Melde dieses BeReal" → Grund auswählen → Absenden' },
      { action: 'Unterhaltung melden', details: 'Chat öffnen → Drei Punkte → „Unterhaltung melden" → Grund auswählen' },
    ]
  },
  { name: 'Telegram', url: 'https://telegram.org/support', description: 'Nachrichten, Nutzer und Gruppen melden',
    steps: [
      { action: 'Nachricht melden', details: 'Nachricht gedrückt halten (Handy) oder Rechtsklick (PC) → „Melden" → Grund auswählen → Absenden' },
      { action: 'Nutzer melden', details: 'Chat öffnen → Namen tippen → Drei Punkte (⋯) → „Melden" → Grund auswählen' },
      { action: 'Gruppe melden', details: 'Gruppe öffnen → Gruppennamen tippen → Drei Punkte (⋯) → „Melden" → Grund auswählen' },
    ]
  },
  { name: 'Signal', url: 'https://support.signal.org/', description: 'Kontakte blockieren und melden',
    steps: [
      { action: 'Kontakt blockieren/melden', details: 'Chat öffnen → Namen tippen → Nach unten scrollen → „Blockieren" oder „Spam melden" → Bestätigen' },
      { action: 'Gruppe verlassen', details: 'Gruppenchat öffnen → Gruppennamen tippen → Nach unten scrollen → Gruppe verlassen/blockieren/melden' },
    ]
  },
]

const phenomena = [
  {
    term: 'Flaming',
    definition: 'Offene digitale Beschimpfung – aggressive, beleidigende oder provokative Nachrichten in digitalen Räumen (Kommentarspalten, Gruppenchats, soziale Netzwerke). Digitale Kommunikation reduziert soziale Hemmschwellen, da Mimik, Tonfall und unmittelbare Reaktionen fehlen.',
    example: 'In einer WhatsApp-Klassengruppe postet eine Jugendliche ein Foto von sich. Mehrere Mitschüler reagieren mit Kommentaren wie: „Peinlich", „Du siehst aus wie 12", „Kein Wunder, dass dich niemand will."',
    pedagogical: 'Gespräch mit der betroffenen Person (Stärkung, Schutz), Thematisierung in der Gruppe (Regeln, Verantwortung), Sensibilisierung für digitale Kommunikationskultur.'
  },
  {
    term: 'Harassment',
    definition: 'Wiederholte digitale Belästigung – Betroffene erhalten kontinuierlich beleidigende, herabwürdigende oder bedrohliche Nachrichten. Die besondere Belastung entsteht durch die ständige Erreichbarkeit digitaler Medien. Das eigene Zuhause bietet keinen Schutzraum mehr.',
    example: 'Ein Jugendlicher mit Lernschwierigkeiten erhält täglich private Nachrichten: „Warum bist du überhaupt hier?", „Du checkst eh nix.", „Geh zurück in die Sonderschule."',
    pedagogical: 'Beweissicherung (Screenshots), technische Schutzmaßnahmen (Blockieren, Privatsphäre-Einstellungen), Einbindung von Erziehungsberechtigten, Stärkung des Selbstwerts.'
  },
  {
    term: 'Denigration (Verleumdung)',
    definition: 'Gezieltes Verbreiten von Gerüchten, Lügen oder manipulierten Inhalten über eine Person. Ziel ist die soziale Herabsetzung oder Zerstörung des Ansehens. Selbst wenn Inhalte gelöscht werden, bleiben Screenshots oder Kopien bestehen.',
    example: 'Über eine Jugendliche wird auf Instagram ein Fake-Profil erstellt. Dort wird behauptet, sie habe bei einem Praktikum gestohlen. Das Gerücht verbreitet sich schnell innerhalb der Ausbildungsgruppe.',
    pedagogical: 'Unterstützung beim Melden des Fake-Profils, Klärung im betrieblichen Kontext, transparente Kommunikation zur Wiederherstellung des Rufes.'
  },
  {
    term: 'Impersonation (Identitätsmissbrauch)',
    definition: 'Täter:innen geben sich als die betroffene Person aus – durch gehackte Accounts oder gefälschte Profile. In deren Namen werden beleidigende, peinliche oder provozierende Inhalte veröffentlicht. Digitale Profile sind für viele Jugendliche Ausdruck ihrer Persönlichkeit.',
    example: 'Ein Jugendlicher lässt sein Handy unbeaufsichtigt liegen. Ein Mitschüler postet in seinem Namen beleidigende Nachrichten in einem Gruppenchat. Er wird daraufhin aus der Gruppe ausgeschlossen.',
    pedagogical: 'Klärung des Vorfalls vor der Gruppe, Wiederherstellung sozialer Zugehörigkeit, Thematisierung digitaler Sicherheit (Passwörter, Geräteschutz).'
  },
  {
    term: 'Outing & Trickery',
    definition: 'Veröffentlichung privater oder intimer Informationen ohne Zustimmung (Outing) bzw. Erschleichen solcher Informationen durch vorgetäuschtes Vertrauen (Trickery). Besonders verletzend, da sie auf Nähe und Vertraulichkeit aufbaut. Häufig sensible Themen wie Sexualität oder familiäre Konflikte.',
    example: 'Ein Jugendlicher erzählt einem vermeintlich engen Freund von seiner psychischen Belastung. Kurz darauf taucht in einer Gruppe ein Screenshot des Chatverlaufs auf mit dem Kommentar: „Heult wieder rum."',
    pedagogical: 'Schutz des Jugendlichen, Vertrauensarbeit, klare Grenzsetzung gegenüber Täter:innen, Bearbeitung von Gruppendynamiken.'
  },
  {
    term: 'Exclusion (Digitale Ausgrenzung)',
    definition: 'Bewusstes Ausschließen aus digitalen Gruppen oder Kommunikationsstrukturen. Wirkt subtiler als offene Beschimpfungen, kann jedoch ebenso verletzend sein. Gerade im Jugendalter ist Zugehörigkeit zur Peer-Gruppe zentral für Identitätsentwicklung.',
    example: 'Eine Teilnehmerin merkt, dass alle anderen in einer zusätzlichen Snapchat-Gruppe sind, in der Treffen organisiert werden. Sie wird bewusst nicht hinzugefügt. Im Training wird über Insider-Witze gelacht.',
    pedagogical: 'Thematisierung sozialer Verantwortung, Förderung inklusiver Gruppenstrukturen, Einzelgespräch zur Stärkung der betroffenen Person.'
  },
  {
    term: 'Cyberstalking',
    definition: 'Systematische Überwachung, Kontrolle oder Bedrohung über digitale Kanäle. Täter:innen verfolgen Online-Aktivitäten, senden wiederholt bedrohliche Nachrichten oder versuchen, Informationen über Aufenthaltsorte zu sammeln. Teilweise strafrechtlich relevant.',
    example: 'Eine Jugendliche erhält wiederholt Nachrichten wie: „Ich weiß, wo du wohnst." „Pass auf, wenn du morgen kommst." Sie entwickelt Angst, alleine zur Maßnahme zu gehen.',
    pedagogical: 'Sofortige Dokumentation, Information der Leitung, ggf. Anzeige, Sicherheitsplanung mit der Betroffenen.'
  },
  {
    term: 'Gaslighting online',
    definition: 'Gezielte psychologische Manipulation, bei der Täter:innen die Wahrnehmung einer Person systematisch in Frage stellen – durch Leugnen gesendeter Nachrichten, manipulierte Screenshots, koordiniertes Abstreiten in Gruppenchats oder Verdrehung von Aussagen.',
    example: 'Ein Jugendlicher berichtet, dass er im Gruppenchat beleidigt wurde. Mehrere Beteiligte löschen ihre Nachrichten und behaupten geschlossen: „Er übertreibt wieder." Er beginnt, an seiner Wahrnehmung zu zweifeln.',
    pedagogical: 'Validierung der subjektiven Wahrnehmung, sensible Gesprächsführung, Förderung kritischer Medienkompetenz, Reflexion von Gruppendruck.'
  },
  {
    term: 'Sexualisierte Beschämung (Slutshaming)',
    definition: 'Öffentliche Abwertung – meist von Mädchen oder jungen Frauen – aufgrund tatsächlicher oder zugeschriebener sexueller Aktivität oder Selbstdarstellung. Reproduziert gesellschaftliche Geschlechternormen und Machtverh ältnisse.',
    example: 'Eine 17-Jährige postet ein Selfie im Sommeroutfit. Unter dem Bild erscheinen Kommentare wie: „Billig.", „Die will\'s doch.", „Kein Wunder, dass jeder sie hatte."',
    pedagogical: 'Thematisierung von Geschlechterstereotypen, Schutz der Betroffenen, klare Sanktionierung sexualisierter Abwertung.'
  },
  {
    term: 'Digitale Mutproben / Challenge-Druck',
    definition: 'Digitale Challenges können problematische Dynamiken entwickeln, wenn Gruppendruck entsteht. Jugendliche werden aufgefordert, riskante, peinliche oder grenzüberschreitende Inhalte zu posten. Drohung mit Ausgrenzung bei Verweigerung.',
    example: 'In einer Ausbildungsgruppe kursiert eine Challenge: „Poste ein peinliches Video von dir oder du bist raus." Ein Jugendlicher filmt sich, obwohl er sich unwohl fühlt. Das Video wird später außerhalb der Gruppe geteilt.',
    pedagogical: 'Thematisierung von „Nein sagen" als Stärke, Reflexion von Gruppendynamiken, Aufklärung über dauerhafte digitale Spuren.'
  },
  {
    term: 'Lehrkräfte-/Fachkräfte-Mobbing',
    definition: 'Digitale Gewalt gegen pädagogische Fachkräfte: Fake-Profile, heimliche Videoaufnahmen im Unterricht, herabwürdigende Memes, diffamierende Einträge auf Bewertungsplattformen. Untergräbt professionelle Autorität.',
    example: 'Eine Trainerin wird heimlich beim Erklären gefilmt. Das Video wird mit Musik unterlegt und als „Cringe-Compilation" auf TikTok hochgeladen.',
    pedagogical: 'Klare Hausregeln zu Aufnahmen, rechtliche Aufklärung, konsequente Grenzsetzung, Bearbeitung der Beziehungsebene.'
  },
  {
    term: 'Gaming-bezogenes Mobbing',
    definition: 'Mobbing in Online-Gaming-Umgebungen: gezielte Beleidigungen im Voice-Chat, Ausschluss aus Teams, Sabotage im Spiel, sexistische oder rassistische Kommentare. Besonders betroffen: Mädchen, queere Jugendliche oder Anfänger:innen.',
    example: 'Ein Jugendlicher mit Autismus spielt regelmäßig ein Online-Game. Im Voice-Chat wird er verspottet: „Bist du behindert?", „Deinstallier das Spiel." Er zieht sich aus Freizeitkontakten zurück.',
    pedagogical: 'Anerkennung von Gaming als Lebenswelt, Gespräche über toxische Online-Kulturen, Stärkung von Medien- und Konfliktkompetenz.'
  },
  {
    term: 'Solidarisierungs-Shitstorm',
    definition: 'Massenhafte Welle negativer Kommentare gegen eine Person. Entsteht, wenn sich viele aus vermeintlicher Gerechtigkeit gegen eine Person stellen. Ein einzelner Vorfall wird überproportional eskaliert.',
    example: 'Ein Jugendlicher äußert sich ungeschickt zu einem politischen Thema. Ein Screenshot wird öffentlich geteilt. Innerhalb weniger Stunden posten zahlreiche Personen abwertende Kommentare.',
    pedagogical: 'Deeskalation, Schutz der betroffenen Person, Reflexion über Verantwortung in digitalen Massenreaktionen, Bearbeitung von Mitläuferverhalten.'
  },
  {
    term: 'DeepFakes',
    definition: 'Mithilfe künstlicher Intelligenz erstellte oder manipulierte Bild-, Video- oder Tonaufnahmen, die real wirken, jedoch gefälscht sind. Werden im Cybermobbing-Kontext genutzt, um Personen in kompromittierende Situationen zu versetzen oder sexualisierte Inhalte zu erzeugen.',
    example: 'Ein 16-jähriges Mädchen postet Fotos auf Instagram. Mitschüler erstellen mithilfe einer KI-App ein manipuliertes Video, in dem ihr Gesicht in ein sexualisiertes Video eingefügt wird. Es verbreitet sich über Snapchat.',
    pedagogical: 'Sofortige Sicherung und Dokumentation, Meldung bei Plattformbetreibern, Prüfung strafrechtlicher Schritte, psychosoziale Stabilisierung.'
  },
  {
    term: 'Doxing',
    definition: 'Gezieltes Sammeln und Veröffentlichen privater personenbezogener Daten (Adresse, Telefonnummer, Arbeitsplatz, Fotos) ohne Zustimmung. Ziel: Einschüchterung, Bloßstellung oder reale Gefährdung. Die Grenze zwischen digitaler und physischer Bedrohung wird hier besonders deutlich.',
    example: 'Ein Jugendlicher gerät in einem Gaming-Forum in einen Streit. Ein anderer Spieler recherchiert seinen Wohnort und postet: „Hier wohnt er. Vielleicht statten wir ihm mal einen Besuch ab."',
    pedagogical: 'Sofortige Dokumentation, Information der Leitung, ggf. Anzeige bei der Polizei, Sensibilisierung für digitale Datenspur.'
  },
]

function Resources() {
  const [activeCategory, setActiveCategory] = useState('hotlines')
  const [expandedItems, setExpandedItems] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredPhenomena = phenomena.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="resources fade-in">
      <header className="page-header">
        <h1>Ressourcen & Wissensbasis</h1>
        <p>Hotlines, rechtliche Grundlagen, Meldemechanismen und Fachwissen</p>
      </header>

      {/* Kategorie-Navigation */}
      <div className="category-nav">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon size={20} />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Hotlines */}
      {activeCategory === 'hotlines' && (
        <section className="resource-section fade-in">
          <h2>Hotlines & Beratungsstellen</h2>
          <div className="hotlines-grid">
            {hotlines.map((hotline, idx) => (
              <a
                key={idx}
                href={hotline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hotline-card card"
              >
                <div className="hotline-country">{hotline.country}</div>
                <h3>{hotline.name}</h3>
                {hotline.number && (
                  <p className="hotline-number">
                    <Phone size={16} />
                    {hotline.number}
                  </p>
                )}
                <p className="hotline-specialization">{hotline.specialization}</p>
                <p className="hotline-desc">{hotline.description}</p>
                <span className="hotline-link">
                  Website besuchen
                  <ExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Rechtliche Grundlagen */}
      {activeCategory === 'legal' && (
        <section className="resource-section fade-in">
          <h2>Rechtliche Grundlagen</h2>
          <div className="legal-list">
            {legalInfo.map((item, idx) => (
              <div key={idx} className="legal-item card">
                <button
                  className="legal-header"
                  onClick={() => toggleExpanded(`legal-${idx}`)}
                >
                  <Scale size={20} />
                  <span>{item.title}</span>
                  {expandedItems[`legal-${idx}`] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedItems[`legal-${idx}`] && (
                  <div className="legal-content">
                    <p>{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Plattform-Meldemechanismen */}
      {activeCategory === 'platforms' && (
        <section className="resource-section fade-in">
          <h2>Plattform-Meldemechanismen</h2>
          <p className="section-intro">
            Schritt-für-Schritt-Anleitungen zum Melden auf allen relevanten Plattformen. Klicken Sie auf eine Plattform für Details.
          </p>

          <div className="platforms-grid">
            {platforms.map((platform, idx) => (
              <div key={idx} className="platform-card card">
                <button
                  className="platform-header"
                  onClick={() => toggleExpanded(`platform-${idx}`)}
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, fontFamily: 'inherit' }}
                >
                  <div>
                    <h3 style={{ margin: '0 0 4px 0' }}>{platform.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{platform.description}</p>
                  </div>
                  {expandedItems[`platform-${idx}`] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedItems[`platform-${idx}`] && platform.steps && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {platform.steps.map((step, sIdx) => (
                      <div key={sIdx} style={{ background: 'var(--bg-secondary, #f5f1ea)', borderRadius: '8px', padding: '12px 14px' }}>
                        <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>{step.action}</strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{step.details}</p>
                      </div>
                    ))}
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="platform-link"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
                    >
                      Offizielle Meldeseite
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Phänomene & Begriffe */}
      {activeCategory === 'phenomena' && (
        <section className="resource-section fade-in">
          <h2>Phänomene & Begriffe – Cybermobbing-Kategorien</h2>
          <p className="section-intro">
            Formen, Dynamiken und pädagogische Einordnung digitaler Gewalt.
          </p>

          <div className="phenomena-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Kategorie suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="glossary-list">
            {filteredPhenomena.map((item, idx) => (
              <div key={idx} className="glossary-item card">
                <button
                  className="glossary-header"
                  onClick={() => toggleExpanded(`phenomena-${idx}`)}
                >
                  <h3>{item.term}</h3>
                  {expandedItems[`phenomena-${idx}`] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                <p className="glossary-definition">{item.definition}</p>
                {expandedItems[`phenomena-${idx}`] && (
                  <div className="glossary-details">
                    <div className="glossary-example">
                      <h4>Praxisbeispiel</h4>
                      <p>{item.example}</p>
                    </div>
                    <div className="glossary-pedagogical">
                      <h4>Pädagogische Einordnung</h4>
                      <p>{item.pedagogical}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Datenschutz */}
      {activeCategory === 'datenschutz' && (
        <section className="resource-section fade-in">
          <h2>Datenschutz – Wissen & Praxis</h2>
          <p className="section-intro">
            Definitionen, rechtlicher Rahmen, technische Tipps und FAQ rund um Datenschutz in der pädagogischen Arbeit.
          </p>

          {/* Definitionen & Glossar */}
          <h3 style={{ margin: '1.5rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} />
            Definitionen & Glossar
          </h3>
          <div className="phenomena-search" style={{ marginBottom: '1rem' }}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Begriff suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="glossary-list">
            {datenschutzDefinitions
              .filter(d => d.term.toLowerCase().includes(searchTerm.toLowerCase()) || d.definition.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item, idx) => (
                <div key={idx} className="glossary-item card">
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{item.term}</h3>
                  <p className="glossary-definition">{item.definition}</p>
                </div>
              ))}
          </div>

          {/* Rechtlicher Rahmen */}
          <h3 style={{ margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scale size={20} />
            Rechtlicher Rahmen
          </h3>
          <div className="legal-list">
            {datenschutzLegal.map((item, idx) => (
              <div key={idx} className="legal-item card">
                <button className="legal-header" onClick={() => toggleExpanded(`ds-legal-${idx}`)}>
                  <Scale size={20} />
                  <span>{item.title}</span>
                  {expandedItems[`ds-legal-${idx}`] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedItems[`ds-legal-${idx}`] && (
                  <div className="legal-content">
                    <p>{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h3 style={{ margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={20} />
            FAQ – Häufige Fragen
          </h3>
          {['Betroffene', 'Lehrkräfte', 'Eltern'].map(target => {
            const faqs = datenschutzFAQ.filter(f => f.target === target)
            if (faqs.length === 0) return null
            return (
              <div key={target} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.8rem', color: 'var(--text-secondary)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {target}
                </h4>
                {faqs.map((faq, idx) => (
                  <div key={idx} className="legal-item card" style={{ marginBottom: '0.5rem' }}>
                    <button className="legal-header" onClick={() => toggleExpanded(`faq-${target}-${idx}`)}>
                      <span style={{ fontWeight: 600 }}>{faq.question}</span>
                      {expandedItems[`faq-${target}-${idx}`] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    {expandedItems[`faq-${target}-${idx}`] && (
                      <div className="legal-content">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          })}

          {/* Browser-Hygiene */}
          <h3 style={{ margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={20} />
            Browser-Hygiene
          </h3>
          <div className="hotlines-grid">
            {browserHygiene.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '1.2rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary)' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* 10 Sicherheitstipps */}
          <h3 style={{ margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} />
            10 Sicherheitstipps zum Datenschutz
          </h3>
          <div className="card" style={{ padding: '1.5rem' }}>
            {securityTips.map((tip, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', padding: '0.6rem 0', borderBottom: idx < securityTips.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <span style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                  {idx + 1}
                </span>
                <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{tip}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Resources
