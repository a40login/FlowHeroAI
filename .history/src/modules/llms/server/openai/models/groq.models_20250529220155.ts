import { LLM_IF_Chat, LLM_IF_Fn } from '~/common/stores/llms/llms.types';
import { ModelDescriptionSchema } from '../llm.server.types';


// https://groq.com/products/inference-engine
// https://groq.com/pricing

export const _knownGroqModels: ModelDescriptionSchema[] = [

  // Llama3-8b-8192
  {
    id: 'llama3-8b-8192',
    label: 'Llama 3 8B', // Übersetzt
    description: 'Das schnellste Llama 3 Modell, optimiert für Geschwindigkeit.', // Übersetzt
    contextWindow: 8192,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Mar 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.05, output: 0.05 }, // USD per 1k tokens
    benchmark: { cbaElo: 1250 }, // NOTE: guess
  },

  // Llama3-70b-8192
  {
    id: 'llama3-70b-8192',
    label: 'Llama 3 70B', // Übersetzt
    description: 'Ein größeres und leistungsfähigeres Llama 3 Modell.', // Übersetzt
    contextWindow: 8192,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Mar 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.7, output: 0.8 }, // USD per 1k tokens
    benchmark: { cbaElo: 1300 }, // NOTE: guess
  },

  // Mixtral-8x7b-32768
  {
    id: 'mixtral-8x7b-32768',
    label: 'Mixtral 8x7B', // Übersetzt
    description: 'Ein leistungsstarkes Mixture-of-Experts Modell von Mistral AI.', // Übersetzt
    contextWindow: 32768,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Sep 2023', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.27, output: 0.27 }, // USD per 1k tokens
    benchmark: { cbaElo: 1280 }, // NOTE: guess
  },

  // ... add other known Groq models here as needed

];