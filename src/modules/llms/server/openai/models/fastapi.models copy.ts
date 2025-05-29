import type { OpenAIWire_API_Models_List } from '~/modules/aix/server/dispatch/wiretypes/openai.wiretypes';

import { DModelInterfaceV1, LLM_IF_Chat, LLM_IF_Fn, LLM_IF_OAI_Vision } from '~/common/stores/llms/llms.types';

import type { ModelDescriptionSchema } from '../llm.server.types';
import { fromManualMapping, ManualMappings } from './models.data';


const _fastAPIKnownModels: ManualMappings = [
  // NOTE: we don't need manual patching as we have enough info for now
] as const;

const _fastAPIDenyListContains: string[] = [
  // nothing to deny for now
] as const;


// const fastAPIListOutputSchema = z.object({
//   id: z.string(),
//   object: z.literal('model'),
//   created: z.number(),
//   owned_by: z.string(),
//   root: z.string(),
//   parent: z.unknown(),
//   permission: z.array(ModelPermissionSchema ... ),
// });

/**
 * FastAPI models - minimal heuristics for enumeration using as much data as we can get.
 */
export function fastAPIHeuristic(models: OpenAIWire_API_Models_List.Model[]) {
  if (!models.length) return false;
  return models.some(model => model.owned_by === 'fastchat');
}

/**
 * NOTES:
 * - we assume all models are chat models that support the OpenAI ChatCompletion API
 * - we assume all models can take image inputs and produce function calls
 * - we don't have context window information
 */
export function fastAPIModels(models: OpenAIWire_API_Models_List.Model[]): ModelDescriptionSchema[] {
  return models
    .filter((model) => !_fastAPIDenyListContains.some(contains => model.id.includes(contains)))
    .map((model): ModelDescriptionSchema => {

      // heuristics
      const label = model.id; // assume the model ID is the label - as-is, don't even improve case/hyphens
      const description = 'FastAPI model. No additional information is provided by the API (capabilities, context window size, parameters, etc.).';
      const contextWindow = null; // NOTE: this is the worst part
      const interfaces: DModelInterfaceV1[] = [
        LLM_IF_Chat,    // assume all models are chat models
        // we can't know these permissions, so we unblock them from preventive warning, but some models won't support these
        LLM_IF_OAI_Vision,  // assume image inputs
        LLM_IF_Fn,      // assume can output function calls
        // LLM_IF_OAI_Json,    // assume can output json
      ];

      return fromManualMapping(_fastAPIKnownModels, model.id, model.created, undefined, {
        idPrefix: model.id,
        label,
        description,
        contextWindow,
        interfaces,
        // parameterSpecs: ...
        // maxCompletionTokens: ...
        // trainingDataCutoff: ...
        // benchmark: ...
        // chatPrice,
        hidden: false,
      });

    });
}

/**
 * This file defines models that are exposed via a generic FastAPI interface.
 * These are typically local models served by a FastAPI application.
 */

export const _knownFastAPIModels: ModelDescriptionSchema[] = [

  // Generic FastAPI Model
  {
    id: 'fastapi-model',
    label: 'FastAPI Modell', // Übersetzt
    description: 'Ein generisches Modell, das über eine FastAPI-Schnittstelle bereitgestellt wird.', // Übersetzt
    contextWindow: 4096, // Default guess
    maxCompletionTokens: 4096, // Default guess
    trainingDataCutoff: 'Unbekannt', // Übersetzt
    interfaces: [LLM_IF_Chat, LLM_IF_Fn], // Default guess
    chatPrice: { input: 0, output: 0 }, // Local models are free
    benchmark: undefined, // Unknown
  },

  // ... add other known FastAPI models here as needed

];
