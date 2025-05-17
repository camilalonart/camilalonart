import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  dark?: boolean;
}

const ShareContainer = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
`;

const ShareTitle = styled.h3<{ dark: boolean }>`
  font-size: ${theme.typography.fontSize.xl};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
  margin: 0;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

const ShareButton = styled.button<{ platform: string }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.light};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  ${props => {
    switch (props.platform) {
      case 'facebook':
        return `background-color: #1877f2;`;
      case 'twitter':
        return `background-color: #1da1f2;`;
      case 'linkedin':
        return `background-color: #0077b5;`;
      case 'pinterest':
        return `background-color: #e60023;`;
      default:
        return `background-color: ${theme.colors.primary.main};`;
    }
  }}
  
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const CopyButton = styled.button<{ copied: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${props =>
    props.copied ? theme.colors.accent.success : theme.colors.background.main};
  color: ${props =>
    props.copied ? theme.colors.text.light : theme.colors.text.primary};
  border: 2px solid ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${props =>
      props.copied ? theme.colors.accent.success : theme.colors.background.light};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function SocialShare({
  url,
  title,
  description = '',
  image = '',
  dark = false,
}: SocialShareProps) {
  const [copied, setCopied] = React.useState(false);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
      title
    )}`,
  };

  const handleShare = (platform: string) => {
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <ShareContainer dark={dark}>
      <ShareTitle dark={dark}>Share this content</ShareTitle>
      <ShareButtons>
        <ShareButton
          platform="facebook"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
          </svg>
          Facebook
        </ShareButton>

        <ShareButton
          platform="twitter"
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.58v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
          </svg>
          Twitter
        </ShareButton>

        <ShareButton
          platform="linkedin"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </ShareButton>

        {image && (
          <ShareButton
            platform="pinterest"
            onClick={() => handleShare('pinterest')}
            aria-label="Share on Pinterest"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
            </svg>
            Pinterest
          </ShareButton>
        )}

        <CopyButton onClick={handleCopy} copied={copied}>
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy Link
            </>
          )}
        </CopyButton>
      </ShareButtons>
    </ShareContainer>
  );
} 