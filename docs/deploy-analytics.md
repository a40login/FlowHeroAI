# FlowHero Analytics

Das Open-Source-Projekt FlowHero (basierend auf big-AGI) bietet Unterstützung für die folgenden Analysedienste:

- **Google Analytics 4**: manuelle Einrichtung erforderlich
- **PostHog Analytics**: manuelle Einrichtung erforderlich
- **Vercel Analytics**: automatisch bei Bereitstellung auf Vercel

Das Folgende ist ein kurzer Überblick über die Analytics-Optionen für diejenigen, die dieses Open-Source-Projekt bereitstellen.
FlowHero wird auf vielfältige Weise (benutzerdefinierte Builds, Docker, Vercel, Cloudflare usw.) für viele groß angelegte und unternehmensweite Implementierungen bereitgestellt,
und diese Anleitung dient seiner Anpassung.

## Dienstkonfiguration

### Google Analytics 4

- Warum: Nutzerengagement und -bindung, Leistungseinblicke, Personalisierung, Inhaltsoptimierung
- Was: https://support.google.com/analytics/answer/11593727

Google Analytics 4 (GA4) ist ein leistungsstarkes Werkzeug zum Verständnis des Nutzerverhaltens und -engagements.
Dies kann helfen, FlowHero zu optimieren und zu verstehen, welche Funktionen benötigt/von Nutzern verwendet werden und welche nicht.

Um Google Analytics 4 zu aktivieren, müssen Sie die Umgebungsvariable `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
vor dem Starten des lokalen Builds oder des Docker-Builds (d.h. zur Build-Zeit) setzen. Zu diesem Zeitpunkt
kann der Server/Container Analysen an Ihre Google Analytics 4-Property senden.

Stand Februar 27, 2024, befindet sich diese Funktion in der Entwicklung.

### PostHog Analytics

- Warum: Nachverfolgung der Funktionsnutzung, Nutzerpfade, Konversionsoptimierung, Produktanalysen
- Was: Seitenaufrufe, Seitenverlassensereignisse, Nutzerinteraktionen und Bereitstellungskontext

PostHog bietet umfassende Produktanalysen mit Datenschutzkontrollen. Es hilft zu verstehen, wie Nutzer mit den Funktionen von FlowHero interagieren, Verbesserungsmöglichkeiten zu identifizieren und die Nutzererfahrung zu optimieren.

Um PostHog zu aktivieren, setzen Sie die Umgebungsvariable `NEXT_PUBLIC_POSTHOG_KEY` zur Build-Zeit. PostHog ist mit Blick auf Tracking-Optimierung und Datenschutz konfiguriert:

- Verwendet einen Proxy-Endpunkt (`/a/ph`), um Werbeblocker zu vermeiden
- Respektiert Nutzer-Opt-out-Präferenzen über Local Storage
- Verfolgt nur wesentliche Informationen ohne personenbezogene Daten (PII)
- Fügt Bereitstellungskontext für eine bessere Segmentierung hinzu

Die Implementierung folgt den Best Practices von PostHog für Next.js-Anwendungen und beinhaltet manuelles Page-View-Tracking für eine korrekte Single-Page-Application-Unterstützung.

### Vercel Analytics

- Warum: Grobe Traktion verstehen und Bereitstellungsprobleme identifizieren - alles ohne einzelne Nutzer zu verfolgen
- Was: Top-Seiten, Top-Referrer, Herkunftsland, Betriebssystem, Browser und Seitenladegeschwindigkeitsmetriken

Vercel Analytics und Speed Insights sind lokale API-Endpunkte, die auf Ihrer Domain bereitgestellt werden, sodass alles innerhalb Ihrer
Domain bleibt. Darüber hinaus ist der Vercel Analytics-Dienst datenschutzfreundlich und verfolgt keine einzelnen Nutzer.

Dieser Dienst steht Systemadministratoren bei der Bereitstellung auf Vercel zur Verfügung. Er wird automatisch aktiviert, wenn auf Vercel bereitgestellt wird.
Der Code, der Vercel Analytics aktiviert, befindet sich in der Datei `src/pages/_app.tsx`:

```tsx
const MyApp = ({ Component, emotionCache, pageProps }: MyAppProps) => <>
  ...
  {isVercelFromFrontend && <VercelAnalytics debug={false} />}
  {isVercelFromFrontend && <VercelSpeedInsights debug={false} sampleRate={1 / 2} />}
  ...
</>;
```

Wenn FlowHero auf Vercel-Hosts bereitgestellt wird, ist die Umgebungsvariable `process.env.NEXT_PUBLIC_VERCEL_URL` wahrheitsgemäß, und
Analysen werden standardmäßig an den Vercel Analytics-Dienst gesendet, der von Vercel bereitgestellt wird, WENN er über das
Vercel-Projektdashboard konfiguriert wurde.

Zusammenfassend: Um es einzuschalten: Aktivieren Sie den `Analytics`-Dienst im Vercel-Projektdashboard.

## Konfigurationen

| Umfang                                                                                                                   | Standard                   | Beschreibung / Anweisungen                                                                                                                                                  |
|-------------------------------------------------------------------------------------------------------------------------|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Ihre **Quell**-Builds von FlowHero                                                                                       | Keine                      | **Google Analytics**: Umgebungsvariable zur Build-Zeit setzen · **PostHog**: Umgebungsvariable zur Build-Zeit setzen · **Vercel**: Vercel Analytics über das Dashboard aktivieren | 
| Ihre **Docker**-Builds von FlowHero                                                                                       | Keine                      | (**Vercel**: n. z.) · **Google Analytics**: Umgebungsvariable zur `docker build`-Zeit setzen · **PostHog**: Umgebungsvariable zur `docker build`-Zeit setzen.                   |
| [get.big-agi.com](https://get.big-agi.com) (**Big-AGI 1.x**, Basis für FlowHero)                                                            | Vercel + Google + PostHog | Die Hauptwebsite ([Datenschutzrichtlinie](https://big-agi.com/privacy)), kostenlos für jedermann gehostet.                                                                                |
| [Vorgefertigte Docker-Pakete](https://github.com/enricoros/big-AGI/pkgs/container/big-agi) (**Big-AGI 1.x**, 'latest' Tag, Basis für FlowHero) | Google Analytics          | **Vercel**: n. z. · **Google Analytics**: auf big-agi.com Google Analytics für Analysen und Verbesserungen gesetzt · **PostHog**: n. z.                                           |

Hinweis: Diese Informationen sind auf dem Stand vom 3. März 2025 und können sich jederzeit ändern.
