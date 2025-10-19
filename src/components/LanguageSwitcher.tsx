'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../i18n/TranslationContext';

const LanguageSwitcherContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

const LanguageButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${props => props.$isOpen ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

const Flag = styled.span`
  font-size: 20px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LanguageName = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const LanguageOption = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${props => props.$isActive ? 'rgba(169, 125, 30, 0.1)' : 'transparent'};
  border: none;
  color: ${props => props.$isActive ? '#A97D1E' : '#333'};
  font-size: 14px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(169, 125, 30, 0.08);
    color: #A97D1E;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const CheckIcon = styled.span<{ $visible: boolean }>`
  margin-left: auto;
  opacity: ${props => props.$visible ? 1 : 0};
  color: #A97D1E;
  font-size: 16px;
`;

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

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
      <LanguageButton
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        aria-label="Change language"
      >
        <Flag>{currentLanguage.flag}</Flag>
        <LanguageName>{currentLanguage.name}</LanguageName>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </LanguageButton>

      <Dropdown $isOpen={isOpen}>
        {languages.map(lang => (
          <LanguageOption
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            $isActive={lang.code === locale}
          >
            <Flag>{lang.flag}</Flag>
            <span>{lang.name}</span>
            <CheckIcon $visible={lang.code === locale}>✓</CheckIcon>
          </LanguageOption>
        ))}
      </Dropdown>
    </LanguageSwitcherContainer>
  );
}
