'use client';

import { useEffect } from 'react';
import { useLocalizedRouter as useRouter } from '@/i18n/navigation';

export default function DigitalArtRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/art/');
  }, [router]);
  return null;
}
