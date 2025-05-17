import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
  dark?: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button<{ dark: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: transparent;
  border: 2px solid ${props =>
    props.dark ? theme.colors.background.light : theme.colors.background.dark};
  border-radius: ${theme.borderRadius.md};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.base};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${props =>
      props.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }
  
  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

const Dropdown = styled.div<{ dark: boolean; visible: boolean }>`
  position: absolute;
  top: calc(100% + ${theme.spacing.sm});
  right: 0;
  min-width: 200px;
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.visible ? 0 : '-10px')});
  transition: all 0.2s ease;
  z-index: 1000;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${theme.spacing.sm};
`;

const ListItem = styled.li<{ dark: boolean; selected: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
  cursor: pointer;
  transition: ${theme.transitions.default};
  border-radius: ${theme.borderRadius.sm};
  background-color: ${props =>
    props.selected
      ? props.dark
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.05)'
      : 'transparent'};
  
  &:hover {
    background-color: ${props =>
      props.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  .flag {
    font-size: 1.2em;
  }
  
  .name {
    flex: 1;
  }
  
  svg {
    width: 16px;
    height: 16px;
    opacity: ${props => (props.selected ? 1 : 0)};
  }
`;

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  dark = false,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (code: string) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef}>
      <Button
        dark={dark}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flag">{currentLang.flag}</span>
        <span className="name">{currentLang.name}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Button>

      <Dropdown dark={dark} visible={isOpen}>
        <List>
          {languages.map(lang => (
            <ListItem
              key={lang.code}
              dark={dark}
              selected={lang.code === currentLanguage}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="name">{lang.name}</span>
              {lang.code === currentLanguage && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </ListItem>
          ))}
        </List>
      </Dropdown>
    </Container>
  );
} 