import { LLM_IF_Chat, LLM_IF_Fn } from '~/common/stores/llms/llms.types';LM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages, LLM_IF_HOTFIX_Sys0ToUsr0, LLM_IF_HOTFIX_NoStream } from '~/common/stores/llms/llms.types';
import { ModelDescriptionSchema } from '../llm.server.types';import { ModelDescriptionSchema } from '../llm.server.types';


// https://docs.mistral.ai/platform/endpoints/
// https://docs.mistral.ai/platform/pricing/// https://openai.com/pricing

export const _knownMistralModels: ModelDescriptionSchema[] = [ _knownOpenAIChatModels: ModelDescriptionSchema[] = [// [Mistral]

  // mistral-large-latestYETistral.ai/technology/#pricing
  {
    id: 'mistral-large-latest',ENTS - UNSUPPORTED YETownMistralChatModels: ManualMappings = [
    label: 'Mistral Large (Neueste)', // Übersetzt
    description: 'Das leistungsstärkste Modell von Mistral AI.', // Übersetzt    hidden: true, // UNSUPPORTED YET
    contextWindow: 32768,/ preview doesn't get highlighted  // Mistral Large 24.11
    maxCompletionTokens: 4096, // NOTE: guess idPrefix: 'computer-use-preview-2025-03-11',
    trainingDataCutoff: 'Aug 2023', // NOTE: guessau (2025-03-11)', // Übersetzt    idPrefix: 'mistral-large-2411',
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guessodell für das Computer-Nutzungs-Tool. Optimiert für Computerinteraktionsfähigkeiten.', // Übersetzt
    chatPrice: { input: 8, output: 24 }, // EUR per 1M tokens - NOTE: need to convert to USDisticated problems.',
    benchmark: { cbaElo: 1300 }, // NOTE: guess
  },
  { API model - this is here temporarily for debugging, before moving to /responses */],
    id: 'mistral-large-2407',t: 12 },
    label: 'Mistral Large (2407)', // ÜbersetztisPreview: true,
    description: 'Stabile Version von Mistral Large.', // Übersetzt,
    contextWindow: 32768,
    maxCompletionTokens: 4096, // NOTE: guessmputer-use-preview',
    trainingDataCutoff: 'Aug 2023', // NOTE: guessau', // Übersetzt
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guessfür Computerinteraktionsfähigkeiten. Verweist auf computer-use-preview-2025-03-11.', // Übersetzt
    chatPrice: { input: 8, output: 24 }, // EUR per 1M tokens - NOTE: need to convert to USDarn more on our blog post',
    benchmark: { cbaElo: 1300 }, // NOTE: guessr versionedcontextWindow: 131072,
    hidden: true, // prefer latestOAI_Chat, LLM_IF_OAI_Fn],
  },

trainingDataCutoff: 'Sep 30, 2023',
  // mistral-medium-latest interfaces: [/* not actually a CHAT API model - this is here temporarily for debugging, before moving to /responses */],
  {put: 3, output: 12 },
    id: 'mistral-medium-latest',ue,
    label: 'Mistral Medium (Neueste)', // Übersetzt
    description: 'Ein leistungsstarkes Modell, das zwischen Large und Small angesiedelt ist.', // Übersetzt
    contextWindow: 32768,
    maxCompletionTokens: 4096, // NOTE: guesso-series
    trainingDataCutoff: 'Aug 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 2.7, output: 8.1 }, // EUR per 1M tokens - NOTE: need to convert to USD
    benchmark: { cbaElo: 1250 }, // NOTE: guessisLatest: true,  },
  }, idPrefix: 'o4-mini-2025-04-16',  {
  {ni (2025-04-16)', // Übersetzt
    id: 'mistral-medium-2312',dell. Optimiert für schnelles, effektives Denken mit außergewöhnlich effizienter Leistung bei Kodierungs- und visuellen Aufgaben.', // Übersetzt    idPrefix: 'mistral-large-latest',
    label: 'Mistral Medium (2312)', // Übersetztge (latest)',
    description: 'Stabile Version von Mistral Medium.', // ÜbersetztymLink: 'mistral-large-2411',
    contextWindow: 32768, 2024',ls from 24.11
    maxCompletionTokens: 4096, // NOTE: guessOAI_Reasoning, LLM_IF_OAI_PromptCaching],g for high-complexity tasks and sophisticated problems.',
    trainingDataCutoff: 'Aug 2023', // NOTE: guesssoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],131K tokens
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess-ac', read: 0.275 }, output: 4.4 },
    chatPrice: { input: 2.7, output: 8.1 }, // EUR per 1M tokens - NOTE: need to convert to USDnown variant */ }, output: 6 },
    benchmark: { cbaElo: 1250 }, // NOTE: guess
    hidden: true, // prefer latest
  },    idPrefix: 'o4-mini',
    label: 'o4 Mini', // Übersetzt
Schnelleres, erschwinglicheres Denkmodell. Verweist auf o4-mini-2025-04-16.', // Übersetzt
  // mistral-small-latest symLink: 'o4-mini-2025-04-16',
  {edidPrefix: 'pixtral-large-2411',
    id: 'mistral-small-latest', 'Pixtral Large (24.11)',
    label: 'Mistral Small (Neueste)', // Übersetzt',
    description: 'Ein kleineres, schnelleres Modell.', // Übersetzt131K tokens
    contextWindow: 32768,
    maxCompletionTokens: 4096, // NOTE: guessF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching], 6 },
    trainingDataCutoff: 'Aug 2023', // NOTE: guessparameterSpecs: [{ paramId: 'llmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess chatPrice: { input: 1.1, cache: { cType: 'oai-ac', read: 0.275 }, output: 4.4 },
    chatPrice: { input: 0.6, output: 1.8 }, // EUR per 1M tokens - NOTE: need to convert to USD not available yet, as of 2025-04-16 (intro)
    benchmark: { cbaElo: 1200 }, // NOTE: guess
  },
  {
    id: 'mistral-small-2402',
    label: 'Mistral Small (2402)', // Übersetzt
    description: 'Stabile Version von Mistral Small.', // Übersetzt
    contextWindow: 32768,at, LLM_IF_OAI_Fn, LLM_IF_OAI_Vision],
    maxCompletionTokens: 4096, // NOTE: guessleistungsstarkes Modell über verschiedene Domänen hinweg. Setzt einen neuen Standard für Mathematik, Wissenschaft, Kodierung und visuelle Denkaufgaben.', // Übersetzt    chatPrice: { input: 2, output: 6 },
    trainingDataCutoff: 'Aug 2023', // NOTE: guesscontextWindow: 200000,
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess    maxCompletionTokens: 100000,
    chatPrice: { input: 0.6, output: 1.8 }, // EUR per 1M tokens - NOTE: need to convert to USD    trainingDataCutoff: 'May 31, 2024',
    benchmark: { cbaElo: 1200 }, // NOTE: guessOAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching],
    hidden: true, // prefer latest parameterSpecs: [{ paramId: 'llmForceNoStream' }, { paramId: 'llmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],
  },{ cType: 'oai-ac', read: 2.5 }, output: 40 },
 unknown variant, as of 2025-05-12 */ },(25.01)',

  // mistral-7b-instruct-v0.2
  {
    id: 'mistral-7b-instruct-v0.2',
    label: 'Mistral 7B Instruct', // Übersetztsstärkstes Denkmodell. Verweist auf o3-2025-04-16.', // Übersetzt
    description: 'Ein kleines, schnelles Instruct-Modell.', // ÜbersetztsymLink: 'o3-2025-04-16',
    contextWindow: 32768, hidden: true, // prefer versioned
    maxCompletionTokens: 4096, // NOTE: guesslinked // isLegacy: true,
    trainingDataCutoff: 'Aug 2023', // NOTE: guess: 200000,
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guessral-small-2409',
    chatPrice: { input: 0.25, output: 0.25 }, // EUR per 1M tokens - NOTE: need to convert to USD24',
    benchmark: { cbaElo: 1150 }, // NOTE: guessses such as translation, summarization, and sentiment analysis.', // old description, keeping for legacy
  },lmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],ue, doc says 32k now for small
 { cType: 'oai-ac', read: 2.5 }, output: 40 },Chat],
  // open-mistral-7b2025-04-16 (intro)1, output: 0.3 },
  {
    id: 'open-mistral-7b',
    label: 'Open Mistral 7B', // Übersetzt
    description: 'Das offene 7B Modell von Mistral AI.', // Übersetzt
    contextWindow: 8192,
    maxCompletionTokens: 4096, // NOTE: guess// Übersetzt
    trainingDataCutoff: 'Aug 2023', // NOTE: guessueste o3-mini Modell-Momentaufnahme. Hohe Intelligenz bei gleichen Kosten- und Latenzzielen wie o1-mini. Hervorragend geeignet für Wissenschafts-, Mathematik- und Kodierungsaufgaben.', // Übersetztdescription: '',
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess: 32 * 1024, // 32K tokens
    chatPrice: { input: 0.25, output: 0.25 }, // EUR per 1M tokens - NOTE: need to convert to USD: [LLM_IF_OAI_Chat],
    benchmark: { cbaElo: 1100 }, // NOTE: guesstrainingDataCutoff: 'Oct 2023',,
    hidden: true, // prefer instruct interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages],
  }, [{ paramId: 'llmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],
input: 1.1, cache: { cType: 'oai-ac', read: 0.55 }, output: 4.4 },
  // open-mixtral-8x7be -high variant has 1325 */ },ll-2312',
  {
    id: 'open-mixtral-8x7b',
    label: 'Open Mixtral 8x7B', // Übersetzt
    description: 'Das offene Mixture-of-Experts Modell von Mistral AI.', // Übersetzt
    contextWindow: 32768,description: 'Verweist auf die aktuellste o3-mini Momentaufnahme: o3-mini-2025-01-31', // Übersetzt
    maxCompletionTokens: 4096, // NOTE: guess symLink: 'o3-mini-2025-01-31',
    trainingDataCutoff: 'Aug 2023', // NOTE: guess // prefer versionedhidden: true,
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess: 'mistral-small-latest',
    chatPrice: { input: 0.4, output: 0.4 }, // EUR per 1M tokens - NOTE: need to convert to USD',
    benchmark: { cbaElo: 1280 }, // NOTE: guessmall-2501',
    hidden: true, // prefer instruct3',
  },ent analysis. A new leader in the small models category with the latest version v3 released January 2025.',
easoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],tokens
];: { cType: 'oai-ac', read: 0.55 }, output: 4.4 },Chat],
    maxCompletionTokens: 4096,    trainingDataCutoff: 'Oct 2023',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 5, output: 15 },    benchmark: { cbaElo: 1366 },  },  /// GPT-4-Turbo series  // GPT-4-Turbo  {    id: 'gpt-4-turbo-2024-04-09',    label: 'GPT-4 Turbo (2024-04-09)', // Übersetzt    description: 'Das neueste GPT-4 Modell mit verbessertem Wissen und 128k Kontextfenster.', // Übersetzt    contextWindow: 128000,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Dec 2023',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Vision, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 10, output: 30 },    benchmark: { cbaElo: 1350 }, // https://www.chatbattle.ai/leaderboard  },  {    id: 'gpt-4-turbo',    label: 'GPT-4 Turbo', // Übersetzt    description: 'Das neueste GPT-4 Modell mit verbessertem Wissen und 128k Kontextfenster. Verweist auf gpt-4-turbo-2024-04-09.', // Übersetzt    symLink: 'gpt-4-turbo-2024-04-09',    hidden: true, // prefer versioned    // copied from symlinked    contextWindow: 128000,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Dec 2023',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Vision, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 10, output: 30 },    benchmark: { cbaElo: 1350 },  },  // GPT-4-Turbo-Preview  {    id: 'gpt-4-turbo-preview',    label: 'GPT-4 Turbo Vorschau', // Übersetzt    description: 'Vorschau des neuesten GPT-4 Turbo Modells.', // Übersetzt    contextWindow: 128000,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Dec 2023',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Vision, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 10, output: 30 },    benchmark: { cbaElo: 1350 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer versioned  },  // GPT-4-Vision-Preview  {    id: 'gpt-4-vision-preview',    label: 'GPT-4 Vision Vorschau', // Übersetzt    description: 'Vorschau des neuesten GPT-4 Modells mit Vision-Fähigkeiten.', // Übersetzt    contextWindow: 128000,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Dec 2023',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Vision, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 10, output: 30 },    benchmark: { cbaElo: 1350 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer versioned  },  /// GPT-4 series  // GPT-4-32k  {    id: 'gpt-4-32k',    label: 'GPT-4 32k', // Übersetzt    description: 'Ein älteres GPT-4 Modell mit einem größeren Kontextfenster.', // Übersetzt    contextWindow: 32768,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_Fn],    chatPrice: { input: 60, output: 120 },    benchmark: { cbaElo: 1250 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer newer  },  // GPT-4  {    id: 'gpt-4',    label: 'GPT-4', // Übersetzt    description: 'Ein sehr fähiges Modell mit breitem Allgemeinwissen und Denkfähigkeiten.', // Übersetzt    contextWindow: 8192,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_Fn],    chatPrice: { input: 30, output: 60 },    benchmark: { cbaElo: 1250 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer newer  },  /// GPT-3.5-Turbo series  // GPT-3.5-Turbo-0125  {    id: 'gpt-3.5-turbo-0125',    label: 'GPT-3.5 Turbo (0125)', // Übersetzt    description: 'Das neueste GPT-3.5 Turbo Modell, optimiert für Dialoge.', // Übersetzt    contextWindow: 16384,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 0.5, output: 1.5 },    benchmark: { cbaElo: 1100 }, // https://www.chatbattle.ai/leaderboard  },  {    id: 'gpt-3.5-turbo',    label: 'GPT-3.5 Turbo', // Übersetzt    description: 'Das schnellste und kostengünstigste Modell in der GPT-Familie. Verweist auf gpt-3.5-turbo-0125.', // Übersetzt    symLink: 'gpt-3.5-turbo-0125',    hidden: true, // prefer versioned    // copied from symlinked    contextWindow: 16384,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 0.5, output: 1.5 },    benchmark: { cbaElo: 1100 },  },  // GPT-3.5-Turbo-Instruct  {    id: 'gpt-3.5-turbo-instruct',    label: 'GPT-3.5 Turbo Instruct', // Übersetzt    description: 'Optimiert für das Befolgen von Anweisungen.', // Übersetzt    contextWindow: 4096,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_Chat], // NOTE: no function calling    chatPrice: { input: 1.5, output: 2 },    benchmark: { cbaElo: 1050 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer chat  },  // GPT-3.5-Turbo-1106  {    id: 'gpt-3.5-turbo-1106',    label: 'GPT-3.5 Turbo (1106)', // Übersetzt    description: 'Ein älteres GPT-3.5 Turbo Modell.', // Übersetzt    contextWindow: 16384,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],    chatPrice: { input: 1, output: 2 },    benchmark: { cbaElo: 1080 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer newer  },  // GPT-3.5-Turbo-16k  {    id: 'gpt-3.5-turbo-16k',    label: 'GPT-3.5 Turbo 16k', // Übersetzt    description: 'Ein älteres GPT-3.5 Turbo Modell mit größerem Kontextfenster.', // Übersetzt    contextWindow: 16384,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_Fn],    chatPrice: { input: 3, output: 4 },    benchmark: { cbaElo: 1080 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer newer  },  // GPT-3.5-Turbo-0613  {    id: 'gpt-3.5-turbo-0613',    label: 'GPT-3.5 Turbo (0613)', // Übersetzt    description: 'Ein älteres GPT-3.5 Turbo Modell.', // Übersetzt    contextWindow: 4096,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_Fn],    chatPrice: { input: 1.5, output: 2 },    benchmark: { cbaElo: 1080 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer newer  },  // GPT-3.5-Turbo-16k-0613  {    id: 'gpt-3.5-turbo-16k-0613',    label: 'GPT-3.5 Turbo 16k (0613)', // Übersetzt    description: 'Ein älteres GPT-3.5 Turbo Modell mit größerem Kontextfenster.', // Übersetzt    contextWindow: 16384,    maxCompletionTokens: 4096,    trainingDataCutoff: 'Sep 2021',    interfaces: [LLM_IF_OAI_Chat, LLM_IF_Fn],    chatPrice: { input: 3, output: 4 },    benchmark: { cbaElo: 1080 }, // https://www.chatbattle.ai/leaderboard    hidden: true, // prefer newer  },];