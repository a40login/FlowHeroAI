import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc.server';
import { env } from '~/server/env'; // Korrigierter Importpfad
import { fetchJsonOrTRPCThrow, fetchResponseOrTRPCThrow } from '~/server/trpc/trpc.router.fetchers';
import { createModuleLogger } from '~/common/logger';


const logger = createModuleLogger('server', 'elevenlabs');

// Default voice ID - this is the default voice used if no other is specified
export const ELEVENLABS_VOICE_ID = env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Adam - American Male

// Default API host - this is the default host for the ElevenLabs API
const ELEVENLABS_API_HOST = env.ELEVENLABS_API_HOST || 'https://api.elevenlabs.io';


export const elevenlabsRouter = createTRPCRouter({

  listVoices: publicProcedure
    .input(z.object({
      elevenLabsApiKey: z.string(),
    }))
    .query(async ({ input }: { input: { elevenLabsApiKey: string } }) => { // Typannotation hinzugefügt
      const { elevenLabsApiKey } = input;
      if (!elevenLabsApiKey) {
        logger.warn('listVoices: ElevenLabs API key not set.'); // Übersetzt
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'ElevenLabs API-Schlüssel ist nicht konfiguriert.', // Übersetzt
        });
      }
      try {
        const response = await fetchJsonOrTRPCThrow<{ voices: any[] }>({
          url: `${ELEVENLABS_API_HOST}/v1/voices`,
          headers: { 'xi-api-key': elevenLabsApiKey },
          method: 'GET',
          name: 'ElevenLabs/listVoices',
        });
        return response;
      } catch (error: any) {
        logger.error(`listVoices: ${error}`); // Übersetzt
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Fehler beim Abrufen der ElevenLabs-Stimmen: ${error.message || error.toString()}`, // Übersetzt
        });
      }
    }),

  getDefaultVoice: publicProcedure
    .query(async () => {
      // This is a server-side only endpoint, so we can use the server-side env var
      return ELEVENLABS_VOICE_ID;
    }),

  synthesizeSpeech: publicProcedure
    .input(z.object({
      elevenLabsApiKey: z.string(),
      text: z.string(),
      voiceId: z.string(),
    }))
    .query(async ({ input }: { input: { elevenLabsApiKey: string, text: string, voiceId: string } }) => { // Typannotation hinzugefügt
      const { elevenLabsApiKey, text, voiceId } = input;
      if (!elevenLabsApiKey) {
        logger.warn('synthesizeSpeech: ElevenLabs API key not set.'); // Übersetzt
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'ElevenLabs API-Schlüssel ist nicht konfiguriert.', // Übersetzt
        });
      }
      try {
        const response = await fetchResponseOrTRPCThrow({
          url: `${ELEVENLABS_API_HOST}/v1/text-to-speech/${voiceId}/stream`,
          headers: {
            'xi-api-key': elevenLabsApiKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          method: 'POST',
          body: {
            text,
            model_id: 'eleven_monolingual_v1', // NOTE: This is hardcoded for now
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          },
          name: 'ElevenLabs/synthesizeSpeech',
        });
        return response;
      } catch (error: any) {
        logger.error(`synthesizeSpeech: ${error}`); // Übersetzt
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Fehler bei der ElevenLabs-Sprachsynthese: ${error.message || error.toString()}`, // Übersetzt
        });
      }
    }),

  synthesizeSpeechNonStreaming: publicProcedure
    .input(z.object({
      elevenLabsApiKey: z.string(),
      text: z.string(),
      voiceId: z.string(),
    }))
    .query(async ({ input }: { input: { elevenLabsApiKey: string, text: string, voiceId: string } }) => { // Typannotation hinzugefügt
      const { elevenLabsApiKey, text, voiceId } = input;
      if (!elevenLabsApiKey) {
        logger.warn('synthesizeSpeechNonStreaming: ElevenLabs API key not set.'); // Übersetzt
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'ElevenLabs API-Schlüssel ist nicht konfiguriert.', // Übersetzt
        });
      }
      try {
        const response = await fetchResponseOrTRPCThrow({
          url: `${ELEVENLABS_API_HOST}/v1/text-to-speech/${voiceId}`,
          headers: {
            'xi-api-key': elevenLabsApiKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          method: 'POST',
          body: {
            text,
            model_id: 'eleven_monolingual_v1', // NOTE: This is hardcoded for now
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          },
          name: 'ElevenLabs/synthesizeSpeechNonStreaming',
        });
        return await response.arrayBuffer();
      } catch (error: any) {
        logger.error(`synthesizeSpeechNonStreaming: ${error}`); // Übersetzt
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Fehler bei der ElevenLabs-Sprachsynthese (nicht-streaming): ${error.message || error.toString()}`, // Übersetzt
        });
      }
    }),

});