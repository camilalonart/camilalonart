'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from './TranslationContext';
import { localizedPath } from './routing';

export function useLocalizedRouter() {
  const router = useRouter();
  const { locale } = useTranslation();
  return useMemo(() => ({
    ...router,
    push: (href: string, options?: Parameters<typeof router.push>[1]) => router.push(localizedPath(href, locale), options),
    replace: (href: string, options?: Parameters<typeof router.replace>[1]) => router.replace(localizedPath(href, locale), options),
    prefetch: (href: string, options?: Parameters<typeof router.prefetch>[1]) => router.prefetch(localizedPath(href, locale), options),
  }), [router, locale]);
}
