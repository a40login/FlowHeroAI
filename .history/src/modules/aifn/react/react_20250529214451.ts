/*
 * porting of implementation from here: https://til.simonwillison.net/llms/python-react-pattern
 */

import { aixChatGenerateText_Simple } from '~/modules/aix/client/aix.client';
import { bareBonesPromptMixer } from '~/modules/persona/pmix/pmix';
import { callApiSearchGoogle } from '~/modules/google/search.client';
import { callBrowseFetchPageOrThrow } from '~/modules/browse/browse.client';

import type { DLLMId } from '~/common/stores/llms/llms.types';
import { frontendSideFetch } from '~/common/util/clientFetchers';


// prompt to implement the ReAct paradigm: https://arxiv.org/abs/2210.03629
const reActPrompt = (enableBrowse: boolean): string =>
  `Du bist ein KI-Assistent zur Beantwortung von Fragen mit Denkfähigkeit.
Du erhältst eine Frage vom Benutzer.
Um jede Frage zu beantworten, durchläufst du eine Schleife aus Gedanke, Aktion, PAUSE, Beobachtung.
Wenn du aus dem Gedanken oder der Beobachtung die Antwort auf die Frage ableiten kannst, MUSST du auch eine "Antwort: " ausgeben, gefolgt von der Antwort und NUR der Antwort, ohne Erklärung der Schritte, die zur Antwort geführt haben.
Du verwendest "Gedanke: ", um deine Gedanken zur gestellten Frage zu beschreiben.
Du verwendest "Aktion: ", um eine der dir zur Verfügung stehenden Aktionen auszuführen - dann gibst du PAUSE zurück. Generiere NIEMALS "Beobachtung: " oder "Antwort: " in derselben Antwort, die PAUSE enthält.
"Beobachtung" wird dir als Ergebnis der vorherigen "Aktion" präsentiert.
Wenn die "Beobachtung", die du erhalten hast, nicht mit der gestellten Frage zusammenhängt oder du die Antwort nicht aus der Beobachtung ableiten kannst, ändere die auszuführende Aktion und versuche es erneut.

Gehe IMMER davon aus, dass heute {{Today}} ist, wenn du Fragen zu Daten bearbeitest.
Erwähne niemals dein Wissens-Stichtag.

Deine verfügbaren "Aktionen" sind:

google:
z.B. google: Django
Gibt Google Custom Search Ergebnisse zurück.
Suche IMMER auf Google, wenn die Frage sich auf Live-Events oder Fakten bezieht, wie Sport, Nachrichten oder Wetter.

` + (enableBrowse ? `loadUrl:
z.B. loadUrl: https://arxiv.org/abs/1706.03762
Öffnet die angegebene URL und zeigt sie an

` : '') + /*`calculate:
e.g. calculate: 4 * 7 / 3
Runs a simple javascript calculation and returns the number, the input must be javascript

` + */ `wikipedia:
z.B. wikipedia: Django
Gibt eine Zusammenfassung aus der Wikipedia-Suche zurück.

Suche NUR auf Wikipedia, wenn du explizit dazu aufgefordert wirst.

Beispiel-Sitzung:

Frage: Was ist die Hauptstadt von Frankreich?
Gedanke: Ich sollte Frankreich auf Wikipedia nachschlagen.
Aktion: wikipedia: Frankreich

Du wirst erneut aufgerufen, zusammen mit allen vorherigen Nachrichten zwischen dem Benutzer und dir:

Beobachtung: Frankreich ist ein Land. Die Hauptstadt ist Paris.

Du gibst dann aus:
Antwort: Die Hauptstadt von Frankreich ist Paris
`;


const actionRe = /^Action: (\w+): (.*)$/;


/**
 * State - Abstraction used for serialization, save/restore, inspection, debugging, rendering, etc.
 *
 * Keep this as minimal and flat as possible
 *   - initialize(): will create the state with initial values
 *   - loop() is a function that will update the state (in place)
 */
interface State {
  instruction: string;
  llm: string;
  messages: { role: 'user' | 'model', text: string }[];
  nextPrompt: string;
  lastObservation: string;
  result: string | undefined;
}

export class Agent {

  constructor(readonly contextRef: string, readonly abortSignal: AbortSignal) {
    // this is here only to memo `contextRef` for later use
  }

  // NOTE: this is here for demo, but the whole loop could be moved to the caller's event loop
  async reAct(question: string, llmId: DLLMId, maxTurns = 5, enableBrowse = false,
              appendLog: (...data: any[]) => void = console.log,
              showState: (state: object) => void): Promise<string> {
    let i = 0;
    // TODO: to initialize with previous chat messages to provide context.
    const S: State = this.initialize(`Question: ${question}`, llmId, enableBrowse, appendLog);
    showState(S);
    while (i < maxTurns && S.result === undefined) {
      i++;
      appendLog(`\n## Turn ${i}`);
      await this.step(S, llmId, appendLog);
      showState(S);
    }
    // return only the 'Answer: ' part of the result
    if (S.result) {
      const idx = S.result.indexOf('Answer: ');
      if (idx !== -1)
        return S.result.slice(idx + 8);
    }
    return S.result || 'No result';
  }

  initialize(question: string, assistantLLMId: DLLMId, enableBrowse: boolean, log: (...data: any[]) => void = console.log): State {
    const systemPrompt = bareBonesPromptMixer(reActPrompt(enableBrowse), assistantLLMId);
    log('## Prepare Buffer');
    log('→ instruction [' + 1 + ']: "' + systemPrompt.slice(0, 86).replaceAll('\n', ' ') + ' ..."');
    return {
      instruction: systemPrompt,
      messages: [],
      nextPrompt: question,
      lastObservation: '',
      result: undefined,
      llm: assistantLLMId,
    };
  }

  truncateStringAfterPause(input: string): string {
    const pauseKeyword = 'PAUSE';
    const pauseIndex = input.indexOf(pauseKeyword);

    if (pauseIndex === -1) {
      return input;
    }

    const endIndex = pauseIndex + pauseKeyword.length;
    return input.slice(0, endIndex);
  }

  async llmChat(S: State, prompt: string, llmId: DLLMId): Promise<string> {
    S.messages.push({ role: 'user', text: prompt });
    let response = await aixChatGenerateText_Simple(llmId, S.instruction, S.messages, 'chat-react-turn', this.contextRef, { abortSignal: this.abortSignal });
    // process response, strip out potential hallucinated response after PAUSE is detected
    response = this.truncateStringAfterPause(response);
    S.messages.push({ role: 'model', text: response });
    return response;
  }

  async step(S: State, llmId: DLLMId, log: (...data: any[]) => void = console.log) {
    log('→ ' + (S.lastObservation ? 'action' : 'user') + ' [' + (S.messages.length + 1) + ']: "' + S.nextPrompt + '"');
    const result = await this.llmChat(S, S.nextPrompt, llmId);
    log('← reAct [' + (S.messages.length) + ']: "' + result + '"');
    const actions = result
      .split('\n')
      .map((a: string) => actionRe.exec(a))
      .filter((a: RegExpExecArray | null) => a !== null) as RegExpExecArray[];
    if (actions.length > 0) {
      const action = actions[0][1];
      const actionInput = actions[0][2];
      if (!(action in knownActions)) {
        throw new Error(`Unknown action: ${action}: ${actionInput}`);
      }
      log(`⚡ __${action}__("${actionInput}") → Observation`);
      S.lastObservation = await knownActions[action](actionInput);
      S.nextPrompt = `Observation: ${S.lastObservation}`;
      // will be displayed in the next step
      // log('=>' + S.nextPrompt);
    } else {
      log('↙ done');
      // already displayed (← react)
      // log(`Result: ${result}`);
      S.result = result;
    }
  }
}


type ActionFunction = (input: string) => Promise<string>;

async function wikipedia(q: string): Promise<string> {
  const response = await frontendSideFetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*`,
  );
  const data = await response.json();
  return data.query.search[0].snippet;
}

async function search(query: string): Promise<string> {
  try {
    const data = await callApiSearchGoogle(query, 10);
    return JSON.stringify(data);
  } catch (error: any) {
    console.error('Error fetching search results:', error);
    return 'An error occurred while searching the internet. Missing Google API Key? Google error: ' + (error?.message || error?.toString() || 'Unknown error');
  }
}

async function browse(url: string): Promise<string> {
  try {
    const page = await callBrowseFetchPageOrThrow(url);
    if (!page.content)
      return page.file ? 'A file download was requested, but we only support web pages: ' + page.url : 'No content received';
    const pageContent = page.content.markdown || page.content.text || page.content.html || '';
    return JSON.stringify(pageContent ? { text: pageContent } : { error: 'Issue reading the page' });
  } catch (error) {
    console.error('Error browsing:', (error as Error).message);
    return 'An error occurred while browsing to the URL. Missing WSS Key?';
  }
}

// Disable, as it allows for arbitrary code execution
// async function calculate(what: string): Promise<string> {
//   return String(eval(what));
// }

const knownActions: { [key: string]: ActionFunction } = {
  wikipedia: wikipedia,
  google: search,
  loadUrl: browse,
  // calculate: calculate, // DISABLED: security
};
