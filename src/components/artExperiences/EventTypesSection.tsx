'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AE, StarSpark, PublicEventIcon, PrivateEventIcon, CorporateEventIcon, WeddingEventIcon } from './Doodles';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${AE.parchment};
  padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
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
  justify-content: center;
  gap: 0.6rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 3.5rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0 0 0.75rem;
  line-height: 1.1;
  text-transform: lowercase;
`;

const SectionSubtitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.9rem;
  line-height: 1.75;
  color: ${AE.warmBrown};
  max-width: 520px;
  margin: 0 auto;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.15s;

  @media (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${AE.cream};
  border-radius: 18px;
  padding: 1.75rem 1.4rem;
  border: 1.5px solid rgba(74, 114, 168, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
`;

const CardIcon = styled.div`
  margin-bottom: 0.85rem;
`;

const CardTitle = styled.h4`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 0.5rem;
`;

const CardDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  line-height: 1.65;
  color: ${AE.warmBrown};
  margin: 0;
`;

export default function EventTypesSection() {
  const types = [
    {
      icon: <PublicEventIcon size={42} color={AE.blue} />,
      title: 'Public Events',
      desc: 'Open paint & sip nights at beautiful venues across Vancouver... an evening of creativity for everyone.',
    },
    {
      icon: <PrivateEventIcon size={42} color={AE.blue} />,
      title: 'Private Parties',
      desc: 'Custom painting sessions for birthdays, bachelorettes, and any celebration that deserves a creative twist.',
    },
    {
      icon: <CorporateEventIcon size={42} color={AE.blue} />,
      title: 'Corporate Events',
      desc: 'Team-building experiences that spark creativity, connection, and joy across your team.',
    },
    {
      icon: <WeddingEventIcon size={42} color={AE.blue} />,
      title: 'Weddings',
      desc: 'A unique, memorable art activity for wedding receptions, bridal showers, and engagement parties.',
    },
  ];

  return (
    <Section id="event-types">
      <Container>
        <SectionHeader>
          <Eyebrow>
            <StarSpark size={12} color={AE.blue} />
            What I Teach
            <StarSpark size={12} color={AE.blue} />
          </Eyebrow>
          <SectionTitle>event types I teach</SectionTitle>
          <SectionSubtitle>
            From intimate gatherings to large-scale celebrations... I bring the art, the guidance, and the warmth to every event.
          </SectionSubtitle>
        </SectionHeader>

        <CardsGrid>
          {types.map((t, i) => (
            <Card key={i}>
              <CardIcon>{t.icon}</CardIcon>
              <CardTitle>{t.title}</CardTitle>
              <CardDesc>{t.desc}</CardDesc>
            </Card>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  );
}
