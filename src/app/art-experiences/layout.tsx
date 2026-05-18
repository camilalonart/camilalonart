import React from 'react';

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
