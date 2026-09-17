const TEXT_PREFIXES = ['text/'] as const;
const IMAGE_PREFIXES = ['image/'] as const;

export function mimeToCategory(mime: string): 'text' | 'image' | 'binary' {
  if (TEXT_PREFIXES.some((p) => mime.startsWith(p))) return 'text';
  if (IMAGE_PREFIXES.some((p) => mime.startsWith(p))) return 'image';
  return 'binary';
}