# New Portfolio Section Page

Create a new portfolio section page for camilalonart.com following the exact project conventions.

## What to ask first (if not provided)
- Section name (e.g. "Family Maternity", "Headshots")
- URL path (e.g. `/photography/family-maternity`)
- Palette identity from CLAUDE.md (pick the matching row or define custom colors)
- Primary font: Cormorant / Poppins / Montserrat
- Does it need a dark layout wrapper? (dark sections need `src/app/<path>/layout.tsx`)

## Files to create or edit

### 1. `src/app/<path>/page.tsx`
Use `'use client'` directive. Structure:

```tsx
'use client';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { theme } from '@/styles/theme';
import { useTranslation } from '@/i18n/TranslationContext';
import SecureImage from '@/components/SecureImage';
// Import the correct nav for this section

// ── Palette ──────────────────────────────────────────────
const C = {
  bg: '<section bg>',
  surface: '<card/section bg>',
  accent: '<accent color>',
  text: '<primary text>',
  muted: '<muted text>',
  border: '<border color>',
};

// ── Animations ────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Styled Components ─────────────────────────────────────
const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-color: ${C.bg};
`;

const Hero = styled.section`
  position: relative;
  height: 85vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
    z-index: 1;
  }
`;

const HeroImageContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: clamp(1rem, 4vw, 3rem);
  animation: ${fadeUp} 1.1s ease both;
  animation-delay: 0.2s;
`;

const Section = styled.section<{ $bgColor?: string }>`
  padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.$bgColor || 'transparent'};
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  color: ${C.text};
  font-family: <chosen font>;
  letter-spacing: 0.15em;
  text-align: center;
  margin-bottom: 1rem;
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: ${C.accent};
    margin: 0.75rem auto 0;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  @media (max-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${theme.breakpoints.md}) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: ${C.surface};
  border: 1px solid ${C.border};
  border-radius: 4px;
  padding: ${theme.spacing.xl};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }
`;

export default function <SectionName>Page() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {/* Nav */}
      <Hero>
        <HeroImageContainer>
          <SecureImage
            src="/images/<section>/hero.webp"
            alt="<Section> hero"
            fill
            priority
            showWatermark={false}
            sizes="100vw"
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>{t('<section>.hero.title')}</h1>
          <p>{t('<section>.hero.subtitle')}</p>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>{t('<section>.services.title')}</SectionTitle>
        <CardGrid>
          {/* service cards */}
        </CardGrid>
      </Section>

      {/* Footer */}
    </PageContainer>
  );
}
```

### 2. `src/app/<path>/layout.tsx` (only for dark sections)
```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '<bg-color>', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
```

### 3. Translation keys — add to BOTH files
- `src/i18n/locales/en.json`
- `src/i18n/locales/es.json`

Add under the correct namespace. Always add both languages at the same time.

### 4. Update navigation
Check which nav component this section uses and add the route if missing.

## Rules
- `$prefix` for all transient styled-component props (e.g. `$bgColor`, `$active`)
- `clamp()` for font sizes and padding — no hard-coded px for responsive values
- `SecureImage` for every image — never raw `<img>` or Next `Image` directly
- Only ONE image gets `priority` prop (the LCP hero)
- `useTranslation()` for all visible strings — no hardcoded English text in JSX
- Images must be `.webp` — run `npm run webp-convert` if adding raw JPGs
