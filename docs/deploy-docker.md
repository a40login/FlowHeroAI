# `FlowHero` mit Docker bereitstellen

Nutzen Sie Docker-Container, um die FlowHero-Anwendung für einen effizienten und automatisierten Bereitstellungsprozess bereitzustellen.
Docker gewährleistet schnellere Entwicklungszyklen, einfachere Zusammenarbeit und nahtloses Umgebungsmanagement.

## Eigenen Container erstellen und ausführen 🔧

1. **FlowHero klonen**
   ```bash
   git clone https://github.com/enricoros/big-agi.git # Annahme: FlowHero ist ein Fork/basiert auf big-agi
   cd big-agi # Pfad ggf. anpassen
   ```
2. **Das Docker-Image erstellen**: Erstellen Sie ein lokales Docker-Image aus dem bereitgestellten Dockerfile:
   ```bash
   docker build -t big-agi .
   ```
3. **Den Docker-Container ausführen**: Starten Sie einen Docker-Container aus dem neu erstellten Image
   und machen Sie dessen HTTP-Port 3000 auf Ihrem `localhost:3000` verfügbar mit:
   ```bash
   docker run -d -p 3000:3000 big-agi
   ```
4. Rufen Sie [http://localhost:3000](http://localhost:3000) im Browser auf.

<br/>

## Offizielle Container ausführen 📦

`FlowHero` (basierend auf big-AGI) wird aus dem Quellcode vorgefertigt und als Docker-Image im GitHub Container Registry (ghcr) veröffentlicht.
Der Build-Prozess ist transparent und erfolgt über GitHub Actions, wie in der
Datei beschrieben.

### Offizielle Images: [ghcr.io/enricoros/big-agi](https://github.com/enricoros/big-agi/pkgs/container/big-agi)

#### Ausführen mit *docker* 🚀

```bash
docker run -d -p 3000:3000 ghcr.io/enricoros/big-agi:latest
```

#### Ausführen mit *docker-compose* 🚀

Wenn Sie Docker Compose installiert haben, können Sie den Docker-Container mit `docker-compose up` ausführen,
um das Docker-Image zu ziehen (falls es noch nicht gezogen wurde) und einen Docker-Container zu starten. Wenn Sie
das Image auf die neueste Version aktualisieren möchten, können Sie `docker-compose pull` ausführen, bevor Sie den Dienst starten.

```bash
docker-compose up -d
```

### Lokale Dienste für Docker sichtbar machen 🌐

Um lokale Dienste, die auf Ihrer Host-Maschine laufen, für einen Docker-Container zugänglich zu machen, wie z.B. einen
[Browseless](./config-feature-browse.md)-Dienst oder eine lokale API, können Sie dieser vereinfachten Anleitung folgen:

| Betriebssystem  | Schritte, um lokale Dienste für Docker sichtbar zu machen                                                                                                                                                                                                                                                                                                                                               |
|:------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Windows und macOS | Verwenden Sie den speziellen DNS-Namen `host.docker.internal`, um von innerhalb des Docker-Containers auf die Host-Maschine zu verweisen. Es ist keine zusätzliche Netzwerkkonfiguration erforderlich. Greifen Sie auf lokale Dienste über `host.docker.internal:<PORT>` zu.                                                                                                                                                                   |
| Linux             | Zwei Optionen: *A*. Verwenden Sie <ins>--network="host"</ins> (`docker run --network="host" -d big-agi`) beim Ausführen des Docker-Containers, um den Container in den Netzwerkstack des Hosts zu integrieren; dies reduziert jedoch die Container-Isolation. Alternativ: *B*. Verbinden Sie sich <ins>direkt über die IP-Adresse des Hosts</ins> mit lokalen Diensten, da host.docker.internal unter Linux standardmäßig nicht verfügbar ist. |

<br/>

### Reverse-Proxy-Konfiguration

Ein Reverse-Proxy ist ein Server, der vor dem FlowHero-Container sitzt und Web-
Anfragen an diesen weiterleiten kann. Er wird oft verwendet, um mehrere Webanwendungen zu betreiben, sie im Internet verfügbar zu machen und
die Sicherheit zu erhöhen.

Wenn Sie FlowHero hinter einem Reverse-Proxy bereitstellen, möchten Sie vielleicht
unsere [Reverse-Proxy-Bereitstellungsanleitung](deploy-reverse-proxy.md) für weitere Informationen einsehen.

<br/>

### Weitere Informationen

Das [`Dockerfile`](../Dockerfile) beschreibt, wie ein Docker-Image erstellt wird. Es etabliert eine Node.js-Umgebung,
installiert Abhängigkeiten und erstellt eine produktionsreife Version der Anwendung als lokalen Container.

Die Datei [`docker-compose.yaml`](../docker-compose.yaml) ist so konfiguriert, dass sie das
offizielle Image (big-agi:latest) ausführt. Diese Datei wird verwendet, um den `big-agi`-Dienst zu definieren,
Port 3000 auf dem Host freizugeben und FlowHero (basierend auf big-AGI) innerhalb des Containers zu starten (Startbefehl).

Die Datei [`.github/workflows/docker-image.yml`](../.github/workflows/docker-image.yml) wird verwendet,
um die offiziellen Docker-Images zu erstellen und sie im GitHub Container Registry (ghcr) zu veröffentlichen.
Der Build-Prozess ist transparent und erfolgt über GitHub Actions.

<br/>

Nutzen Sie die Möglichkeiten von Docker für eine zuverlässige und effiziente FlowHero-Bereitstellung!
