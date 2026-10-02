'use client';

import React from 'react';
import { jsonLdScript } from '@/lib/seo';

interface JsonLdProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 * This helps search engines understand the content better
 */
export default function JsonLd({ data }: JsonLdProps) {
  const jsonLd = jsonLdScript(data);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

/**
 * Server component version for use in layout/page files
 */
export function JsonLdScript({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
