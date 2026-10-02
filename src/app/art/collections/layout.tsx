import React from 'react';
import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Art Collections — Camila Londoño',
  description: 'Explore painting collections by Camila Londoño, with original works exploring memory, belonging and everyday moments.',
  path: '/art/collections/',
  images: [{ url: SEO_IMAGES.art, alt: 'Art collection by Camila Londoño' }],
});

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
