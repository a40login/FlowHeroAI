# `Ollama` x `FlowHero` :llama:

Diese Anleitung hilft Ihnen, [Ollama](https://ollama.ai) [Modelle](https://ollama.ai/library) mit
[FlowHero](https://big-agi.com) (basierend auf big-AGI) zu verbinden, für einen professionellen KI/AGI-Betrieb und eine gute UI/Konversationserfahrung.
Die Integration bringt die beliebten FlowHero-Funktionen zu Ollama, einschließlich: Sprachchats,
Bearbeitungswerkzeuge, Modellwechsel, Personas und mehr.

_Zuletzt aktualisiert am 16. Dezember 2023_

![config-local-ollama-0-example.png](pixels/config-ollama-0-example.png)

## Kurzanleitung zur Integration

1. **Stellen Sie sicher, dass der Ollama API Server läuft**: Befolgen Sie die offiziellen Anweisungen, um Ollama auf Ihrer Maschine zum Laufen zu bringen.
   - Detaillierte Anweisungen zur Einrichtung des Ollama API-Servers finden Sie auf der
   [Ollama Download-Seite](https://ollama.ai/download) und den [Anweisungen für Linux](https://github.com/jmorganca/ollama/blob/main/docs/linux.md).
2. **Fügen Sie Ollama als Modellquelle hinzu**: Navigieren Sie in `FlowHero` zum Abschnitt **Modelle**, wählen Sie **Modellquelle hinzufügen** und wählen Sie **Ollama**.
3. **Geben Sie die Ollama Host-URL ein**: Geben Sie die Ollama Host-URL an, unter der der API-Server erreichbar ist (z.B. `http://localhost:11434`).
4. **Modellliste aktualisieren**: Sobald die Verbindung hergestellt ist, aktualisieren Sie die Liste der verfügbaren Modelle, um die Ollama-Modelle einzuschließen.
   > Optional: Verwenden Sie die Ollama Admin-Oberfläche, um zu sehen, welche Modelle verfügbar sind, und 'Pullen' Sie diese auf Ihre lokale Maschine. Beachten Sie,
   dass dieser Vorgang aufgrund von Zeitüberschreitungen der Edge-Funktionen auf dem FlowHero-Server während des Pullens wahrscheinlich fehlschlägt, und
   Sie müssen die 'Pull'-Schaltfläche erneut drücken, bis eine grüne Nachricht erscheint.
5. **Chatten Sie mit Ollama-Modellen**: Wählen Sie ein Ollama-Modell aus und beginnen Sie mit KI-Personas zu chatten.

Zusätzlich zur Verwendung der Benutzeroberfläche kann die Konfiguration auch über
[Umgebungsvariablen](environment-variables.md) erfolgen.

**Visuelle Konfigurationsanleitung**:

* Nachdem Sie den `Ollama`-Modellanbieter hinzugefügt, die IP-Adresse eines Ollama-Servers eingegeben und die Modelle aktualisiert haben:<br/>
  <img src="pixels/config-ollama-1-models.png" alt="config-local-ollama-1-models.png" width="320">

* Das `Ollama`-Admin-Panel mit hervorgehobener `Pull`-Schaltfläche, nachdem das "Yi"-Modell gepullt wurde:<br/>
  <img src="pixels/config-ollama-2-admin-pull.png" alt="config-local-ollama-2-admin-pull.png" width="320">

* Sie können jetzt dynamisch Modell/Persona wechseln und mit den Modellen per Text/Sprache chatten:<br/>
  <img src="pixels/config-ollama-3-chat.png" alt="config-local-ollama-3-chat.png" width="320">

<br/>

### ⚠️ Netzwerk-Fehlerbehebung

Wenn Sie Fehlermeldungen erhalten, dass der Server Probleme beim Verbinden mit Ollama hat, lesen Sie bitte
[diese Nachricht](https://github.com/enricoros/big-AGI/issues/276#issuecomment-1858591483) in Issue #276.

Kurz gesagt, stellen Sie sicher, dass der Ollama-Endpunkt von den Servern aus zugänglich ist, auf denen Sie FlowHero ausführen (dies könnten
Localhost- oder Cloud-Server sein).
![Ollama Netzwerkdiagramm](pixels/config-ollama-network.png)

<br/>

### Erweitert: Modellparameter

Für Benutzer, die tiefer in erweiterte Einstellungen eintauchen möchten, bietet `FlowHero` zusätzliche Konfigurationsoptionen,
wie z.B. die Modelltemperatur, maximale Token usw.

### Erweitert: Ollama unter einem Reverse-Proxy

Sie können Ihren Ollama-Server elegant im Internet verfügbar machen (und somit die Verwendung von Ihren serverseitigen
FlowHero-Bereitstellungen erleichtern), indem Sie ihn unter einer http/https-URL wie z.B. `https://ihredomain.com/ollama` freigeben.

Auf Ubuntu-Servern müssen Sie `nginx` installieren und so konfigurieren, dass Anfragen an Ollama weitergeleitet werden.

```bash
sudo apt update
sudo apt install nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ihredomain.com
```

Bearbeiten Sie dann die nginx-Konfigurationsdatei `/etc/nginx/sites-enabled/default` und fügen Sie den folgenden Block hinzu:

```nginx
    location /ollama/ {
        proxy_pass http://127.0.0.1:11434/;

        # Pufferung für Streaming-Antworten (SSE) deaktivieren
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
        
        # Längere Timeouts (1 Stunde)
        keepalive_timeout 3600;
        proxy_read_timeout 3600;
        proxy_connect_timeout 3600;
        proxy_send_timeout 3600;
    }
```

Wenden Sie sich an unsere Community, wenn Sie hierbei Hilfe benötigen.

<br/>

### Community und Support

Treten Sie unserer Community bei, um Ihre Erfahrungen zu teilen, Hilfe zu erhalten und bewährte Praktiken zu diskutieren:

[![Offizieller Discord](https://discordapp.com/api/guilds/1098796266906980422/widget.png?style=banner2)](https://discord.gg/MkH4qj2Jp9)


---

`FlowHero` ist bestrebt, eine leistungsstarke, intuitive und datenschutzfreundliche KI-Erfahrung zu bieten.
Wir freuen uns darauf, dass Sie die Möglichkeiten mit Ollama-Modellen erkunden. Viel Spaß beim Erstellen!
