import { apiAsync } from '~/common/util/trpc.client';
import { createModuleLogger } from '~/common/logger';

import { useGoogleSearchStore } from './store-module-google';
import type { Search } from './search.types';


const logger = createModuleLogger('client', 'google');


export function isGoogleSearchEnabled(googleApiKey?: string, googleCseId?: string): boolean {
  // API key and CSE ID are required
  if (!googleApiKey || !googleCseId) return false;
  // TODO: check for valid key/id formats?
  return true;
}


/**
 * Performs a Google Search.
 */
export async function googleSearch(query: string): Promise<Search.Wire.SearchResponse> {
  const { googleCloudApiKey: googleApiKey, googleCSEId: googleCseId } = useGoogleSearchStore.getState();

  if (!isGoogleSearchEnabled(googleApiKey, googleCseId)) {
    // NOTE: this is not an error, it's a normal condition
    // logger.warn('googleSearch: Google API key or CSE ID not set.');
    return {
      kind: 'customsearch#search',
      url: { type: 'application/json', template: '' },
      queries: { request: [], nextPage: [] },
      context: { title: '' },
      searchInformation: {
        searchTime: 0,
        formattedSearchTime: '0',
        totalResults: '0',
        formattedTotalResults: '0',
      },
      items: [],
    };
  }

  try {
    return await apiAsync.googleSearch({ googleApiKey, googleCseId, query });
  } catch (error: any) {
    logger.error(`googleSearch: ${error}`); // Übersetzt
    throw new Error(`Google Search fehlgeschlagen: ${error.message || error.toString()}`); // Übersetzt
  }
}