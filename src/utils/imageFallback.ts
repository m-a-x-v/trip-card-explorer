const FALLBACK_IMAGE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400" role="img" aria-label="Image not available">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e6edf3" />
      <stop offset="100%" stop-color="#cfd8e3" />
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#bg)" />
  <g fill="none" stroke="#8a94a3" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
    <rect x="245" y="105" width="310" height="190" rx="20" />
    <path d="M270 255l85-85 80 80 45-45 50 50" />
    <circle cx="510" cy="150" r="20" />
  </g>
  <text x="50%" y="84%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#495569">
    Image Not Available
  </text>
</svg>`;

export const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(FALLBACK_IMAGE_SVG)}`;

type ImageVariant = 'card' | 'modal';

const UNSPLASH_HOST = 'images.unsplash.com';

const IMAGE_VARIANT_CONFIG: Record<ImageVariant, { width: number; height: number; quality: number }> = {
  card: { width: 700, height: 420, quality: 70 },
  modal: { width: 1200, height: 700, quality: 75 },
};

const optimizeImageUrl = (image: string, variant: ImageVariant): string => {
  if (image.startsWith('data:')) return image;

  try {
    const url = new URL(image);
    if (!url.hostname.includes(UNSPLASH_HOST)) return image;

    const config = IMAGE_VARIANT_CONFIG[variant];
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', String(config.width));
    url.searchParams.set('h', String(config.height));
    url.searchParams.set('q', String(config.quality));
    url.searchParams.set('fm', 'webp');

    return url.toString();
  } catch {
    return image;
  }
};

export const getImageOrFallback = (
  image: string | undefined | null,
  variant: ImageVariant = 'card',
): string => {
  if (!image) return FALLBACK_IMAGE;
  const trimmedImage = image.trim();
  return trimmedImage.length > 0 ? optimizeImageUrl(trimmedImage, variant) : FALLBACK_IMAGE;
};
