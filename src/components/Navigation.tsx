'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '../styles/theme';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n/TranslationContext';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.background.main};
  box-shadow: ${theme.shadows.sm};
  z-index: 1000;
  transition: all 0.3s ease;
  padding-top: env(safe-area-inset-top, 0);

  &.scrolled {
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    box-shadow: ${theme.shadows.md};
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.md} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.main};
  z-index: 1001;
  transition: transform 0.2s ease;
  padding: ${theme.spacing.xs} 0;

  &:hover {
    transform: scale(1.05);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.primary.main};
  cursor: pointer;
  z-index: 1001;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.2s ease;
  margin-right: -${theme.spacing.sm}; // Offset padding for better alignment

  &:hover {
    background-color: ${theme.colors.background.light};
    transform: scale(1.1);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    position: fixed;
    top: calc(60px + env(safe-area-inset-top, 0)); // Account for header height + safe area
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.background.main};
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: ${theme.spacing.xl};
    opacity: ${props => props.$isOpen ? 1 : 0};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transform: translateY(${props => props.$isOpen ? '0' : '-10px'});
    transition: all 0.3s ease;
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const NavItem = styled.div`
  position: relative;
  
  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const NavLink = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.base};
  color: ${props => props.$active ? theme.colors.primary.main : theme.colors.text.primary};
  font-weight: ${props => props.$active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular};
  cursor: pointer;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.primary.main};
    transition: all 0.2s ease;
    transform: translateX(-50%);
  }

  &:hover {
    color: ${theme.colors.primary.main};
    background-color: ${theme.colors.background.light};

    &:after {
      width: calc(100% - ${theme.spacing.lg});
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
    padding: ${theme.spacing.md} ${theme.spacing.xl};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${theme.spacing.xs});
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.md};
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;

  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background-color: ${theme.colors.background.main};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    position: static;
    transform: none;
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    padding: ${theme.spacing.md} 0;
    background: none;
    min-width: 100%;

    &:before {
      display: none;
    }
  }
`;

const DropdownLink = styled(Link)<{ $active: boolean }>`
  display: block;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  color: ${props => props.$active ? theme.colors.primary.main : theme.colors.text.primary};
  font-weight: ${props => props.$active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background-color: ${theme.colors.primary.main};
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: ${theme.colors.background.light};
    color: ${theme.colors.primary.main};
    padding-left: calc(${theme.spacing.lg} + 3px);

    &:before {
      transform: translateX(0);
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    
    &:before {
      display: none;
    }

    &:hover {
      padding-left: ${theme.spacing.xl};
    }
  }
`;

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navigation = [
    {
      title: t('nav.photographyServices'),
      href: '/photography',
      items: [
        { title: t('nav.headshots'), href: '/photography/headshots' },
        { title: t('nav.pets'), href: '/photography/pets' },
        { title: t('nav.wedding'), href: '/photography/wedding-couples' },
        { title: t('nav.family'), href: '/photography/family-maternity' }
      ]
    },
    {
      title: t('nav.myArt'),
      href: '/my-art',
      items: [
        { title: t('nav.digitalArt'), href: '/my-art/digital-art' },
        { title: t('nav.traditionalArt'), href: '/my-art/traditional-art' },
        { title: t('nav.wildlifePhotography'), href: '/my-art/wildlife-photography' },
        { title: t('nav.everydayPhotography'), href: '/my-art/everyday-photography' },
        { title: t('nav.blog'), href: '/my-art/blog' }
      ]
    },
    {
      title: t('nav.creativeServices'),
      href: '/creative-services',
      items: [
        { title: t('nav.brandIdentity'), href: '/creative-services/brand-identity' },
        { title: t('nav.graphicRecording'), href: '/creative-services/graphic-recording' },
        { title: t('nav.uxUiDesign'), href: '/creative-services/ux-ui-design' },
        { title: t('nav.artClasses'), href: '/creative-services/art-classes' }
      ]
    },
    {
      title: t('nav.tech'),
      href: '/tech',
      items: [
        { title: t('nav.softwareEngineering'), href: '/tech/engineering' },
        { title: t('nav.techCourses'), href: '/tech/courses' }
      ]
    }
  ];

  return (
    <Nav className={isScrolled ? 'scrolled' : ''}>
      <NavContent>
        <Logo href="/">Camilalonart</Logo>
        <RightSection>
          <LanguageSwitcher />
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </MenuButton>
        </RightSection>
        <NavLinks $isOpen={isMenuOpen}>
          {navigation.map((item) => (
            <NavItem key={item.href}>
              <NavLink
                $active={pathname?.startsWith(item.href)}
                onClick={() => item.items && setIsMenuOpen(false)}
              >
                
                {item.title}
              </NavLink>
              {item.items && (
                <Dropdown>
                  {item.items.map((subItem) => (
                    <DropdownLink
                      key={subItem.href}
                      href={subItem.href}
                      $active={pathname === subItem.href || false}
                    >
                      {subItem.title}
                    </DropdownLink>
                  ))}
                </Dropdown>
              )}
            </NavItem>
          ))}
        </NavLinks>
      </NavContent>
    </Nav>
  );
} 