'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import ProtectedImage from '../../../components/ProtectedImage';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: ${theme.spacing.lg};
    background: linear-gradient(120deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const Section = styled.section<{ $dark?: boolean }>`
  padding: ${theme.spacing['3xl']} 0;
  background-color: ${props => 
    props.$dark ? theme.colors.background.dark : theme.colors.background.main};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const ServiceCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: ${theme.spacing.md} 0;
    
    li {
      padding: ${theme.spacing.xs} 0;
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      
      &::before {
        content: '•';
        color: ${theme.colors.primary.main};
      }
    }
  }
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};

  h3 {
    color: ${theme.colors.primary.main};
    margin: ${theme.spacing.md} 0;
  }

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

export default function GraphicRecordingPage() {
  const services = [
    {
      title: 'Live Event Recording',
      items: [
        'Conferences and seminars',
        'Corporate meetings',
        'Workshops and training',
        'Panel discussions',
        'Real-time visualization'
      ]
    },
    {
      title: 'Digital Graphic Recording',
      items: [
        'Virtual meetings',
        'Online conferences',
        'Remote workshops',
        'Digital file delivery',
        'Interactive elements'
      ]
    },
    {
      title: 'Custom Solutions',
      items: [
        'Strategic planning',
        'Vision mapping',
        'Process visualization',
        'Story mapping',
        'Knowledge capture'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Enhanced Engagement',
      description: 'Visual storytelling keeps participants engaged and helps them retain information better.'
    },
    {
      title: 'Clear Communication',
      description: 'Complex ideas become accessible through visual representation and synthesis.'
    },
    {
      title: 'Lasting Impact',
      description: 'Visual records serve as powerful reminders and reference materials after the event.'
    },
    {
      title: 'Real-time Processing',
      description: 'Immediate visualization helps participants process and understand information as it\'s shared.'
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <h1>Graphic Recording</h1>
        <p>
          Transforming conversations and ideas into engaging visual stories.
          Real-time visual facilitation for meetings, events, and workshops.
        </p>
      </Hero>

      <Section>
        <h2>Services</h2>
        <Grid>
          {services.map((service) => (
            <ServiceCard key={service.title}>
              <h3>{service.title}</h3>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ServiceCard>
          ))}
        </Grid>
      </Section>

      <Section $dark>
        <h2>Benefits</h2>
        <Grid>
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </BenefitCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <ContactForm service="Graphic Recording" />
      </Section>
    </PageContainer>
  );
} 