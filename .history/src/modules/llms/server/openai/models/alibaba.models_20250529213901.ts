import { LLM_IF_Chat, LLM_IF_Fn } from '~/common/stores/llms/llms.types';
import { ModelDescriptionSchema } from '../llm.server.types';


// https://help.aliyun.com/document_detail/2712199.html
// https://help.aliyun.com/document_detail/2715173.html

export const _knownAlibabaModels: ModelDescriptionSchema[] = [

  // Qwen-Max
  {
    id: 'qwen-max',
    label: 'Qwen-Max', // Übersetzt
    description: 'Das leistungsstärkste Modell von Alibaba Cloud.', // Übersetzt
    contextWindow: 6000, // NOTE: guess
    maxCompletionTokens: 1500, // NOTE: guess
    trainingDataCutoff: 'Jan 2024', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.02, output: 0.02 }, // CNY per 1k tokens - NOTE: need to convert to USD
    benchmark: { cbaElo: 1200 }, // NOTE: guess
  },

  // Qwen-Plus
  {
    id: 'qwen-plus',
    label: 'Qwen-Plus', // Übersetzt
    description: 'Ein leistungsstarkes Modell von Alibaba Cloud.', // Übersetzt
    contextWindow: 30000, // NOTE: guess
    maxCompletionTokens: 7500, // NOTE: guess
    trainingDataCutoff: 'Jan 2024', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.002, output: 0.002 }, // CNY per 1k tokens - NOTE: need to convert to USD
    benchmark: { cbaElo: 1150 }, // NOTE: guess
  },

  // Qwen-Standard
  {
    id: 'qwen-standard',
    label: 'Qwen-Standard', // Übersetzt
    description: 'Ein Standardmodell von Alibaba Cloud.', // Übersetzt
    contextWindow: 30000, // NOTE: guess
    maxCompletionTokens: 7500, // NOTE: guess
    trainingDataC
    utoff: 'Jan 2024', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.001, output: 0.001 }, // CNY per 1k tokens - NOTE: need to convert to USD
    benchmark: { cbaElo: 1100 }, // NOTE: guess
  },

  // Qwen-Turbo
  {
    id: 'qwen-turbo',
    label: 'Qwen-Turbo', // Übersetzt
    description: 'Ein schnelles Modell von Alibaba Cloud.', // Übersetzt
    contextWindow: 6000, // NOTE: guess
    maxCompletionTokens: 1500, // NOTE: guess
    trainingDataCutoff: 'Jan 2024', // NOTE: guess
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // NOTE: guess
    chatPrice: { input: 0.0005, output: 0.0005 }, // CNY per 1k tokens - NOTE: need to convert to USD
    benchmark: { cbaElo: 1050 }, // NOTE: guess
  },
];
