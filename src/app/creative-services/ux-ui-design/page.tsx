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
  dark:        '#0A0A0A',
  light:       '#F4F4F0',
  white:       '#FFFFFF',
  text:        '#0A0A0A',
  textLight:   '#FAFAFA',
  muted:       '#888888',
  mutedDark:   'rgba(250,250,250,0.38)',
  accent:      '#C8F135',   // electric lime
  border:      'rgba(0,0,0,0.1)',
  borderDark:  'rgba(255,255,255,0.1)',
};

// ── Keyframes ─────────────────────────────────────────────────────────────────
const marqueeAnim = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ── NAV ───────────────────────────────────────────────────────────────────────
const PageNav = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.25rem,3.5vw,2.5rem);
  height: 56px;
  background: ${C.dark};
  border-bottom: 1px solid ${C.borderDark};
`;

const NavLogo = styled(Link)`
  font-family: var(--font-montserrat);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${C.textLight};
  transition: color 0.2s;
  &:hover { color: ${C.accent}; }
`;

const NavTag = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${C.accent};
  border: 1px solid ${C.accent};
  padding: 0.25rem 0.65rem;
  border-radius: 2px;

  @media (max-width: 520px) { display: none; }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

// ── HERO ──────────────────────────────────────────────────────────────────────
const Hero = styled.section`
  background: ${C.dark};
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 56px;
`;

const HeroContent = styled.div`
  padding: clamp(3rem,6vw,5rem) clamp(1.25rem,3.5vw,2.5rem) 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: clamp(2rem,4vw,3rem);
  animation: ${fadeUp} 0.9s ease both;
`;

const HeroLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Dot = styled.span`
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${C.accent};
`;

const HeroEyebrow = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${C.mutedDark};
`;

const HeroTitle = styled.h1`
  font-family: var(--font-montserrat);
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 700;
  color: ${C.textLight};
  line-height: 0.88;
  letter-spacing: -0.04em;
  margin: 0;

  span {
    color: ${C.accent};
  }
`;

const HeroSub = styled.p`
  font-family: var(--font-montserrat);
  font-size: clamp(0.82rem,1.3vw,0.95rem);
  font-weight: 300;
  color: ${C.mutedDark};
  max-width: 380px;
  line-height: 1.8;
  margin: 0;
`;

// ── MARQUEE ───────────────────────────────────────────────────────────────────
const MarqueeWrap = styled.div`
  overflow: hidden;
  border-top: 1px solid ${C.borderDark};
  padding: 1rem 0;
  margin-top: clamp(2rem,4vw,3rem);
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marqueeAnim} 22s linear infinite;
  gap: 0;
`;

const MarqueeItem = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.mutedDark};
  white-space: nowrap;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  &::after {
    content: '·';
    color: ${C.accent};
    font-size: 1rem;
  }
`;

// ── STATS BAR ─────────────────────────────────────────────────────────────────
const StatsBar = styled.div`
  display: flex;
  border-top: 1px solid ${C.borderDark};
`;

const StatItem = styled.div`
  flex: 1;
  padding: 1.25rem clamp(1.25rem,3.5vw,2.5rem);
  border-right: 1px solid ${C.borderDark};

  &:last-child { border-right: none; }

  @media (max-width: 480px) {
    &:nth-child(3) { display: none; }
  }
`;

const StatNum = styled.div`
  font-family: var(--font-montserrat);
  font-size: clamp(1.4rem,2.5vw,2rem);
  font-weight: 700;
  color: ${C.textLight};
  line-height: 1;
  margin-bottom: 0.2rem;
`;

const StatLabel = styled.div`
  font-family: var(--font-montserrat);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${C.mutedDark};
`;

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const WorkSection = styled.section`
  background: ${C.light};
`;

const WorkHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: clamp(2.5rem,5vw,4rem) clamp(1.25rem,3.5vw,2.5rem) clamp(1.5rem,3vw,2.5rem);
  border-bottom: 1px solid ${C.border};
`;

const WorkTitle = styled.h2`
  font-family: var(--font-montserrat);
  font-size: clamp(1.5rem,3vw,2.2rem);
  font-weight: 700;
  color: ${C.text};
  letter-spacing: -0.02em;
  margin: 0;
`;

const WorkCount = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.muted};
`;

const ProjectRow = styled.button`
  all: unset;
  display: grid;
  grid-template-columns: 3rem 1fr auto auto;
  align-items: center;
  gap: clamp(1rem,2.5vw,2rem);
  width: 100%;
  padding: clamp(1.25rem,2.5vw,2rem) clamp(1.25rem,3.5vw,2.5rem);
  border-bottom: 1px solid ${C.border};
  cursor: pointer;
  background: transparent;
  transition: background 0.35s ease, padding-left 0.35s ease;
  box-sizing: border-box;

  &:hover {
    background: ${C.dark};
    padding-left: calc(clamp(1.25rem,3.5vw,2.5rem) + 0.5rem);
  }

  &:hover .prow-num   { color: ${C.accent}; }
  &:hover .prow-name  { color: ${C.textLight}; }
  &:hover .prow-tags  { color: ${C.mutedDark}; }
  &:hover .prow-arrow { color: ${C.accent}; transform: translateX(6px); }
  &:hover .prow-thumb { opacity: 1; }

  &:focus-visible { outline: 2px solid ${C.accent}; outline-offset: -2px; }

  @media (max-width: 600px) {
    grid-template-columns: 2.5rem 1fr auto;
  }
`;

const PRowNum = styled.span.attrs({ className: 'prow-num' })`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: ${C.muted};
  transition: color 0.3s ease;
`;

const PRowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const PRowName = styled.span.attrs({ className: 'prow-name' })`
  font-family: var(--font-cormorant);
  font-size: clamp(1.6rem,3.5vw,2.8rem);
  font-weight: 400;
  color: ${C.text};
  letter-spacing: -0.02em;
  line-height: 1;
  transition: color 0.3s ease;
`;

const PRowTags = styled.span.attrs({ className: 'prow-tags' })`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 400;
  color: ${C.muted};
  letter-spacing: 0.04em;
  transition: color 0.3s ease;
`;

const PRowThumb = styled.div.attrs({ className: 'prow-thumb' })`
  position: relative;
  width: clamp(80px,10vw,120px);
  aspect-ratio: 4/3;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.35s ease, transform 0.35s ease;
  flex-shrink: 0;

  @media (max-width: 600px) { display: none; }
`;

const PRowArrow = styled.span.attrs({ className: 'prow-arrow' })`
  font-size: clamp(1.2rem,2vw,1.6rem);
  color: ${C.muted};
  transition: transform 0.3s ease, color 0.3s ease;
  line-height: 1;
  flex-shrink: 0;
`;

// ── CONTACT ───────────────────────────────────────────────────────────────────
const ContactSection = styled.section`
  background: ${C.white};
  padding: clamp(4rem,8vw,7rem) clamp(1.25rem,3.5vw,2.5rem);
`;

const ContactInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem,6vw,7rem);
  align-items: start;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ContactLeft = styled.div``;

const ContactTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ContactHeading = styled.h2`
  font-family: var(--font-montserrat);
  font-size: clamp(2.2rem,5vw,3.8rem);
  font-weight: 700;
  color: ${C.text};
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 1.25rem;
`;

const ContactSub = styled.p`
  font-family: var(--font-montserrat);
  font-size: 0.85rem;
  font-weight: 300;
  color: ${C.muted};
  line-height: 1.8;
  margin: 0;
  max-width: 320px;
`;

const ContactRight = styled.div`
  padding-top: 0.5rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
`;

const FieldLabel = styled.label`
  font-family: var(--font-montserrat);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.muted};
`;

const underlineBase = css`
  background: transparent;
  border: none;
  border-bottom: 1.5px solid ${C.border};
  border-radius: 0;
  padding: 0.55rem 0;
  color: ${C.text};
  font-family: var(--font-montserrat);
  font-size: 0.95rem;
  font-weight: 300;
  width: 100%;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder { color: rgba(0,0,0,0.18); }
  &:focus { border-bottom-color: ${C.text}; }
  @media (max-width: 600px) { font-size: 16px; }
`;

const FieldInput    = styled.input`${underlineBase}`;
const FieldTextarea = styled.textarea`${underlineBase} min-height:110px; resize:none;`;

const SendButton = styled.button`
  font-family: var(--font-montserrat);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.dark};
  background: ${C.accent};
  border: none;
  padding: 0.9rem 2rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover:not(:disabled) { opacity: 0.82; transform: translateY(-1px); }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const FormMsg = styled.div<{ $type: 'success' | 'error' }>`
  margin-bottom: 1.25rem;
  padding: 0.75rem 0 0.75rem 0.85rem;
  border-left: 2px solid ${p => p.$type === 'success' ? '#22c55e' : '#ef4444'};
  color: ${p => p.$type === 'success' ? '#16a34a' : '#dc2626'};
  font-family: var(--font-montserrat);
  font-size: 0.8rem;
  font-weight: 300;
`;

// ── FOOTER ────────────────────────────────────────────────────────────────────
const PageFooter = styled.footer`
  background: ${C.dark};
  border-top: 1px solid ${C.borderDark};
  padding: 1.5rem clamp(1.25rem,3.5vw,2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 480px) { flex-direction: column; align-items: flex-start; }
`;

const FooterNote = styled.span`
  font-family: var(--font-montserrat);
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: ${C.mutedDark};
`;

const FooterLink = styled.a`
  font-family: var(--font-montserrat);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${C.mutedDark};
  transition: color 0.2s;
  &:hover { color: ${C.accent}; }
`;

// ── DETAIL OVERLAY ────────────────────────────────────────────────────────────
const DetailOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  background: ${C.dark};
  z-index: 1100;
  overflow-y: auto;
  display: ${p => (p.$visible ? 'block' : 'none')};
  animation: ${fadeIn} 0.25s ease;
`;

const DetailTopBar = styled.div`
  position: sticky;
  top: 0; z-index: 10;
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${C.borderDark};
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 clamp(1.25rem,3.5vw,2.5rem);
  gap: 1rem;
`;

const BackBtn = styled.button`
  font-family: var(--font-montserrat);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${C.mutedDark};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.2s ease;

  &:hover { color: ${C.accent}; }
`;

const DetailBarTitle = styled.span`
  font-family: var(--font-cormorant);
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(250,250,250,0.65);
  flex: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailBarSpacer = styled.div`min-width: 80px; flex-shrink: 0;`;

const DetailHeader = styled.div`
  padding: clamp(3rem,6vw,5rem) clamp(1.25rem,3.5vw,2.5rem) clamp(2rem,4vw,3rem);
  max-width: 900px;
  border-bottom: 1px solid ${C.borderDark};
`;

const DetailTitle = styled.h2`
  font-family: var(--font-montserrat);
  font-size: clamp(2.8rem,7vw,6rem);
  font-weight: 700;
  color: ${C.textLight};
  letter-spacing: -0.03em;
  line-height: 0.92;
  margin: 0 0 1.25rem;
`;

const DetailDesc = styled.p`
  font-family: var(--font-montserrat);
  font-size: 0.88rem;
  color: ${C.mutedDark};
  font-weight: 300;
  line-height: 1.8;
  margin: 0;
  max-width: 540px;
`;

const FullWidthWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111;
`;

const ImageGap = styled.div`height: 3px; background: ${C.dark};`;

const DetailFootBar = styled.div`
  padding: clamp(2rem,4vw,3rem) clamp(1.25rem,3.5vw,2.5rem);
  border-top: 1px solid ${C.borderDark};
`;

// ── MARQUEE DATA ──────────────────────────────────────────────────────────────
const TICKER = [
  'UX Design', 'UI Design', 'Product Design',
  'Branding', 'Mobile', 'Interface', 'Figma',
  'Prototyping', 'User Research',
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function UXUIDesignPage() {
  const { t, locale } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<UXUIProject | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const openProject = useCallback((p: UXUIProject) => setSelectedProject(p), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (selectedProject && detailRef.current) detailRef.current.scrollTop = 0;
  }, [selectedProject]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && selectedProject) closeProject(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [selectedProject, closeProject]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const getDesc = (p: UXUIProject) => locale === 'es' ? p.descriptionEs : p.descriptionEn;

  const getImages = (p: UXUIProject) =>
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

  const projectTags = (p: UXUIProject) => {
    if (p.id === 'Cleverlynk') return 'Logo · Branding · UX/UI · Acquired by Rappi';
    if (p.id === 'Alfred')     return 'Product Screens · Colombian Company';
    return 'UX/UI Design';
  };

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <PageNav>
        <NavLogo href="/">camilalonart</NavLogo>
        <LanguageSwitcher isDark />
      </PageNav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <Hero>
        <HeroContent>
          <HeroLabel>
            <Dot />
            <HeroEyebrow>{t('uxui.heroEyebrow')}</HeroEyebrow>
          </HeroLabel>
          <HeroTitle>
            UX &amp;&nbsp;<span>UI</span>
            <br />
            Design
          </HeroTitle>
          <HeroSub>{t('uxui.heroSubtitle')}</HeroSub>
        </HeroContent>

        {/* Marquee ticker */}
        <MarqueeWrap>
          <MarqueeTrack aria-hidden="true">
            {[...TICKER, ...TICKER].map((tag, i) => (
              <MarqueeItem key={i}>{tag}</MarqueeItem>
            ))}
          </MarqueeTrack>
        </MarqueeWrap>

        {/* Stats bar */}
        <StatsBar>
          <StatItem>
            <StatNum>{uxuiProjects.length.toString().padStart(2, '0')}</StatNum>
            <StatLabel>{t('uxui.projectsTitle')}</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>01</StatNum>
            <StatLabel>Unicorn Acquisition</StatLabel>
          </StatItem>
          <StatItem>
            <StatNum>YVR</StatNum>
            <StatLabel>Vancouver, Canada</StatLabel>
          </StatItem>
        </StatsBar>
      </Hero>

      {/* ── PROJECTS ────────────────────────────────────────── */}
      <WorkSection>
        <WorkHeader>
          <WorkTitle>Selected Work</WorkTitle>
          <WorkCount>
            {uxuiProjects.length.toString().padStart(2, '0')} {t('uxui.projectsTitle')}
          </WorkCount>
        </WorkHeader>

        {uxuiProjects.map((project, idx) => (
          <ProjectRow
            key={project.id}
            onClick={() => openProject(project)}
            aria-label={`${t('uxui.viewProject')} — ${project.id}`}
          >
            <PRowNum>{(idx + 1).toString().padStart(2, '0')}</PRowNum>
            <PRowInfo>
              <PRowName>{project.id}</PRowName>
              <PRowTags>{projectTags(project)}</PRowTags>
            </PRowInfo>
            <PRowThumb>
              <SecureImage
                src={`/images/uxuidesign/${project.id}/thumbnail.webp`}
                alt={project.id}
                fill
                objectFit="cover"
                showWatermark={false}
                sizes="120px"
              />
            </PRowThumb>
            <PRowArrow>→</PRowArrow>
          </ProjectRow>
        ))}
      </WorkSection>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <ContactSection>
        <ContactInner>
          <ContactLeft>
            <ContactTag>
              <Dot style={{ background: C.accent }} />
              <span style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: C.muted,
              }}>
                Contact
              </span>
            </ContactTag>
            <ContactHeading>
              {t('uxui.contactTitle')}
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
                <FieldLabel htmlFor="ux-msg">{t('forms.message')}</FieldLabel>
                <FieldTextarea
                  id="ux-msg" name="message"
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
        </ContactInner>
      </ContactSection>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <PageFooter>
        <FooterNote>© {new Date().getFullYear()} Camila Londoño</FooterNote>
        <FooterLink href="https://instagram.com/camilalonart" target="_blank" rel="noopener noreferrer">
          @camilalonart
        </FooterLink>
      </PageFooter>

      {/* ── DETAIL OVERLAY ──────────────────────────────────── */}
      <DetailOverlay
        $visible={!!selectedProject}
        ref={detailRef}
        role="dialog"
        aria-modal="true"
      >
        {selectedProject && (
          <>
            <DetailTopBar>
              <BackBtn onClick={closeProject} aria-label={t('uxui.back')}>
                ← {t('uxui.back')}
              </BackBtn>
              <DetailBarTitle>{selectedProject.id}</DetailBarTitle>
              <DetailBarSpacer />
            </DetailTopBar>

            <DetailHeader>
              <DetailTitle>{selectedProject.id}</DetailTitle>
              {getDesc(selectedProject) && (
                <DetailDesc>{getDesc(selectedProject)}</DetailDesc>
              )}
            </DetailHeader>

            {getImages(selectedProject).map((img, idx) => (
              <React.Fragment key={img.src}>
                {idx > 0 && <ImageGap />}
                <FullWidthWrap>
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
                </FullWidthWrap>
              </React.Fragment>
            ))}

            <DetailFootBar>
              <BackBtn onClick={closeProject}>
                ← {t('uxui.back')}
              </BackBtn>
            </DetailFootBar>
          </>
        )}
      </DetailOverlay>
    </>
  );
}
