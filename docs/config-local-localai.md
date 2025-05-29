# Betreiben Sie Ihre Modelle mit `LocalAI` x `FlowHero`

[LocalAI](https://localai.io) ermöglicht es Ihnen, Ihre KI-Modelle lokal oder in der Cloud auszuführen. Es unterstützt Text-, Bild-, ASR-, Sprach- und weitere Modelle.

Wir vertiefen die Integration zwischen den beiden Produkten (LocalAI und FlowHero, basierend auf big-AGI). Zum Zeitpunkt des Schreibens integrieren wir die folgenden Funktionen:

- ✅ [Textgenerierung](https://localai.io/features/text-generation/) mit GPTs
- ✅ [Funktionsaufrufe (Function Calling)](https://localai.io/features/openai-functions/) durch GPTs 🆕
- ✅ [Modellgalerie](https://localai.io/models/) zum Auflisten und Installieren von Modellen
- ✖️ [Vision API](https://localai.io/features/gpt-vision/) für Bild-Chats
- ✖️ [Bilderzeugung](https://localai.io/features/image-generation) mit Stable Diffusion
- ✖️ [Audio zu Text](https://localai.io/features/audio-to-text/)
- ✖️ [Text zu Audio](https://localai.io/features/text-to-audio/)
- ✖️ [Erzeugung von Embeddings](https://localai.io/features/embeddings/)
- ✖️ [Eingeschränkte Grammatiken (Constrained Grammars)](https://localai.io/features/constrained_grammars/) (JSON-Ausgabe)
- ✖️ Stimmenklonen 🆕

_Zuletzt aktualisiert am 21. Februar 2024_

## Anleitung

### LocalAI Installation und Konfiguration

Folgen Sie der Anleitung unter: https://localai.io/basics/getting_started/

- Überprüfen Sie, ob es funktioniert, indem Sie zu [http://localhost:8080/v1/models](http://localhost:8080/v1/models) navigieren
  (oder die IP:Port der Maschine, falls remote ausgeführt) und sehen, dass die heruntergeladenen Modelle
  in der JSON-Antwort aufgelistet sind.

### Integration: Chatten mit LocalAI in FlowHero

- Gehen Sie zu Modelle > Modellquelle hinzufügen vom Typ: **LocalAI**
- Geben Sie die Standardadresse ein: `http://localhost:8080`, oder die Adresse Ihrer LocalAI Cloud-Instanz.
  ![Modelle konfigurieren](pixels/config-localai-1-models.png)
  - Wenn Sie remote arbeiten, ersetzen Sie localhost durch die IP der Maschine. Achten Sie darauf, das Format **IP:Port** zu verwenden.
- Laden Sie die Modelle (klicken Sie auf `Modelle 🔄`)
- Wählen Sie das Modell aus und chatten Sie

Zusätzlich zur Benutzeroberfläche kann die Konfiguration auch über
[Umgebungsvariablen](environment-variables.md) erfolgen.

### Integration: Modellgalerie

Wenn die laufende LocalAI-Instanz mit einer [Modellgalerie](https://localai.io/models/) konfiguriert ist:

- Gehen Sie zu Modelle > LocalAI
- Klicken Sie auf `Galerie-Admin`
- Wählen Sie die zu installierenden Modelle aus und sehen Sie sich den Installationsfortschritt an.
  ![img.png](pixels/config-localai-2-gallery.png)

## Fehlerbehebung

##### Unbekannte Kontextfenstergröße

Zum Zeitpunkt des Schreibens veröffentlicht LocalAI die `Kontextfenstergröße` des Modells nicht.
Es wird angenommen, dass jedes Modell chatfähig ist und ein Kontextfenster von 4096 Token hat.
Bitte aktualisieren Sie die Datei [src/modules/llms/transports/server/openai/models/models.data.ts](../src/modules/llms/server/openai/models/models.data.ts)
(im FlowHero/big-AGI Quellcode) mit den Mapping-Informationen zwischen LocalAI-Modell-IDs und Namen/Beschreibungen/Token usw.

# 🤝 Unterstützung

- Treten Sie dem [LocalAI Discord](https://discord.gg/uJAeKSAGDy) für Unterstützung und Fragen bei.
- Treten Sie dem [FlowHero/big-AGI Discord](https://discord.gg/MkH4qj2Jp9) für Fragen bei.
- Für FlowHero/big-AGI-Support eröffnen Sie bitte ein Issue in unserem [FlowHero/big-AGI Issue Tracker](https://bit.ly/agi-request).
