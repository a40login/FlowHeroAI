# Azure OpenAI Service mit `FlowHero` konfigurieren

Der gesamte Vorgang dauert etwa 5 Minuten und umfasst das Erstellen eines Azure-Kontos,
das Einrichten des Azure OpenAI-Dienstes, das Bereitstellen von Modellen und das Konfigurieren von `FlowHero` (basierend auf big-AGI),
um auf diese Modelle zuzugreifen.

Bitte beachten Sie, dass Azure nach einem Pay-as-you-go-Preismodell arbeitet und
Kreditkarteninformationen erfordert, die mit einem "Abonnement" des Azure-Dienstes verbunden sind.

## `FlowHero` konfigurieren

Wenn Sie einen `API-Endpunkt` und einen `API-Schlüssel` haben, können Sie FlowHero wie folgt konfigurieren:

1. Starten Sie die `FlowHero`-Anwendung.
2. Gehen Sie zu den Einstellungen für **Modelle**.
3. Fügen Sie einen Anbieter hinzu und wählen Sie **Azure OpenAI**.
    - Geben Sie den Endpunkt ein (z.B. 'https://ihr-openai-api-1234.openai.azure.com/').
    - Geben Sie den API-Schlüssel ein (z.B. 'fd5...........................ba').

Die bereitgestellten Modelle sind nun in der Anwendung verfügbar. Wenn Sie keine konfigurierte
Azure OpenAI-Dienstinstanz haben, fahren Sie mit dem nächsten Abschnitt fort.

Zusätzlich zur Verwendung der Benutzeroberfläche kann die Konfiguration auch über
[Umgebungsvariablen](environment-variables.md) erfolgen.

## Azure einrichten

### Schritt 1: Azure-Konto & Abonnement

1. Erstellen Sie ein Konto auf [azure.microsoft.com](https://azure.microsoft.com/de-de/).
2. Gehen Sie zum [Azure-Portal](https://portal.azure.com/).
3. Klicken Sie auf **Ressource erstellen** in der oberen linken Ecke.
4. Suchen Sie nach **Abonnement** und wählen Sie **[Abonnement erstellen](https://portal.azure.com/#create/Microsoft.Subscription)**.
    - Füllen Sie die erforderlichen Felder aus und klicken Sie auf **Erstellen**.
    - Notieren Sie sich die **Abonnement-ID** (z.B. `12345678-1234-1234-1234-123456789012`).

### Schritt 2: Antrag für Azure OpenAI Service stellen

Wir erstellen nun "OpenAI"-spezifische Ressourcen auf Azure. Dies erfordert einen 'Antrag',
und die Annahme sollte schnell erfolgen (sogar in wenigen Minuten).

1. Besuchen Sie den [Azure OpenAI Service](https://aka.ms/azure-openai).
2. Klicken Sie auf **Zugang beantragen**.
    - Füllen Sie die erforderlichen Felder aus (einschließlich der Abonnement-ID) und klicken Sie auf **Beantragen**.

Sobald Ihr Antrag angenommen wurde, können Sie OpenAI-Ressourcen auf Azure erstellen.

### Schritt 3: Azure OpenAI-Ressource erstellen

Weitere Informationen finden Sie unter [Azure: OpenAI erstellen und bereitstellen](https://learn.microsoft.com/de-de/azure/ai-services/openai/how-to/create-resource?pivots=web-portal).

1. Klicken Sie auf **Ressource erstellen** in der oberen linken Ecke.
2. Suchen Sie nach **OpenAI** und wählen Sie **[OpenAI erstellen](https://portal.azure.com/#create/Microsoft.CognitiveServicesOpenAI)**.
3. Füllen Sie die notwendigen Felder auf der Seite **OpenAI erstellen** aus.
   ![OpenAI-Dienst erstellen](pixels/config-azure-openai-create.png)
    - Wählen Sie das Abonnement aus.
    - Wählen Sie eine Ressourcengruppe aus oder erstellen Sie eine neue.
    - Wählen Sie die Region aus. Beachten Sie, dass die Region die verfügbaren Modelle bestimmt.
   > Zum Beispiel bietet **Kanada (Ost)** GPT-4-32k-Modelle an. Die vollständige Liste finden Sie unter [GPT-4-Modelle](https://learn.microsoft.com/de-de/azure/ai-services/openai/concepts/models).
    - Benennen Sie den Dienst (z.B. `ihr-openai-api-1234`).
    - Wählen Sie eine Preisstufe (z.B. `S0` für Standard).
    - Wählen Sie: "Alle Netzwerke, einschließlich des Internets, können auf diese Ressource zugreifen."
    - Klicken Sie auf **Überprüfen + erstellen** und dann auf **Erstellen**.

Nachdem die Ressource erstellt wurde, können Sie auf die API-Schlüssel und Endpunkte zugreifen. Sie können jederzeit
zur Seite der OpenAI-Dienstinstanz gehen, um diese Informationen zu erhalten.

- Klicken Sie auf **Zur Ressource wechseln**.
- Klicken Sie auf **Entwickeln**.
    - Kopieren Sie den `Endpunkt`, genannt "Sprach-API", z.B. 'https://ihr-openai-api-1234.openai.azure.com/'.
    - Kopieren Sie `SCHLÜSSEL 1`.

### Schritt 4: Modelle bereitstellen

Standardmäßig haben Azure OpenAI-Ressourcinstanzen keine Modelle verfügbar. Sie müssen die Modelle bereitstellen, die Sie verwenden möchten.

1. Klicken Sie auf **Modellbereitstellungen > Bereitstellungen verwalten**.
2. Klicken Sie auf **+Neue Bereitstellung erstellen**.
   ![Modell bereitstellen](pixels/config-azure-openai-deploy.png)
    - Wählen Sie das Modell aus, das Sie bereitstellen möchten.
    - Wählen Sie optional eine Version aus.
    - Benennen Sie das Modell, z.B. `gpt4-32k-0613`.

Wiederholen Sie dies bei Bedarf für jedes Modell, das Sie bereitstellen möchten.

## Ressourcen

- [Azure OpenAI Service Dokumentation](https://learn.microsoft.com/de-de/azure/ai-services/openai/)
- [Anleitung: Azure OpenAI-Ressource erstellen](https://learn.microsoft.com/de-de/azure/ai-services/openai/how-to/create-resource?pivots=web-portal)
- [Azure OpenAI-Modelle](https://learn.microsoft.com/de-de/azure/ai-services/openai/concepts/models)
