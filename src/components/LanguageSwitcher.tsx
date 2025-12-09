'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../i18n/TranslationContext';
import { theme } from '../styles/theme';

const LanguageSwitcherContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

const IconButton = styled.button<{ $isOpen: boolean; $isDark?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: ${props => props.$isOpen 
    ? (props.$isDark ? 'rgba(255,255,255,0.1)' : theme.colors.background.light) 
    : 'transparent'};
  border: none;
  border-radius: 50%;
  color: ${props => props.$isDark ? theme.colors.text.light : theme.colors.primary.main};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$isDark ? 'rgba(255,255,255,0.15)' : theme.colors.background.light};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 140px;
  background: ${theme.colors.background.main};
  border-radius: 8px;
  box-shadow: ${theme.shadows.lg};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s ease;
  overflow: hidden;
  border: 1px solid ${theme.colors.border.light};
`;

const LanguageOption = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: ${props => props.$isActive ? theme.colors.background.light : 'transparent'};
  border: none;
  color: ${props => props.$isActive ? theme.colors.secondary.main : theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  font-family: ${theme.typography.fontFamily.primary};
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;

  &:hover {
    background: ${theme.colors.background.light};
    color: ${theme.colors.secondary.main};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.border.light};
  }
`;

const Flag = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

// Globe icon component
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

interface LanguageSwitcherProps {
  isDark?: boolean;
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    setLocale(code as 'en' | 'es');
    setIsOpen(false);
  };

  return (
    <LanguageSwitcherContainer ref={containerRef}>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        $isDark={isDark}
        aria-label="Change language"
        title="Change language"
      >
        <GlobeIcon />
      </IconButton>

      <Dropdown $isOpen={isOpen}>
        {languages.map(lang => (
          <LanguageOption
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            $isActive={lang.code === locale}
          >
            <Flag>{lang.flag}</Flag>
            <span>{lang.name}</span>
          </LanguageOption>
        ))}
      </Dropdown>
    </LanguageSwitcherContainer>
  );
}
