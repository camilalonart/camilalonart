'use client';

import { useEffect } from 'react';

interface Props {
  destination: string;
}

export default function ShortEventRedirectClient({ destination }: Props) {
  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main style={{ padding: '2rem 1.25rem', textAlign: 'center' }}>
      <p style={{ marginBottom: '0.75rem' }}>Redirigiendo al evento...</p>
      <a href={destination}>Haz clic aqui si no redirige automaticamente</a>
    </main>
  );
}
