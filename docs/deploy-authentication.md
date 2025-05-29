# Authentifizierung

`FlowHero` wird nicht mit integrierter Authentifizierung ausgeliefert. Um Ihre Bereitstellung zu sichern, können Sie die Authentifizierung
auf eine der folgenden Arten implementieren:

1. Erstellen Sie `FlowHero` mit Unterstützung für ⬇️ [HTTP-Authentifizierung](#http-authentifizierung)
2. Nutzen Sie Benutzerauthentifizierungsfunktionen, die von Ihrer ⬇️ [Cloud-Bereitstellungsplattform](#cloud-bereitstellungs-authentifizierung) bereitgestellt werden
3. Entwickeln Sie eine benutzerdefinierte Authentifizierungslösung

<br/>

### HTTP-Authentifizierung

Die [HTTP Basic Authentication](https://developer.mozilla.org/de-DE/docs/Web/HTTP/Authentication) ist eine einfache Methode,
um Ihre Anwendung zu sichern.

Um sie in `FlowHero` zu aktivieren, **müssen Sie die Anwendung manuell erstellen**:

- Erstellen Sie `FlowHero` mit aktivierter HTTP-Authentifizierung:
  - Klonen Sie das Repository
  - Benennen Sie `middleware_BASIC_AUTH.ts` in `middleware.ts` um
  - Erstellen: üblicher einfacher Erstellungsprozess (z.B. [Manuell bereitstellen](installation.md#Local-Production-build) oder [Mit Docker bereitstellen](deploy-docker.md))

- Konfigurieren Sie die folgenden [Umgebungsvariablen](environment-variables.md), bevor Sie `FlowHero` starten:
```dotenv
HTTP_BASIC_AUTH_USERNAME=<Ihr Benutzername>
HTTP_BASIC_AUTH_PASSWORD=<Ihr Passwort>
```

- Starten Sie die Anwendung 🔒

<br/>

### Cloud-Bereitstellungs-Authentifizierung

> Dieser Ansatz ermöglicht es Ihnen, die Authentifizierung zu aktivieren, ohne die Anwendung neu erstellen zu müssen, indem Sie die Funktionen
> Ihrer Cloud-Plattform zur Verwaltung von Benutzerkonten und Zugriff nutzen.

Viele Cloud-Bereitstellungsplattformen bieten integrierte Authentifizierungsmechanismen. Lesen Sie die Dokumentation der Plattform
für Einrichtungsanweisungen:

1. [CloudFlare Access / Zero Trust](https://www.cloudflare.com/de-de/zero-trust/products/access/)
2. [Vercel Authentication](https://vercel.com/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication)
3. [Vercel Password Protection](https://vercel.com/docs/security/deployment-protection/methods-to-protect-deployments/password-protection)
4. Lassen Sie uns wissen, wenn Sie weitere Lösungen testen (Heroku, AWS IAM, Google IAP, etc.)
