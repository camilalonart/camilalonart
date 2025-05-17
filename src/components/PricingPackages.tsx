import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface Feature {
  name: string;
  included: boolean;
}

interface Package {
  id: number;
  name: string;
  price: string;
  description: string;
  features: Feature[];
  popular?: boolean;
  buttonText?: string;
}

interface PricingPackagesProps {
  packages: Package[];
  service: string;
  dark?: boolean;
}

const PricingSection = styled.section<{ dark: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.main};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
`;

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.lg};
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const PackageCard = styled.div<{ popular?: boolean }>`
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${props =>
    props.popular ? theme.shadows.lg : theme.shadows.md};
  position: relative;
  transition: ${theme.transitions.default};
  
  ${props =>
    props.popular &&
    `
    transform: scale(1.05);
    border: 2px solid ${theme.colors.primary.main};
    
    @media (max-width: ${theme.breakpoints.md}) {
      transform: scale(1);
    }
  `}
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const PackageHeader = styled.div`
  text-align: center;
  padding-bottom: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.background.light};
  
  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary.main};
  }
  
  .price {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    margin-bottom: ${theme.spacing.sm};
  }
  
  .description {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.base};
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: ${theme.spacing['2xl']};
`;

const FeatureItem = styled.li<{ included: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} 0;
  color: ${props =>
    props.included
      ? theme.colors.text.primary
      : theme.colors.text.secondary};
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props =>
      props.included
        ? theme.colors.accent.success
        : theme.colors.text.secondary};
  }
`;

const PackageButton = styled.button<{ popular?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${props =>
    props.popular ? theme.colors.primary.main : 'transparent'};
  color: ${props =>
    props.popular ? theme.colors.text.light : theme.colors.primary.main};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.text.light};
  }
`;

export default function PricingPackages({
  packages,
  service,
  dark = false
}: PricingPackagesProps) {
  return (
    <PricingSection dark={dark}>
      <PricingHeader>
        <h2>Choose Your Package</h2>
        <p>
          Select the perfect {service} package that suits your needs and
          budget.
        </p>
      </PricingHeader>

      <PackagesGrid>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} popular={pkg.popular}>
            {pkg.popular && <PopularBadge>Most Popular</PopularBadge>}
            <PackageHeader>
              <h3>{pkg.name}</h3>
              <div className="price">{pkg.price}</div>
              <p className="description">{pkg.description}</p>
            </PackageHeader>

            <FeaturesList>
              {pkg.features.map((feature, index) => (
                <FeatureItem key={index} included={feature.included}>
                  {feature.included ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  {feature.name}
                </FeatureItem>
              ))}
            </FeaturesList>

            <PackageButton popular={pkg.popular}>
              {pkg.buttonText || 'Get Started'}
            </PackageButton>
          </PackageCard>
        ))}
      </PackagesGrid>
    </PricingSection>
  );
} 