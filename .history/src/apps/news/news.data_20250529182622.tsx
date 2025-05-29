import * as React from 'react';
import { StaticImageData } from 'next/image';

import { Box, Chip, SvgIconProps, Typography } from '@mui/joy';
import GoogleIcon from '@mui/icons-material/Google';

import { AnthropicIcon } from '~/common/components/icons/vendors/AnthropicIcon';
import { ChatBeamIcon } from '~/common/components/icons/ChatBeamIcon';
import { ExternalLink } from '~/common/components/ExternalLink';
import { GroqIcon } from '~/common/components/icons/vendors/GroqIcon';
import { LocalAIIcon } from '~/common/components/icons/vendors/LocalAIIcon';
import { MistralIcon } from '~/common/components/icons/vendors/MistralIcon';
import { PerplexityIcon } from '~/common/components/icons/vendors/PerplexityIcon';

import { Brand } from '~/common/app.config';
import { Link } from '~/common/components/Link';
import { Release } from '~/common/app.release';
import { clientUtmSource } from '~/common/util/pwaUtils';
import { platformAwareKeystrokes } from '~/common/components/KeyStroke';

import { beamBlogUrl } from './beam.data';


// Cover Images
// A landscape image of a capybara made entirely of clear, translucent crystal, wearing oversized black sunglasses, sitting at a sleek, minimalist desk. The desk is bathed in a soft, ethereal light emanating from within the capybara, symbolizing clarity and transparency. The capybara is typing on a futuristic, holographic keyboard, with floating code snippets and diagrams surrounding it, illustrating an improved developer experience and Auto-Diagrams feature. The background is a clean, white space with subtle, geometric patterns. Close-up photography style with a bokeh effect.
import coverV116 from '../../../public/images/covers/release-cover-v1.16.0.png';
// (not exactly) Imagine a futuristic, holographically bounded space. Inside this space, four capybaras stand. Three of them are in various stages of materialization, their forms made up of thousands of tiny, vibrant particles of electric blues, purples, and greens. These particles represent the merging of different intelligent inputs, symbolizing the concept of 'Beaming'. Positioned slightly towards the center and ahead of the others, the fourth capybara is fully materialized and composed of shimmering golden cotton candy, representing the optimal solution the 'Beam' feature seeks to achieve. The golden capybara gazes forward confidently, embodying a target achieved. Illuminated grid lines softly glow on the floor and walls of the setting, amplifying the futuristic aspect. In front of the golden capybara, floating, holographic interfaces depict complex networks of points and lines symbolizing the solution space 'Beaming' explores. The capybara interacts with these interfaces, implying the user's ability to control and navigate towards the best outcomes.
import coverV115 from '../../../public/images/covers/release-cover-v1.15.0.png';
// An image of a capybara sculpted entirely from iridescent blue cotton candy, gazing into a holographic galaxy of floating AI model icons (representing various AI models like Perplexity, Groq, etc.). The capybara is wearing a lightweight, futuristic headset, and its paws are gesturing as if orchestrating the movement of the models in the galaxy. The backdrop is minimalist, with occasional bursts of neon light beams, creating a sense of depth and wonder. Close-up photography, bokeh effect, with a dark but vibrant background to make the colors pop.
import coverV114 from '../../../public/images/covers/release-cover-v1.14.0.png';
// An image of a capybara sculpted entirely from black cotton candy, set against a minimalist backdrop with splashes of bright, contrasting sparkles. The capybara is using a computer with split screen made of origami, split keyboard and is wearing origami sunglasses with very different split reflections. Split halves are very contrasting. Close up photography, bokeh, white background.
import coverV113 from '../../../public/images/covers/release-cover-v1.13.0.png';
// An image of a capybara sculpted entirely from black cotton candy, set against a minimalist backdrop with splashes of bright, contrasting sparkles. The capybara is calling on a 3D origami old-school pink telephone and the camera is zooming on the telephone. Close up photography, bokeh, white background.
import coverV112 from '../../../public/images/covers/release-cover-v1.12.0.png';


interface NewsItem {
  versionCode: string;
  versionName?: string;
  versionMoji?: string;
  versionDate?: Date;
  versionCoverImage?: StaticImageData;
  text?: string | React.JSX.Element;
  items?: {
    text: React.ReactNode;
    dev?: boolean;
    issue?: number;
    icon?: React.FC<SvgIconProps>;
    noBullet?: boolean;
  }[];
}

// news and feature surfaces
export const NewsItems: NewsItem[] = [
  {
    versionCode: '2.0.0-beta', // Assuming Release.App.versionCode would be this for FlowHero
    versionName: 'FlowHero AI Suite 2.0.0-beta',
    versionDate: new Date(), // Updated to current time as per example "bereitgestellt vor 24 Minuten"
    items: [
      { text: <>Sie verwenden einen Beta-Entwicklungs-Build der <B>FlowHero AI Suite</B>. Diese Version enthält neue, zukunftsweisende Funktionen, die sich noch in der Erprobung befinden und sich ändern oder unerwartetes Verhalten zeigen können.</> },
      { text: <><B>Aktuelle Beta-Schwerpunkte:</B> Verbesserte Workflow-Orchestrierung, erweiterte API-Anbindungen für Sub-Agenten, Integration von Gemini für erweiterte Intent-Erkennung, Optimierungen der CompanyGuruHero-Wissensbasis.</> },
      { text: <><B>FlowHero AI Suite:</B> Eine Teilliste der Änderungen finden Sie in unserem internen Changelog.</> }, // Placeholder for actual link
      { text: <>Bitte melden Sie unerwartetes Verhalten oder Fehlermeldungen direkt an den <B>FlowHeroSupportHero</B> oder das Entwicklungsteam.</> },
      { text: <>Über <B>2.000 Code-Anpassungen</B> und mehr als <B>60.000 geänderte Codezeilen</B> im Vergleich zur Version 1.16.</> },
      { text: <>Hinweis: Dieser Build ist für Test- und Evaluierungszwecke gedacht. Für produktive Umgebungen nutzen Sie bitte die letzte stabile Version. Cloud-Backups für Konfigurationen sind in dieser Beta-Phase eventuell nur eingeschränkt verfügbar. Die <B href='#'>stabile Version finden Sie hier</B>.</> }, // Placeholder for actual link
    ],
  },
  {
    versionCode: '1.16.9',
    versionName: 'Kristallklar',
    versionDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // "Vor 12 Monaten veröffentlicht"
    versionCoverImage: coverV116, // Assuming you want to keep existing cover images
    text: <>Neuerungen und Verbesserungen in der stabilen Linie (Highlights seit 1.15):</>,
    items: [
      { text: <><B>Workflow-Orchestrierung & MainHero Verbesserungen:</B></>, noBullet: true },
      { text: <>Optimierungen der Kernlogik und der Benutzeroberfläche für die Workflow-Steuerung, basierend auf Nutzerfeedback.</>, icon: ChatBeamIcon }, // Assuming ChatBeamIcon is relevant for orchestration
      { text: <>Kostenabschätzung für <B>LLM-Nutzung</B> bei unterstützten Modellen (z.B. Gemini, OpenAI) in komplexen Workflows* 💰</> },
      { text: <>Wesentliche Verbesserungen bei der automatischen Erstellung von <B>Prozessdiagrammen</B> (z.B. /auto_visualize_workflow).</> },
      { text: <>Speichern und Laden von Chat-basierten <B>Workflow-Konfigurationen</B> mit {platformAwareKeystrokes('Ctrl+S')} / {platformAwareKeystrokes('Ctrl+O')} (im Admin-Interface).</> },
      { text: <><B>YouTube Transkriptions-Integration</B> für den ResearchHero und ContentIdeenHero:</>, noBullet: true },
      { text: <>Neuer Persona-Modus: "<B>Chatte mit Videos</B>" für Inhaltsanalyse.</> },
      { text: <>Verbesserte Darstellung von <B>Formeln in Reports</B> und optimierte Diagramme im Dark-Mode des Admin-Interfaces.</> },
      { text: <>Weitere Verbesserungen: Automatischer <B>Zeilenumbruch in Code-Blöcken</B> (z.B. bei API-Antworten), Auswahl-Toolbar in Ergebnisansichten, <B>3x schnellere Performance</B> auf Apple Silicon für lokale Agenten-Instanzen.</> },
      { text: <>Aktualisierte Anbindungen und Unterstützung für <B>Anthropic (Claude)</B>*, <B>Groq (Llama)</B>*, <B>Ollama (lokale Modelle)</B>, <B>OpenAI (GPT)</B>*, <B>OpenRouter</B>*, und <B>Perplexity</B>*</> },
      { text: <>Versions-Highlights der stabilen Linie 1.16.x:</>, noBullet: true },
      { text: <>1.16.1: Unterstützung für <B>OpenAI GPT-4o</B></> },
      { text: <>1.16.2: Verbesserte <B>Gemini-Unterstützung</B>, <B>HTML/Markdown-Downloads</B> für Reports, aktuelle <B>Mistral-Modelle</B></> },
      { text: <>1.16.3: Unterstützung für <B href='#'>Claude 3.5 Sonnet</B> (bitte Anthropic-Modellkonfigurationen aktualisieren)</> }, // Placeholder
      { text: <>1.16.4: <B>8192 Token Kontextlänge</B> für Claude 3.5 Sonnet</> },
      { text: <>1.16.5: OpenAI <B>GPT-4o Mini</B> Unterstützung</> },
      { text: <>1.16.6: Groq <B>Llama 3.1</B> Unterstützung</> },
      { text: <>1.16.7: <B>GPT-4o</B> Modellversion 2024-08-06</> },
      { text: <>1.16.8: Neueste <B>ChatGPT-4o</B> Modelle</> },
      { text: <>1.16.9: Fehlerbehebungen bei der <B>Gemini-Integration</B></> },
      { text: <>Hinweis: OpenAI <B>o1</B>, DeepSeek R1 und neuere Modelle erfordern FlowHero AI Suite 2.0 oder höher. <B href='#'>Melden Sie sich hier für Updates zur Version 2.0 an</B>.</> }, // Placeholder
    ],
  },
  {
    versionCode: '1.15',
    versionName: 'Workflow-Bündelung',
    versionDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // "Vor 1 Jahr veröffentlicht"
    versionCoverImage: coverV115,
    text: <>Workflow-Bündelung ("Beam") - Eingeführt in 1.15: Die Workflow-Bündelung (intern "Beam" genannt) ist eine innovative Methode in FlowHero, die es ermöglicht, mehrere spezialisierte Sub-Agenten (oder verschiedene LLMs für eine Aufgabe) parallel oder sequenziell an einer komplexen Anfrage arbeiten zu lassen. Dies beschleunigt die Lösungsfindung und verbessert die Qualität der Ergebnisse, indem die kollektiven Stärken diverser KI-Modelle und spezialisierter Logiken genutzt werden.</>,
    items: [
      { text: <><B href='#'>Workflow-Bündelung ("Beam")</B>: Finden Sie bessere Antworten und Lösungen durch multi-modale KI-gestützte Prozessketten</>, icon: ChatBeamIcon }, // Placeholder
      { text: <>Automatische Konfiguration von <B>LLM-Parametern</B> für verwaltete Deployments (z.B. optimale Temperatur für kreative vs. analytische Tasks)</> },
      { text: <>Markieren von wichtigen <B>Nachrichten/Ergebnissen ⭐</B> in der Workflow-Übersicht, Filterung und Anhänge-Management</> },
      { text: <>Verbesserungen der <B>Standard-Personas</B> für interagierende Agenten</> },
      { text: <>Fehlerbehebungen bei Gemini-Modellen und <B>SVG-Export</B> von Diagrammen, Verbesserungen an UI und Icons</> },
      { text: <>1.15.1: Unterstützung für <B>Gemini Pro 1.5</B> und <B>OpenAI Modelle</B> vom April 2024</> },
    ],
  },
  {
    versionCode: '1.14',
    versionName: 'Modell-Orchestrierung (Modelmorphic)', // Example adaptation
    versionCoverImage: coverV114,
    versionDate: new Date('2024-03-07T08:00:00Z'), // Keep original date or adapt as needed
    items: [
      { text: <>Anthropic <B href='#'>Claude-3</B> Unterstützung für intelligentere Workflows</>, icon: AnthropicIcon }, // Placeholder
      { text: <><B>Perplexity</B>-Anbindung, inklusive Online-Modelle für Recherchen</>, icon: PerplexityIcon },
      { text: <><B>Groq</B>-Anbindung für extrem schnelle Inferenz (bis zu 500 tok/s)</>, icon: GroqIcon },
      { text: <>Unterstützung für neue <B>Mistral-Large</B> Modelle</>, icon: MistralIcon },
      { text: <>Unterstützung für <B>Google Gemini 1.5</B> Modelle und diverse Verbesserungen</>, icon: GoogleIcon as any },
      { text: <>Tiefere <B>LocalAI</B>-Integration inklusive Unterstützung für <B>Modell-Galerien</B></>, icon: LocalAIIcon },
      { text: <>Wesentliche <B href='#'>Performance-Optimierungen</B>: schnellere Ausführung, geringerer Ressourcenverbrauch</> }, // Placeholder
      { text: <>Verbesserungen: Automatische Größenanpassung von Diagrammen, optimierte Such- und Ordnerfunktionen</> },
      { text: <>Perfekte Skalierung von Chat-basierten Workflows, mit schnellen Tastaturkürzeln</> },
      { text: <>Außerdem: Diagramme passen sich automatisch an, Code-Export zu StackBlitz und JSFiddle, schnelle Umschaltung der Modellsichtbarkeit, externe Linköffnung, Online-Dokumentation</> },
      { text: <>Fehlerbehebungen: Standalone LaTeX-Blöcke, Schließen von Ansichten durch Ziehen, Aktualität von Wissensdatenbanken, Abstürze bei Google Translate</> },
    ],
  },
  {
    versionCode: '1.13',
    versionName: 'Multi-Workflow & Fokus (Multi + Mind)',
    versionMoji: '🧠🔀',
    versionDate: new Date('2024-02-08T07:47:00Z'),
    versionCoverImage: coverV113,
    items: [
      { text: <>Side-by-Side <B>Split-Fenster</B>: Multitasking mit parallelen Workflow-Ansichten</> },
      { text: <><B wow>Multi-Workflow</B> Modus: Mehrere Agenten gleichzeitig instruieren</> },
      { text: <>Anpassbare <B>Textgröße</B>: kompaktere Ansichten</> },
      { text: <>Export von <B>Tabellen als CSV</B>-Dateien</> },
      { text: <><B>AgentDev2</B> Persona Technologievorschau (für Entwickler)</> },
      { text: <>Verbesserte Darstellung von Workflows, Abständen, Schriftarten, Menüs</> },
      { text: <>Mehr: Video-Player-Integration, LM Studio Tutorial, Geschwindigkeitsverbesserungen, MongoDB-Anbindung (Dokumentation)</> },
    ],
  },
  {
    versionCode: '1.12',
    versionName: 'FlowHero Hotline (AGI Hotline)',
    versionDate: new Date('2024-01-26T12:30:00Z'),
    versionCoverImage: coverV112,
    items: [
      { text: <><B wow>Voice Call Personas</B>: Zeitersparnis durch sprachgesteuerte Workflows und Zusammenfassungen</> },
      { text: <>Aktualisierte <B>OpenAI Modelle</B> auf die Version 0125</> },
      { text: <>Workflows: Automatische <B wow>Umbenennung</B> und <B>Zuweisung zu Ordnern</B></> },
      { text: <><B>Link Sharing</B> Überarbeitung und Steuerung</> },
      { text: <><B>Barrierefreiheit</B> für Screenreader</> },
      { text: <>Export von Workflows nach <B>Markdown</B></> },
      { text: <>Einfügen von <B>Tabellen aus Excel</B></> },
      { text: <>Umfangreiche Optimierungen</> },
      { text: <>Ollama Updates</> },
      { text: <>Über <B>150 Commits</B> und <B>7.000+ Zeilen Code geändert</B> für Entwicklungsverbesserungen</>, dev: true },
    ],
  },
  {
    versionCode: '1.11',
    versionName: 'Singularität der Agenten',
    versionMoji: '🌌🌠',
    versionDate: new Date('2024-01-16T06:30:00Z'),
    items: [
      { text: <><B wow>Workflow-Suche</B> (@Nutzername)</> }, // Placeholder for contributor
      { text: <>Schnelles <B>Kommando-Panel</B> (öffnen mit '/')</> },
      { text: <><B>Together AI</B> Inferenz-Plattform Unterstützung</> },
      { text: <>Persona-Erstellung: <B>Verlauf</B></> },
      { text: <>Persona-Erstellung: Behebung von <B>API-Timeouts</B></> },
      { text: <>Unterstützung für bis zu fünf <B>OpenAI-kompatible</B> Endpunkte</> },
    ],
  },
  {
    versionCode: '1.10',
    versionName: 'Das Jahr der KI-Agenten (The Year of AGI)',
    versionDate: new Date('2024-01-06T08:00:00Z'),
    items: [
      { text: <><B wow>Neue Benutzeroberfläche</B> für Desktop und Mobile, ermöglicht zukünftige Erweiterungen</> },
      { text: <><B wow>Ordner-Kategorisierung</B> für Workflow-Management</> },
      { text: <><B>LM Studio</B> Unterstützung und verfeinertes Token-Management</> },
      { text: <>Verschiebbare Panels im Split-Screen-Modus</> },
      { text: <>Fehlerbehebungen und UI-Optimierungen</> },
      { text: <>Entwickler: Dokumentation der Proxy-Einstellungen für Docker</>, dev: true },
    ],
  },
  {
    versionCode: '1.9',
    versionName: 'Kreative Horizonte für Agenten',
    versionDate: new Date('2023-12-28T22:30:00Z'),
    items: [
      { text: <><B wow>DALL·E 3</B> Unterstützung (/zeichne_workflow), mit erweiterter Steuerung</> },
      { text: <><B wow>Perfektes Scrollen</B> UX, auf allen Geräten</> },
      { text: <>Erstellen von Personas <B>aus Text</B></> },
      { text: <>OpenRouter: Automatische Modellerkennung, Unterstützung für kostenlose Stufen und Tarife</> },
      { text: <>Bilderzeugung: Einheitliche UX, inklusive Auto-Prompting für Visualisierungen</> },
      { text: <>Layout-Fix für Firefox</> },
      { text: <>Entwickler: Neues Text2Image-Subsystem, Optima-Layout-Subsystem, ScrollToBottom-Bibliothek, Nutzung der neuen Panes-Bibliothek, verbessertes LLM-Subsystem</>, dev: true },
    ],
  },
  {
    versionCode: '1.8',
    versionName: 'Agenten zum Mond und zurück (To The Moon And Back)',
    versionDate: new Date('2023-12-20T09:30:00Z'),
    items: [
      { text: <><B wow>Google Gemini</B> Modelle Unterstützung</> },
      { text: <><B>Mistral Plattform</B> Unterstützung</> },
      { text: <><B>Ollama Chats</B> Perfektionierung für lokale Agenten</> },
      { text: <>Benutzerdefinierte <B>Diagramm-Instruktionen</B> (@Nutzername)</> }, // Placeholder
      { text: <><B>Single-Tab</B> Modus, verbessert Datenintegrität und verhindert DB-Korruption</> },
      { text: <>Aktualisierte Ollama (v0.1.17) und OpenRouter Modelle</> },
      { text: <>Mehr: Behobene ⌘ Shortcuts auf Mac</> },
      { text: <><Link href='#'>Webseite</Link>: Offizielle Downloads</> }, // Placeholder
      { text: <>Einfacheres Vercel-Deployment, dokumentierte <Link href='#'>Netzwerk-Fehlerbehebung</Link></>, dev: true }, // Placeholder
    ],
  },
  {
    versionCode: '1.7',
    versionName: 'Anhang-Theorie für Workflows',
    versionDate: new Date('2023-12-10T12:00:00Z'),
    items: [
      { text: <>Neues <B wow>Anhang-System</B>: Drag & Drop, Einfügen, Verlinken, Schnappschüsse, Bilder, Text, PDFs in Workflows</> },
      { text: <>Desktop <B>Webcam-Zugriff</B> für direkte Bilderfassung (Labs-Option)</> },
      { text: <>Unabhängiges Browsing mit <B code='/docs/config-feature-browse.md'>Browserless</B> Unterstützung für ResearchHero</> }, // Assuming browse.md is still relevant
      { text: <><B>Überhitzung</B> von LLMs mit höheren Temperaturgrenzen für kreative Tasks</> },
      { text: <>Verbesserte Sicherheit durch <B code='/docs/deploy-authentication.md'>Passwortschutz</B></> }, // Assuming auth.md is still relevant
      { text: <>{platformAwareKeystrokes('Ctrl+Shift+O')}: Schnellzugriff auf Modelloptionen</> },
      { text: <>Optimierte Spracheingabe und Performance</> },
      { text: <>Neueste Ollama Modelle</> },
    ],
  },
  {
    versionCode: '1.6',
    versionName: 'Agenten surfen im Web (Surf\'s Up)',
    versionDate: new Date('2023-11-28T21:00:00Z'),
    items: [
      { text: <><B wow>Web Browsing</B> Unterstützung, siehe <B code='/docs/config-feature-browse.md'>Browsing-Benutzerhandbuch</B></> },
      { text: <><B>Verzweigte Diskussionen</B> an jeder Nachricht im Workflow</> },
      { text: <><B>Tastaturnavigation</B>: {platformAwareKeystrokes('Ctrl+Shift+Left/Right')} zum Navigieren in Workflows</> },
      { text: <><B>UI-Fixes</B> (Dank an den ersten Sponsor)</> },
      { text: <>Unterstützung für Anthropic Claude 2.1 hinzugefügt</> },
      { text: <>Große Optimierung der Rendering-Performance</> },
      { text: <>Mehr: <Chip>/hilfe</Chip>, Import von ChatGPT-Konversationen, neuer Flattener für Ergebnisse</> },
      { text: <>Entwickler: Verbesserte Code-Qualität, Snackbar-Framework</>, dev: true },
    ],
  },
  {
    versionCode: '1.5',
    versionName: 'Geladen mit KI-Power! (Loaded!)',
    versionDate: new Date('2023-11-19T21:00:00Z'),
    items: [
      { text: <><B wow>Kontinuierliche Spracheingabe</B> für freihändige Interaktion mit Agenten</> },
      { text: <><B>Visualisierungs-Tool</B> für Datenrepräsentationen in Reports</> },
      { text: <><B code='/docs/config-local-ollama.md'>Ollama (Anleitung)</B> Unterstützung für lokale Modelle</> },
      { text: <><B>Text-Tools</B> inklusive Hervorhebung von Unterschieden</> },
      { text: <><B href='https://mermaid.js.org/'>Mermaid</B> Diagramm-Rendering für Workflows</> },
      { text: <><B>OpenAI 1106</B> Chat Modelle</> },
      { text: <><B>SDXL</B> Unterstützung mit Prodia für Bilderzeugung</> },
      { text: <>Cloudflare OpenAI API Gateway</> },
      { text: <>Helicone für Anthropic</> },
    ],
  },
  {
    versionCode: '1.4',
    items: [
      { text: <><B>Teilen und Klonen</B> von Workflows, mit öffentlichen Links</> },
      { text: <><B code='/docs/config-azure-openai.md'>Azure</B> Modelle, inkl. gpt-4-32k</> },
      { text: <><B>OpenRouter</B> Modelle volle Unterstützung, inkl. gpt-4-32k</> },
      { text: <>Latex Rendering in Reports</> },
      { text: <>Erweiterte Chat-Modi (Labs)</> },
    ],
  },
  {
    versionCode: '1.3.5',
    items: [
      { text: <>KI in der realen Welt mit <B>Kamera-OCR</B> - NUR MOBIL</> },
      { text: <><B>Anthropic</B> Modelle volle Unterstützung</> },
      { text: <>Entfernung des Limits von 20 Workflows</> },
      { text: <>Backup von Workflows (alle exportieren)</> },
      { text: <>Import von ChatGPT geteilten Konversationen</> },
      { text: <>Sauberere, bessere, neuere UI, inklusive relativer Workflow-Größen</> },
    ],
  },
  {
    versionCode: '1.3.1',
    items: [
      { text: <><B>Flattener</B> - 4-Modi Konversationszusammenfasser für Agenten-Ergebnisse</> },
      { text: <><B>Forking</B> - Verzweigen Sie Ihre Workflows</> },
      { text: <><B>/system</B> und <B>/assistent</B> um eine <i>System</i>- oder <i>Assistenten</i>-Nachricht anzuhängen</> },
      { text: 'NextJS STOP Bug.. behoben, mit Vercel!' },
    ],
  },
  {
    versionCode: '1.2.1',
    items: [
      { text: <>Neue Homepage: <b><Link href={'YOUR_FLOWHERO_HOMEPAGE_URL' + clientUtmSource()} target='_blank'>{'YOUR_FLOWHERO_HOMEPAGE_URL'.replace('https://', '')}</Link></b></> }, // Placeholder
      { text: 'Unterstützung für 𝑓unction Modelle' },
      { text: <Box sx={{ display: 'flex', alignItems: 'center' }}>Labs: Experimente</Box> },
    ],
  },
];


function B(props: {
  // one-of
  href?: string,
  issue?: number,
  code?: string,

  wow?: boolean,
  children: React.ReactNode
}) {
  const href =
    props.issue ? `${Brand.URIs.OpenRepo}/issues/${props.issue}`
      : props.code ? `${Brand.URIs.OpenRepo}/blob/main/${props.code}`
        : props.href;
  const boldText = (
    <Typography component='span' color={!!href ? 'primary' : 'neutral'} sx={{ fontWeight: 'lg' }}>
      {props.children}
    </Typography>
  );
  if (!href)
    return boldText;
  // append UTM details if missing
  const hrefWithUtm = href.includes('utm_source=') ? href : href + clientUtmSource();
  return (
    <ExternalLink href={hrefWithUtm} highlight={props.wow} icon={props.issue ? 'issue' : undefined}>
      {boldText}
    </ExternalLink>
  );
}
]]>