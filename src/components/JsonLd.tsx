'use client';

import React from 'react';

interface JsonLdProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 * This helps search engines understand the content better
 */
export default function JsonLd({ data }: JsonLdProps) {
  const jsonLd = JSON.stringify(data);
  
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
