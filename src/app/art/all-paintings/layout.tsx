import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'All Paintings — Camila Londoño',
  description: 'Browse paintings by Camila Londoño across contemporary collections and archival works.',
  path: '/art/all-paintings/',
  images: [{ url: SEO_IMAGES.art, alt: 'Painting by Camila Londoño' }],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
