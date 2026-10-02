export type Locale = 'en' | 'es';

export function localeFromPath(path: string): Locale {
  return /^\/es(?:\/|[?#]|$)/.test(path) ? 'es' : 'en';
}

export function stripLocale(path: string): string {
  const clean = path.replace(/^\/es(?=\/|[?#]|$)/, '');
  return !clean || /^[?#]/.test(clean) ? `/${clean}` : clean;
}

/** Localize site pages only; downloads, APIs, external links and fragments stay intact. */
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const clean = stripLocale(path);
  const pathname = clean.split(/[?#]/)[0];
  if (/^\/(?:api|_next|images|fonts|videos)(?:\/|$)/.test(pathname) || /\/[^/]+\.[^/]+$/.test(pathname)) return path;
  return locale === 'es' ? `/es${clean.startsWith('/') ? clean : `/${clean}`}` : clean;
}

export function routeKey(path: string): string {
  const clean = stripLocale(path).split(/[?#]/)[0].replace(/\/+$/, '');
  return clean || '/';
}
