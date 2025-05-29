# `FlowHero` mit Kubernetes bereitstellen ☸️

In diesem Tutorial führen wir Sie durch den Prozess der Bereitstellung von FlowHero
in einer Kubernetes-Umgebung mit dem kubectl Kommandozeilen-Tool.

## Erstmalige Bereitstellung

### Schritt 1: Das FlowHero-Repository klonen

```bash
$ git clone https://github.com/enricoros/big-agi # Annahme: FlowHero ist ein Fork/basierend auf big-agi
$ cd ./big-agi/docs/k8s # Pfad entsprechend anpassen, falls sich die Ordnerstruktur für FlowHero geändert hat
```

### Schritt 2: Den Namespace erstellen

```bash
$ kubectl create namespace ns-flowhero # Angepasst für FlowHero
```

### Schritt 3: Die Schlüsselinformationen in env-secret.yaml eintragen

Alle Variablen sind optional. Standardmäßig verwendet Kubernetes Secret Base64 zum
Kodieren/Dekodieren, also führen Sie bitte keinen Git-Commit durch, nachdem Sie die Schlüssel eingetragen haben,
um das Durchsickern sensibler Informationen zu vermeiden.

Wir stellen eine leere `env-secret.yaml`-Datei als Vorlage bereit.
Sie können die notwendigen Informationen mit einem Texteditor eintragen.

```bash
$ nano env-secret.yaml
```

### Schritt 4: Kubernetes-Ressourcen bereitstellen

```bash
$ kubectl apply -f big-agi-deployment.yaml -f env-secret.yaml # Dateinamen beibehalten, falls sie sich auf die Struktur des geklonten Repos beziehen
```
Hinweis: Wenn `big-agi-deployment.yaml` spezifisch für FlowHero angepasst wurde, sollte der Dateiname dies widerspiegeln. Ohne diese Info wird der Originalname beibehalten.

### Schritt 5: Überprüfen der Ressourcenstatus

```bash
$ kubectl -n ns-flowhero get svc,pod,deployment # Namespace angepasst
NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
service/svc-flowhero   ClusterIP   10.0.198.118   <none>        3000/TCP   63m # Service-Name angepasst

NAME                                     READY   STATUS    RESTARTS   AGE
pod/deployment-flowhero-xxxxxxxx-yyyyy    1/1     Running   0          39m # Deployment-Name angepasst

NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/deployment-flowhero   1/1     1            1           63m # Deployment-Name angepasst
```

### Schritt 6: Testen des Dienstes

Sie können den Dienst testen, indem Sie ihn per Port-Forwarding auf Ihre lokale Maschine weiterleiten:

```bash
$ kubectl -n ns-flowhero port-forward service/svc-flowhero 3000 # Angepasst für FlowHero
Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
```

Jetzt können Sie auf den Dienst unter `http://localhost:3000` zugreifen und sollten die FlowHero-Homepage sehen.

## FlowHero aktualisieren

Um FlowHero auf die neueste Version zu aktualisieren:

1. Holen Sie die neuesten Änderungen aus dem Repository:
   ```bash
   $ git pull origin main # Oder der entsprechende Branch für FlowHero
   ```

2. Wenden Sie das aktualisierte Deployment an:
   ```bash
   $ kubectl apply -f big-agi-deployment.yaml # Dateiname wie oben
   ```

Dies löst ein rollierendes Update des Deployments mit dem neuesten Image aus.

**Hinweis**: Wenn Sie FlowHero hinter einem Reverse-Proxy bereitstellen, müssen Sie möglicherweise
Ihren Proxy konfigurieren, um Streaming zu unterstützen. Weitere Informationen finden Sie in unserer [Reverse-Proxy-Bereitstellungsanleitung](deploy-reverse-proxy.md).

Hinweis: Für den Produktionseinsatz sollten Sie die Einrichtung eines Ingress Controllers oder Load Balancers anstelle von Port-Forwarding in Betracht ziehen.
