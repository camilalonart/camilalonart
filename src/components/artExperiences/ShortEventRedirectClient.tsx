'use client';

import { useEffect } from 'react';
import Link from '@/i18n/LocalizedLink';
import { useTranslation } from '@/i18n/TranslationContext';
import { localizedPath } from '@/i18n/routing';

interface Props {
  destination: string;
}

export default function ShortEventRedirectClient({ destination }: Props) {
  const { t, locale } = useTranslation();
  const localizedDestination = localizedPath(destination, locale);
  useEffect(() => {
    window.location.replace(localizedDestination);
  }, [localizedDestination]);

  return (
    <section style={{ padding: '2rem 1.25rem', textAlign: 'center' }}>
      <p style={{ marginBottom: '0.75rem' }}>{t('artContent.experiences.redirecting')}</p>
      <Link href={destination}>{t('artContent.experiences.redirectLink')}</Link>
    </section>
  );
}
