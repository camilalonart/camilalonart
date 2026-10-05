'use client';

import React from 'react';
import Link from '@/i18n/LocalizedLink';
import styled from 'styled-components';
import SecureImage from "@/components/SecureImage";
import { visibleSections, type Section } from "@/config/sections";
import { useTranslation } from "@/i18n/TranslationContext";
import { SITE_CONFIG } from "@/lib/seo";
import InquiryPlanner from '@/components/InquiryPlanner';

const previews: Record<string, { src: string; accent: string; width: number; height: number }> = {
  wedding: { src: '/images/wedding/A7T00021.webp', accent: '#753F50', width: 2374, height: 3848 },
  pets: { src: '/images/pets/A7T02360.webp', accent: '#894B31', width: 3397, height: 4618 },
  family: { src: '/images/family/baby/A7T02099-2.webp', accent: '#4F654D', width: 1843, height: 1408 },
  headshots: { src: '/images/headshots/A7T07477.webp', accent: '#454545', width: 2289, height: 3434 },
  'art-experiences': { src: '/images/artExperiences/CreativeCorner/paintsip.webp', accent: '#355B80', width: 6912, height: 3456 },
  'ux-ui': { src: '/images/uxuidesign/Alfred/thumbnail.webp', accent: '#575084', width: 1046, height: 730 },
  art: { src: '/images/art/traditionalArt/Carrying Home/CarryingHome.webp', accent: '#815031', width: 3697, height: 4896 },
  wildlife: { src: '/images/wildlife/wildlife-landing.webp', accent: '#4F654D', width: 2601, height: 2222 },
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
const worldIds = ['art', 'art-experiences', 'pets', 'ux-ui'];

const Page = styled.div`
  --accent: #854B39;
  --ink: #322F2B;
  --muted: #686159;
  --line: #DDD5CB;
  min-height: 100vh;
  background: #F8F5EF;
  color: var(--ink);
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
  a:focus-visible, button:focus-visible, summary:focus-visible {
    outline: 2px solid var(--accent);
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
  border-bottom: 1px solid var(--line);

  @media (max-width: 760px) {
    flex-wrap: wrap;
    padding-block: 1rem;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--accent) !important;
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
  font-size: 0.875rem;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    border-bottom: 1px solid transparent;
  }
  a:hover { color: var(--accent); border-color: var(--accent); }

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
    font-size: 0.875rem;
    letter-spacing: 0.04em;
    border: 1px solid transparent;
  }
  button[aria-pressed='true'] { color: var(--accent); border-bottom-color: var(--accent); }
  button:hover { color: var(--ink); }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: start;
  gap: clamp(2rem, 5vw, 5rem);
  padding-block: clamp(2rem, 4vw, 4rem);

  h1 {
    font-size: clamp(3.8rem, 6.5vw, 6.4rem);
    line-height: 1;
    margin: 1rem 0 1.4rem;
  }
  h1 em { display: block; color: var(--accent); font-weight: 400; }

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
    h1 { font-size: clamp(3.5rem, 10vw, 5.5rem); }
    h1 em { display: inline; }
  }
`;

const Eyebrow = styled.p`
  color: var(--accent);
  font-size: 0.8rem;
  line-height: 1.7;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Intro = styled.p`
  max-width: 48ch;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.8;
`;

const Facets = styled.p`
  margin: 0 0 1rem !important;
  max-width: 40ch;
  font-size: 0.875rem;
  font-weight: 500 !important;
  line-height: 1.8;
  color: var(--accent);
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
  padding: 0.75rem 1.1rem;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff !important;
  font-size: 0.875rem;
  font-weight: 500;
  &:hover { background: #673829; border-color: #673829; }
`;

const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 48px;
  font-size: 0.875rem;
  text-decoration: underline;
  text-underline-offset: 0.35em;
  &:hover { color: var(--accent); }
`;

const Worlds = styled.div`
  min-width: 0;
  width: 100%;
  max-width: 560px;
  margin-left: auto;
  scroll-margin-top: 2rem;
  > h2 { font-size: 1.6rem; line-height: 1.2; margin-bottom: 0.5rem; }
  > p {
    color: var(--muted);
    font-size: 0.875rem;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  @media (max-width: 900px) { max-width: none; }
`;

const WorldGrid = styled.div`
  columns: 2;
  column-gap: 1rem;
  @media (max-width: 560px) { columns: 1; }
`;

const ImageTile = styled(Link)`
  position: relative;
  isolation: isolate;
  display: grid;
  align-items: end;
  min-width: 0;
  width: 100%;
  min-height: 280px;
  background: #171717;
  color: #fff;

  .tile-image {
    position: absolute;
    inset: 0;
    z-index: -2;
    overflow: hidden;
  }
  .tile-image img { filter: grayscale(1); }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(180deg, rgb(8 8 8 / 18%), rgb(8 8 8 / 62%) 30%, rgb(8 8 8 / 72%) 65%, rgb(8 8 8 / 90%));
  }
  .tile-copy { padding: clamp(1.25rem, 2vw, 2rem); }
  .tile-copy h2, .tile-copy h3, .tile-copy p { color: #fff; }
  .tile-action {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    min-height: 44px;
    margin-top: 0.85rem;
    border-bottom: 1px solid #fff;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.6;
  }
  &:hover .tile-action, &:focus-visible .tile-action {
    text-decoration: underline;
    text-underline-offset: 0.3em;
  }
`;

const WorldCard = styled(ImageTile)`
  break-inside: avoid;
  margin-bottom: 1rem;
  h3 {
    font-size: clamp(1.85rem, 2.5vw, 2.3rem);
    line-height: 1.15;
    margin: 0 0 0.65rem;
  }
  .world-copy p { font-size: 0.875rem; line-height: 1.7; }
`;

const SectionBlock = styled.section`
  padding-block: clamp(3rem, 6vw, 5rem);
  border-top: 1px solid var(--line);
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem 3rem;
  margin-bottom: 2rem;
  h2 { margin-top: 0.7rem; font-size: clamp(2.4rem, 4vw, 3.5rem); line-height: 1.1; }
  > p { max-width: 38ch; color: var(--muted); font-size: 0.9375rem; line-height: 1.8; }
  @media (max-width: 760px) { flex-direction: column; align-items: start; gap: 1rem; }
`;

const CardGrid = styled.div<{ $personal?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$personal ? 2 : 4}, minmax(0, 1fr));
  align-items: start;
  gap: 2.5rem 1.5rem;
  @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 560px) { grid-template-columns: minmax(0, 1fr); }
`;

const Card = styled(ImageTile)`
  min-height: 350px;
  h3 { font-size: 1.85rem; line-height: 1.12; margin-bottom: 0.75rem; }
  .description { font-size: 0.875rem; line-height: 1.8; }
`;

const InquiryDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem 4rem;
  margin-top: 2.5rem;
  h3 { font-size: 2rem; line-height: 1.2; margin-bottom: 1rem; }
  p { color: var(--muted); font-size: 0.9375rem; line-height: 1.8; }
  .about-links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; margin-top: 1rem; }
  @media (max-width: 760px) { grid-template-columns: minmax(0, 1fr); }
`;

const FAQ = styled.div`
  details { border-bottom: 1px solid var(--line); }
  summary {
    min-height: 44px;
    padding-block: 0.85rem;
    cursor: pointer;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.6;
  }
  summary::marker { color: var(--accent); }
  details > p { padding-bottom: 1rem; }
`;

const Footer = styled.footer`
  padding-block: 1.5rem 2rem;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  color: var(--muted);
  font-size: 0.8125rem;
  line-height: 1.7;
`;

export default function HomePage() {
  const { t, locale, setLocale } = useTranslation();
  const services = visibleSections.filter(section => section.category === 'photography' && !personalWorkIds.has(section.id));
  const personalWork = visibleSections.filter(section => personalWorkIds.has(section.id));
  const worlds = worldIds.flatMap(id => visibleSections.filter(section => section.id === id));

  const titleFor = (section: Section) => translationKeys[section.id]
    ? t(`home.${translationKeys[section.id]}.title`)
    : section.title;

  const renderCard = (section: Section, personal: boolean) => {
    const preview = previews[section.id];
    const title = titleFor(section);
    return (
      <Card key={section.id} href={section.href} style={preview ? { aspectRatio: `${preview.width} / ${preview.height}` } : undefined}>
        {preview && (
          <div className="preview tile-image">
            <SecureImage
              src={preview.src}
              alt={t(`homepage.images.${section.id}`)}
              fill
              objectFit="cover"
              showWatermark={false}
              sizes={personal
                ? '(max-width: 560px) calc(100vw - 40px), (max-width: 760px) 46vw, (max-width: 1376px) 44vw, 628px'
                : '(max-width: 560px) calc(100vw - 40px), (max-width: 1000px) 44vw, (max-width: 1376px) 21vw, 302px'}
            />
          </div>
        )}
        <div className="tile-copy">
          <h3>{title}</h3>
          <p className="description">
            {translationKeys[section.id] ? t(`home.${translationKeys[section.id]}.description`) : section.description}
          </p>
          <span className="card-action tile-action">{t(personal ? 'homepage.exploreCollection' : 'homepage.viewService')}<span aria-hidden="true">↗</span></span>
        </div>
      </Card>
    );
  };

  return (
    <Page>
      <Container>
        <Header>
          <Brand href="/" aria-label={t('homepage.homeLabel')}>camilalonart<span aria-hidden="true">.</span></Brand>
          <Navigation aria-label={t('homepage.navigation')}>
            <Link href="/photography/">{t('homepage.servicesNav')}</Link>
            <Link href="/art-experiences/">{t('home.artExperiences.title')}</Link>
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
            <Eyebrow>{t('homepage.studioLocation')}</Eyebrow>
            <h1 id="home-heading">{t('homepage.heroTitle')} <em>{t('homepage.heroEmphasis')}</em></h1>
            <Facets>{t('homepage.facets')}</Facets>
            <Intro>{t('homepage.studioIntro')}</Intro>
            <Actions>
              <PrimaryLink href="#contact">{t('homepage.workWithMe')} <span aria-hidden="true">↓</span></PrimaryLink>
              {worlds.length > 0 && (
                <TextLink href="#explore">{t('homepage.exploreMyWork')} <span aria-hidden="true">↓</span></TextLink>
              )}
            </Actions>
          </div>
          {worlds.length > 0 && (
            <Worlds id="explore" role="region" aria-labelledby="worlds-heading">
              <h2 id="worlds-heading">{t('homepage.exploreMyWork')}</h2>
              <p>{t('homepage.worldsIntro')}</p>
              <WorldGrid>
                {worlds.map((section, index) => {
                  const preview = previews[section.id];
                  return (
                    <WorldCard
                      key={section.id}
                      href={section.id === 'pets' ? '/photography/' : section.href}
                      style={{ aspectRatio: `${preview.width} / ${preview.height}` }}
                    >
                      <div className="world-image tile-image">
                        <SecureImage
                          src={preview.src}
                          alt={t(`homepage.images.${section.id}`)}
                          fill
                          priority={index === 0}
                          objectFit="cover"
                          showWatermark={false}
                          sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) 44vw, 272px"
                        />
                      </div>
                      <div className="world-copy tile-copy">
                        <h3>{t(`homepage.worlds.${section.id}.title`)}</h3>
                        <p>{t(`homepage.worlds.${section.id}.description`)}</p>
                        <span className="tile-action">{t(`homepage.worlds.${section.id}.action`)}<span aria-hidden="true">↗</span></span>
                      </div>
                    </WorldCard>
                  );
                })}
              </WorldGrid>
            </Worlds>
          )}
        </Hero>

        {services.length > 0 && (
          <SectionBlock id="work-with-me" aria-labelledby="services-heading">
            <SectionHeading>
              <div><Eyebrow>{t('homepage.servicesEyebrow')}</Eyebrow><h2 id="services-heading">{t('homepage.servicesTitle')}</h2></div>
              <p>{t('homepage.servicesIntro')}</p>
            </SectionHeading>
            <CardGrid>{services.map(section => renderCard(section, false))}</CardGrid>
            <TextLink as={Link} href="/photography/">{t('homepage.compareSessions')} <span aria-hidden="true">↗</span></TextLink>
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
          <InquiryPlanner />
          <InquiryDetails>
            <div>
              <h3>{t('homepage.aboutTitle')}</h3>
              <p>{t('homepage.aboutIntro')}</p>
              <div className="about-links">
                <TextLink as={Link} href="/art/about/">{t('homepage.aboutLink')} <span aria-hidden="true">↗</span></TextLink>
                <TextLink href={SITE_CONFIG.social.instagram}>{t('homepage.instagramLink')} <span aria-hidden="true">↗</span></TextLink>
              </div>
            </div>
            <FAQ>
              <h3>{t('homepage.faqTitle')}</h3>
              {['inquiry', 'location', 'languages', 'events'].map(question => (
                <details key={question}>
                  <summary>{t(`homepage.faq.${question}.question`)}</summary>
                  <p>{t(`homepage.faq.${question}.answer`)}</p>
                  {question === 'events' && (
                    <TextLink as={Link} href="/art-experiences/">{t('homepage.faq.events.link')} <span aria-hidden="true">↗</span></TextLink>
                  )}
                </details>
              ))}
            </FAQ>
          </InquiryDetails>
        </SectionBlock>
        <Footer><span>© Camilalonart · {t('home.title')}</span><span>{t('homepage.footer')}</span></Footer>
      </Container>
    </Page>
  );
}
