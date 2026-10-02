import React from 'react';
import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Contact Camila Londoño',
  description: 'Contact Camila Londoño about her paintings, art commissions and creative collaborations.',
  path: '/art/contact/',
  images: [{ url: SEO_IMAGES.artist, alt: 'Camila Londoño' }],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
