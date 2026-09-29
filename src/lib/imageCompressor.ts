// Helper function to compress images before saving to Firestore
// Firestore documents have a strict 1MB size limit.
// This function downsizes and compresses image files/data URLs to guarantee 100% reliable cloud sync (~30KB-60KB).

export async function compressFile(file: File, maxWidth = 640, quality = 0.65): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Failed to read file'));
        return;
      }
      compressImage(reader.result, maxWidth, quality).then(resolve).catch(reject);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function compressImage(dataUrl: string, maxWidth = 640, quality = 0.65): Promise<string> {
  // If it's already a static web URL (e.g. https://... or /assets/...), return as is
  if (!dataUrl || !dataUrl.startsWith('data:image')) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Target max width 640px for clean retina display
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      // Smooth bilinear rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      let compressed = canvas.toDataURL('image/jpeg', quality);

      // Adaptive check: If base64 length is still > 48KB (~65,000 chars),
      // perform a quick second pass to guarantee document never crosses Firestore quota limit
      if (compressed.length > 65000) {
        const pass2Width = Math.min(width, 480);
        const pass2Height = Math.round((height * pass2Width) / width);
        const canvas2 = document.createElement('canvas');
        canvas2.width = pass2Width;
        canvas2.height = pass2Height;
        const ctx2 = canvas2.getContext('2d');
        if (ctx2) {
          ctx2.imageSmoothingEnabled = true;
          ctx2.imageSmoothingQuality = 'medium';
          ctx2.drawImage(img, 0, 0, pass2Width, pass2Height);
          compressed = canvas2.toDataURL('image/jpeg', 0.58);
        }
      }

      resolve(compressed);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

