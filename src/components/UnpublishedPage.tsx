'use client';

import styled from 'styled-components';
import Link from '@/i18n/LocalizedLink';
import { useTranslation } from '@/i18n/TranslationContext';

const destinations = {
  art: '/art/',
  wildlife: '/my-art/wildlife-photography/',
  design: '/creative-services/ux-ui-design/',
  experiences: '/art-experiences/',
  wedding: '/photography/wedding-couples/',
  pets: '/photography/pets/',
  family: '/photography/family-maternity/',
  headshots: '/photography/headshots/',
  about: '/art/about/',
} as const;

type Destination = keyof typeof destinations;
type PageKind = 'brandIdentity' | 'creativeServices' | 'everyday' | 'portfolio' | 'blog';

const relatedPages: Record<PageKind, readonly Destination[]> = {
  brandIdentity: ['design', 'art', 'experiences'],
  creativeServices: ['design', 'experiences', 'wedding', 'pets', 'family', 'headshots'],
  everyday: ['wildlife', 'art', 'pets'],
  portfolio: ['art', 'wildlife', 'design', 'wedding'],
  blog: ['art', 'wildlife', 'about'],
};

const Page = styled.div`
  min-height: 100vh;
  padding: clamp(1.25rem, 5vw, 4rem) 1.25rem 7rem;
  background: #f8f5ef;
  color: #322f2b;
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 400;
  letter-spacing: normal;

  > div { width: min(100%, 880px); margin-inline: auto; }
  h1, h2 {
    font-family: var(--font-cormorant), serif;
    font-weight: 400;
    text-transform: none;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }
  h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-block: 0.75rem 1.25rem; }
  h2 { font-size: 2rem; margin-bottom: 1.25rem; }
  p { max-width: 62ch; font-size: 1rem; line-height: 1.8; color: #625b53; }
  header { padding-block: clamp(2rem, 6vw, 4rem); }
  .signature { color: #854b39; font-size: 0.875rem; }
  a:focus-visible { outline: 3px solid #854b39; outline-offset: 4px; }
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: #854b39;
  font-size: 0.9375rem;
  text-decoration: underline;
  text-underline-offset: 0.3em;
  &:hover { color: #673829; }
`;

const Directory = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;

  li { min-width: 0; }
  a {
    display: block;
    height: 100%;
    min-height: 44px;
    padding: 1.25rem;
    border: 1px solid #d6cbbd;
    color: #322f2b;
  }
  a:hover { border-color: #854b39; background: #eee7dd; }
  .title {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    text-decoration: underline;
    text-underline-offset: 0.3em;
  }
  .description { display: block; margin-top: 0.5rem; color: #625b53; font-size: 0.9375rem; line-height: 1.7; }
  @media (max-width: 600px) { grid-template-columns: minmax(0, 1fr); }
`;

export default function UnpublishedPage({ page }: { page: PageKind }) {
  const { t } = useTranslation();

  return (
    <Page>
      <div>
        <HomeLink href="/">{t('unpublished.home')}</HomeLink>
        <header>
          <p className="signature">{t('unpublished.signature')}</p>
          <h1>{t(`unpublished.pages.${page}.title`)}</h1>
          <p>{t(`unpublished.pages.${page}.message`)}</p>
        </header>
        <nav aria-labelledby="related-heading">
          <h2 id="related-heading">{t(page === 'creativeServices' ? 'unpublished.directoryTitle' : 'unpublished.relatedTitle')}</h2>
          <Directory>
            {relatedPages[page].map(destination => (
              <li key={destination}>
                <Link href={destinations[destination]}>
                  <span className="title">{t(`unpublished.links.${destination}.title`)}</span>
                  <span className="description">{t(`unpublished.links.${destination}.description`)}</span>
                </Link>
              </li>
            ))}
          </Directory>
        </nav>
      </div>
    </Page>
  );
}
