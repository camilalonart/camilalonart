import React from 'react';
import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Art Experiences in Vancouver',
  description: 'Explore creative gatherings, painting events and art experiences with Camila Londoño in Vancouver, BC.',
  path: '/art-experiences/',
  images: [{ url: SEO_IMAGES.experiences, alt: 'Creative painting experience' }],
});

export default function ArtExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: '#F5EFE0', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
