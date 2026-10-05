'use client';

import styled from 'styled-components';
import Link from '@/i18n/LocalizedLink';
import { useTranslation } from '@/i18n/TranslationContext';
import { SITE_CONFIG } from '@/lib/seo';
import { serviceGuides, serviceGuideLabels, type ServiceGuideId } from '@/data/serviceGuides';

interface GuidePalette {
  background: string;
  text: string;
  muted: string;
  accent: string;
  buttonText: string;
  border: string;
  heading: string;
}

const serif = "var(--font-cormorant), Georgia, serif";
const sans = "var(--font-montserrat), Arial, sans-serif";
const playful = "var(--font-poppins), Arial, sans-serif";

const palettes: Record<ServiceGuideId, GuidePalette> = {
  pets: { background: '#f5ece2', text: '#33271f', muted: '#665044', accent: '#91472e', buttonText: '#ffffff', border: '#d8c3b3', heading: playful },
  family: { background: '#f8f5ed', text: '#303c32', muted: '#526152', accent: '#465b46', buttonText: '#ffffff', border: '#ccd3c4', heading: serif },
  headshots: { background: '#202020', text: '#ffffff', muted: '#d2d2d2', accent: '#ffffff', buttonText: '#202020', border: '#575757', heading: sans },
  wedding: { background: '#faf7f4', text: '#422b32', muted: '#71535c', accent: '#71334a', buttonText: '#ffffff', border: '#d9c4c6', heading: serif },
  ux: { background: '#0a0a0a', text: '#f4f4f0', muted: '#c4c4bd', accent: '#c8f135', buttonText: '#0a0a0a', border: '#4b4b46', heading: sans },
  experiences: { background: '#fff9ef', text: '#334863', muted: '#536078', accent: '#315789', buttonText: '#ffffff', border: '#cbd5df', heading: playful },
  collector: { background: '#080808', text: '#f4eee5', muted: '#c9bfb0', accent: '#c8a87a', buttonText: '#080808', border: '#514839', heading: serif },
  wildlife: { background: '#101612', text: '#f0f2eb', muted: '#bdc9ba', accent: '#d4dfc9', buttonText: '#101612', border: '#475344', heading: serif },
};

const Section = styled.section<{ $palette: GuidePalette }>`
  --guide-background: ${({ $palette }) => $palette.background};
  --guide-text: ${({ $palette }) => $palette.text};
  --guide-muted: ${({ $palette }) => $palette.muted};
  --guide-accent: ${({ $palette }) => $palette.accent};
  --guide-border: ${({ $palette }) => $palette.border};
  box-sizing: border-box;
  width: 100%;
  padding: clamp(2.5rem, 5vw, 4.5rem) clamp(1rem, 4vw, 3rem);
  background: var(--guide-background);
  color: var(--guide-text);
  font-family: var(--font-poppins), Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  text-align: left;
  overflow-wrap: anywhere;
  scroll-margin-top: 6rem;

  *, *::before, *::after { box-sizing: border-box; }
  && h2, && h3 {
    color: var(--guide-text);
    font-family: ${({ $palette }) => $palette.heading};
    font-style: normal;
    text-transform: none;
    letter-spacing: normal;
    text-align: left;
    padding: 0;
    margin: 0;
  }
  && h2 {
    max-width: 26ch;
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    font-weight: 500;
    line-height: 1.15;
  }
  && h3 { font-size: 1.125rem; font-weight: 600; line-height: 1.35; }
  && p { margin: 0; color: var(--guide-muted); font-size: 0.9375rem; line-height: 1.7; }
  && a:focus-visible, && summary:focus-visible {
    outline: 3px solid var(--guide-accent);
    outline-offset: 5px;
  }
`;

const Inner = styled.div`
  max-width: 1080px;
  margin-inline: auto;
`;

const Eyebrow = styled.div`
  color: var(--guide-accent);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.875rem;
`;

const Intro = styled.div`
  max-width: 65ch;
  margin-top: 1rem;
`;

const Steps = styled.ol`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;

  li { border-top: 1px solid var(--guide-border); padding-top: 1rem; min-width: 0; }
  span { display: block; color: var(--guide-accent); font-size: 0.875rem; margin-bottom: 0.5rem; }
  && p { margin-top: 0.5rem; }

  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 1.25rem; }
`;

const Questions = styled.div`
  border-bottom: 1px solid var(--guide-border);
  details { border-top: 1px solid var(--guide-border); }
  summary {
    padding: 1rem 0.25rem;
    color: var(--guide-text);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
  }
  summary::marker { color: var(--guide-accent); }
  && details p { padding: 0 0.25rem 1.25rem; max-width: 80ch; }
`;

const Actions = styled.div<{ $buttonText: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 1.75rem;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    max-width: 100%;
    color: var(--guide-accent);
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.5;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  a[data-inquiry] {
    padding: 0.85rem 1.25rem;
    background: var(--guide-accent);
    color: ${({ $buttonText }) => $buttonText};
    border: 1px solid var(--guide-accent);
    text-decoration: none;
  }
  a:hover { text-decoration: underline; }
`;

const EmailNote = styled.div`
  margin-top: 0.875rem;
  && p { font-size: 0.875rem; }
`;

export default function ServiceGuide({ service }: { service: ServiceGuideId }) {
  const { locale } = useTranslation();
  const copy = serviceGuides[service][locale];
  const labels = serviceGuideLabels[locale];
  const palette = palettes[service];
  const headingId = `service-guide-${service}`;
  const emailHref = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(copy.prompts.join('\n\n'))}`;

  return (
    <Section $palette={palette} aria-labelledby={headingId}>
      <Inner>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2 id={headingId}>{copy.title}</h2>
        <Intro><p>{copy.intro}</p></Intro>
        <Steps>
          {copy.steps.map((step, index) => (
            <li key={index}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </Steps>
        <Questions role="group" aria-label={labels.questions}>
          {copy.questions.map((question, index) => (
            <details key={index}>
              <summary>{question.title}</summary>
              <p>{question.text}</p>
            </details>
          ))}
        </Questions>
        <Actions $buttonText={palette.buttonText}>
          <a data-inquiry href={emailHref}>{copy.action}</a>
          {copy.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </Actions>
        <EmailNote><p>{labels.emailNote}</p></EmailNote>
      </Inner>
    </Section>
  );
}
