# OpenRouter Konfiguration für FlowHero

[OpenRouter](https://openrouter.ai) ist ein eigenständiger Premium-Dienst,
der Zugriff auf <Link href='https://openrouter.ai/docs#models' target='_blank'>exklusive KI-Modelle</Link>
wie GPT-4 32k, Claude und weitere bietet. Diese Modelle sind typischerweise nicht öffentlich verfügbar.
Dieses Dokument beschreibt den Prozess der Integration von OpenRouter mit FlowHero.

### 1. OpenRouter Konto-Setup und API-Schlüssel-Generierung

1. Registrieren Sie sich für ein OpenRouter-Konto unter [openrouter.ai](https://openrouter.ai), indem Sie auf Anmelden > Mit Google fortfahren klicken.
2. Laden Sie Ihr Konto auf (mindestens 5 $), indem Sie zu [openrouter.ai/account](https://openrouter.ai/account) > Guthaben hinzufügen > Mit Stripe bezahlen navigieren.
3. Generieren Sie einen API-Schlüssel unter [openrouter.ai/keys](https://openrouter.ai/keys) > API-Schlüssel > API-Schlüssel generieren.
   - **Denken Sie daran, Ihren API-Schlüssel zu kopieren und sicher aufzubewahren** - der Schlüssel wird nicht erneut angezeigt und hat das Format `sk-or-v1-...`.
   - Halten Sie den Schlüssel geheim, da er verwendet werden kann, um Ihr Guthaben aufzubrauchen.

### 2. Integration von OpenRouter mit FlowHero

1. Starten Sie FlowHero und navigieren Sie zu den KI-Einstellungen für **Modelle**.
2. Fügen Sie einen Anbieter hinzu und wählen Sie **OpenRouter**.
   ![feature-openrouter-add.png](pixels/feature-openrouter-add.png)
3. Geben Sie den API-Schlüssel in das Feld **OpenRouter API Key** (OpenRouter API-Schlüssel) ein und laden Sie die Modelle.
   ![feature-openrouter-configure.png](pixels/feature-openrouter-configure.png)
4. OpenAI GPT4-32k und andere Modelle sind nun in der Anwendung zugänglich und auswählbar.

Zusätzlich zur Verwendung der Benutzeroberfläche kann die Konfiguration auch über
[Umgebungsvariablen](environment-variables.md) erfolgen.

### Preise

OpenRouter verwaltet seinen Dienst und seine Preise unabhängig und ist nicht mit FlowHero verbunden.
Für detailliertere Informationen besuchen Sie bitte [diese Seite](https://openrouter.ai/docs#models).

Bitte beachten Sie, dass das Ausführen großer Modelle wie GPT-4 32k kostspielig sein und Guthaben schnell aufbrauchen kann - ein einzelner Prompt kann zum Zeitpunkt des Schreibens 1 $ oder mehr kosten.
