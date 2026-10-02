import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Painting Events & Creative Gatherings',
  description: 'Browse upcoming and past art events with Camila Londoño, including painting gatherings and creative afternoons in Vancouver.',
  path: '/art-experiences/events/',
  images: [{ url: SEO_IMAGES.experiences, alt: 'Painting event with Camila Londoño' }],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
