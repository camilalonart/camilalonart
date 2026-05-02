'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import data, { COLLECTIONS_ORDER, earlyFirstPaintings_COLLECTIONS_ORDER } from '../../data/artPortfolio';
import ArtNav from './ArtNav';
import { useTranslation } from '../../i18n/TranslationContext';

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: '#080808',
  surface: '#101010',
  border: '#1E1E1E',
  gold: '#C8A87A',
  goldLight: '#E5D4B3',
  text: '#F0EDE8',
  muted: '#6E6B65',
  dim: '#3A3835',
};

// ─── Page ────────────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  background: ${C.bg};
  color: ${C.text};
  min-height: 100vh;
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  -webkit-font-smoothing: antialiased;
  * { box-sizing: border-box; }
`;

const PageHeader = styled.section`
  padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vw, 3rem);
  border-bottom: 1px solid ${C.border};
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.text};
  line-height: 1;
  margin: 0 0 1rem;
`;

const PageSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-style: italic;
  font-weight: 300;
  color: ${C.muted};
  letter-spacing: 0.04em;
  margin: 0 auto;
  max-width: 580px;
  line-height: 1.8;
`;

// ─── Toolbar (sticky) ─────────────────────────────────────────────────────────
const Toolbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(8, 8, 8, 0.97);
  backdrop-filter: blur(12px);
  padding: 1rem clamp(1.5rem, 5vw, 5rem);
  border-bottom: 1px solid ${C.border};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 140px;
  max-width: 260px;
  background: transparent;
  border: 1px solid ${C.border};
  color: ${C.text};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.15em;
  padding: 0.5rem 0.75rem;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder { color: ${C.dim}; }
  &:focus { border-color: ${C.gold}; }
`;

const Divider = styled.div`
  width: 1px;
  height: 1.2rem;
  background: ${C.border};
  flex-shrink: 0;
  @media (max-width: 600px) { display: none; }
`;

const NativeSelect = styled.select`
  background: ${C.surface};
  border: 1px solid ${C.border};
  color: ${C.text};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  padding: 0.5rem 0.6rem;
  cursor: pointer;
  flex-shrink: 0;
  outline: none;
  transition: border-color 0.2s;

  option {
    background: #181818;
    color: ${C.text};
  }

  &:focus, &:hover {
    border-color: ${C.gold};
  }
`;

const Count = styled.span`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  color: ${C.gold};
  margin-left: auto;
  white-space: nowrap;
  flex-shrink: 0;
`;

// ─── Gallery ─────────────────────────────────────────────────────────────────
const GalleryContainer = styled.section`
  padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem);
`;

const CollectionGroup = styled.div`
  margin-bottom: clamp(3rem, 6vw, 5rem);
`;

const CollectionGroupTitle = styled.h2`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  font-weight: 400;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${C.border};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MasonryGrid = styled.div`
  columns: 4 280px;
  column-gap: 2px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) { columns: 3 240px; }
  @media (max-width: 768px) { columns: 2 180px; }
  @media (max-width: 500px) { columns: 1; }
`;

const GalleryCard = styled(Link)`
  break-inside: avoid;
  margin-bottom: 2px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: block;
  text-decoration: none;
  background: ${C.surface};

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  &:hover img { transform: scale(1.05); }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 55%, transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const GalleryCardHover = styled(GalleryCard)`
  &:hover ${CardOverlay} { opacity: 1; }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${C.text};
  margin: 0 0 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  color: ${C.muted};
  font-style: italic;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
`;

const PageFooter = styled.footer`
  border-top: 1px solid ${C.border};
  padding: 2rem clamp(1.5rem, 5vw, 5rem);
  text-align: center;
`;

const FooterText = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0;
`;

const FooterGold = styled.span`
  color: ${C.gold};
`;

// ─── Data helpers ─────────────────────────────────────────────────────────────
interface PaintingEntry {
  id: string;
  title: string;
  year: number;
  materials: string;
  image: string;
  collectionId: string;
  collectionName: string;
  paintingId: string;
  collectionIndex: number;
}

function buildEntries(): PaintingEntry[] {
  const entries: PaintingEntry[] = [];
  data.collections.forEach(col => {
    const idx = COLLECTIONS_ORDER.indexOf(col.id);
    col.paintings.forEach(p => {
      entries.push({
        id: p.id,
        title: p.title,
        year: p.year,
        materials: p.materials,
        image: p.images[0],
        collectionId: col.id,
        collectionName: col.name,
        paintingId: p.id,
        collectionIndex: idx === -1 ? 999 : idx,
      });
    });
  });

  data.earlyFirstPaintings.forEach(col => {
    const idx = earlyFirstPaintings_COLLECTIONS_ORDER.findIndex(s => s.toLowerCase() === col.id.toLowerCase());
    col.paintings.forEach(p => {
      entries.push({
        id: p.id,
        title: p.title,
        year: p.year,
        materials: p.materials,
        image: p.images[0],
        collectionId: col.id,
        collectionName: col.name,
        paintingId: p.id,
        collectionIndex: idx === -1 ? 999 : idx,
      });
    });
  });

  return entries;
}

function categorizeMaterial(materials: string): string {
  const m = materials.toLowerCase();
  if (m.includes('digital')) return 'digital';
  if (m.includes('oil')) return 'oil';
  if (m.includes('watercolor')) return 'watercolor';
  if (m.includes('mixed')) return 'mixed';
  if (m.includes('pastel')) return 'pastels';
  if (m.includes('pen') || m.includes('ink') || m.includes('graphite') || m.includes('charcoal') || m.includes('pencil')) return 'pen';
  return 'other';
}

// ─── Multi-select dropdown ────────────────────────────────────────────────────
const DropdownWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const DropdownTrigger = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? 'rgba(200,168,122,0.12)' : C.surface)};
  border: 1px solid ${({ $active }) => ($active ? C.gold : C.border)};
  color: ${({ $active }) => ($active ? C.gold : C.text)};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  outline: none;

  &:hover {
    border-color: ${C.gold};
    color: ${C.gold};
  }
`;

const DropdownChevron = styled.span<{ $open: boolean }>`
  display: inline-block;
  transition: transform 0.2s;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 0.6rem;
  line-height: 1;
`;

const DropdownBadge = styled.span`
  background: ${C.gold};
  color: ${C.bg};
  font-size: 0.4rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  min-width: 1.2em;
  text-align: center;
`;

const DropdownMenu = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 200;
  background: #141414;
  border: 1px solid ${C.border};
  min-width: 160px;
  max-height: 260px;
  overflow-y: auto;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
`;

const DropdownItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.85rem;
  cursor: pointer;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  color: ${C.text};
  transition: background 0.15s, color 0.15s;
  user-select: none;

  &:hover { background: rgba(200,168,122,0.08); color: ${C.goldLight}; }

  input[type='checkbox'] {
    appearance: none;
    width: 12px;
    height: 12px;
    border: 1px solid ${C.border};
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    transition: border-color 0.15s, background 0.15s;

    &:checked {
      background: ${C.gold};
      border-color: ${C.gold};
    }

    &:checked::after {
      content: '';
      position: absolute;
      left: 2px;
      top: -1px;
      width: 5px;
      height: 8px;
      border: 1.5px solid ${C.bg};
      border-top: none;
      border-left: none;
      transform: rotate(45deg);
    }
  }
`;

interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}

function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open, close]);

  function toggle(value: string) {
    const next = new Set(selected);
    if (next.has(value)) next.delete(value); else next.add(value);
    onChange(next);
  }

  const activeCount = selected.size;

  return (
    <DropdownWrapper ref={wrapperRef}>
      <DropdownTrigger $active={activeCount > 0} onClick={() => setOpen(o => !o)} type="button">
        {label}
        {activeCount > 0 && <DropdownBadge>{activeCount}</DropdownBadge>}
        <DropdownChevron $open={open}>▾</DropdownChevron>
      </DropdownTrigger>
      <DropdownMenu $open={open}>
        {options.map(opt => (
          <DropdownItem key={opt.value}>
            <input
              type="checkbox"
              checked={selected.has(opt.value)}
              onChange={() => toggle(opt.value)}
            />
            {opt.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
}

const MEDIUM_OPTIONS = [
  { value: 'oil', label: 'Oil' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'digital', label: 'Digital' },
  { value: 'mixed', label: 'Mixed media' },
  { value: 'pastels', label: 'Pastels' },
  { value: 'pen', label: 'Pen & Ink' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function AllPaintingsPage() {
  const allEntriesRef = useRef<PaintingEntry[] | null>(null);
  if (!allEntriesRef.current) allEntriesRef.current = buildEntries();
  const allEntries = allEntriesRef.current;

  const allYears = useRef<number[] | null>(null);
  if (!allYears.current) {
    allYears.current = Array.from(new Set(allEntries.map(p => p.year))).sort((a, b) => b - a);
  }
  const years = allYears.current;

  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedMediums, setSelectedMediums] = useState<Set<string>>(new Set());
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState('newest');

  // Compute filtered inline — no useMemo so there's no stale-closure risk
  let filtered = allEntries.filter(p => {
    if (selectedMediums.size > 0 && !selectedMediums.has(categorizeMaterial(p.materials))) return false;
    if (selectedYears.size > 0 && !selectedYears.has(String(p.year))) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.materials.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  if (sort === 'newest') {
    filtered = [...filtered].sort((a, b) => b.year - a.year || a.collectionIndex - b.collectionIndex);
  } else if (sort === 'oldest') {
    filtered = [...filtered].sort((a, b) => a.year - b.year || a.collectionIndex - b.collectionIndex);
  } else {
    filtered = [...filtered].sort((a, b) => a.collectionIndex - b.collectionIndex);
  }

  // Build collection groups when sort=collection
  type Group = { id: string; name: string; items: PaintingEntry[] };
  let groups: Group[] | null = null;
  if (sort === 'collection') {
    const seen = new Set<string>();
    const order: string[] = [];
    filtered.forEach(p => {
      if (!seen.has(p.collectionId)) { seen.add(p.collectionId); order.push(p.collectionId); }
    });
    groups = order.map(id => ({
      id,
      name: filtered.find(p => p.collectionId === id)!.collectionName,
      items: filtered.filter(p => p.collectionId === id),
    }));
  }

  return (
    <PageWrapper>
      <ArtNav />
      <PageHeader>
        <PageTitle>{t('nav.allPaintings')}</PageTitle>
        <PageSubtitle>{t('art.allPaintingsSubtitle')}</PageSubtitle>
      </PageHeader>

      <Toolbar>
        <SearchInput
          type="search"
          placeholder={t('art.searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Divider />

        <MultiSelect
          label={t('art.allMedia')}
          options={MEDIUM_OPTIONS}
          selected={selectedMediums}
          onChange={setSelectedMediums}
        />

        <MultiSelect
          label={t('art.allYears')}
          options={years.map(y => ({ value: String(y), label: String(y) }))}
          selected={selectedYears}
          onChange={setSelectedYears}
        />

        <Divider />

        <NativeSelect value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">{t('art.newestFirst')}</option>
          <option value="oldest">{t('art.oldestFirst')}</option>
          <option value="collection">{t('art.byCollection')}</option>
        </NativeSelect>

        <Count>{filtered.length} {filtered.length === 1 ? t('art.work') : t('art.works')}</Count>
      </Toolbar>

      <GalleryContainer>
        {filtered.length === 0 && (
          <EmptyState>{t('art.noResults')}</EmptyState>
        )}

        {sort === 'collection' && groups ? (
          groups.map(group => (
            <CollectionGroup key={group.id}>
              <CollectionGroupTitle>
                {group.id === 'early-first-paintings' ? t('art.earlyPaintings') : group.name}
                <span style={{ color: C.dim }}>{group.items.length}</span>
              </CollectionGroupTitle>
              <MasonryGrid>
                {group.items.map(p => <PaintingCard key={p.id} painting={p} />)}
              </MasonryGrid>
            </CollectionGroup>
          ))
        ) : (
          <MasonryGrid>
            {filtered.map(p => <PaintingCard key={p.id} painting={p} />)}
          </MasonryGrid>
        )}
      </GalleryContainer>

      <PageFooter>
        <FooterText>
          © {new Date().getFullYear()} <FooterGold>Camila Londoño</FooterGold>. {t('art.allRightsReserved')}
        </FooterText>
      </PageFooter>
    </PageWrapper>
  );
}

function PaintingCard({ painting }: { painting: PaintingEntry }) {
  return (
    <GalleryCardHover
      href={`/art/${painting.collectionId}/${painting.paintingId}`}
      aria-label={`View ${painting.title}, ${painting.year}`}
    >
      <img
        src={painting.image}
        alt={`${painting.title} — ${painting.materials}, ${painting.year}`}
        loading="lazy"
        draggable={false}
        onContextMenu={e => e.preventDefault()}
      />
      <CardOverlay>
        <CardTitle>{painting.title}</CardTitle>
        <CardMeta>{painting.year}</CardMeta>
      </CardOverlay>
    </GalleryCardHover>
  );
}
