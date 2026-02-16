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

export const getImageOrFallback = (image: string | undefined | null): string => {
  if (!image) return FALLBACK_IMAGE;
  const trimmedImage = image.trim();
  return trimmedImage.length > 0 ? trimmedImage : FALLBACK_IMAGE;
};
