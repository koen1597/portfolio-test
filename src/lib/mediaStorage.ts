import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { PortfolioData, ProjectCaseStudy, WorkArtifact } from '../types';

// In-memory media cache for instantaneous synchronous rendering
const inMemoryCache = new Map<string, string>();

const MEDIA_PREFIX = 'firestore://media/';

export function isMediaRef(url?: string): boolean {
  return typeof url === 'string' && url.startsWith(MEDIA_PREFIX);
}

export function getMediaIdFromRef(ref: string): string {
  return ref.slice(MEDIA_PREFIX.length);
}

export function getMediaFromLocalCache(mediaId: string): string | null {
  if (inMemoryCache.has(mediaId)) {
    return inMemoryCache.get(mediaId)!;
  }
  try {
    const local = localStorage.getItem(`koen_media_${mediaId}`);
    if (local) {
      inMemoryCache.set(mediaId, local);
      return local;
    }
  } catch {
    // ignore
  }
  return null;
}

export async function saveMediaToFirestore(mediaId: string, dataUrl: string): Promise<string> {
  // 1. Cache immediately in memory & localStorage for zero-lag UI preview
  inMemoryCache.set(mediaId, dataUrl);
  try {
    localStorage.setItem(`koen_media_${mediaId}`, dataUrl);
  } catch {
    // storage full, memory cache still holds it
  }

  // 2. Persist to dedicated Firestore document (each has its own independent 1MB limit!)
  try {
    const docRef = doc(db, 'portfolio_media', mediaId);
    await setDoc(docRef, {
      mediaId,
      dataUrl,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error(`Failed to upload media ${mediaId} to Firestore:`, err);
    throw err;
  }

  return `${MEDIA_PREFIX}${mediaId}`;
}

export async function loadMediaFromFirestore(mediaId: string): Promise<string | null> {
  const cached = getMediaFromLocalCache(mediaId);
  if (cached) return cached;

  try {
    const docRef = doc(db, 'portfolio_media', mediaId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data && typeof data.dataUrl === 'string') {
        inMemoryCache.set(mediaId, data.dataUrl);
        try {
          localStorage.setItem(`koen_media_${mediaId}`, data.dataUrl);
        } catch {}
        return data.dataUrl;
      }
    }
  } catch (err) {
    console.warn(`Could not fetch media ${mediaId}:`, err);
  }
  return null;
}

// Automatically migrates raw base64 data URLs in a PortfolioData object into dedicated Firestore media documents
// This shrinks the main portfolio document from ~1MB down to ~40KB!
export async function extractAndUploadAllMedia(data: PortfolioData): Promise<PortfolioData> {
  const clone: PortfolioData = JSON.parse(JSON.stringify(data));

  // 1. Profile photo
  if (clone.profile.photoUrl && clone.profile.photoUrl.startsWith('data:image')) {
    const mediaId = 'profile_photo';
    const ref = await saveMediaToFirestore(mediaId, clone.profile.photoUrl);
    clone.profile.photoUrl = ref;
  }

  // 2. Projects
  if (Array.isArray(clone.projects)) {
    for (let i = 0; i < clone.projects.length; i++) {
      const p = clone.projects[i];

      // Thumbnail
      if (p.thumbnailUrl && p.thumbnailUrl.startsWith('data:image')) {
        const mediaId = `thumb_${p.id}`;
        const ref = await saveMediaToFirestore(mediaId, p.thumbnailUrl);
        p.thumbnailUrl = ref;
      }

      // Artifacts
      if (Array.isArray(p.artifacts)) {
        for (let j = 0; j < p.artifacts.length; j++) {
          const a = p.artifacts[j];
          if (a.imageUrl && a.imageUrl.startsWith('data:image')) {
            const mediaId = `art_${p.id}_${a.id || j}`;
            const ref = await saveMediaToFirestore(mediaId, a.imageUrl);
            a.imageUrl = ref;
          }
        }
      }
    }
  }

  return clone;
}

// Scans a PortfolioData and preloads all referenced media documents into memory
export async function preloadAllReferencedMedia(
  data: PortfolioData,
  onLoaded?: (mediaId: string, dataUrl: string) => void
): Promise<Record<string, string>> {
  const mediaIdsToFetch: string[] = [];

  const check = (url?: string) => {
    if (isMediaRef(url)) {
      const id = getMediaIdFromRef(url!);
      if (!mediaIdsToFetch.includes(id)) {
        mediaIdsToFetch.push(id);
      }
    }
  };

  check(data.profile.photoUrl);
  if (Array.isArray(data.projects)) {
    for (const p of data.projects) {
      check(p.thumbnailUrl);
      if (Array.isArray(p.artifacts)) {
        for (const a of p.artifacts) {
          check(a.imageUrl);
        }
      }
    }
  }

  const loaded: Record<string, string> = {};

  await Promise.all(
    mediaIdsToFetch.map(async (id) => {
      const cached = getMediaFromLocalCache(id);
      if (cached) {
        loaded[id] = cached;
        if (onLoaded) onLoaded(id, cached);
        return;
      }
      const fetched = await loadMediaFromFirestore(id);
      if (fetched) {
        loaded[id] = fetched;
        if (onLoaded) onLoaded(id, fetched);
      }
    })
  );

  return loaded;
}
