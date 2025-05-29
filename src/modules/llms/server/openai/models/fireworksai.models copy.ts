import { DModelInterfaceV1, LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Vision } from '~/common/stores/llms/llms.types';
import { ModelDescriptionSchema } from '../llm.server.types';

import { serverCapitalizeFirstLetter } from '~/server/wire';

import { fromManualMapping, ManualMappings } from './models.data';
import { wireFireworksAIListOutputSchema } from '../fireworksai.wiretypes';


export function fireworksAIHeuristic(hostname: string) {
  return hostname.includes('fireworks.ai/');
}


const _fireworksKnownModels: ManualMappings = [
  // NOTE: we don't need manual patching as we have enough info for now
] as const;

const _fireworksDenyListContains: string[] = [
  // nothing to deny for now
] as const;


function _prettyModelId(id: string, isVision: boolean): string {
  // example: "accounts/fireworks/models/llama-v3p1-405b-instruct" => "Fireworks · Llama V3p1 405b Instruct"
  let prettyName = id
    .replace(/^accounts\//, '') // remove the leading "accounts/" if present
    .replace(/\/models\//, ' · ') // turn the next "/models/" into " · "
    .replaceAll(/[_-]/g, ' ') // replace underscores or dashes with spaces
    .split(' ')
    .filter(piece => piece !== 'instruct')
    .map(serverCapitalizeFirstLetter)
    .join(' ')
    .replaceAll('/', ' · ') // replace any additional slash with " · "
    .trim();
  // add "Vision" to the name if it's a vision model
  if (isVision && !id.includes('-vision'))
    prettyName += ' Vision';
  prettyName = prettyName.replace(' Vision', ' (Vision)');
  return prettyName;
}


export function fireworksAIModelsToModelDescriptions(wireModels: unknown): ModelDescriptionSchema[] {
  return wireFireworksAIListOutputSchema
    .parse(wireModels)

    .filter((model) => {
      // filter-out non-llms
      if (model.supports_chat === false)
        return false;

      return !_fireworksDenyListContains.some(contains => model.id.includes(contains));
    })

    .map((model): ModelDescriptionSchema => {

      // heuristics
      const label = _prettyModelId(model.id, !!model.supports_image_input);
      const description = `${model.owned_by} \`${model.kind || 'unknown'}\` type.`;
      const contextWindow = model.context_length || null;
      const interfaces: DModelInterfaceV1[] = [LLM_IF_OAI_Chat];
      if (model.supports_image_input)
        interfaces.push(LLM_IF_OAI_Vision);
      if (model.supports_tools)
        interfaces.push(LLM_IF_OAI_Fn);

      return fromManualMapping(_fireworksKnownModels, model.id, model.created, undefined, {
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
    })

    .sort((a: ModelDescriptionSchema, b: ModelDescriptionSchema): number => {
      if (a.created !== b.created)
        return (b.created || 0) - (a.created || 0);
      return a.id.localeCompare(b.id);
    });
}


// https://docs.fireworks.ai/models/
// https://fireworks.ai/pricing

export const _knownFireworksAIModels: ModelDescriptionSchema[] = [

  // Mixtral-8x7B-Instruct
  {
    id: 'accounts/fireworks/models/mixtral-8x7b-instruct',
    label: 'Mixtral-8x7B-Instruct', // Übersetzt
    description: 'Ein leistungsstarkes Mixture-of-Experts Modell von Mistral AI.', // Übersetzt
    contextWindow: 32768,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Sep 2023', // NOTE: guess
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn], // NOTE: guess
    chatPrice: { input: 0.6, output: 0.6 }, // USD per 1M tokens
    benchmark: { cbaElo: 1280 }, // NOTE: guess
  },

  // Llama-2-70b-chat
  {
    id: 'accounts/fireworks/models/llama-2-70b-chat',
    label: 'Llama-2-70b-chat', // Übersetzt
    description: 'Ein großes Chat-Modell von Meta.', // Übersetzt
    contextWindow: 4096,
    maxCompletionTokens: 4096, // NOTE: guess
    trainingDataCutoff: 'Jul 2023', // NOTE: guess
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn], // NOTE: guess
    chatPrice: { input: 0.9, output: 0.9 }, // USD per 1M tokens
    benchmark: { cbaElo: 1250 }, // NOTE: guess
  },

  // ... add other known Fireworks AI models here as needed

];
