'use client';

import React from 'react';

export const AE = {
  cream: '#F5EFE0',
  paper: '#EDE5D0',
  parchment: '#E5D9C0',
  blue: '#4A72A8',
  blueDark: '#2D4F7A',
  blueLight: '#7FA4C7',
  blueTint: '#EBF1F7',
  ink: '#2C2416',
  warmBrown: '#8B7D6B',
  warmLight: '#B5A898',
} as const;

interface DoodleProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const StarSpark = ({ size = 18, color = AE.blue, style, className }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} aria-hidden="true">
    <path
      d="M12 2 L13.4 9.6 L21 12 L13.4 14.4 L12 22 L10.6 14.4 L3 12 L10.6 9.6 Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      fillOpacity="0.25"
    />
  </svg>
);

export const TinyStar = ({ size = 10, color = AE.blue, style, className }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style} className={className} aria-hidden="true">
    <path
      d="M8 1 L9 6 L14 8 L9 10 L8 15 L7 10 L2 8 L7 6 Z"
      fill={color}
      fillOpacity="0.5"
    />
  </svg>
);

export const SmallFlower = ({ size = 28, color = AE.blue, style, className }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style} className={className} aria-hidden="true">
    <ellipse cx="20" cy="12" rx="3.5" ry="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <ellipse cx="20" cy="12" rx="3.5" ry="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" transform="rotate(60 20 20)" />
    <ellipse cx="20" cy="12" rx="3.5" ry="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" transform="rotate(120 20 20)" />
    <ellipse cx="20" cy="12" rx="3.5" ry="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" transform="rotate(180 20 20)" />
    <ellipse cx="20" cy="12" rx="3.5" ry="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" transform="rotate(240 20 20)" />
    <ellipse cx="20" cy="12" rx="3.5" ry="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" transform="rotate(300 20 20)" />
    <circle cx="20" cy="20" r="4" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const WavyUnderline = ({ width = 80, color = AE.blue, style }: { width?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={width} height="10" viewBox={`0 0 ${width} 10`} fill="none" style={style} aria-hidden="true">
    <path
      d={`M0 5 Q${width * 0.08} 1 ${width * 0.16} 5 Q${width * 0.24} 9 ${width * 0.32} 5 Q${width * 0.4} 1 ${width * 0.48} 5 Q${width * 0.56} 9 ${width * 0.64} 5 Q${width * 0.72} 1 ${width * 0.8} 5 Q${width * 0.88} 9 ${width * 0.96} 5 Q${width * 1.0} 2 ${width} 5`}
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const PaletteDoodle = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path
      d="M22 6 C13 6 7 13 8 21 C9 28 14 33 21 34 C23 34 25 33 25 31.5 C25 30 26.5 29 29 29 C34 29 38 25 38 20 C38 13 30 6 22 6 Z"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="15" cy="19" r="2.5" fill={color} fillOpacity="0.7" />
    <circle cx="21" cy="14" r="2.5" fill={color} fillOpacity="0.7" />
    <circle cx="29" cy="17" r="2.5" fill={color} fillOpacity="0.7" />
    <circle cx="32" cy="25" r="2.5" fill={color} fillOpacity="0.7" />
  </svg>
);

export const BrushDoodle = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M10 36 C12 33 16 32 18 30 L32 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 12 L36 8 C38 7 39 9 38 11 L32 12 Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.1" />
    <path d="M10 36 C8 38 7 40 9 41 C11 42 13 40 14 38 L18 30 C15 31 12 34 10 36 Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.2" />
  </svg>
);

export const ConnectionDoodle = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="6" stroke={color} strokeWidth="2" />
    <circle cx="30" cy="14" r="6" stroke={color} strokeWidth="2" />
    <circle cx="22" cy="30" r="6" stroke={color} strokeWidth="2" />
    <path d="M20 14 H24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17 20 L20 26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M27 20 L24 26" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HeartDoodle = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path
      d="M22 36 C22 36 6 26 6 16 C6 11 10 7 15 7 C18 7 21 9 22 12 C23 9 26 7 29 7 C34 7 38 11 38 16 C38 26 22 36 22 36 Z"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill={color} fillOpacity="0.15"
    />
  </svg>
);

export const FreeDoodle = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path
      d="M10 34 C14 28 20 24 22 18 C24 12 22 8 26 6 C30 4 34 8 32 14 C30 20 24 22 26 28 C28 34 34 36 34 36"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
    <circle cx="12" cy="38" r="3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const PublicEventIcon = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M8 38 L8 20 L22 8 L36 20 L36 38 Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="17" y="26" width="10" height="12" rx="2" stroke={color} strokeWidth="2" />
    <rect x="10" y="22" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="26" y="22" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M14 12 L30 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
  </svg>
);

export const PrivateEventIcon = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M22 6 C16 6 12 10 12 16 C12 20 14 22 16 24 L8 38 L36 38 L28 24 C30 22 32 20 32 16 C32 10 28 6 22 6 Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 38 L26 38" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const CorporateEventIcon = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <rect x="6" y="14" width="32" height="22" rx="3" stroke={color} strokeWidth="2" />
    <path d="M15 14 L15 10 C15 8 17 7 18 7 L26 7 C27 7 29 8 29 10 L29 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="22" x2="38" y2="22" stroke={color} strokeWidth="1.5" />
    <circle cx="22" cy="22" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
  </svg>
);

export const WeddingEventIcon = ({ size = 44, color = AE.blue }: DoodleProps) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M22 38 L8 22 C6 18 8 12 14 10 C18 9 21 12 22 14 C23 12 26 9 30 10 C36 12 38 18 36 22 Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.12" />
    <circle cx="22" cy="10" r="4" stroke={color} strokeWidth="2" />
    <path d="M22 6 L22 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M18 8 L16 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M26 8 L28 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ScallopFrameCard = ({ color = AE.blue }: { color?: string }) => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Top scallop */}
    <path
      d="M4 4 Q7 1 10 4 Q13 7 16 4 Q19 1 22 4 Q25 7 28 4 Q31 1 34 4 Q37 7 40 4 Q43 1 46 4 Q49 7 52 4 Q55 1 58 4 Q61 7 64 4 Q67 1 70 4 Q73 7 76 4 Q79 1 82 4 Q85 7 88 4 Q91 1 94 4 Q97 7 100 4"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
    />
    {/* Bottom scallop */}
    <path
      d="M0 96 Q3 99 6 96 Q9 93 12 96 Q15 99 18 96 Q21 93 24 96 Q27 99 30 96 Q33 93 36 96 Q39 99 42 96 Q45 93 48 96 Q51 99 54 96 Q57 93 60 96 Q63 99 66 96 Q69 93 72 96 Q75 99 78 96 Q81 93 84 96 Q87 99 90 96 Q93 93 96 96 Q99 99 100 96"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
    />
  </svg>
);
