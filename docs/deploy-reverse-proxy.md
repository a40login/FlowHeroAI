# Erweitert: FlowHero hinter einem Reverse-Proxy bereitstellen

Hinweis: Wenn Sie keinen Reverse-Proxy eingerichtet haben, können Sie diese Anleitung überspringen.

Wenn Sie FlowHero hinter einem Reverse-Proxy bereitstellen, möchten Sie möglicherweise Ihren Proxy so konfigurieren, dass er Streaming-Ausgaben unterstützt.
Diese Anleitung enthält Anweisungen, wie Sie Ihren Reverse-Proxy konfigurieren, um Streaming-Ausgaben von FlowHero zu unterstützen.

Dies ist für fortgeschrittene Bereitstellungen gedacht, und Sie sollten ein grundlegendes Verständnis davon haben, wie Reverse-Proxys funktionieren.

## Nginx-Konfiguration

Wenn Sie Nginx als Ihren Reverse-Proxy verwenden, fügen Sie die folgende Konfiguration zu Ihrem Server-Block hinzu:

```nginx
server {
    listen 80;
    server_name ihre-domain.com;

    location / {
        # ...Ihre spezifische proxy_pass-Konfiguration, Beispiel unten...
        proxy_pass http://localhost:3000;  # Annahme: FlowHero läuft auf Port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        # ...

        # Wichtig: Pufferung für Streaming-Antworten (SSE) deaktivieren
        chunked_transfer_encoding on;   # Chunked Transfer Encoding einschalten
        proxy_buffering off;            # Proxy-Pufferung ausschalten
        proxy_cache off;                # Caching ausschalten
        tcp_nodelay on;                 # TCP NODELAY-Option einschalten, Delay-ACK-Algorithmus deaktivieren
        tcp_nopush on;                  # TCP NOPUSH-Option einschalten, Nagle-Algorithmus deaktivieren

        # Wichtig: Längere Timeouts (5 Min.)
        keepalive_timeout 300;
        proxy_connect_timeout 300;
        proxy_read_timeout 300;
        proxy_send_timeout 300;
    }
}
```

Diese Konfiguration deaktiviert Caching und Pufferung, aktiviert Chunked Transfer Encoding und passt TCP-Einstellungen an, um Streaming-Inhalte zu optimieren.

## Fehlerbehebung

Wenn Sie Probleme damit haben, dass Streaming nicht funktioniert, insbesondere bei der Bereitstellung hinter einem Reverse-Proxy,
stellen Sie sicher, dass Ihr Proxy wie oben beschrieben für die Unterstützung von Streaming-Ausgaben konfiguriert ist.

## Zusätzliche Ressourcen

- Für Docker-Bereitstellungen siehe unsere [Docker-Bereitstellungsanleitung](deploy-docker.md)
- Für Kubernetes-Bereitstellungen siehe unsere [Kubernetes-Bereitstellungsanleitung](deploy-k8s.md)
- Für allgemeine Installationsanweisungen siehe unsere [Installationsanleitung](installation.md)

Wenn Sie weiterhin Probleme haben, wenden Sie sich bitte an unsere [Community-Supportkanäle](../README.md#-get-involved).
