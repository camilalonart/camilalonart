'use client';

import styled from 'styled-components';
import PhotographyNav from '@/components/PhotographyNav';
import SecureImage from '@/components/SecureImage';
import { isExperienceEnabled } from '@/config/experienceRollout';
import {
  photographyDirectoryCopy,
  photographyDirectoryHero,
  photographyDirectoryServices,
} from '@/data/photographyDirectory';
import LocalizedLink from '@/i18n/LocalizedLink';
import { useTranslation } from '@/i18n/TranslationContext';
import { SITE_CONFIG } from '@/lib/seo';

const Page = styled.div`
  background: #fbf8f2;
  color: #292820;
  font: 400 1rem/1.7 var(--font-montserrat), sans-serif;
  letter-spacing: 0;

  h1, h2, h3 {
    margin: 0;
    text-transform: none;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  a:focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 5px;
    box-shadow: 0 0 0 7px #fbf8f2;
  }
`;

const Inner = styled.div`
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 5vw, 4rem);
`;

const Hero = styled.header`
  display: grid;
  gap: 2.5rem;
  padding-block: clamp(2.75rem, 7vw, 6rem);
  align-items: center;

  @media (min-width: 800px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: clamp(2rem, 5vw, 5rem);
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 1.25rem;
  font-size: 0.72rem;
  line-height: 1.7;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #625446;
`;

const HeroCopy = styled.div`
  min-width: 0;

  h1 {
    max-width: 11ch;
    font: 500 clamp(3.3rem, 6.5vw, 5.8rem)/0.98 var(--font-cormorant), serif;
    letter-spacing: -0.045em;
  }

  > p:not(:first-child) {
    max-width: 43ch;
    margin: 1.75rem 0;
    color: #504b42;
    font-size: clamp(0.95rem, 1.25vw, 1.05rem);
  }
`;

const ExploreLink = styled(LocalizedLink)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  min-height: 48px;
  padding: 0.8rem 1.2rem;
  border: 1px solid #292820;
  background: #292820;
  color: #fffdf8;
  font-size: 0.85rem;
  font-weight: 600;

  &:hover { background: #494638; color: #fffdf8; }
`;

const HeroFigure = styled.figure`
  min-width: 0;
  margin: 0;
  position: relative;

  > div {
    position: relative;
    aspect-ratio: 4 / 5;
    max-height: 610px;
    overflow: hidden;
    border-radius: 45% 45% 2px 2px;
    background: #e6d9cb;
  }

  figcaption {
    margin-top: 0.85rem;
    color: #625446;
    font-size: 0.75rem;
    font-weight: 500;
    text-align: right;
  }

  @media (max-width: 799px) {
    > div { aspect-ratio: 5 / 4; border-radius: 2px; }
  }
`;

const ServiceSection = styled.section`
  border-top: 1px solid #d8cfc2;
  padding-block: clamp(2.5rem, 6vw, 5rem);
  scroll-margin-top: 1.5rem;
`;

const SectionHeader = styled.div`
  max-width: 700px;
  margin-bottom: 1.75rem;

  h2 {
    font: 500 clamp(2.3rem, 4.4vw, 3.65rem)/1.05 var(--font-cormorant), serif;
    letter-spacing: -0.035em;
  }

  > p { margin-top: 1rem; color: #504b42; font-size: 0.95rem; }
`;

const ServiceShortcuts = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Shortcut = styled(LocalizedLink)<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.55rem 0.85rem;
  border: 1px solid #c7bdae;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #37352d;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
  }

  &:hover { background: #eee7dc; color: #292820; }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
`;

const ServiceCard = styled.article<{ $background: string; $accent: string; $font: string }>`
  --service-accent: ${({ $accent }) => $accent};
  min-width: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #ded7cd;
  border-top: 4px solid var(--service-accent);
  background: ${({ $background }) => $background};
  scroll-margin-top: 1.5rem;

  h3 {
    font-family: ${({ $font }) => $font};
    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    font-weight: 500;
    line-height: 1.2;
    color: var(--service-accent);
  }
`;

const CardImage = styled.div`
  position: relative;
  aspect-ratio: 16 / 11;
  background: #e5dfd6;
  overflow: hidden;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: clamp(1.25rem, 3vw, 2rem);

  > span {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    font-weight: 600;
    color: var(--service-accent);
    margin-bottom: 0.8rem;
  }

  > p {
    margin: 1rem 0 1.5rem;
    color: #49443e;
    font-size: 0.9rem;
    line-height: 1.8;
  }
`;

const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  align-items: center;
  margin-top: auto;

  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.85rem;
    color: var(--service-accent);
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  a:first-child {
    color: #fff;
    background: var(--service-accent);
    text-decoration: none;
    border: 1px solid var(--service-accent);
  }

  a:hover { text-decoration: underline; text-decoration-thickness: 2px; }
`;

const Contact = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem 3rem;
  padding-block: clamp(2.5rem, 6vw, 4rem);
  border-top: 1px solid #d8cfc2;

  > div { max-width: 580px; }
  h2 { font: 500 clamp(2rem, 4vw, 3rem)/1.15 var(--font-cormorant), serif; }
  p { margin-top: 1rem; color: #504b42; font-size: 0.95rem; }
`;

const Fallback = styled.div`
  padding: 7rem 1.5rem 4rem;
  min-height: 100vh;
  background: #292820;
  color: #fffdf8;

  h1 { font: 500 3rem var(--font-cormorant), serif; }
  p { margin-block: 1.5rem; }
  a { display: inline-flex; align-items: center; min-height: 44px; text-decoration: underline; }
`;

export default function PhotographyDirectory() {
  const { locale } = useTranslation();
  const copy = photographyDirectoryCopy[locale];

  if (!isExperienceEnabled('photographyDiscovery')) {
    return (
      <Page>
        <PhotographyNav />
        <Fallback>
          <h1>{copy.unavailableTitle}</h1>
          <p>{copy.unavailableDescription}</p>
          <LocalizedLink href="/">{copy.home}</LocalizedLink>
        </Fallback>
      </Page>
    );
  }

  return (
    <Page>
      <PhotographyNav />
      <Inner>
        <Hero>
          <HeroCopy>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h1>{copy.title}</h1>
            <p>{copy.introduction}</p>
            <ExploreLink href="#photography-services">
              {copy.explore}<span aria-hidden="true">↓</span>
            </ExploreLink>
          </HeroCopy>
          <HeroFigure>
            <div>
              <SecureImage
                src={photographyDirectoryHero}
                alt={copy.heroAlt}
                fill
                priority
                sizes="(max-width: 799px) 90vw, (max-width: 1280px) 44vw, 550px"
              />
            </div>
            <figcaption>{copy.heroCaption}</figcaption>
          </HeroFigure>
        </Hero>

        <ServiceSection id="photography-services" aria-labelledby="photography-services-title">
          <SectionHeader>
            <h2 id="photography-services-title">{copy.servicesTitle}</h2>
            <p>{copy.servicesIntro}</p>
          </SectionHeader>
          <ServiceShortcuts aria-label={copy.servicesLabel}>
            {photographyDirectoryServices.map(service => (
              <Shortcut key={service.id} href={`#${service.id}`} $accent={service.accent}>
                {copy.services[service.id].title}
              </Shortcut>
            ))}
          </ServiceShortcuts>
          <Grid>
            {photographyDirectoryServices.map(service => {
              const content = copy.services[service.id];
              const href = `/photography/${service.id}`;
              return (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  aria-labelledby={`${service.id}-title`}
                  $background={service.background}
                  $accent={service.accent}
                  $font={service.font}
                >
                  <CardImage>
                    <SecureImage
                      src={service.image}
                      alt={content.imageAlt}
                      fill
                      sizes="(max-width: 719px) 90vw, (max-width: 1280px) 44vw, 550px"
                      style={{ objectPosition: service.imagePosition }}
                    />
                  </CardImage>
                  <CardBody>
                    <span>{content.category}</span>
                    <h3 id={`${service.id}-title`}>{content.title}</h3>
                    <p>{content.description}</p>
                    <CardActions>
                      <LocalizedLink href={href} aria-label={`${copy.serviceAction}: ${content.title}`}>
                        {copy.serviceAction}<span aria-hidden="true">↗</span>
                      </LocalizedLink>
                      <LocalizedLink href={`${href}/gallery`} aria-label={`${copy.galleryAction}: ${content.title}`}>
                        {copy.galleryAction}
                      </LocalizedLink>
                    </CardActions>
                  </CardBody>
                </ServiceCard>
              );
            })}
          </Grid>
        </ServiceSection>

        <Contact aria-labelledby="photography-contact-title">
          <div>
            <h2 id="photography-contact-title">{copy.contactTitle}</h2>
            <p>{copy.contactDescription}</p>
          </div>
          <ExploreLink href={`mailto:${SITE_CONFIG.contact.email}`}>
            {copy.contactAction}<span aria-hidden="true">↗</span>
          </ExploreLink>
        </Contact>
      </Inner>
    </Page>
  );
}
