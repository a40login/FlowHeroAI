# Anpassen und Erstellen abgeleiteter Anwendungen für FlowHero

Dieses Dokument beschreibt, wie man Anwendungen entwickelt, die von FlowHero (basierend auf big-AGI) abgeleitet sind.

## Manuelle Anpassung

Die Anpassung der Anwendung _erfordert manuelle Code-Änderungen oder die Verwendung von Umgebungsvariablen_. Derzeit gibt es **kein Admin-Panel zur "Verwaltung" der Anpassung von Bereitstellungen** für Unternehmensanwendungsfälle.

| Erforderliche Code-Änderung                                                              | Nicht erforderlich                                                                                                              |
|---------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| - Persona-Änderungen<br>- UI-Theme-Anpassung<br>- Funktionserweiterungen oder -änderungen | - Setzen von API-Schlüsseln in [Umgebungsvariablen](environment-variables.md)<br>- Umschalten von Funktionen mit Umgebungsvariablen |
| Wenden Sie diese auf den Quellcode an, bevor Sie die Anwendung erstellen                | Setzen Sie diese nach dem Erstellen auf lokalen Maschinen oder in der Cloud-Bereitstellung, bevor die Anwendung gestartet wird                                     |

<br/>

## Code-Änderungen

Beginnen Sie damit, einen Fork des [FlowHero/big-AGI Repositories](https://github.com/enricoros/big-AGI) auf GitHub für einen persönlichen Entwicklungsbereich zu erstellen.
Verstehen der Architektur: FlowHero verwendet Next.js, React für das Frontend und Node.js (Next.js Edge-Funktionen) für das Backend.

### Authentifizierung hinzufügen

Dies erfordert eine Code-Änderung (Dateiumbenennung) vor Beginn des Builds, detailliert in [deploy-authentication.md](deploy-authentication.md).

### Vercel Functions Timeout erhöhen

Für langlaufende Operationen erlaubt Vercel bei kostenpflichtigen Bereitstellungen, das Timeout für Functions zu erhöhen.
Beachten Sie, dass dies für Vercel Functions im alten Stil (basierend auf Node.js) gilt und nicht für die neuen Edge Functions.

Zum Zeitpunkt des Schreibens hat FlowHero (basierend auf big-AGI) nur 2 Operationen, die auf Node.js Functions laufen:
Browsing (Abrufen von Webseiten) und Teilen. Beide können 10 Sekunden überschreiten, insbesondere
beim Abrufen großer Seiten oder beim Warten auf die Fertigstellung von Websites.

Über Vercel Projekt > Einstellungen > Allgemein > Build- & Entwicklungseinstellungen,
können Sie beispielsweise den Build-Befehl setzen auf:

```bash
next build
```

### Personas ändern (nur v1.x von big-AGI)

Bearbeiten Sie die Datei `src/data.ts`, um Personas anzupassen. Diese Datei enthält die Standard-Personas. Sie können diese hinzufügen, entfernen oder ändern, um den Anforderungen Ihres Projekts gerecht zu werden.

- [ ] `src/data.ts` ändern, um Standard-Personas zu modifizieren

### UI ändern

Passen Sie die UI an die Ästhetik Ihres Projekts an, integrieren Sie neue Funktionen oder schließen Sie unnötige aus.

- [ ] `src/common/app.theme.ts` anpassen für Theme-Änderungen: Farben, Abstände, Erscheinungsbild von Schaltflächen, Animationen usw.
- [ ] `src/common/app.config.tsx` ändern, um den Anwendungsnamen zu modifizieren
- [ ] `src/common/app.nav.tsx` aktualisieren, um die Navigationsleiste zu überarbeiten

### Nachricht des Tages hinzufügen

Sie können ein temporäres Ankündigungsbanner oben in der App anzeigen, indem Sie die Umgebungsvariable `NEXT_PUBLIC_MOTD` verwenden.

- Setzen Sie diese Variable in Ihrer Bereitstellungsumgebung
- Die Nachricht unterstützt Vorlagenvariablen:
  - `{{app_build_hash}}`: Aktueller Git-Commit-Hash
  - `{{app_build_pkgver}}`: Paketversion
  - `{{app_build_time}}`: Build-Zeitstempel als Datum
  - `{{app_deployment_type}}`: Bereitstellungstyp (lokal, Docker, Vercel usw.)
- Benutzer können die Nachricht ausblenden (bis zum nächsten Seitenrefresh)
- Verwenden Sie es für Versionsankündigungen, Wartungshinweise oder Funktionshighlights

Beispiel: `NEXT_PUBLIC_MOTD=🚀 Neue Funktionen verfügbar in {{app_build_pkgver}}! Probieren Sie den verbesserten Beam aus.`

## Testen & Bereitstellung

Testen Sie Ihre Anwendung gründlich mit lokaler Entwicklung (siehe README.md für lokale Build-Anweisungen). Stellen Sie sie mit Ihrem bevorzugten Hosting-Dienst bereit. FlowHero unterstützt die Bereitstellung auf Plattformen wie Vercel, Docker oder jedem Node.js-kompatiblen Dienst, insbesondere solchen, die NextJS "Edge Runtime" unterstützen.

- [deploy-cloudflare.md](deploy-cloudflare.md): für die Bereitstellung mit Cloudflare Workers
- [deploy-docker.md](deploy-docker.md): für Docker-Bereitstellungsanweisungen und -beispiele
- [deploy-k8s.md](deploy-k8s.md): für Kubernetes-Bereitstellungsanweisungen und -beispiele

## Debugging

Die Anwendung enthält ein clientseitiges Logging-System. Sie können aktuelle Logs über die UI (Einstellungen > Werkzeuge > Logs) einsehen.

Für tiefergehendes Debugging während der Entwicklung:

1. **Debug-Seite**: Greifen Sie auf die Seite `/info/debug` zu, um einen Überblick über die Umgebung, Konfiguration, API-Status und für den Client verfügbare Umgebungsvariablen der Anwendung zu erhalten.
2. **Bedingte Haltepunkte**: Um die Ausführung in den Entwicklertools Ihres Browsers automatisch anzuhalten, wenn kritische Fehler (Level `error`, `critical`, `DEV`) in der Konsole protokolliert werden, setzen Sie die folgende Umgebungsvariable in Ihrer lokalen `.env.local`-Datei und starten Sie Ihren Entwicklungsserver neu:
   ```bash
   NEXT_PUBLIC_DEBUG_BREAKS=true
   ```
   Dies ermöglicht es Ihnen, den Anwendungszustand genau in dem Moment zu untersuchen, in dem ein wichtiger Fehler auftritt. Diese Funktion funktioniert nur im Entwicklungsmodus (`npm run dev`) und erfordert, dass die Umgebungsvariable explizit auf `true` gesetzt ist.

<br/>

## Community-Projekte - Teilen Sie Ihr Projekt

Teilen Sie Ihr Projekt nach der Bereitstellung mit der Community. Wir werden auf Ihr Projekt verlinken, um anderen zu helfen, es zu entdecken und davon zu lernen.

| Projekt                                                                                                                                                        | Funktionen                                                                                                  | GitHub                                                                              |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| 🚀 CoolAGI: Wo KI auf Vorstellungskraft trifft<br/>![CoolAGI Logo](https://github.com/nextgen-user/freegpt4plus/assets/150797204/9b0e1232-4791-4d61-b949-16f9eb284c22) | Code Interpreter, Vision, Mindmaps, Websuchen, Fortgeschrittene Datenanalysen, Umgang mit großen Datenmengen und mehr! | [nextgen-user/CoolAGI](https://github.com/nextgen-user/CoolAGI)                     |
| HL-GPT                                                                                                                                                         | Vollständig überarbeitete UI                                                                                        | [harlanlewis/nextjs-chatgpt-app](https://github.com/harlanlewis/nextjs-chatgpt-app) |

Für öffentliche Projekte aktualisieren Sie Ihre README.md mit Ihren Änderungen und reichen Sie einen Pull-Request ein, um Ihr Projekt unserer Liste hinzuzufügen und so dessen Auffindbarkeit zu unterstützen.

<br/>

## Bewährte Praktiken

- **Bleiben Sie auf dem Laufenden**: Führen Sie häufig Updates aus dem Haupt-Repository von FlowHero/big-AGI zusammen, um Fehlerbehebungen und neue Funktionen zu integrieren.
- **Halten Sie es Open Source**: Erwägen Sie, Ihr Derivat als Open Source zu pflegen, um Community-Beiträge zu fördern.
- **Engagieren Sie sich in der Community**: Nutzen Sie Plattformen wie GitHub, Discord oder Reddit für Feedback, Zusammenarbeit und Projektförderung.

Die Entwicklung einer abgeleiteten Anwendung ist eine Gelegenheit, neue Möglichkeiten mit KI zu erkunden und Ihre Innovationen mit der globalen Community zu teilen. Wir freuen uns auf Ihre Beiträge.
