import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Art — Camila Londoño',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.camilalonart.com/art/' },
};

export default function DigitalArtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
