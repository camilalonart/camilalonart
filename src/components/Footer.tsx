import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.background.dark};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing['3xl']} 0;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing['2xl']};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.primary.light};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: ${theme.spacing.md};
  }
  
  a {
    color: ${theme.colors.text.light};
    opacity: 0.8;
    transition: ${theme.transitions.default};
    
    &:hover {
      opacity: 1;
      color: ${theme.colors.primary.light};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  
  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${theme.colors.background.light};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.default};
    
    &:hover {
      background-color: ${theme.colors.primary.main};
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${theme.spacing['3xl']};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.background.light};
  color: ${theme.colors.text.light};
  opacity: 0.8;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About</h3>
          <p>
            Professional photographer and creative artist specializing in weddings,
            wildlife, portraits, and commercial photography. Based in [Location],
            available worldwide.
          </p>
          <SocialLinks>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" width="20" height="20" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook" width="20" height="20" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/linkedin.svg" alt="LinkedIn" width="20" height="20" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/github.svg" alt="GitHub" width="20" height="20" />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Photography</h3>
          <ul>
            <li><Link href="/photography/wedding-couples">Wedding & Couples</Link></li>
            <li><Link href="/photography/pets">Pet Photography</Link></li>
            <li><Link href="/photography/headshots">Professional Headshots</Link></li>
            <li><Link href="/photography/wildlife">Wildlife Photography</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Tech</h3>
          <ul>
            <li><Link href="/tech/engineering">Software Engineering</Link></li>
            <li><Link href="/tech/cloud">Cloud Architecture</Link></li>
            <li><Link href="/tech/writing">Technical Writing</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Creative Services</h3>
          <ul>
            <li><Link href="/creative-services/brand-identity">Brand Identity</Link></li>
            <li><Link href="/creative-services/editorial">Editorial</Link></li>
            <li><Link href="/creative-services/commercial">Commercial</Link></li>
            <li><Link href="/creative-services/art-prints">Art Prints</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>My Art</h3>
          <ul>
            <li><Link href="/my-art/digital-art">Digital Art</Link></li>
            <li><Link href="/my-art/traditional-art">Traditional Art</Link></li>
            <li><Link href="/my-art/everyday-photography">Photography</Link></li>
            <li><Link href="/my-art/blog">Blog</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact</h3>
          <ul>
            <li>Email: contact@camilonart.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Location: Vancouver, BC, Canada</li>
          </ul>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} Camilalonart. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
} 