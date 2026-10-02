'use client';

import type { ImageLoaderProps } from 'next/image';
import { responsiveImageUrl } from './responsiveImages';

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  return responsiveImageUrl(src, width);
}
