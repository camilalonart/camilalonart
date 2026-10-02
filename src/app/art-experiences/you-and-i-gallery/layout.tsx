import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'You & I Paint — Event Gallery',
  description: 'Explore photographs from You & I Paint experiences, celebrating painting, creativity and time spent together.',
  path: '/art-experiences/you-and-i-gallery/',
  images: [{ url: SEO_IMAGES.experiences, alt: 'You & I Paint experience' }],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
