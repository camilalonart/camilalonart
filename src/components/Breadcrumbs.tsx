import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface BreadcrumbsProps {
  dark?: boolean;
  customCrumbs?: { label: string; path: string }[];
}

const BreadcrumbsContainer = styled.nav<{ dark: boolean }>`
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
  }
`;

const BreadcrumbsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &:last-child {
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.primary.main};
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.primary.main};
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
    opacity: 0.5;
  }
`;

const formatPathSegment = (segment: string) => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Breadcrumbs({
  dark = false,
  customCrumbs,
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname?.split('/').filter(Boolean) || [];

  const crumbs = customCrumbs || segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    return {
      label: formatPathSegment(segment),
      path,
    };
  });

  if (crumbs.length === 0) return null;

  return (
    <BreadcrumbsContainer dark={dark}>
      <BreadcrumbsList>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </BreadcrumbItem>
        
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.path}>
            {index === crumbs.length - 1 ? (
              <span>{crumb.label}</span>
            ) : (
              <>
                <Link href={crumb.path}>{crumb.label}</Link>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbsList>
    </BreadcrumbsContainer>
  );
} 