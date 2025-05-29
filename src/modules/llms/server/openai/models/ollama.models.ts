import { LLM_IF_Chat, LLM_IF_Fn, LLM_IF_Vision } from '~/common/stores/llms/llms.types';
import { ModelDescriptionSchema } from '../llm.server.types';


// https://ollama.ai/library
// NOTE: Ollama does not have a public API to list models, so we maintain a list of known models here.
//       This list may not be exhaustive or up-to-date.

export const _knownOllamaModels: ModelDescriptionSchema[] = [

  // Llama 3
  {
    id: 'llama3',
    label: 'Llama 3', // Übersetzt
    description: 'Das neueste, leistungsfähigste und offenste LLM von Meta.', // Übersetzt
    contextWindow: 8192,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Mar 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0, output: 0 }, // Local models are free
    benchmark: { cbaElo: 1300 }, // NOTE: guess
  },

  // Llama 2
  {
    id: 'llama2',
    label: 'Llama 2', // Übersetzt
    description: 'Ein Open-Source-LLM von Meta.', // Übersetzt
    contextWindow: 4096,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Jul 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0, output: 0 }, // Local models are free
    benchmark: { cbaElo: 1200 }, // NOTE: guess
  },

  // Mistral
  {
    id: 'mistral',
    label: 'Mistral', // Übersetzt
    description: 'Ein kleines, schnelles Modell von Mistral AI.', // Übersetzt
    contextWindow: 8192,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Sep 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0, output: 0 }, // Local models are free
    benchmark: { cbaElo: 1250 }, // NOTE: guess
  },

  // Code Llama
  {
    id: 'codellama',
    label: 'Code Llama', // Übersetzt
    description: 'Ein Modell, das auf Llama 2 für Code-Aufgaben trainiert wurde.', // Übersetzt
    contextWindow: 16384,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Aug 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0, output: 0 }, // Local models are free
    benchmark: { cbaElo: 1220 }, // NOTE: guess
  },

  // ... add other known Ollama models here as needed

];