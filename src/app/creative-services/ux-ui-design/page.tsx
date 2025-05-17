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

const ProcessStep = styled.div`
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

export default function UXUIDesignPage() {
  const services = [
    {
      title: 'User Interface Design',
      items: [
        'Custom UI component libraries',
        'Responsive web design',
        'Mobile app interfaces',
        'Design system development',
        'Interactive prototypes'
      ]
    },
    {
      title: 'User Experience Design',
      items: [
        'User research & analysis',
        'Information architecture',
        'Wireframing',
        'User flow optimization',
        'Usability testing'
      ]
    },
    {
      title: 'Design Strategy',
      items: [
        'Brand integration',
        'Design thinking workshops',
        'Competitive analysis',
        'User journey mapping',
        'Design documentation'
      ]
    }
  ];

  const process = [
    {
      title: 'Discovery',
      description: 'Understanding your goals, users, and business requirements through in-depth research and analysis.'
    },
    {
      title: 'Design',
      description: 'Creating intuitive interfaces and experiences through iterative design and prototyping.'
    },
    {
      title: 'Development',
      description: 'Working closely with developers to ensure pixel-perfect implementation of designs.'
    },
    {
      title: 'Testing',
      description: 'Conducting usability tests and gathering feedback to refine and optimize the experience.'
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <h1>UX/UI Design</h1>
        <p>
          Creating intuitive, beautiful, and user-centered digital experiences
          that drive engagement and deliver results.
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
        <h2>Design Process</h2>
        <Grid>
          {process.map((step) => (
            <ProcessStep key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </ProcessStep>
          ))}
        </Grid>
      </Section>

      <Section>
        <ContactForm service="UX/UI Design" />
      </Section>
    </PageContainer>
  );
} 