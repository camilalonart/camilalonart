'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '../styles/theme';
import SecureImage from '../components/SecureImage';
import { useTranslation } from '../i18n/TranslationContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  width: 100%;
  position: relative;
`;

const LanguageSwitcherWrapper = styled.div`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 100;
  
  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
  }
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  padding: clamp(${theme.spacing.xl}, 5vw, ${theme.spacing['3xl']}) 0;
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
    background: linear-gradient(120deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: clamp(${theme.typography.fontSize.lg}, 2vw, ${theme.typography.fontSize.xl});
    color: ${theme.colors.text.secondary};
    max-width: min(800px, 90%);
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  margin-bottom: ${theme.spacing['3xl']};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    gap: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.md};
    padding: 0;
  }
`;

const Section = styled.section<{ $span?: number }>`
  grid-column: span ${props => props.$span || 4};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: span ${props => Math.min(props.$span || 4, 12)};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 12;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(${theme.typography.fontSize.xl}, 3vw, ${theme.typography.fontSize['2xl']});
  margin-bottom: clamp(${theme.spacing.lg}, 4vw, ${theme.spacing.xl});
  color: ${theme.colors.primary.main};
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing.lg};
  }
`;

const CardGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 2}, 1fr);
  gap: ${theme.spacing.xl};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(${props => Math.min(props.$columns || 2, 3)}, 1fr);
    gap: ${theme.spacing.xl};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const Card = styled.div`
  position: relative;
  height: clamp(300px, 50vh, 450px);
  perspective: 1000px;
  cursor: pointer;
  width: 100%;

  @media (max-width: ${theme.breakpoints.lg}) {
    height: clamp(320px, 45vh, 400px);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: clamp(300px, 40vh, 380px);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 300px;
  }

  &:hover .card-inner {
    transform: rotateY(180deg);
  }
`;

const CardInner = styled.div.attrs({ className: 'card-inner' })`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CardFace = styled.div<{ $back?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background: ${theme.colors.background.light};
  box-shadow: ${theme.shadows.md};
  transform: ${props => props.$back ? 'rotateY(180deg)' : 'none'};
`;

const CardContent = styled.div<{ $overlay?: boolean }>`
  position: absolute;
  inset: 0;
  padding: clamp(${theme.spacing.lg}, 4vw, ${theme.spacing.xl});
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.$overlay ? 'flex-end' : 'center'};
  align-items: center;
  text-align: center;
  background: ${props => props.$overlay ? 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))' : 'none'};
  color: ${props => props.$overlay ? theme.colors.text.light : theme.colors.text.primary};

  h3 {
    font-size: clamp(${theme.typography.fontSize.lg}, 2.5vw, ${theme.typography.fontSize.xl});
    margin-bottom: ${theme.spacing.md};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  p {
    font-size: clamp(${theme.typography.fontSize.base}, 1.5vw, ${theme.typography.fontSize.lg});
    line-height: 1.6;
    max-width: 90%;
    margin: 0 auto;
    
    @media (max-width: ${theme.breakpoints.lg}) {
      font-size: clamp(${theme.typography.fontSize.base}, 2vw, ${theme.typography.fontSize.lg});
      max-width: 95%;
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      max-width: 100%;
    }
  }
`;

const CardLink = styled(Link)`
  display: inline-block;
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const ClickableCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const StyledSecureImage = styled(SecureImage)`
  object-fit: cover;
`;

export default function HomePage() {
  const { t } = useTranslation();
  
  return (
    <PageContainer>
      <LanguageSwitcherWrapper>
        <LanguageSwitcher />
      </LanguageSwitcherWrapper>
      
      <Hero>
        <h1>{t('home.title')}</h1>
        <p>
          {t('home.subtitle')}
        </p>
      </Hero>

      <SectionGrid>
        <Section $span={12}>
          <SectionTitle>{t('home.photographyServices')}</SectionTitle>
          <CardGrid $columns={5}>
            <ClickableCard href="/photography/pets">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/pets/A7T05911-2copy.jpg"
                      alt="Pet Photography"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.petPhotography.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.petPhotography.title')}</h3>
                      <p>{t('home.petPhotography.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/photography/wedding-couples">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/wedding/A7T01396copy.jpg"
                      alt="Wedding & Couples"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.weddingCouples.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.weddingCouples.title')}</h3>
                      <p>{t('home.weddingCouples.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/photography/headshots">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/headshots/portfolio-0copy.jpg"
                      alt="Professional Headshots"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.headshots.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.headshots.title')}</h3>
                      <p>{t('home.headshots.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/photography/family-maternity">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/family/baby/A7T02053-2copy.jpg"
                      alt="Family & Maternity Photography"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.familyMaternity.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.familyMaternity.title')}</h3>
                      <p>{t('home.familyMaternity.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/photography/eventos">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/photography/eventos-hero.jpg"
                      alt="Event Photography"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.events.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.events.title')}</h3>
                      <p>{t('home.events.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
          </CardGrid>
        </Section>
      </SectionGrid>

      <SectionGrid>
        <Section $span={12}>
          <SectionTitle>{t('home.myArt')}</SectionTitle>
          <CardGrid $columns={4}>
            <ClickableCard href="/my-art/digital-art">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/art/digital.jpg"
                      alt="Digital Art"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.digitalArt.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.digitalArt.title')}</h3>
                      <p>{t('home.digitalArt.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/my-art/traditional-art">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/art/traditional.jpg"
                      alt="Traditional Art"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.traditionalArt.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.traditionalArt.title')}</h3>
                      <p>{t('home.traditionalArt.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/my-art/wildlife-photography">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/wildlife/wildlife-landing.jpg"
                      alt="Wildlife Photography"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.wildlifePhotography.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.wildlifePhotography.title')}</h3>
                      <p>{t('home.wildlifePhotography.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/my-art/everyday-photography">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/art/everyday.jpg"
                      alt="Everyday Photography"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.everydayPhotography.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.everydayPhotography.title')}</h3>
                      <p>{t('home.everydayPhotography.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
          </CardGrid>
        </Section>
      </SectionGrid>

      <SectionGrid>
        <Section $span={12}>
          <SectionTitle>{t('home.creativeServices')}</SectionTitle>
          <CardGrid $columns={4}>
            <ClickableCard href="/creative-services/brand-identity">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/creative/brand-identity.jpg"
                      alt="Brand Identity"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.brandIdentity.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.brandIdentity.title')}</h3>
                      <p>{t('home.brandIdentity.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/creative-services/graphic-recording">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/creative/graphic-recording.jpg"
                      alt="Graphic Recording"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.graphicRecording.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.graphicRecording.title')}</h3>
                      <p>{t('home.graphicRecording.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/creative-services/ux-ui-design">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/creative/ux-ui.jpg"
                      alt="UX/UI Design"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.uxUiDesign.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.uxUiDesign.title')}</h3>
                      <p>{t('home.uxUiDesign.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/creative-services/art-classes">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/creative/art-classes.jpg"
                      alt="Art Classes"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.artClasses.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.artClasses.title')}</h3>
                      <p>{t('home.artClasses.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
          </CardGrid>
        </Section>
      </SectionGrid>

      <SectionGrid>
        <Section $span={12}>
          <SectionTitle>{t('home.tech')}</SectionTitle>
          <CardGrid $columns={2}>
            <ClickableCard href="/tech/engineering">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/tech/software-engineering.jpg"
                      alt="Software Engineering"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.softwareEngineering.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.softwareEngineering.title')}</h3>
                      <p>{t('home.softwareEngineering.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
            <ClickableCard href="/tech/courses">
              <Card>
                <CardInner>
                  <CardFace>
                    <StyledSecureImage showWatermark={false}
                      src="/images/tech/courses.jpg"
                      alt="Tech Courses"
                      priority
                      quality={85}
                    />
                    <CardContent $overlay>
                      <h3>{t('home.techCourses.title')}</h3>
                    </CardContent>
                  </CardFace>
                  <CardFace $back>
                    <CardContent>
                      <h3>{t('home.techCourses.title')}</h3>
                      <p>{t('home.techCourses.description')}</p>
                    </CardContent>
                  </CardFace>
                </CardInner>
              </Card>
            </ClickableCard>
          </CardGrid>
        </Section>
      </SectionGrid>
    </PageContainer>
  );
}