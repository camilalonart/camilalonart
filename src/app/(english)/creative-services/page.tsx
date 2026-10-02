'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import ProtectedImage from "@/components/ProtectedImage";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from '@/i18n/TranslationContext';

const PageContainer = styled.div`
  width: 100%;
`;

const Header = styled.header`
  text-align: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['2xl']};
  background: ${theme.colors.background.light};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    margin-bottom: ${theme.spacing.lg};
    background: linear-gradient(120deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto ${theme.spacing.md};
    line-height: 1.6;
  }

  .location {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.primary.main};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.lg};

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const CreativeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.lg};
  }
`;

const ProjectCard = styled.div<{ span: number }>`
  grid-column: span ${props => props.span};
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 12;
  }
  
  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const ProjectOverlay = styled.div.attrs({ className: 'overlay' })`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${theme.spacing.xl};
  opacity: 0;
  transition: ${theme.transitions.default};
  color: ${theme.colors.text.light};
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
  }
`;

const projects = [
  {
    id: 1,
    title: "creativeContent.index.projects.0.title",
    description: "creativeContent.index.projects.0.description",
    image: "/images/creative-services/brand-identity.jpg",
    span: 8
  },
  {
    id: 2,
    title: "creativeContent.index.projects.1.title",
    description: "creativeContent.index.projects.1.description",
    image: "/images/creative-services/editorial.jpg",
    span: 4
  },
  {
    id: 3,
    title: "creativeContent.index.projects.2.title",
    description: "creativeContent.index.projects.2.description",
    image: "/images/creative-services/commercial.jpg",
    span: 6
  },
  {
    id: 4,
    title: "creativeContent.index.projects.3.title",
    description: "creativeContent.index.projects.3.description",
    image: "/images/creative-services/art-prints.jpg",
    span: 6
  },
  {
    id: 5,
    title: "creativeContent.index.projects.4.title",
    description: "creativeContent.index.projects.4.description",
    image: "/images/creative-services/motion.jpg",
    span: 12
  }
];

export default function CreativeServicesPage() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <Header>
        <h1>{t('creativeContent.index.title')}</h1>
        <p>{t('creativeContent.index.intro')}</p>
        <div className="location">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {t('creativeContent.index.location')}
        </div>
      </Header>

      <CreativeGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id} span={project.span}>
            <ProtectedImage
              src={project.image}
              alt={t(project.title)}
              height="100%"
              quality={90}
            />
            <ProjectOverlay>
              <h3>{t(project.title)}</h3>
              <p>{t(project.description)}</p>
            </ProjectOverlay>
          </ProjectCard>
        ))}
      </CreativeGrid>
      
      <ContactForm service="Creative Services" />
    </PageContainer>
  );
} 