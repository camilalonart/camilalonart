import type { Locale } from './routing';

export interface PageMetadataText {
  title: string;
  description: string;
  canonical?: string;
}

export type MetadataCatalog = Record<string, Record<Locale, PageMetadataText>>;
