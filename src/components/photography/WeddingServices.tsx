'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '@/i18n/TranslationContext';

export interface WeddingService {
  title: string;
  price: string;
  description: string;
  features: string[];
  action: string;
  package: string;
}

const Section = styled.section`
  background: #faf7f4;
  font-weight: 400;
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  scroll-margin-top: 5rem;
`;

const Inner = styled.div`
  max-width: 1280px;
  margin-inline: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    color: #623b46;
    font-family: var(--font-cormorant), serif;
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    text-transform: none;
  }

  p {
    max-width: 42ch;
    margin: 0;
    color: #655951;
    font-size: 0.9rem;
    line-height: 1.6;
    letter-spacing: 0;
  }

  @media (max-width: 639px) {
    flex-direction: column;
    align-items: start;
  }
`;

const ServiceList = styled.ul`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(100% - 1.5rem);
  gap: 1rem;
  margin: 0;
  padding: 0 0 0.75rem;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: #b79a8d #eee4de;

  &:focus-visible {
    outline: 2px solid #623b46;
    outline-offset: 5px;
  }

  @media (min-width: 640px) {
    grid-auto-columns: calc((100% - 1rem) / 2);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-flow: row;
    grid-auto-columns: auto;
    overflow: visible;
    padding-bottom: 0;
  }
`;

const Item = styled.li`
  min-width: 0;
  display: flex;
  scroll-snap-align: start;
`;

const Card = styled.article`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: clamp(1.1rem, 2vw, 1.5rem);
  border: 1px solid #e3d6cf;
  border-radius: 12px;
  background: #fffdfb;
  box-shadow: 0 3px 12px #49302b05;
  color: #514641;
  letter-spacing: 0;

  .service-number {
    color: #94735e;
    font: 500 0.75rem var(--font-montserrat), sans-serif;
    letter-spacing: 0.14em;
    margin-bottom: 0.7rem;
  }

  h3 {
    margin: 0 0 0.7rem;
    font-family: var(--font-cormorant), serif;
    font-size: clamp(1.6rem, 2vw, 1.85rem);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;
    text-transform: none;
    color: #623b46;
  }

  .service-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.3rem 0.5rem;
    margin: 0 0 1rem;
    line-height: 1.4;

    span { font-size: 0.78rem; color: #74635a; }
    strong { font-size: 1.35rem; font-weight: 500; color: #623b46; }
  }

  .service-description {
    margin: 0 0 1rem;
    font-size: 0.88rem;
    line-height: 1.65;
    font-weight: 400;
  }

  ul {
    list-style: none;
    padding: 1rem 0 0;
    margin: 0 0 1.25rem;
    border-top: 1px solid #eee4de;
  }

  li {
    position: relative;
    padding-left: 1rem;
    font-size: 0.82rem;
    line-height: 1.55;
    margin-bottom: 0.55rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #9b715d;
    }
    &:last-child { margin-bottom: 0; }
  }
`;

const InquiryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  min-height: 46px;
  margin-top: auto;
  padding: 0.75rem 0.9rem;
  border: 1px solid #623b46;
  border-radius: 6px;
  color: #fffdfb;
  background: #623b46;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-align: left;
  transition: background 0.2s;

  &:hover { background: #4d2d36; }
  &:focus-visible { outline: 3px solid #94735e; outline-offset: 3px; }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.5rem;
  color: #655951;

  p { margin: 0; font-size: 0.78rem; line-height: 1.5; letter-spacing: 0; }
  .service-navigation { display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0; }
  .service-range { min-width: 4.5rem; text-align: center; font-size: 0.75rem; font-variant-numeric: tabular-nums; }

  @media (min-width: 1100px) { display: none; }
`;

const Arrow = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid #c8b5aa;
  border-radius: 50%;
  background: #fffdfb;
  color: #623b46;
  font-size: 1.25rem;
  line-height: 1;

  &:hover:not(:disabled) { background: #eee4de; }
  &:disabled { opacity: 0.35; cursor: default; }
`;

export default function WeddingServices({ services, onInquire }: {
  services: WeddingService[];
  onInquire: (packageName: string) => void;
}) {
  const { t } = useTranslation();
  const listRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ start: 0, end: 1, atStart: true, atEnd: false, scrollable: false });

  const updatePosition = useCallback(() => {
    const list = listRef.current;
    const first = list?.firstElementChild;
    if (!list || !(first instanceof HTMLElement)) return;
    const width = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const start = Math.max(0, Math.min(services.length - 1, Math.round(list.scrollLeft / (width + gap))));
    const visible = Math.max(1, Math.round(list.clientWidth / width));
    const next = {
      start,
      end: Math.min(services.length, start + visible),
      atStart: list.scrollLeft <= 2,
      atEnd: list.scrollLeft >= list.scrollWidth - list.clientWidth - 2,
      scrollable: list.scrollWidth > list.clientWidth + 2,
    };
    setPosition(current => current.start === next.start && current.end === next.end
      && current.atStart === next.atStart && current.atEnd === next.atEnd
      && current.scrollable === next.scrollable ? current : next);
  }, [services.length]);

  useEffect(() => {
    updatePosition();
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(updatePosition);
    observer.observe(list);
    return () => observer.disconnect();
  }, [updatePosition]);

  const move = (direction: number) => {
    const list = listRef.current;
    const first = list?.firstElementChild;
    if (!list || !(first instanceof HTMLElement)) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    list.scrollBy({
      left: direction * (first.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const rangeLabel = t('weddingServices.range')
    .replace('{start}', String(position.start + 1))
    .replace('{end}', String(position.end))
    .replace('{total}', String(services.length));

  return (
    <Section id="services" aria-labelledby="wedding-services-heading">
      <Inner>
        <Header>
          <h2 id="wedding-services-heading">{t('photography.wedding.services.heading')}</h2>
          <p>{t('weddingServices.intro')}</p>
        </Header>
        <ServiceList
          ref={listRef}
          id="wedding-service-list"
          aria-label={t('photography.wedding.services.heading')}
          tabIndex={position.scrollable ? 0 : -1}
          onScroll={updatePosition}
          onKeyDown={event => {
            if (event.target !== event.currentTarget || !position.scrollable) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              move(event.key === 'ArrowLeft' ? -1 : 1);
            } else if (event.key === 'Home' || event.key === 'End') {
              event.preventDefault();
              event.currentTarget.scrollTo({ left: event.key === 'Home' ? 0 : event.currentTarget.scrollWidth, behavior: 'auto' });
            }
          }}
        >
          {services.map((service, index) => (
            <Item key={service.package}>
              <Card>
                <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p className="service-price"><span>{t('photography.wedding.services.startingAt')}</span><strong>{service.price}</strong></p>
                <p className="service-description">{service.description}</p>
                <ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
                <InquiryButton
                  type="button"
                  onClick={() => onInquire(service.package)}
                  aria-label={t('weddingServices.inquire').replace('{service}', service.title)}
                >
                  <span>{service.action}</span><span aria-hidden="true">↗</span>
                </InquiryButton>
              </Card>
            </Item>
          ))}
        </ServiceList>
        <Controls>
          <p>{t('weddingServices.swipeHint')}</p>
          <div className="service-navigation">
            <Arrow type="button" disabled={!position.scrollable || position.atStart} onClick={() => move(-1)} aria-label={t('weddingServices.previous')} aria-controls="wedding-service-list">←</Arrow>
            <span className="service-range" aria-live="polite" aria-label={rangeLabel}>{position.start + 1}{position.end > position.start + 1 ? `–${position.end}` : ''} / {services.length}</span>
            <Arrow type="button" disabled={!position.scrollable || position.atEnd} onClick={() => move(1)} aria-label={t('weddingServices.next')} aria-controls="wedding-service-list">→</Arrow>
          </div>
        </Controls>
      </Inner>
    </Section>
  );
}
