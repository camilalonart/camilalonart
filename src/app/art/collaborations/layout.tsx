import React from 'react';
import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Art Collaborations — Camila Londoño',
  description: 'Discover creative collaborations and commissioned projects by artist Camila Londoño.',
  path: '/art/collaborations/',
  images: [{ url: SEO_IMAGES.art, alt: 'Artwork by Camila Londoño' }],
});

export default function CollaborationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
