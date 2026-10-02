import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'About Camila Londoño',
  description: 'Meet Camila Londoño, a Colombian artist and engineer based in Vancouver, and learn about her painting practice, storytelling and creative journey.',
  path: '/art/about/',
  images: [{ url: SEO_IMAGES.artist, alt: 'Camila Londoño' }],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
