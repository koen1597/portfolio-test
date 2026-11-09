import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import { saveMediaToFirestore } from './mediaStorage';

/**
 * Uploads an image file with zero lossy compression.
 * Tries Firebase Storage first to return a clean public downloadURL.
 * Gracefully falls back to high-res Firestore media storage if the Storage bucket
 * is not yet initialized or returns 404.
 */
export async function uploadImageFile(
  file: File,
  folderPath: string = 'uploads'
): Promise<string> {
  // Defensive validation: ensure valid image format and prevent excessive payloads
  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일(PNG, JPG, WebP, SVG 등)만 업로드할 수 있습니다.');
  }
  const MAX_SIZE_MB = 15;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`파일 용량이 너무 큽니다. (${(file.size / (1024 * 1024)).toFixed(1)}MB). ${MAX_SIZE_MB}MB 이하의 이미지를 업로드해주세요.`);
  }

  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fullPath = `${folderPath}/${timestamp}_${cleanName}`;

  try {
    // 1. Primary: Upload raw high-resolution binary to Firebase Storage
    console.info(`[Storage] Uploading "${file.name}" (${(file.size / 1024).toFixed(1)} KB) to "${fullPath}"...`);
    const storageRef = ref(storage, fullPath);
    const metadata = {
      contentType: file.type || 'image/png',
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString()
      }
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.info('[Storage] Upload succeeded! Public URL:', downloadURL);
    return downloadURL;
  } catch (storageErr: any) {
    console.warn(
      `[Storage] Firebase Storage direct upload failed (${storageErr?.code || 'ERR'}): ${storageErr?.message || storageErr}. ` +
      'Seamlessly routing to high-resolution Firestore media storage fallback...'
    );
    
    // 2. Resilient Fallback: Read original file losslessly and store in media collection
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          const mediaId = `media_${timestamp}`;
          const mediaRef = await saveMediaToFirestore(mediaId, dataUrl);
          console.info(`[Storage Fallback] Persisted high-resolution asset to ${mediaRef}`);
          resolve(mediaRef);
        } catch (mediaErr) {
          console.error('[Storage Fallback] Firestore media write failed:', mediaErr);
          reject(mediaErr);
        }
      };
      reader.onerror = (err) => {
        console.error('[Storage Fallback] Failed to read file into data URL:', err);
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(file);
    });
  }
}

/**
 * Deletes an image from Firebase Storage if it's a storage URL
 */
export async function deleteStorageImage(url: string): Promise<boolean> {
  if (!url || !url.includes('firebasestorage.googleapis.com')) {
    return false;
  }
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    console.warn('Failed to delete storage image:', err);
    return false;
  }
}

/**
 * Checks if a given URL is a valid remote HTTP or Firebase Storage URL
 */
export function isRemoteUrl(url?: string): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}
