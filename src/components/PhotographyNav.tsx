'use client';

import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { photographyDirectoryCopy } from '@/data/photographyDirectory';
import LocalizedLink from '@/i18n/LocalizedLink';
import { routeKey } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n/TranslationContext';

const DiscoveryNav = styled.nav`
  position: relative;
  z-index: 100;
  width: 100%;
  background: #252823;
  color: #fffdf8;
  font: 500 0.8rem/1.3 var(--font-montserrat), sans-serif;
  letter-spacing: 0;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    max-width: 1280px;
    min-height: 64px;
    padding: 0.5rem clamp(0.75rem, 3vw, 2rem);
    margin-inline: auto;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem clamp(0.25rem, 1vw, 1rem);
    min-width: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li { min-width: 0; }

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0.5rem;
    color: #fffdf8;
    text-underline-offset: 5px;
  }

  a:hover, a[aria-current='page'] {
    color: #fffdf8;
    text-decoration: underline;
  }

  a:focus-visible, button:focus-visible {
    outline: 2px solid #e8c28f;
    outline-offset: 2px;
    box-shadow: none;
  }

  > div > div { flex-shrink: 0; }
`;

export default function PhotographyNav() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const copy = photographyDirectoryCopy[locale];

  return (
    <DiscoveryNav aria-label={copy.navigation}>
      <div>
        <ul>
          <li><LocalizedLink href="/">{copy.home}</LocalizedLink></li>
          <li>
            <LocalizedLink href="/photography" aria-current={routeKey(pathname || '/') === '/photography' ? 'page' : undefined}>
              {copy.allPhotography}
            </LocalizedLink>
          </li>
        </ul>
        <LanguageSwitcher isDark />
      </div>
    </DiscoveryNav>
  );
}
