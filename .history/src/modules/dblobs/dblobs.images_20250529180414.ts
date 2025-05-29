import { Is } from '~/common/util/pwaUtils';
import { createBlobURLFromData } from '~/common/util/urlUtils';
import { resizeBase64ImageIfNeeded } from '~/common/util/imageUtils';

// Importiere dblobsDB anstelle von _addDBAsset
import { dblobsDB, gcDBAssetsByScope, getDBAsset } from './dblobs/dblobs.db';
import { _createAssetObject, DBlobAssetId, DBlobAssetType, DBlobDBContextId, DBlobDBScopeId, DBlobImageAsset, DBlobMimeType } from './dblobs.types';


// configuration
const THUMBNAIL_ENCODING_MIMETYPE = !Is.Browser.Safari ? DBlobMimeType.IMG_WEBP : DBlobMimeType.IMG_JPEG;


export async function addDBImageAsset(
  contextId: DBlobDBContextId,
  scopeId: DBlobDBScopeId,
  image: {
    label: string,
    data: DBlobImageAsset['data'],
    origin: DBlobImageAsset['origin'],
    metadata: DBlobImageAsset['metadata'],
  },
): Promise<DBlobAssetId | undefined> {
  try {
    // Erstelle das Asset-Objekt
    const asset = _createAssetObject(contextId, scopeId, DBlobAssetType.Image, image.label, image.data, image.origin, image.metadata);

    // Füge das Asset zur largeAssets Tabelle hinzu
    const assetId = await dblobsDB.largeAssets.add(asset); // Aufruf angepasst

    // Führe Garbage Collection durch (optional, kann verschoben werden)
    // void gcDBAssetsByScope(contextId, scopeId); // fire/forget

    return assetId;

  } catch (error) {
    console.error('Fehler beim Hinzufügen des Bild-Assets zur IndexedDB:', error); // Übersetzt
    return undefined;
  }
}


export async function getDBImageAsset(assetId: DBlobAssetId): Promise<DBlobImageAsset | undefined> {
  try {
    const asset = await getDBAsset(assetId);
    if (!asset || asset.assetType !== DBlobAssetType.Image) return undefined;
    return asset as DBlobImageAsset;
  } catch (error) {
    console.error(`Fehler beim Abrufen des Bild-Assets ${assetId} aus der IndexedDB:`, error); // Übersetzt
    return undefined;
  }
}


export async function getDBImageAsDataUrl(assetId: DBlobAssetId): Promise<string | undefined> {
  const asset = await getDBImageAsset(assetId);
  if (!asset) return undefined;
  return createBlobURLFromData(asset.data);
}


export async function deleteDBImageAsset(assetId: DBlobAssetId): Promise<void> {
  try {
    await dblobsDB.largeAssets.delete(assetId); // Aufruf angepasst
  } catch (error) {
    console.error(`Fehler beim Löschen des Bild-Assets ${assetId} aus der IndexedDB:`, error); // Übersetzt
  }
}


export async function deleteAllDBImageAssets(contextId: DBlobDBContextId, scopeId: DBlobDBScopeId): Promise<void> {
  try {
    // Verwende den Index, um Assets nach Kontext und Scope zu löschen
    await dblobsDB.largeAssets.where({ contextId, scopeId }).delete(); // Aufruf angepasst
  } catch (error) {
    console.error(`Fehler beim Löschen aller Bild-Assets für Kontext ${contextId} und Scope ${scopeId} aus der IndexedDB:`, error); // Übersetzt
  }
}


export async function countDBImageAssets(contextId: DBlobDBContextId, scopeId: DBlobDBScopeId): Promise<number> {
  try {
    // Verwende den Index, um Assets nach Kontext und Scope zu zählen
    return await dblobsDB.largeAssets.where({ contextId, scopeId }).count(); // Aufruf angepasst
  } catch (error) {
    console.error(`Fehler beim Zählen der Bild-Assets für Kontext ${contextId} und Scope ${scopeId} aus der IndexedDB:`, error); // Übersetzt
    return 0;
  }
}
