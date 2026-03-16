# SafeSpace - Cybermobbing Prävention & Intervention

Ein professionelles Tool für die Dokumentation, Beratung und Prävention von Cybermobbing in Schulen und Bildungseinrichtungen.

## Alleinstellungsmerkmale

- **Spezialisierung auf Cybermobbing** - Kein generisches Case Management, sondern gezielt für digitale Gewalt entwickelt
- **DSGVO-konform** - Alle Daten bleiben lokal im Browser (LocalStorage), keine Cloud-Anbindung
- **KI-gestützt** - Lokaler Beratungsassistent für Gesprächsführung und Dokumentation
- **Integrierte Prävention** - Nicht nur Reaktion, sondern proaktive Präventionsarbeit
- **Von Praktiker:innen entwickelt** - Im Rahmen eines Seminars zur digitalen inklusiven Pädagogik
- **Open Source** - Nachhaltig, anpassbar und kostenlos nutzbar (MIT-Lizenz)

## Funktionen

### Fallmanagement
- Fälle dokumentieren und verwalten
- Status-Tracking (Akut, In Bearbeitung, Nachsorge, Abgeschlossen)
- Prioritäten und Zuständigkeiten
- Timeline und Notizen
- PDF-Export für Berichte

### KI-Beratung
- Lokaler Beratungsassistent (keine externen APIs)
- Gesprächsleitfäden für verschiedene Szenarien
- Dokumentationshilfen
- Checklisten für Elterngespräche

### Prävention
- Informationsmaterial zu verschiedenen Formen digitaler Gewalt
- Ressourcen für Lehrkräfte und Schulsozialarbeit
- Präventionskonzepte

### Einstellungen
- Benutzerprofil
- Daten-Export/Import (JSON)
- Vollständige Datenkontrolle

## Installation

```bash
# Repository klonen
git clone https://github.com/[username]/safespace.git
cd safespace

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build
```

## Deployment

Der `dist/` Ordner kann auf jedem statischen Webhost deployed werden:

- **Netlify** (empfohlen): Drag & Drop auf https://app.netlify.com/drop
- **GitHub Pages**
- **Vercel**
- **Cloudflare Pages**

Alle diese Optionen sind **kostenlos** und EU-weit verfügbar.

## Technologie-Stack

- React 18
- Vite 7
- jsPDF (PDF-Export)
- Lucide React (Icons)
- CSS Custom Properties
- LocalStorage API
- Service Worker (PWA - offline-fähig)

## Datenschutz

- Alle Daten werden **lokal** im Browser gespeichert
- **Keine** Übertragung an externe Server
- **DSGVO-konform**
- Keine personenbezogenen Daten in der Demo
- Vollständige Datenkontrolle durch Export/Import

## Lizenz

**MIT License** - siehe [LICENSE](LICENSE)

Bei Verwendung bitten wir um Namensnennung:

> "SafeSpace - entwickelt an der KPH Edith Stein"

## Beteiligte

| Rolle | Name/Organisation |
|-------|-------------------|
| **Projektleitung** | Prof. Bernhard Strobl |
| **Institution** | KPH Edith Stein, Innsbruck |
| **Entwicklung** | Mit KI-Unterstützung (Claude, Anthropic) |
| **Inhaltliche Beiträge** | Studierende der KPH Edith Stein |
| **Seminar** | Digitale inklusive Pädagogik / Safer Internet und digitale Gewalt |

## Arbeitsmodell mit Studierenden

### Gruppe A: Fallmanagement & Dokumentation
- Felder für Vorfallsprotokolle
- Eskalationsstufen-Definitionen
- Textbausteine für Berichte
- Plattform-Meldemechanismen
- Anonymisierte Muster-Fälle

### Gruppe B: Prävention & Beratung
- Workshop-Konzepte mit Ablaufplänen
- Gesprächsleitfäden
- FAQ-Kataloge
- Phänomene-Erklärungen
- Beratungsstellen-Recherche

## Input-Vorlagen

Die Word-Dokumente `Input_Vorlage_Gruppe_A.docx` und `Input_Vorlage_Gruppe_B.docx` enthalten strukturierte Tabellen, die von den Studierenden ausgefüllt werden. Die Inhalte werden anschließend in die Anwendung integriert.

## Kontakt

**KPH Edith Stein**
Kirchliche Pädagogische Hochschule
Innsbruck, Österreich

---

*Dieses Projekt wurde im Rahmen des Seminars "Safer Internet und digitale Gewalt" an der KPH Edith Stein entwickelt.*

**Open Source seit 2025** | MIT-Lizenz | Made in Austria
