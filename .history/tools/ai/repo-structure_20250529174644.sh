#!/usr/bin/env bash
# Generiert die Repository-Struktur für den KI-Assistenten-Speicher
# Umschließt die Ausgabe in <context name="directoryStructure"> Tags.
# Versteckt standardmäßig Dotfiles, verwenden Sie -a/--all, um sie anzuzeigen.

# Standardeinstellungen
INCLUDE_HIDDEN=false
COPY_TO_CLIPBOARD=true

# Funktion zur Anzeige der Nutzung
print_usage() {
  echo "Nutzung: $0 [Optionen]"
  echo "Optionen:"
  echo "  -a, --all         Versteckte Dateien und Verzeichnisse einschließen (beginnend mit '.')"
  echo "  -o, --output      Ausgabe in eine Datei statt auf stdout (z.B. -o structure.xml)"
  echo "  -h, --help        Diese Hilfe anzeigen"
}

# Argumente parsen
OUTPUT_FILE=""
while [[ "$#" -gt 0 ]]; do
  case $1 in
    -a|--all) INCLUDE_HIDDEN=true ;;
    -o|--output) OUTPUT_FILE="$2"; shift ;;
    -h|--help) print_usage; exit 0 ;;
    *) echo "Unbekannter Parameter: $1"; print_usage; exit 1 ;;
  esac
  shift
done

# Prüfen, ob wir uns in einem Git-Repository befinden
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo "Fehler: Dieses Skript muss innerhalb eines Git-Repositorys ausgeführt werden." >&2
  echo "Bitte navigieren Sie zu Ihrem Repository und versuchen Sie es erneut." >&2
  exit 1
fi


# Versuchen, den Clipboard-Befehl für das aktuelle OS zu finden
clipboard_cmd=""
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  clipboard_cmd="pbcopy"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux mit X11
  if command -v xclip &>/dev/null; then
    clipboard_cmd="xclip -selection clipboard"
  elif command -v xsel &>/dev/null; then
    clipboard_cmd="xsel --clipboard --input"
  fi
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  # Windows Git Bash oder ähnliches
  clipboard_cmd="clip"
fi


# Struktur generieren
generate_structure() {
  # XML-ähnliche Tags anstelle von Markdown-Code-Fences verwenden
  echo '<context name="directoryStructure" description="Unten ist ein Schnappschuss der Dateistruktur dieses Projekt-Roots (git ls-files) zu Beginn der Konversation. Dieser Schnappschuss wird während der Konversation NICHT aktualisiert.">'
  echo ""

  # Temporäre Dateien erstellen
  TMP_FILE=$(mktemp)
  PROCESSED_DIRS_FILE=$(mktemp)

  # Alle von Git verfolgten Dateien abrufen, versteckte Dateien bei Bedarf filtern
  if [[ "$INCLUDE_HIDDEN" == false ]]; then
    # Versteckte Dateien/Verzeichnisse mit grep -vE herausfiltern
    git ls-files | grep -vE '(^|/)\.' | sort > "$TMP_FILE"
  else
    # Alle Dateien einschließen
    git ls-files | sort > "$TMP_FILE"
  fi

  # Prüfen, ob TMP_FILE nach dem Filtern leer ist
  if [[ ! -s "$TMP_FILE" ]]; then
      echo "# (Keine Dateien gefunden, die den Kriterien entsprechen)"
      rm "$TMP_FILE" "$PROCESSED_DIRS_FILE"
      echo '</context>' # Tag schließen, auch wenn leer
      return
  fi

  # Jede Datei verarbeiten
  while IFS= read -r file; do
    # Leere Zeilen überspringen
    if [[ -z "$file" ]]; then
      continue
    fi

    # Verzeichnis-Teile mit dirname und basename extrahieren
    filename=$(basename "$file")
    dirpath=$(dirname "$file")

    # Verzeichnis-Pfad verarbeiten
    if [[ "$dirpath" != "." ]]; then
      # Verzeichnis-Pfad in Teile aufteilen
      current_path=""
      dir_parts=""

      # Sicherere Methode zum Aufteilen des Pfads verwenden
      IFS='/' dir_parts=($dirpath)

      # Jede Verzeichnis-Ebene verarbeiten
      for ((i=0; i<${#dir_parts[@]}; i++)); do
        part="${dir_parts[$i]}"
        if [[ -z "$part" ]]; then
          continue
        fi

        if [[ -z "$current_path" ]]; then
          current_path="$part"
        else
          current_path="$current_path/$part"
        fi

        # Prüfen, ob wir dieses Verzeichnis bereits verarbeitet haben
        if ! grep -q "^$current_path\$" "$PROCESSED_DIRS_FILE" 2>/dev/null; then
          echo "$current_path" >> "$PROCESSED_DIRS_FILE"
          indent=$((i * 2))

          # printf-Problem beheben, indem sichergestellt wird, dass die Formatzeichenkette nicht mit "-" beginnt
          if [ $indent -eq 0 ]; then
            echo "- $part/"
          else
            printf "%${indent}s- %s/\n" "" "$part"
          fi
        fi
      done

      # Datei mit korrekter Einrückung ausgeben
      level=${#dir_parts[@]}
      indent=$((level * 2))

      # printf-Problem auch für Dateien beheben
      if [ $indent -eq 0 ]; then
        echo "- $filename"
      else
        printf "%${indent}s- %s\n" "" "$filename"
      fi
    else
      # Datei befindet sich im Root-Verzeichnis - printf-Problem vermeiden
      echo "- $filename"
    fi
  done < "$TMP_FILE"

  # Aufräumen
  rm "$TMP_FILE" "$PROCESSED_DIRS_FILE"

  # XML-ähnlichen Tag schließen
  echo '</context>'
}


# Ausgabe in Datei, Clipboard oder stdout handhaben
if [[ -n "$OUTPUT_FILE" ]]; then
  generate_structure > "$OUTPUT_FILE"
  echo "Repository-Struktur in $OUTPUT_FILE gespeichert"

  if [[ "$COPY_TO_CLIPBOARD" == true ]]; then
    if [[ -n "$clipboard_cmd" ]]; then
      cat "$OUTPUT_FILE" | eval "$clipboard_cmd"
      echo "Auch in die Zwischenablage kopiert!"
    else
      echo "Warnung: Kopieren in die Zwischenablage angefordert, aber kein Clipboard-Befehl für Ihr OS gefunden." >&2
    fi
  fi
elif [[ "$COPY_TO_CLIPBOARD" == true ]]; then
  if [[ -n "$clipboard_cmd" ]]; then
    generate_structure | tee >(eval "$clipboard_cmd" > /dev/null)
    echo -e "\nStruktur in die Zwischenablage kopiert!"
  else
    echo "Warnung: Kein Clipboard-Befehl für Ihr OS gefunden. Ausgabe stattdessen anzeigen." >&2
    generate_structure
  fi
else
  generate_structure
fi
