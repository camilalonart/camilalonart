import React from 'react';

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
