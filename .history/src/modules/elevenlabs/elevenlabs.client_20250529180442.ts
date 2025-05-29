import { getBackendCapabilities } from '~/modules/backend/store-backend-capabilities';

import { AudioLivePlayer } from '~/common/util/audio/AudioLivePlayer';
import { AudioPlayer } from '~/common/util/audio/AudioPlayer';
import { CapabilityElevenLabsSpeechSynthesis } from '~/common/components/useCapabilities';
import { apiStream, apiAsync } from '~/common/util/trpc.client';
import { base64ToArrayBuffer } from '~/common/util/urlUtils';
import { useUIPreferencesStore } from '~/common/stores/store-ui';
import { createModuleLogger } from '~/common/logger';

import { ELEVENLABS_VOICE_ID } from './elevenlabs.router';


const logger = createModuleLogger('client', 'elevenlabs');


export function isElevenLabsEnabled(elevenLabsApiKey?: string): boolean {
  // API key is required
  if (!elevenLabsApiKey) return false;
  // TODO: check for a valid key format?
  return true;
}


/**
 * Fetches the list of voices from ElevenLabs.
 */
export async function elevenLabsListVoices(elevenLabsApiKey: string): Promise<{ voices: any[] }> {
  if (!isElevenLabsEnabled(elevenLabsApiKey)) {
    // NOTE: this is not an error, it's a normal condition
    // logger.warn('elevenLabsListVoices: ElevenLabs API key not set.');
    return { voices: [] };
  }
  try {
    return await apiAsync.elevenlabs.listVoices.query({ elevenLabsApiKey });
  } catch (error: any) {
    logger.error(`elevenLabsListVoices: ${error}`); // Übersetzt
    // TODO: show an error to the user
    return { voices: [] };
  }
}


/**
 * Fetches the default voice ID from the server.
 */
export async function elevenLabsGetDefaultVoiceId(): Promise<string> {
  try {
    return await apiAsync.elevenlabs.getDefaultVoice.query();
  } catch (error: any) {
    logger.error(`elevenLabsGetDefaultVoiceId: ${error}`); // Übersetzt
    // TODO: show an error to the user
    return ELEVENLABS_VOICE_ID; // Fallback to default hardcoded voice
  }
}


/**
 * Fetches the list of voices from ElevenLabs.
 */
export async function elevenLabsSynthesizeSpeech(elevenLabsApiKey: string, text: string, voiceId: string): Promise<Response> {
  if (!isElevenLabsEnabled(elevenLabsApiKey)) {
    throw new Error('ElevenLabs API-Schlüssel ist nicht konfiguriert.'); // Übersetzt
  }
  try {
    return await apiAsync.elevenlabs.synthesizeSpeech.query({ elevenLabsApiKey, text, voiceId });
  } catch (error: any) {
    logger.error(`elevenLabsSynthesizeSpeech: ${error}`); // Übersetzt
    throw new Error(`Sprachsynthese fehlgeschlagen: ${error.message || error.toString()}`); // Übersetzt
  }
}


/**
 * Fetches the list of voices from ElevenLabs.
 */
export async function elevenLabsSynthesizeSpeechNonStreaming(elevenLabsApiKey: string, text: string, voiceId: string): Promise<ArrayBuffer> {
  if (!isElevenLabsEnabled(elevenLabsApiKey)) {
    throw new Error('ElevenLabs API-Schlüssel ist nicht konfiguriert.'); // Übersetzt
  }
  try {
    return await apiAsync.elevenlabs.synthesizeSpeechNonStreaming.query({ elevenLabsApiKey, text, voiceId });
  } catch (error: any) {
    logger.error(`elevenLabsSynthesizeSpeechNonStreaming: ${error}`); // Übersetzt
    throw new Error(`Sprachsynthese fehlgeschlagen (nicht-streaming): ${error.message || error.toString()}`); // Übersetzt
  }
}


export function useCapability(): CapabilityElevenLabsSpeechSynthesis {
  const [clientApiKey, voiceId] = useElevenLabsData();
  const isConfiguredServerSide = getBackendCapabilities().hasVoiceElevenLabs;
  const isConfiguredClientSide = clientApiKey ? isValidElevenLabsApiKey(clientApiKey) : false;
  const mayWork = isConfiguredServerSide || isConfiguredClientSide || !!voiceId;
  return { mayWork, isConfiguredServerSide, isConfiguredClientSide };
}


export async function elevenLabsSpeakText(text: string, voiceId: string | undefined, audioStreaming: boolean, audioTurbo: boolean) {
  if (!(text?.trim())) return;

  const { elevenLabsApiKey, elevenLabsVoiceId } = getElevenLabsData();
  if (!isElevenLabsEnabled(elevenLabsApiKey)) return;

  const { preferredLanguage } = useUIPreferencesStore.getState();
  const nonEnglish = !(preferredLanguage?.toLowerCase()?.startsWith('en'));

  // audio live player instance, if needed
  let liveAudioPlayer: AudioLivePlayer | undefined;

  try {

    const stream = await apiStream.elevenlabs.speech.mutate({
      xiKey: elevenLabsApiKey,
      voiceId: voiceId || elevenLabsVoiceId,
      text: text,
      nonEnglish,
      audioStreaming,
      audioTurbo,
    });

    for await (const piece of stream) {
      if (piece.audioChunk) {

        // create the live audio player as needed
        // NOTE: in the future we can have a centralized audio playing system
        if (!liveAudioPlayer)
          liveAudioPlayer = new AudioLivePlayer();

        const chunkBuffer = base64ToArrayBuffer(piece.audioChunk.base64);
        liveAudioPlayer.enqueueChunk(chunkBuffer);

      } else if (piece.audio) {

        // also consieder mergin LiveAudioPlayer into AudioPlayer
        void AudioPlayer.playBuffer(base64ToArrayBuffer(piece.audio.base64)); // fire/forget - it's a single piece of audio (could be long tho)

      } else if (piece.errorMessage)
        console.log('ElevenLabs issue:', piece.errorMessage);
      else if (piece.warningMessage)
        console.log('ElevenLabs warning:', piece.errorMessage);
      else if (piece.control === 'start' || piece.control === 'end') {
        // ignore..
      } else
        console.log('piece:', piece);
    }

  } catch (error) {
    console.error('Error playing first text:', error);
  }
}
