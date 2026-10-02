'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SecureImage from '../components/SecureImage';
import { visibleSections, type Section } from '../config/sections';
import { useTranslation } from '../i18n/TranslationContext';
import { SITE_CONFIG } from '../lib/seo';

const previews: Record<string, { src: string; accent: string; contain?: boolean }> = {
  wedding: { src: '/images/wedding/A7T00021.webp', accent: '#D5B8B9' },
  pets: { src: '/images/pets/A7T02360.webp', accent: '#DBAC91' },
  family: { src: '/images/family/baby/A7T02099-2.webp', accent: '#B7C5AE' },
  headshots: { src: '/images/headshots/A7T07477.webp', accent: '#D9D9D9', contain: true },
  'art-experiences': { src: '/images/artExperiences/CreativeCorner/paintsip.webp', accent: '#ABC7E5', contain: true },
  'ux-ui': { src: '/images/uxuidesign/Alfred/thumbnail.webp', accent: '#B6B8ED', contain: true },
  art: { src: '/images/art/traditionalArt/Carrying Home/CarryingHome.webp', accent: '#C8A87A', contain: true },
  wildlife: { src: '/images/wildlife/wildlife-landing.webp', accent: '#B7C5AE' },
};

const translationKeys: Record<string, string> = {
  wedding: 'weddingCouples',
  pets: 'petPhotography',
  family: 'familyMaternity',
  headshots: 'headshots',
  'art-experiences': 'artExperiences',
  'ux-ui': 'uxUiDesign',
  art: 'art',
  wildlife: 'wildlifePhotography',
  'brand-identity': 'brandIdentity',
  'graphic-recording': 'graphicRecording',
  tech: 'softwareEngineering',
};

const personalWorkIds = new Set(['art', 'wildlife']);

const Page = styled.div`
  --gold: #C8A87A;
  --paper: #F0EDE8;
  --muted: #B9B5AD;
  min-height: 100vh;
  background: #101110;
  color: var(--paper);
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 400;
  letter-spacing: 0;

  h1, h2, h3 {
    margin: 0;
    font-family: var(--font-cormorant), serif;
    text-transform: none;
    letter-spacing: -0.025em;
    font-weight: 400;
  }

  p { margin: 0; font-weight: 400; }
  a { color: inherit; }
  a:focus-visible, button:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 5px;
  }
  section[id] { scroll-margin-top: 2rem; }
`;

const Container = styled.div`
  width: min(1280px, calc(100% - 6rem));
  margin-inline: auto;

  @media (max-width: 760px) {
    width: calc(100% - 2.5rem);
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding-block: 1.35rem;
  border-bottom: 1px solid #35362F;

  @media (max-width: 760px) {
    flex-wrap: wrap;
    padding-block: 1rem;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--gold) !important;
  font-family: var(--font-cormorant), serif;
  font-size: 1.65rem;
  letter-spacing: 0.025em;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem 1.75rem;
  margin-left: auto;
  font-size: 0.75rem;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    border-bottom: 1px solid transparent;
  }
  a:hover { color: var(--gold); border-color: var(--gold); }

  @media (max-width: 760px) {
    order: 3;
    width: 100%;
    margin: 0;
    gap: 0.25rem 1.4rem;
  }
`;

const Languages = styled.div`
  display: flex;
  gap: 0.15rem;
  button {
    min-width: 44px;
    min-height: 44px;
    color: var(--muted);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    border: 1px solid transparent;
  }
  button[aria-pressed='true'] { color: var(--gold); border-color: #595043; }
  button:hover { color: var(--paper); }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: clamp(2rem, 6vw, 6rem);
  padding-block: clamp(3rem, 6vw, 6rem);

  h1 {
    font-size: clamp(3.4rem, 5.8vw, 5.7rem);
    line-height: 0.99;
    max-width: 10ch;
    margin: 1.3rem 0 1.7rem;
  }
  h1 em { color: var(--gold); font-weight: 400; }

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
    h1 { font-size: clamp(3.4rem, 12vw, 5rem); max-width: 13ch; }
  }
`;

const Eyebrow = styled.p`
  color: var(--gold);
  font-size: 0.68rem;
  line-height: 1.7;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Intro = styled.p`
  max-width: 43ch;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.9;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem 1.5rem;
  margin-top: 2rem;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  min-height: 48px;
  padding: 0.85rem 1.25rem;
  background: var(--gold);
  color: #151610 !important;
  font-size: 0.75rem;
  font-weight: 500;
  &:hover { background: #E0C498; }
`;

const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 48px;
  font-size: 0.75rem;
  text-decoration: underline;
  text-underline-offset: 0.35em;
  &:hover { color: var(--gold); }
`;

const HeroFigure = styled.figure`
  margin: 0;
  min-width: 0;
  .image { height: clamp(340px, 43vw, 550px); background: #20221D; }
  figcaption {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-top: 1rem;
    color: var(--muted);
    font-size: 0.65rem;
    letter-spacing: 0.05em;
  }
`;

const SectionBlock = styled.section`
  padding-block: clamp(3rem, 6vw, 5rem);
  border-top: 1px solid #35362F;
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem 3rem;
  margin-bottom: 2rem;
  h2 { margin-top: 0.7rem; font-size: clamp(2.4rem, 4vw, 3.5rem); line-height: 1.1; }
  > p { max-width: 38ch; color: var(--muted); font-size: 0.8rem; line-height: 1.9; }
  @media (max-width: 760px) { flex-direction: column; align-items: start; gap: 1rem; }
`;

const CardGrid = styled.div<{ $personal?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$personal ? 2 : 3}, minmax(0, 1fr));
  gap: 2.5rem 1.5rem;
  @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 560px) { grid-template-columns: minmax(0, 1fr); }
`;

const Card = styled(Link)<{ $accent: string }>`
  --accent: ${props => props.$accent};
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-bottom: 1px solid #35362F;
  padding-bottom: 1.25rem;
  .preview { height: auto; aspect-ratio: 4 / 3; background: #22241F; overflow: hidden; }
  .preview img { transition: transform 350ms ease; }
  .card-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin: 1.1rem 0 0.65rem; }
  h3 { color: var(--accent); font-size: 1.85rem; line-height: 1.12; }
  .arrow { color: var(--accent); font-size: 1.25rem; flex-shrink: 0; }
  .description { color: var(--muted); font-size: 0.76rem; line-height: 1.8; }
  .card-action { display: block; margin-top: auto; padding-top: 1.1rem; color: var(--accent); font-size: 0.68rem; letter-spacing: 0.025em; }
  &:hover { border-color: var(--accent); }
  &:hover .preview img { transform: scale(1.025); }
  &:hover .card-action { text-decoration: underline; text-underline-offset: 0.3em; }
  @media (prefers-reduced-motion: reduce) {
    .preview img { transition: none; }
    &:hover .preview img { transform: none; }
  }
`;

const TextPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--accent);
  font-family: var(--font-cormorant), serif;
  font-size: 2.5rem;
`;

const Process = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin: 2.5rem 0 0;
  padding: 0;
  li { border-top: 1px solid #49483D; padding-top: 1.25rem; }
  .number { color: var(--gold); font-size: 0.7rem; }
  h3 { font-size: 1.8rem; margin-block: 0.75rem; }
  p { color: var(--muted); font-size: 0.78rem; line-height: 1.85; }
  @media (max-width: 760px) { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
`;

const Contact = styled.div`
  margin-top: 3rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: #1B1D18;
  border: 1px solid #414137;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem 3rem;
  h3 { font-size: clamp(2rem, 3vw, 2.75rem); }
  p { margin-top: 0.75rem; max-width: 50ch; color: var(--muted); font-size: 0.8rem; }
  .email { margin-top: 0.5rem; font-size: 0.72rem; overflow-wrap: anywhere; }
  .contact-links { flex-shrink: 0; max-width: 100%; }
  @media (max-width: 760px) { flex-direction: column; align-items: start; }
`;

const Footer = styled.footer`
  padding-block: 1.5rem 2rem;
  border-top: 1px solid #35362F;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  color: var(--muted);
  font-size: 0.7rem;
`;

export default function HomePage() {
  const { t, locale, setLocale } = useTranslation();
  const services = visibleSections.filter(section => !personalWorkIds.has(section.id));
  const personalWork = visibleSections.filter(section => personalWorkIds.has(section.id));
  const heroSection = visibleSections.find(section => section.id === 'wedding')
    ?? visibleSections.find(section => previews[section.id]);
  const heroPreview = heroSection ? previews[heroSection.id] : undefined;
  const emailHref = `mailto:${SITE_CONFIG.contact.email}`;

  const titleFor = (section: Section) => translationKeys[section.id]
    ? t(`home.${translationKeys[section.id]}.title`)
    : section.title;

  const renderCard = (section: Section, personal: boolean) => {
    const preview = previews[section.id];
    const title = titleFor(section);
    return (
      <Card key={section.id} href={section.href} $accent={preview?.accent ?? '#C8A87A'}>
        {preview ? (
          <div className="preview">
            <SecureImage
              src={preview.src}
              alt={t(`homepage.images.${section.id}`)}
              fill
              objectFit={preview.contain ? 'contain' : 'cover'}
              sizes={personal
                ? '(max-width: 560px) calc(100vw - 40px), (max-width: 760px) 46vw, (max-width: 1376px) 44vw, 628px'
                : '(max-width: 560px) calc(100vw - 40px), (max-width: 1000px) 44vw, (max-width: 1376px) 29vw, 411px'}
            />
          </div>
        ) : <TextPreview className="preview" aria-hidden="true">{title}</TextPreview>}
        <div className="card-heading">
          <h3>{title}</h3>
          <span className="arrow" aria-hidden="true">↗</span>
        </div>
        <p className="description">
          {translationKeys[section.id] ? t(`home.${translationKeys[section.id]}.description`) : section.description}
        </p>
        <span className="card-action">{t(personal ? 'homepage.exploreCollection' : 'homepage.viewService')}</span>
      </Card>
    );
  };

  return (
    <Page>
      <Container>
        <Header>
          <Brand href="/" aria-label={t('homepage.homeLabel')}>camilalonart<span aria-hidden="true">.</span></Brand>
          <Navigation aria-label={t('homepage.navigation')}>
            {services.length > 0 && <a href="#work-with-me">{t('homepage.servicesNav')}</a>}
            {personalWork.length > 0 && <a href="#personal-work">{t('homepage.workNav')}</a>}
            <a href="#contact">{t('nav.contact')}</a>
          </Navigation>
          <Languages role="group" aria-label={t('homepage.language')}>
            <button type="button" lang="en" aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
            <button type="button" lang="es" aria-label="Español" aria-pressed={locale === 'es'} onClick={() => setLocale('es')}>ES</button>
          </Languages>
        </Header>

        <Hero aria-labelledby="home-heading">
          <div>
            <Eyebrow>{t('homepage.location')}</Eyebrow>
            <h1 id="home-heading">{t('homepage.heroTitle')} <em>{t('homepage.heroEmphasis')}</em></h1>
            <Intro>{t('homepage.intro')}</Intro>
            <Actions>
              <PrimaryLink href={emailHref}>{t('homepage.inquire')} <span aria-hidden="true">↗</span></PrimaryLink>
              {(services.length > 0 || personalWork.length > 0) && (
                <TextLink href={services.length > 0 ? '#work-with-me' : '#personal-work'}>{t('homepage.findYourWorld')} <span aria-hidden="true">↓</span></TextLink>
              )}
            </Actions>
          </div>
          {heroSection && heroPreview && (
            <HeroFigure>
              <div className="image">
                <SecureImage
                  src={heroPreview.src}
                  alt={t(`homepage.images.${heroSection.id}`)}
                  fill
                  priority
                  objectFit={heroPreview.contain ? 'contain' : 'cover'}
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1376px) 44vw, 580px"
                />
              </div>
              <figcaption><span>{titleFor(heroSection)}</span><span>© Camilalonart</span></figcaption>
            </HeroFigure>
          )}
        </Hero>

        {services.length > 0 && (
          <SectionBlock id="work-with-me" aria-labelledby="services-heading">
            <SectionHeading>
              <div><Eyebrow>{t('homepage.servicesEyebrow')}</Eyebrow><h2 id="services-heading">{t('homepage.servicesTitle')}</h2></div>
              <p>{t('homepage.servicesIntro')}</p>
            </SectionHeading>
            <CardGrid>{services.map(section => renderCard(section, false))}</CardGrid>
          </SectionBlock>
        )}

        {personalWork.length > 0 && (
          <SectionBlock id="personal-work" aria-labelledby="work-heading">
            <SectionHeading>
              <div><Eyebrow>{t('homepage.workEyebrow')}</Eyebrow><h2 id="work-heading">{t('homepage.workTitle')}</h2></div>
              <p>{t('homepage.workIntro')}</p>
            </SectionHeading>
            <CardGrid $personal>{personalWork.map(section => renderCard(section, true))}</CardGrid>
          </SectionBlock>
        )}

        <SectionBlock id="contact" aria-labelledby="contact-heading">
          <SectionHeading>
            <div><Eyebrow>{t('homepage.processEyebrow')}</Eyebrow><h2 id="contact-heading">{t('homepage.processTitle')}</h2></div>
            <p>{t('homepage.processIntro')}</p>
          </SectionHeading>
          <Process>
            {['share', 'plan', 'create'].map((step, index) => (
              <li key={step}>
                <span className="number" aria-hidden="true">0{index + 1}</span>
                <h3>{t(`homepage.process.${step}.title`)}</h3>
                <p>{t(`homepage.process.${step}.description`)}</p>
              </li>
            ))}
          </Process>
          <Contact>
            <div><h3>{t('homepage.contactTitle')}</h3><p>{t('homepage.contactIntro')}</p></div>
            <div className="contact-links">
              <PrimaryLink href={emailHref}>{t('homepage.emailCamila')} <span aria-hidden="true">↗</span></PrimaryLink>
              <p className="email">{SITE_CONFIG.contact.email}</p>
            </div>
          </Contact>
        </SectionBlock>
        <Footer><span>© Camilalonart · {t('home.title')}</span><span>{t('homepage.footer')}</span></Footer>
      </Container>
    </Page>
  );
}
