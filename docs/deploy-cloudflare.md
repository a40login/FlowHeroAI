# Eine Next.js-App auf Cloudflare Pages bereitstellen

> WARNUNG: Cloudflare Pages unterstützt keine traditionellen NodeJS-Laufzeitumgebungen, sondern nur Edge Runtime-Funktionen.
>
> In diesem Projekt verwenden wir Prisma, das mit serverless Postgres verbunden ist, was derzeit nicht auf
> Edge-Funktionen ausgeführt werden kann. Daher können wir dieses Projekt (FlowHero, basierend auf big-AGI) nicht auf Cloudflare Pages bereitstellen.
>
> Workaround: Schritt 3.4. wurde unten hinzugefügt, um die traditionelle NodeJS-Laufzeitumgebung zu LÖSCHEN - was bedeutet, dass einige
> Teile dieser Anwendung nicht funktionieren werden.
>  - [Nebeneffekte](https://github.com/enricoros/big-agi/blob/main/src/apps/chat/trade/server/trade.router.ts#L19):
     > Sharing-Funktionalität zur DB, Import von ChatGPT Share und Posten auf Paste.GG werden nicht funktionieren.
>  - Siehe [Issue 174](https://github.com/enricoros/big-agi/issues/174).
>
> Langfristig: Folgen Sie [prisma/prisma: Support Edge Function deployments](https://github.com/prisma/prisma/issues/21394)
> und konvertieren Sie die Node-Laufzeitumgebung in eine Edge-Laufzeitumgebung, sobald Prisma dies unterstützt.

Diese Anleitung beschreibt die Schritte zur Bereitstellung Ihrer Next.js-App (FlowHero) auf Cloudflare Pages.
Sie basiert auf der [offiziellen Cloudflare-Entwicklerdokumentation](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/),
mit einigen zusätzlichen Schritten.

## Schritt 1: Repository Forking

Forken Sie das Repository (von big-AGI oder FlowHero) in Ihr persönliches GitHub-Konto.

## Schritt 2: Cloudflare Pages mit Ihrem GitHub-Konto verknüpfen

1. Navigieren Sie zum Cloudflare Pages-Bereich und klicken Sie auf die Schaltfläche `Create a project` (Projekt erstellen).
2. Klicken Sie auf `Connect To Git` (Mit Git verbinden) und gewähren Sie Cloudflare Pages Zugriff auf entweder alle GitHub-Kontorepositories oder ausgewählte Repositories.
   Wir empfehlen die Verwendung des Zugriffs auf ausgewählte Repositories und die Auswahl des geforkten Repositorys aus Schritt 1.

## Schritt 3: Build und Bereitstellungen konfigurieren

1. Nachdem Sie das geforkte GitHub-Repository ausgewählt haben, klicken Sie auf die Schaltfläche **Begin Setup** (Setup starten).
2. Auf dieser Seite legen Sie Ihren **Projektnamen**, Ihren **Produktionszweig** (z. B. main) und Ihre Build-Einstellungen fest.
3. Wählen Sie `Next.js` aus dem Dropdown-Menü **Framework preset** (Framework-Voreinstellung).
4. Legen Sie einen benutzerdefinierten **Build-Befehl** fest:
    - `rm app/api/cloud/[trpc]/route.ts && npx @cloudflare/next-on-pages@1`
    - Beachten Sie die Kompromisse für diese Löschung im Hinweis oben.
5. Behalten Sie das **Build-Ausgabeverzeichnis** als Standard bei.
6. Klicken Sie auf die Schaltfläche **Save and Deploy** (Speichern und Bereitstellen).

## Schritt 4: Überwachung des Bereitstellungsprozesses

Beobachten Sie den Prozess, wie er Ihre Build-Umgebung initialisiert, das GitHub-Repository klont, die Anwendung erstellt und sie
im Cloudflare-Netzwerk bereitstellt. Sobald dies abgeschlossen ist, fahren Sie mit dem von Ihnen erstellten Projekt fort.

## Schritt 5: Erforderlich: Setzen Sie das Kompatibilitätsflag `nodejs_compat`

1. Navigieren Sie zur Seite [Settings > Functions](https://dash.cloudflare.com/?to=/:account/pages/view/:pages-project/settings/functions) (Einstellungen > Funktionen) Ihres neu erstellten Projekts.
2. Scrollen Sie zu `Compatibility flags` (Kompatibilitätsflags) und geben Sie "`nodejs_compat`" für sowohl die **Produktions-** als auch die **Vorschauumgebungen** ein.
   Es sollte so aussehen: ![](pixels/config-deploy-cloudflare-compat2.png)
3. Stellen Sie Ihr Projekt erneut bereit, damit die neuen Flags wirksam werden.

## Schritt 6: (Optional) Konfiguration der benutzerdefinierten Domain

Verwenden Sie den Tab `Custom domains` (Benutzerdefinierte Domains), um Ihre Domain über CNAME einzurichten.

## Schritt 7: (Optional) Konfiguration der Zugriffsrichtlinie und Webanalyse

Navigieren Sie zur Seite `Settings` (Einstellungen) und aktivieren Sie die folgenden Einstellungen:

1. Zugriffsrichtlinie: Beschränken Sie [Vorschau-Deployments](https://developers.cloudflare.com/pages/platform/preview-deployments/)
   auf Mitglieder Ihres Cloudflare-Kontos über einen Einmal-PIN und beschränken Sie die primäre `*.YOURPROJECT.pages.dev`-Domain.
   Weitere Details finden Sie unter [Bekannte Probleme mit Cloudflare Pages](https://developers.cloudflare.com/pages/platform/known-issues/#enabling-access-on-your-pagesdev-domain).
2. Webanalyse aktivieren.

Herzlichen Glückwunsch! Sie haben Ihre Next.js-App (FlowHero) erfolgreich auf Cloudflare Pages bereitgestellt.
