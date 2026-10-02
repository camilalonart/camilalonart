'use client';

import styled from 'styled-components';
import LanguageSwitcher from './LanguageSwitcher';

const Position = styled.div`
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 1000;
  padding: 4px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 12px #0002;
  & > div > div { top: auto; bottom: calc(100% + 8px); left: 0; right: auto; }
  body:has([role="dialog"][aria-modal="true"]) & { visibility: hidden; }
`;

export default function FloatingLanguageSwitcher() {
  return <Position data-page-language-switcher><LanguageSwitcher /></Position>;
}