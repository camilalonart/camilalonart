'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DigitalArtRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/art/');
  }, [router]);
  return null;
}
