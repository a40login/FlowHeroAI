# Browse-Funktionalität in FlowHero 🌐

Ermöglicht Benutzern das Laden von Webseiten über verschiedene Komponenten von `FlowHero` (basierend auf big-AGI). Diese Funktion wird von Puppeteer-basierten
Browsing-Diensten unterstützt, die die gängigste Methode zum Rendern von Webseiten in einer monitorlosen (headless) Umgebung darstellen.

Einmal konfiguriert, bietet der Browsing-Dienst die folgende Funktionalität:

- ✅ **URL einfügen**: Fügen Sie einfach eine URL per Kopieren/Einfügen oder Drag & Drop in den Chat ein, und `FlowHero` lädt und hängt die Seite an (sehr effektiv).
- ✅ **/browse verwenden**: Geben Sie `/browse [URL]` in den Chat ein, um `FlowHero` anzuweisen, die angegebene Webseite zu laden.
- ✅ **ReAct**: ReAct verwendet automatisch die Funktion `loadURL()`, sobald eine URL angetroffen wird.

Folgende Funktionalität wird noch nicht unterstützt:

- ✖️ **Automatisches Browsen durch LLMs**: Wenn ein LLM auf eine URL stößt, wird es die Seite NICHT laden und wahrscheinlich antworten,
  dass es nicht im Web browsen kann - Keine technische Einschränkung, nur noch nicht außerhalb von `/react` implementiert.

Zuerst müssen Sie einen Puppeteer Web-Browsing-Dienstendpunkt beschaffen. `FlowHero` unterstützt Dienste wie:

| Dienst                                                                              | Funktionierend | Typ         | Standort       | Besondere Merkmale                            |
|--------------------------------------------------------------------------------------|----------------|-------------|----------------|---------------------------------------------|
| [BrightData Scraping Browser](https://brightdata.com/de/products/scraping-browser)   | Ja             | Proprietär  | Cloud          | Erweiterte Scraping-Tools, globaler IP-Pool |
| [Cloudflare Browser Rendering](https://developers.cloudflare.com/browser-rendering/) | ?              | Proprietär  | Cloud          | Integriertes CDN, optimiertes Browser-Rendering |
| ⬇️ [Browserless 2.0](#-browserless-20)                                               | Okay           | OpenSource  | Lokal (Docker) | Parallelität, Debug-Viewer, erweiterte APIs |
| ⬇️ [Ihr Chrome Browser (ALPHA)](#-ihr-eigener-chrome-browser)                          | Alpha          | Proprietär  | Lokal (Chrome) | Persönlicher, experimenteller Gebrauch (ALPHA!) |
| andere Puppeteer-basierte WSS-Dienste                                                | ?              | Variiert    | Cloud/Lokal    | Dienstspezifische Funktionen                  |

## Konfiguration

1. **Endpunkt beschaffen**
   - Stellen Sie sicher, dass Ihr Browsing-Dienst läuft (entfernt oder lokal) und einen WebSocket-Endpunkt verfügbar hat.
   - Notieren Sie die Adresse: `wss://${auth}@{ein-host}:{port}`, oder `ws://` für lokale Dienste auf Ihrer Maschine.

2. **`FlowHero` konfigurieren**
   - Navigieren Sie zu **Einstellungen** > **Werkzeuge** > **Browsen**.
   - Geben Sie die `wss://...`-Verbindungszeichenfolge ein, die von Ihrem Browsing-Dienst bereitgestellt wird.

3. **Funktionen aktivieren**: Wählen Sie aus, welche browse-bezogenen Funktionen Sie aktivieren möchten:
   - **URLs anhängen**: Eine Seite automatisch laden und anhängen, wenn eine URL in den Composer eingefügt wird.
   - **/browse Befehl**: Verwenden Sie den `/browse`-Befehl im Chat, um eine Webseite zu laden.
   - **ReAct**: Aktivieren Sie die `loadURL()`-Funktion in ReAct für erweiterte Interaktionen.

### 🌐 Browserless 2.0

[Browserless 2.0](https://github.com/browserless/browserless) ist ein Docker-basierter Dienst, der ein monitorloses (headless)
Browsing-Erlebnis bietet, das mit `FlowHero` kompatibel ist. Eine Open-Source-Lösung, die Webautomatisierungsaufgaben
auf skalierbare Weise vereinfacht.

Starten Sie Browserless mit:

```bash
docker run -p 9222:3000 browserless/chrome:latest
```

Jetzt können Sie die folgende Verbindungszeichenfolge in `FlowHero` verwenden: `ws://127.0.0.1:9222`.
Sie können auch zu [http://127.0.0.1:9222](http://127.0.0.1:9222) browsen, um den Browserless Debug-Viewer zu sehen
und einige Optionen zu konfigurieren.

Der Chat-Agent kann nicht auf die Webseiten zugreifen, wenn der Browserless-Container keinen direkten Internetzugang hat. Sie können das Problem lösen, indem Sie einen Internet-Proxy für den laufenden Container definieren. Sie können dann die Umgebungsdatei in einer `docker-compose.yaml` verwenden:

```yaml
 browserless:
    image: browserless/chrome:latest
    env_file:
      - .env
    ports:
      - "9222:3000"  # Host-Port 9222 auf Container-Port 3000 abbilden
    environment:
      - MAX_CONCURRENT_SESSIONS=10
```

Sie können dann die Proxy-Zeilen zu Ihrer `.env`-Datei hinzufügen.

```
https_proxy=http://PROXY-IP:PROXY-PORT
http_proxy=http://PROXY-IP:PROXY-PORT
```

So können Sie es in einem Einzeiler-Docker definieren:
`docker run --env https_proxy=http://PROXY-IP:PROXY-PORT --env http_proxy=http://PROXY-IP:PROXY-PORT -p 9222:3000 browserless/chrome:latest `

Hinweis: Wenn Sie `docker-compose` verwenden, sehen Sie sich bitte die
Datei [docker/docker-compose-browserless.yaml](docker/docker-compose-browserless.yaml) für ein Beispiel
an, wie `FlowHero` und Browserless gleichzeitig in einer einzigen Anwendung ausgeführt werden können.


### 🌐 Ihr eigener Chrome Browser

***EXPERIMENTELL - UNGETESTET*** - Sie können Ihren eigenen Chrome-Browser als Browsing-Dienst verwenden, indem Sie ihn so konfigurieren, dass er
einen WebSocket-Endpunkt bereitstellt.

- Schließen Sie alle Chrome-Instanzen (unter Windows überprüfen Sie den Task-Manager, ob er noch läuft).
- Starten Sie Chrome mit den folgenden Befehlszeilenoptionen (unter Windows können Sie die Verknüpfungseigenschaften bearbeiten):
  - `--remote-debugging-port=9222`
- Gehen Sie zu http://localhost:9222/json/version und kopieren Sie den Wert `webSocketDebuggerUrl`.
  - Er sollte etwa so aussehen: `ws://localhost:9222/...`
- Fügen Sie den Wert in die Endpunktkonfiguration ein (siehe Punkt 2 in der Konfiguration).

### Serverseitige Konfiguration

Sie können den Puppeteer WebSocket-Endpunkt (`PUPPETEER_WSS_ENDPOINT`) in der Bereitstellung festlegen, bevor Sie sie ausführen.
Dies ist nützlich für selbst gehostete Instanzen oder wenn Sie den Endpunkt für alle Benutzer vorkonfigurieren möchten und
ermöglicht es Ihnen, die Punkte 2 und 3 oben zu überspringen.

Stellen Sie immer Ihre eigene Benutzerauthentifizierungs-, Autorisierungs- und Sicherheitslösung bereit. Für diese Funktion sollte die tRPC-Route,
die den Browsing-Dienst bereitstellt, mit einer Benutzerauthentifizierungs- und Autorisierungslösung gesichert werden,
um unbefugten Zugriff auf den Browsing-Dienst zu verhindern.

## Unterstützung

Wenn Sie Probleme haben oder Fragen zur Konfiguration der Browse-Funktionalität haben, treten Sie unserer Community auf Discord bei, um Unterstützung und Diskussionen zu erhalten.

[![Offizieller Discord](https://discordapp.com/api/guilds/1098796266906980422/widget.png?style=banner2)](https://discord.gg/MkH4qj2Jp9)

---

Genießen Sie das verbesserte Browsing-Erlebnis in `FlowHero` und erkunden Sie das Web, ohne jemals Ihren Chat verlassen zu müssen!

Zuletzt aktualisiert am 27. Februar 2024 ([auf GitHub bearbeiten](https://github.com/enricoros/big-AGI/edit/main/docs/config-feature-browse.md))
