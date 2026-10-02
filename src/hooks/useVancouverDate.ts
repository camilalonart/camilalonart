'use client';

import { useEffect, useState } from 'react';

export function vancouverDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(value => value.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function eventDateStatus(dateISO: string, today: string | null): 'unknown' | 'past' | 'upcoming' {
  if (today === null) return 'unknown';
  return dateISO < today ? 'past' : 'upcoming';
}

export function useVancouverDate(): string | null {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      const now = new Date();
      setToday(vancouverDate(now));
      clearTimeout(timer);
      // Vancouver midnight falls on a minute boundary, including DST transitions.
      timer = setTimeout(refresh, 60_000 - now.getTime() % 60_000 + 20);
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    refresh();
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return today;
}
