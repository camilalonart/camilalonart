import manifest from '@/data/image-manifest.generated.json';

interface ImageAsset {
  width: number;
  height: number;
  key: string;
  variants: number[];
}

const assets: Record<string, ImageAsset> = manifest;

export function imageAsset(src: string): ImageAsset | undefined {
  if (!src.startsWith('/images/')) return undefined;
  return assets[src] ?? assets[decodeURIComponent(src)];
}

function encodedSource(src: string): string {
  if (!src.startsWith('/images/')) return src;
  const decoded = assets[src] ? src : decodeURIComponent(src);
  return decoded.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

export function responsiveImageUrl(src: string, width: number): string {
  const asset = imageAsset(src);
  if (!asset) return encodedSource(src);
  const size = asset.variants.find(candidate => candidate >= width);
  if (size) return `/responsive-images/${asset.key}-${size}.webp`;
  if (asset.width > asset.variants[asset.variants.length - 1]) return encodedSource(src);
  return `/responsive-images/${asset.key}-${asset.width}.webp`;
}

export function responsiveImageSet(src: string): string | undefined {
  const asset = imageAsset(src);
  if (!asset) return undefined;
  const candidates = asset.variants.map(width => `/responsive-images/${asset.key}-${width}.webp ${width}w`);
  if (asset.width > asset.variants[asset.variants.length - 1]) {
    candidates.push(`${encodedSource(src)} ${Math.min(asset.width, 2048)}w`);
  }
  return candidates.join(', ');
}
