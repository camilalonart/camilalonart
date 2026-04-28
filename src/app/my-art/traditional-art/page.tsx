'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TraditionalArtRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/art/');
  }, [router]);
  return null;
}
