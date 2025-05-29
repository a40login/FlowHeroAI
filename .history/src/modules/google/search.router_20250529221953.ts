import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc.server';
import { env } from '~/server/env'; // Korrigierter Importpfad
import { fetchJsonOrTRPCThrow } from '~/server/trpc/trpc.router.fetchers';
import { createModuleLogger } from '~/common/logger';

import { GoogleSearchResults } from './search.types';


const logger = createModuleLogger('server', 'google');

// Google Custom Search API - https://developers.google.com/custom-search/v1/using_rest
const GOOGLE_SEARCH_API_BASE = 'https://www.googleapis.com/customsearch/v1';


export const googleSearchRouter = createTRPCRouter({

  query: publicProcedure
    .input(z.object({
      googleApiKey: z.string(),
      googleCseId: z.string(),
      query: z.string(),
    }))
    .query(async ({ input }) => {
      const { googleApiKey, googleCseId, query } = input;
      if (!googleApiKey || !googleCseId) {
        logger.warn('query: Google API key or CSE ID not set.'); // Übersetzt
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Google API-Schlüssel oder CSE ID ist nicht konfiguriert.', // Übersetzt
        });
      }
      try {
        const response = await fetchJsonOrTRPCThrow<GoogleSearchResults>({
          url: `${GOOGLE_SEARCH_API_BASE}?key=${googleApiKey}&cx=${googleCseId}&q=${encodeURIComponent(query)}`,
          method: 'GET',
          name: 'GoogleSearch/query',
        });
        return response;
      } catch (error: any) {
        logger.error(`query: ${error}`); // Übersetzt
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Fehler bei der Google Search-Abfrage: ${error.message || error.toString()}`, // Übersetzt
        });
      }
    }),

});