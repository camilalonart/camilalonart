'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, WavyUnderline, SmallFlower, StarSpark, PublicEventIcon, PrivateEventIcon, CorporateEventIcon, WeddingEventIcon } from './Doodles';
import { YOU_AND_I_PAINT_URL } from './data';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${AE.parchment};
  padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(3rem, 6vw, 5rem);
  align-items: start;
  margin-bottom: clamp(4rem, 8vw, 6rem);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSide = styled.div`
  animation: ${fadeInUp} 0.8s ease both;
`;

const Eyebrow = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const CompanyBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${AE.blueTint};
  border: 1.5px solid rgba(74, 114, 168, 0.25);
  border-radius: 50px;
  padding: 0.35rem 1rem;
  margin-bottom: 1.25rem;
`;

const CompanyBadgeText = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${AE.blue};
`;

const SectionTitle = styled.h2`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 600;
  font-style: italic;
  color: ${AE.ink};
  margin: 0 0 1.25rem;
  line-height: 1.15;
`;

const WavyWrap = styled.div`
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.85;
  color: ${AE.warmBrown};
  margin: 0 0 2rem;
`;

const QuoteBox = styled.blockquote`
  margin: 0 0 2rem;
  padding: 1.5rem 1.75rem;
  background: rgba(74, 114, 168, 0.07);
  border-left: 4px solid ${AE.blue};
  border-radius: 0 16px 16px 0;

  p {
    font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-style: italic;
    font-weight: 600;
    color: ${AE.ink};
    margin: 0;
    line-height: 1.5;

    &::before { content: '"'; }
    &::after { content: '"'; }
  }
`;

const VisitBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: white;
  background: ${AE.blue};
  border-radius: 50px;
  padding: 0.8rem 1.85rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid ${AE.blue};

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.3);
  }
`;

const RightSide = styled.div`
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.15s;
`;

const ServicesTitle = styled.h3`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 600;
  color: ${AE.ink};
  margin: 0 0 1.5rem;
`;

const ServiceCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${AE.cream};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1.5px solid rgba(74, 114, 168, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.14);
  }
`;

const ServiceIcon = styled.div`
  margin-bottom: 0.85rem;
`;

const ServiceTitle = styled.h4`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 0.5rem;
`;

const ServiceDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.8rem;
  line-height: 1.65;
  color: ${AE.warmBrown};
  margin: 0;
`;

const GallerySection = styled.div`
  margin-top: clamp(3rem, 6vw, 5rem);
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.25s;
`;

const GalleryTitle = styled.h3`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-style: italic;
  font-weight: 600;
  color: ${AE.ink};
  margin: 0 0 1.5rem;
  text-align: center;
`;

const GalleryPlaceholder = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GalleryItem = styled.div`
  aspect-ratio: 4/3;
  background: ${AE.paper};
  border-radius: 12px;
  border: 1.5px dashed rgba(74, 114, 168, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(74, 114, 168, 0.3);
`;

const GalleryPlaceholderText = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-style: italic;
  color: ${AE.warmLight};
  text-align: center;
  margin: 0;
`;

const DecorativeBlob = styled.div`
  position: absolute;
  pointer-events: none;
  opacity: 0.15;
`;

export default function YouAndIPaintSection() {
  const { t, locale } = useTranslation();

  const services = [
    {
      icon: <PublicEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.publicTitle'),
      desc: t('artExperiences.youAndIPaint.publicDesc'),
    },
    {
      icon: <PrivateEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.privateTitle'),
      desc: t('artExperiences.youAndIPaint.privateDesc'),
    },
    {
      icon: <CorporateEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.corporateTitle'),
      desc: t('artExperiences.youAndIPaint.corporateDesc'),
    },
    {
      icon: <WeddingEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.weddingTitle'),
      desc: t('artExperiences.youAndIPaint.weddingDesc'),
    },
  ];

  return (
    <Section id="you-and-i">
      <DecorativeBlob style={{ top: '5%', left: '-2%' }}>
        <SmallFlower size={100} color={AE.blue} />
      </DecorativeBlob>
      <DecorativeBlob style={{ bottom: '10%', right: '-1%' }}>
        <SmallFlower size={80} color={AE.blue} />
      </DecorativeBlob>

      <Container>
        <IntroGrid>
          <LeftSide>
            <Eyebrow>
              <StarSpark size={12} color={AE.blue} />
              {t('artExperiences.youAndIPaint.eyebrow')}
            </Eyebrow>
            <CompanyBadge>
              <CompanyBadgeText>Certified Instructor</CompanyBadgeText>
            </CompanyBadge>

            <SectionTitle>{t('artExperiences.youAndIPaint.title')}</SectionTitle>
            <WavyWrap>
              <WavyUnderline width={80} color={AE.blue} />
            </WavyWrap>
            <Description>{t('artExperiences.youAndIPaint.subtitle')}</Description>

            <QuoteBox>
              <p>{t('artExperiences.youAndIPaint.quoteText')}</p>
            </QuoteBox>

            <VisitBtn href={YOU_AND_I_PAINT_URL} target="_blank" rel="noopener noreferrer">
              {t('artExperiences.youAndIPaint.visitSite')} ↗
            </VisitBtn>
          </LeftSide>

          <RightSide>
            <ServicesTitle>{locale === 'en' ? 'Event Types I Teach' : 'Tipos de Eventos que Enseño'}</ServicesTitle>
            <ServiceCards>
              {services.map((s, i) => (
                <ServiceCard key={i}>
                  <ServiceIcon>{s.icon}</ServiceIcon>
                  <ServiceTitle>{s.title}</ServiceTitle>
                  <ServiceDesc>{s.desc}</ServiceDesc>
                </ServiceCard>
              ))}
            </ServiceCards>
          </RightSide>
        </IntroGrid>

        <GallerySection>
          <GalleryTitle>{t('artExperiences.youAndIPaint.galleryTitle')}</GalleryTitle>
          <GalleryPlaceholder>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <GalleryItem key={n}>
                <SmallFlower size={28} color={AE.blue} style={{ opacity: 0.5 }} />
                <GalleryPlaceholderText>Event photo<br />coming soon</GalleryPlaceholderText>
              </GalleryItem>
            ))}
          </GalleryPlaceholder>
        </GallerySection>
      </Container>
    </Section>
  );
}
