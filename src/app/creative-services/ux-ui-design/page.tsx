'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { theme } from '@/styles/theme';
import { useTranslation } from '@/i18n/TranslationContext';
import SecureImage from '@/components/SecureImage';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { uxuiProjects, UXUIProject } from '@/data/uxuiProjects';

const FORMSPREE_ID = 'xnjwdddj';

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  bg:      '#FAFAFA',
  white:   '#FFFFFF',
  text:    '#0A0A0A',
  muted:   '#9A9A9A',
  border:  'rgba(0,0,0,0.09)',
  hover:   'rgba(0,0,0,0.54)',
};

// ── Animations ────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ── NAV ───────────────────────────────────────────────────────────────────────
const PageNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.5rem,4vw,3rem);
  height: 60px;
  background: rgba(250,250,250,0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${C.border};
`;

const NavLogo = styled(Link)`
  font-family: var(--font-cormorant);
  font-size: 1.15rem;
  font-weight: 500;
  color: ${C.text};
  letter-spacing: 0.04em;
  transition: opacity 0.2s;
  &:hover { opacity: 0.55; }
`;

const NavBack = styled(Link)`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${C.muted};
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.2s;
  &:hover { color: ${C.text}; }
`;

// ── Page shell ────────────────────────────────────────────────────────────────
const Page = styled.div`
  background: ${C.bg};
  min-height: 100vh;
`;

// ── HERO ──────────────────────────────────────────────────────────────────────
const Hero = styled.section`
  position: relative;
  min-height: 100svh;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 0 clamp(1.5rem,4vw,3rem);
  padding-top: 60px;
`;

const HeroCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: clamp(3rem,6vw,5rem) 0 clamp(2rem,4vw,3rem);
`;

const HeroEyebrow = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${C.muted};
  animation: ${fadeUp} 0.9s ease both;
  animation-delay: 0.05s;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-cormorant);
  font-size: clamp(5rem, 12vw, 10.5rem);
  font-weight: 300;
  color: ${C.text};
  line-height: 0.88;
  letter-spacing: -0.03em;
  margin: 0;
  animation: ${fadeUp} 1s ease both;
  animation-delay: 0.1s;

  em {
    font-style: italic;
  }
`;

const HeroTagline = styled.p`
  font-family: var(--font-montserrat);
  font-size: clamp(0.82rem,1.2vw,0.92rem);
  font-weight: 300;
  color: ${C.muted};
  max-width: 340px;
  line-height: 1.8;
  margin: 0;
  letter-spacing: 0.01em;
  animation: ${fadeUp} 1s ease both;
  animation-delay: 0.2s;
`;

const HeroBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: clamp(1.5rem,3vw,2rem);
  border-top: 1px solid ${C.border};
  padding-top: 1.25rem;
`;

const HeroCount = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.muted};
`;

const ScrollHint = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${C.muted};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const WorkSection = styled.section`
  padding: clamp(4rem,8vw,7rem) clamp(1.5rem,4vw,3rem);
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionLabel = styled.p`
  font-family: var(--font-montserrat);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0 0 2.5rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: clamp(1rem,2.5vw,2rem);

  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const ProjectItem = styled.button`
  all: unset;
  display: block;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover .proj-thumb { transform: scale(1.02); }
  &:hover .proj-overlay { opacity: 1; }
  &:focus-visible { outline: 1.5px solid ${C.text}; outline-offset: 4px; }
`;

const ProjectThumbWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #EFEFEF;
`;

const ProjectThumb = styled.div.attrs({ className: 'proj-thumb' })`
  position: absolute;
  inset: 0;
  transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
`;

const ProjectOverlay = styled.div.attrs({ className: 'proj-overlay' })`
  position: absolute;
  inset: 0;
  background: rgba(10,10,10,0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
`;

const OverlayLabel = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #fff;
`;

const ProjectMeta = styled.div`
  padding: 0.9rem 0 0;
`;

const ProjectNumber = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: ${C.muted};
  display: block;
  margin-bottom: 0.3rem;
`;

const ProjectName = styled.h3`
  font-family: var(--font-cormorant);
  font-size: clamp(1.4rem,2.2vw,1.9rem);
  font-weight: 400;
  color: ${C.text};
  margin: 0 0 0.35rem;
  letter-spacing: -0.01em;
  line-height: 1.1;
`;

const ProjectDesc = styled.p`
  font-family: var(--font-montserrat);
  font-size: 0.78rem;
  color: ${C.muted};
  font-weight: 300;
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// ── CONTACT ───────────────────────────────────────────────────────────────────
const ContactSection = styled.section`
  padding: clamp(4rem,8vw,7rem) clamp(1.5rem,4vw,3rem);
  border-top: 1px solid ${C.border};
  max-width: 1400px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem,6vw,6rem);
  align-items: start;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ContactLeft = styled.div``;

const ContactHeading = styled.h2`
  font-family: var(--font-cormorant);
  font-size: clamp(2.5rem,5vw,4rem);
  font-weight: 300;
  color: ${C.text};
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;

  em { font-style: italic; }
`;

const ContactSub = styled.p`
  font-family: var(--font-montserrat);
  font-size: 0.82rem;
  color: ${C.muted};
  font-weight: 300;
  line-height: 1.8;
  margin: 0;
  max-width: 300px;
`;

const ContactRight = styled.div`
  padding-top: 0.25rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.75rem;
`;

const FieldLabel = styled.label`
  font-family: var(--font-montserrat);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.muted};
`;

const underlineBase = css`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${C.border};
  border-radius: 0;
  padding: 0.55rem 0;
  color: ${C.text};
  font-family: var(--font-montserrat);
  font-size: 0.92rem;
  font-weight: 300;
  width: 100%;
  outline: none;
  transition: border-color 0.25s ease;

  &::placeholder { color: rgba(0,0,0,0.2); }
  &:focus { border-bottom-color: ${C.text}; }
  @media (max-width: 600px) { font-size: 16px; }
`;

const FieldInput    = styled.input`${underlineBase}`;
const FieldTextarea = styled.textarea`
  ${underlineBase}
  min-height: 100px;
  resize: none;
`;

const SendButton = styled.button`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.bg};
  background: ${C.text};
  border: none;
  padding: 0.85rem 2rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 0.25rem;

  &:hover:not(:disabled) { opacity: 0.72; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const FormMsg = styled.div<{ $type: 'success' | 'error' }>`
  margin-bottom: 1.25rem;
  padding: 0.75rem 0;
  border-left: 2px solid ${p => p.$type === 'success' ? '#22c55e' : '#ef4444'};
  padding-left: 0.85rem;
  color: ${p => p.$type === 'success' ? '#16a34a' : '#dc2626'};
  font-family: var(--font-montserrat);
  font-size: 0.8rem;
  font-weight: 300;
`;

// ── FOOTER ────────────────────────────────────────────────────────────────────
const PageFooter = styled.footer`
  border-top: 1px solid ${C.border};
  padding: 1.5rem clamp(1.5rem,4vw,3rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 520px) { flex-direction: column; align-items: flex-start; }
`;

const FooterNote = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: ${C.muted};
`;

const FooterLink = styled.a`
  font-family: var(--font-montserrat);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${C.muted};
  transition: color 0.2s;
  &:hover { color: ${C.text}; }
`;

// ── DETAIL OVERLAY ────────────────────────────────────────────────────────────
const DetailOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  background: ${C.bg};
  z-index: 1100;
  overflow-y: auto;
  display: ${p => (p.$visible ? 'block' : 'none')};
  animation: ${fadeIn} 0.25s ease;
`;

const DetailTopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(250,250,250,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${C.border};
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 clamp(1.5rem,4vw,3rem);
  gap: 1rem;
`;

const BackButton = styled.button`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${C.muted};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.2s ease;

  &:hover { color: ${C.text}; }
  svg { width: 12px; height: 12px; }
`;

const DetailBarTitle = styled.span`
  font-family: var(--font-cormorant);
  font-size: 1.15rem;
  font-weight: 400;
  color: ${C.text};
  letter-spacing: 0.02em;
  flex: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailBarSpacer = styled.div`
  flex-shrink: 0;
  min-width: 80px;
`;

const DetailHeader = styled.div`
  padding: clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,3rem) clamp(2rem,4vw,3rem);
  max-width: 760px;
  border-bottom: 1px solid ${C.border};
  margin-bottom: 0;
`;

const DetailTitle = styled.h2`
  font-family: var(--font-cormorant);
  font-size: clamp(3rem,7vw,5.5rem);
  font-weight: 300;
  color: ${C.text};
  letter-spacing: -0.03em;
  line-height: 0.9;
  margin: 0 0 1.25rem;
`;

const DetailDesc = styled.p`
  font-family: var(--font-montserrat);
  font-size: 0.85rem;
  color: ${C.muted};
  font-weight: 300;
  line-height: 1.8;
  margin: 0;
  max-width: 520px;
`;

const FullWidthImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111;
`;

const ImageGap = styled.div`
  height: 3px;
  background: ${C.bg};
`;

const DetailFooterBar = styled.div`
  padding: clamp(2rem,4vw,3rem) clamp(1.5rem,4vw,3rem);
  border-top: 1px solid ${C.border};
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function UXUIDesignPage() {
  const { t, locale } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<UXUIProject | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const openProject = useCallback((project: UXUIProject) => {
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (selectedProject && detailRef.current) {
      detailRef.current.scrollTop = 0;
    }
  }, [selectedProject]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) closeProject();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedProject, closeProject]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const getDesc = (p: UXUIProject) =>
    locale === 'es' ? p.descriptionEs : p.descriptionEn;

  const images = (p: UXUIProject) =>
    Array.from({ length: p.imageCount }, (_, i) => ({
      src: `/images/uxuidesign/${p.id}/img${i + 1}.webp`,
      alt: `${p.id} — ${i + 1}`,
    }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus({ type: 'success', msg: t('forms.success') });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        setFormStatus({ type: 'error', msg: t('forms.error') });
      }
    } catch {
      setFormStatus({ type: 'error', msg: t('forms.failed') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const Arrow = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1L2 6l6 5" />
    </svg>
  );

  return (
    <Page>
      {/* ── Nav ────────────────────────────────────────────── */}
      <PageNav>
        <NavLogo href="/">camilalonart</NavLogo>
        <NavBack href="/">
          <Arrow />
          {t('common.backToHome')}
        </NavBack>
        <LanguageSwitcher />
      </PageNav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <Hero>
        <HeroCenter>
          <HeroEyebrow>{t('uxui.heroEyebrow')}</HeroEyebrow>
          <HeroTitle>
            UX /&thinsp;<em>UI</em>
            <br />
            Design.
          </HeroTitle>
          <HeroTagline>{t('uxui.heroSubtitle')}</HeroTagline>
        </HeroCenter>
        <HeroBottom>
          <HeroCount>
            {uxuiProjects.length.toString().padStart(2, '0')}&nbsp;{t('uxui.projectsTitle')}
          </HeroCount>
          <ScrollHint>Scroll ↓</ScrollHint>
        </HeroBottom>
      </Hero>

      {/* ── Projects ───────────────────────────────────────── */}
      <WorkSection>
        <SectionLabel>{t('uxui.projectsTitle')}</SectionLabel>
        <ProjectGrid>
          {uxuiProjects.map((project, idx) => {
            const desc = getDesc(project);
            return (
              <ProjectItem
                key={project.id}
                onClick={() => openProject(project)}
                aria-label={`${t('uxui.viewProject')} — ${project.id}`}
              >
                <ProjectThumbWrap>
                  <ProjectThumb>
                    <SecureImage
                      src={`/images/uxuidesign/${project.id}/thumbnail.webp`}
                      alt={project.id}
                      fill
                      objectFit="cover"
                      showWatermark={false}
                      sizes="(max-width:640px) 100vw, 50vw"
                    />
                  </ProjectThumb>
                  <ProjectOverlay>
                    <OverlayLabel>{t('uxui.viewProject')}&nbsp;→</OverlayLabel>
                  </ProjectOverlay>
                </ProjectThumbWrap>
                <ProjectMeta>
                  <ProjectNumber>
                    {(idx + 1).toString().padStart(2, '0')}
                  </ProjectNumber>
                  <ProjectName>{project.id}</ProjectName>
                  {desc && <ProjectDesc>{desc}</ProjectDesc>}
                </ProjectMeta>
              </ProjectItem>
            );
          })}
        </ProjectGrid>
      </WorkSection>

      {/* ── Contact ────────────────────────────────────────── */}
      <ContactSection>
        <ContactGrid>
          <ContactLeft>
            <SectionLabel>{t('uxui.projectsTitle').slice(0,0)}Contact</SectionLabel>
            <ContactHeading>
              {t('uxui.contactTitle').split(' ').slice(0, 3).join(' ')}
              <br />
              <em>{t('uxui.contactTitle').split(' ').slice(3).join(' ')}</em>
            </ContactHeading>
            <ContactSub>{t('uxui.contactSubtitle')}</ContactSub>
          </ContactLeft>

          <ContactRight>
            {formStatus && (
              <FormMsg $type={formStatus.type}>{formStatus.msg}</FormMsg>
            )}
            <form onSubmit={handleSubmit}>
              <FormField>
                <FieldLabel htmlFor="ux-name">{t('forms.fullName')}</FieldLabel>
                <FieldInput
                  id="ux-name" name="name" type="text"
                  value={formData.name} onChange={handleChange}
                  required disabled={isSubmitting}
                  placeholder="Your name"
                />
              </FormField>
              <FormField>
                <FieldLabel htmlFor="ux-email">{t('forms.email')}</FieldLabel>
                <FieldInput
                  id="ux-email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  required disabled={isSubmitting}
                  placeholder="your@email.com"
                />
              </FormField>
              <FormField>
                <FieldLabel htmlFor="ux-message">{t('forms.message')}</FieldLabel>
                <FieldTextarea
                  id="ux-message" name="message"
                  value={formData.message} onChange={handleChange}
                  required disabled={isSubmitting}
                  placeholder={t('forms.message')}
                />
              </FormField>
              <SendButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('forms.submitting') : t('forms.submit')}
              </SendButton>
            </form>
          </ContactRight>
        </ContactGrid>
      </ContactSection>

      {/* ── Footer ─────────────────────────────────────────── */}
      <PageFooter>
        <FooterNote>© {new Date().getFullYear()} Camila Londoño</FooterNote>
        <FooterLink
          href="https://instagram.com/camilalonart"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </FooterLink>
      </PageFooter>

      {/* ── Detail overlay ─────────────────────────────────── */}
      <DetailOverlay
        $visible={!!selectedProject}
        ref={detailRef}
        role="dialog"
        aria-modal="true"
        aria-label={selectedProject?.id}
      >
        {selectedProject && (
          <>
            <DetailTopBar>
              <BackButton onClick={closeProject} aria-label={t('uxui.back')}>
                <Arrow />
                {t('uxui.back')}
              </BackButton>
              <DetailBarTitle>{selectedProject.id}</DetailBarTitle>
              <DetailBarSpacer />
            </DetailTopBar>

            <DetailHeader>
              <DetailTitle>{selectedProject.id}</DetailTitle>
              {getDesc(selectedProject) && (
                <DetailDesc>{getDesc(selectedProject)}</DetailDesc>
              )}
            </DetailHeader>

            {images(selectedProject).map((img, idx) => (
              <React.Fragment key={img.src}>
                {idx > 0 && <ImageGap />}
                <FullWidthImageWrap>
                  <SecureImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={idx === 0}
                    objectFit="contain"
                    showWatermark={false}
                    sizes="100vw"
                    quality={90}
                  />
                </FullWidthImageWrap>
              </React.Fragment>
            ))}

            <DetailFooterBar>
              <BackButton onClick={closeProject}>
                <Arrow />
                {t('uxui.back')}
              </BackButton>
            </DetailFooterBar>
          </>
        )}
      </DetailOverlay>
    </Page>
  );
}
