import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traditional Art — Camila Londoño',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.camilalonart.com/art/' },
};

export default function TraditionalArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
