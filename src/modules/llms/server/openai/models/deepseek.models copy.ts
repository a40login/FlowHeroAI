import { LLM_IF_Chat, LLM_IF_Fn } from '~/common/stores/llms/llms.types';
import { ModelDescriptionSchema } from '../llm.server.types';


// https://platform.deepseek.com/api-docs/
// https://platform.deepseek.com/pricing

export const _knownDeepseekModels: ModelDescriptionSchema[] = [

  // deepseek-chat
  {
    id: 'deepseek-chat',
    label: 'Deepseek Chat', // Übersetzt
    description: 'Das leistungsfähigste Chat-Modell von Deepseek AI.', // Übersetzt
    contextWindow: 128000,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Jan 2024', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.14, output: 0.28 }, // USD per 1M tokens
    benchmark: { cbaElo: 1200 }, // NOTE: guess
  },

  // deepseek-coder
  {
    id: 'deepseek-coder',
    label: 'Deepseek Coder', // Übersetzt
    description: 'Ein Modell, das speziell für Code-Aufgaben trainiert wurde.', // Übersetzt
    contextWindow: 16384,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Jan 2024', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.14, output: 0.28 }, // USD per 1M tokens
    benchmark: { cbaElo: 1180 }, // NOTE: guess
  },

  // ... add other known Deepseek AI models here as needed

];
