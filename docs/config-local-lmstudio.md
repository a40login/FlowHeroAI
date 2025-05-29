# LM Studio mit FlowHero integrieren

Richten Sie LM Studio schnell mit FlowHero ein, um lokale und offene LLMs auf Ihrem Computer für verbesserte Privatsphäre und Kontrolle über KI-Interaktionen auszuführen.

## Videoanleitung

Eine visuelle Schritt-für-Schritt-Anleitung finden Sie in unserem [YouTube-Tutorial](https://www.youtube.com/watch?v=MqXzxVokMDk).

[![FlowHero lokal mit LM Studio ausführen YouTube-Tutorial](http://img.youtube.com/vi/MqXzxVokMDk/0.jpg)](http://www.youtube.com/watch?v=MqXzxVokMDk "FlowHero lokal mit LM Studio ausführen")


## Kurzanleitung zur Einrichtung

### FlowHero installieren

FlowHero (basierend auf big-AGI) klonen und einrichten:

```bash
git clone https://github.com/enricoros/big-agi.git && cd big-agi # Ggf. anpassen für FlowHero Repo
npm install # Oder: yarn install
npm run dev # Oder: yarn dev
# Falls Abhängigkeiten fehlen:
npm install @mui/material # Oder: yarn add @mui/material
```

### LM Studio konfigurieren

Stellen Sie sicher, dass LM Studio läuft (Standard: [http://localhost:1234](http://localhost:1234)).
Überprüfen Sie die URL und ändern Sie sie gegebenenfalls.
1. Laden Sie lokale Modelle in LM Studio herunter.
2. Starten Sie den LM Studio Server.
3. Optional: Überprüfen Sie die Protokolle.

### Integration in FlowHero

1. Navigieren Sie in FlowHero zu **Modelle** > **Hinzufügen** > **LM Studio**.
2. Geben Sie die API-URL ein: `http://localhost:1234` (ändern Sie diese gegebenenfalls).
3. Aktualisieren Sie, indem Sie auf die Schaltfläche `Modelle` klicken, um Modelle aus LM Studio zu laden.

Zusätzlich zur Verwendung der Benutzeroberfläche kann die Konfiguration auch über
[Umgebungsvariablen](environment-variables.md) erfolgen.

## Fehlerbehebung

- **Fehlendes @mui/material**: Führen Sie `npm install @mui/material` oder `yarn add @mui/material` aus.
- **Verbindungsprobleme**: Überprüfen Sie die URL von LM Studio und stellen Sie sicher, dass es betriebsbereit ist.


## Weitere Unterstützung

Erweiterte Konfigurationen und mehr:

- FlowHero/big-AGI Community: [Discord](https://discord.gg/MkH4qj2Jp9)
- LM Studio: [LM Studio Homepage](https://lmstudio.ai/)
