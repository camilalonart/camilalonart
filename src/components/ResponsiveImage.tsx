import type { ImgHTMLAttributes } from 'react';
import { imageAsset, responsiveImageSet, responsiveImageUrl } from '@/lib/responsiveImages';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string;
  alt: string;
};

export default function ResponsiveImage({ src, alt, sizes = '100vw', width, height, ...props }: Props) {
  const asset = imageAsset(src);
  return (
    <img
      {...props}
      src={responsiveImageUrl(src, 960)}
      srcSet={responsiveImageSet(src)}
      sizes={sizes}
      width={width ?? asset?.width}
      height={height ?? asset?.height}
      alt={alt}
    />
  );
}
