'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { useTranslation } from './TranslationContext';
import { localizedPath } from './routing';

type Props = React.ComponentPropsWithoutRef<typeof Link>;

const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(function LocalizedLink({ href, as, ...props }, ref) {
  const { locale } = useTranslation();
  const localize = (value: Props['href']) => {
    if (typeof value === 'string') return localizedPath(value, locale);
    if (value.host || value.hostname || value.protocol) return value;
    return { ...value, pathname: value.pathname ? localizedPath(value.pathname, locale) : value.pathname };
  };
  return <Link {...props} ref={ref} href={localize(href)} as={as ? localize(as) : as} />;
});

export default LocalizedLink;
