**Verbinden Sie Ihre Datenbank für erweiterte Funktionen:**

Diese Anleitung beschreibt die Datenbankoptionen und Einrichtungsschritte für die Aktivierung von Funktionen wie Chat Link Sharing in Ihrer FlowHero-Anwendung.

### Wählen Sie Ihre Datenbank:

**1. Serverless Postgres (Standard):**

- Verfügbar auf Vercel, Neon und anderen Plattformen.
- Weniger funktionsreich, aber eine geeignete Option je nach Ihren Bedürfnissen.
- **Verbindungszeichenfolge:** Ersetzen Sie die Platzhalter durch Ihre Postgres-Anmeldeinformationen.
  - `postgres://USER:PASS@SOMEHOST.postgres.vercel-storage.com/SOMEDB?pgbouncer=true&connect_timeout=15`

**2. MongoDB Atlas (Alternative):**

- **Sehr empfehlenswert:** Mehr als nur eine Datenbank, es ist eine Datenplattform. MongoDB Atlas ist eine robuste Cloud-basierte Plattform, die Skalierbarkeit, Sicherheit und eine Suite von Entwicklerwerkzeugen bietet. Keine Notwendigkeit für eine separate Vektordatenbank, Sie können Ihre Vektor-Embeddings direkt in Ihrer operativen Datenbank abfragen!
- **Zusätzliche Funktionen:** MongoDB Atlas ist vollgepackt mit einzigartigen Funktionen, die den Entwicklungsprozess optimieren sollen, wie z.B.: Atlas App Services, Atlas Search (mit Vektorsuche), Atlas Charts, Data Federation und mehr.
- **Verbindungszeichenfolge:** Ersetzen Sie die Platzhalter durch Ihre Atlas-Anmeldeinformationen.
  - `mongodb://USER:PASS@CLUSTER-NAME.mongodb.net/DATABASE-NAME?retryWrites=true&w=majority`

### Umgebungsvariablen:

#### Postgres:

| Variable                              |                                                                                                      |
|---------------------------------------|------------------------------------------------------------------------------------------------------|
| `POSTGRES_PRISMA_URL`                 | `postgres://USER:PASS@SOMEHOST.postgres.vercel-storage.com/SOMEDB?pgbouncer=true&connect_timeout=15` |
| `POSTGRES_URL_NON_POOLING` (optional) | URL für die Postgres-Datenbank ohne Pooling (spezifische Anwendungsfälle)                                   |

#### MongoDB:

| Variable  |                                                                                          |
|-----------|------------------------------------------------------------------------------------------|
| `MDB_URI` | `mongodb://USER:PASS@CLUSTER-NAME.mongodb.net/DATABASE-NAME?retryWrites=true&w=majority` |

### MongoDB Atlas + Prisma

Wenn Sie MongoDB Atlas verwenden, müssen Sie die folgenden Änderungen an der Datei [`src/server/prisma/schema.prisma`](../src/server/prisma/schema.prisma) vornehmen.

```prisma
...
datasource db {
  provider  = "mongodb"
  url       = env("MDB_URI")
}

//
// Speicherung von verknüpften Daten
//
model LinkStorage {
  id String @id @default(uuid()) @map("_id")

// ...Rest der Datei
```

### Erste Einrichtungsschritte:

1. **Führen Sie `npx prisma db push` aus:** Erstellen oder aktualisieren Sie das Datenbankschema (einmal nach dem Verbinden ausführen).

### Zusätzliche Ressourcen:

- Prisma-Dokumentation: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
- MongoDB Atlas: [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)
- Atlas App Services: [https://www.mongodb.com/docs/atlas/app-services/](https://www.mongodb.com/docs/atlas/app-services/)
- Atlas Vektorsuche: [https://www.mongodb.com/products/platform/atlas-vector-search/](https://www.mongodb.com/products/platform/atlas-vector-search)
- Atlas Data Federation: [https://www.mongodb.com/products/platform/atlas-data-federation](https://www.mongodb.com/products/platform/atlas-data-federation)
