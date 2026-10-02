import React from 'react';
import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Early Paintings — Camila Londoño',
  description: 'Explore early paintings and archival collections tracing the artistic development of Camila Londoño.',
  path: '/art/early-first-paintings/',
  images: [{ url: SEO_IMAGES.art, alt: 'Painting by Camila Londoño' }],
});

export default function EarlyPaintingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
