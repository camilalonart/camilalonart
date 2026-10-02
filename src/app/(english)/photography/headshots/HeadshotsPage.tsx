'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import SecureImage from "@/components/SecureImage";
import Footer from "@/components/Footer";
import PhotographyNav from "@/components/PhotographyNav";
import { useTranslation } from '@/i18n/TranslationContext';
import { useDialog } from '@/hooks/useDialog';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLocalizedForm } from '@/hooks/useLocalizedForm';

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-color: rgb(26, 20, 15);
  color: #2C3E50;
`;

const Hero = styled.section`
  position: relative;
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 0 ${theme.spacing.xl};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
    padding: 0 ${theme.spacing.md};
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: left;
  color: white;
  max-width: 900px;
  margin-left: ${theme.spacing.xl};
  background-color: rgba(26, 20, 15, 0.85);
  padding: ${theme.spacing.lg};

  h1 {
    margin-bottom: ${theme.spacing.sm};
    font-size: clamp(2rem, 2.8vw, 2.8rem);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: 0.1em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-family: ${theme.typography.fontFamily.poppins};
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.6;
    font-weight: 400;
    max-width: 500px;
    margin: ${theme.spacing.sm} 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
    margin-left: 0;
    
    p {
      margin: ${theme.spacing.sm} auto;
    }
  }
`;

const HeroButton = styled.button`
  background: rgba(0, 0, 0, 1);
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${theme.spacing.md};
  border-radius: 10px;
  border: none;
  
  &:hover {
    background: rgba(59, 50, 30, 1);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${theme.spacing.md};
  overflow-y: auto;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgb(44, 62, 80);
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: rotate(90deg);
  }
`;

const HeroImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Section = styled.section<{ $bgColor?: string }>`
  padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem);
  background: ${props => props.$bgColor || 'transparent'};
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 2.8rem);
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 700;
  position: relative;
  font-family: ${theme.typography.fontFamily.poppins};
  letter-spacing: 0.2em;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: rgb(169, 125, 30);
    margin: ${theme.spacing.sm} auto 0;
  }
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
`;

const PortfolioItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const PortfolioOverlay = styled.div.attrs({ className: 'overlay' })`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.text.light};
`;

const ServicesSection = styled.div`
  padding: ${theme.spacing.md} 0;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.lg};
  }
`;

const ServiceCard = styled.div`
  background: white;
  padding: clamp(1rem, 3vw, 2rem);
  min-width: 0;
  box-shadow: ${theme.shadows.md};
  height: auto;
  min-height: 600px;
  width: 100%;
  transition: all 0.3s ease;
  text-align: center;
  border-radius: 10px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceCardTitle = styled.h3`
  font-size: 1.8rem;
  color: rgb(169, 125, 30);
  margin-bottom: ${theme.spacing.lg};
  font-weight: 600;
`;

const ServiceCardPrice = styled.div`
  font-size: 2.5rem;
  color: rgb(169, 125, 30);
  margin: ${theme.spacing.xl} 0;
  font-weight: 700;
`;

const ServiceCardFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.spacing.xl} 0;
  text-align: left;
  
  li {
    padding: ${theme.spacing.sm} 0;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    font-size: 1.1rem;
    
    &::before {
      content: '✓';
      color: rgb(169, 125, 30);
      font-weight: bold;
    }
  }
`;

const BookNowButton = styled.button`
  background: #87600E;
  color: white;
  padding: ${theme.spacing.lg} clamp(0.75rem, 2vw, 2rem);
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${theme.spacing.lg};
  border-radius: 10px;
  width: 100%;
  
  &:hover {
    transform: translateY(-3px);
    background: #71500B;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const FAQSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const FAQItem = styled.div`
  margin-bottom: ${theme.spacing.xl};
  
  h3 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    color: #ccc;
    line-height: 1.6;
  }
`;

// Headshots Inquiry Form Styles
const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 245, 0.98) 100%);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  :is(input, select, textarea) {
    width: 100%;
    min-width: 0;
    border-color: #80766B;
    color: #2C3E50;
  }

  input[type="radio"] { width: 18px; flex-shrink: 0; }

  input::placeholder, textarea::placeholder {
    color: #666;
    opacity: 1;
  }

  :is(input, select, textarea):focus-visible {
    outline: 2px solid #71500B;
    outline-offset: 3px;
  }

  :is(input, select, textarea)[aria-invalid="true"] {
    border-color: #A52B20;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  
  h3 {
    font-size: 1.8rem;
    color: rgb(44, 62, 80);
    margin-bottom: ${theme.spacing.sm};
    font-family: ${theme.typography.fontFamily.poppins};
  }
  
  p {
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  > fieldset {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 500;
  color: rgb(44, 62, 80);
  font-size: 0.95rem;
  
  span {
    color: rgb(169, 125, 30);
  }
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: rgb(169, 125, 30);
    box-shadow: 0 0 0 3px rgba(169, 125, 30, 0.15);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  
  &:focus {
    outline: none;
    border-color: rgb(169, 125, 30);
    box-shadow: 0 0 0 3px rgba(169, 125, 30, 0.15);
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: rgb(169, 125, 30);
    box-shadow: 0 0 0 3px rgba(169, 125, 30, 0.15);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button<{ $isSubmitting?: boolean }>`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${props => props.$isSubmitting ? '#666' : 'linear-gradient(135deg, #87600E 0%, #71500B 100%)'};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.$isSubmitting ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  
  &:hover {
    transform: ${props => props.$isSubmitting ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$isSubmitting ? 'none' : '0 10px 30px rgba(169, 125, 30, 0.4)'};
  }
`;

const StatusMessage = styled.div<{ $type: 'success' | 'error' }>`
  padding: ${theme.spacing.md};
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  background: ${({ $type }) => $type === 'success' 
    ? 'linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(39, 174, 96, 0.15) 100%)' 
    : 'linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(192, 57, 43, 0.15) 100%)'};
  color: ${({ $type }) => $type === 'success' ? '#196B3A' : '#A52B20'};
  border: 1px solid ${({ $type }) => $type === 'success' ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)'};
`;

const PackageOption = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${props => props.$selected ? 'rgb(169, 125, 30)' : '#e0e0e0'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$selected ? 'rgba(169, 125, 30, 0.08)' : 'white'};
  
  &:hover {
    border-color: rgb(169, 125, 30);
  }
  
  input {
    accent-color: rgb(169, 125, 30);
    width: 18px;
    height: 18px;
  }
  
  span {
    font-weight: 500;
    color: rgb(44, 62, 80);
  }
  
  small {
    color: #71500B;
    font-weight: 600;
    margin-left: auto;
  }
`;

const PackageSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export default function HeadshotsPage() {
  const { t, locale } = useTranslation();
  const h = (key: string) => t(`photographyContent.headshots.${key}`);
  const c = (key: string) => t(`photographyContent.common.${key}`);
  const inlineForm = useLocalizedForm();
  const modalForm = useLocalizedForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useDialog(isModalOpen, () => setIsModalOpen(false));
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_HEADSHOTS_ID;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    package: 'plain',
    preferredDate: '',
    preferredTime: '',
    purpose: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; messageKey: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, validate: () => boolean) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;
    if (!formspreeId) {
      setStatus({ type: 'error', messageKey: 'unavailable' });
      return;
    }
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, service: 'headshots' }),
      });
      if (!response.ok) throw new Error('Submission not accepted');
      
      setStatus({
        type: 'success',
        messageKey: 'success',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        package: 'plain',
        preferredDate: '',
        preferredTime: '',
        purpose: '',
        message: '',
      });
      
    } catch (error) {
      setStatus({
        type: 'error',
        messageKey: 'failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const emailLabels: Record<keyof typeof formData, string> = {
    name: h('name'), email: h('email'), phone: c('phone'), company: h('company'),
    package: h('selectPackage'), preferredDate: c('date'), preferredTime: h('time'),
    purpose: h('purpose'), message: h('details'),
  };
  const emailBody = Object.entries(formData).map(([field, value]) => {
    let displayValue = value;
    if (value && ['package', 'preferredTime', 'purpose'].includes(field)) {
      displayValue = value === 'other' ? c('other') : h(value);
    }
    if (field === 'preferredDate' && value) {
      displayValue = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
    }
    return `${emailLabels[field as keyof typeof formData]}: ${displayValue}`;
  }).join('\n');
  const emailFallback = (!formspreeId || status?.type === 'error') && (
    <p>
      {c('emailInquiry')}
      <a href={`mailto:bycamilalonart@gmail.com?subject=${encodeURIComponent(h('emailSubject'))}&body=${encodeURIComponent(emailBody)}`}>bycamilalonart@gmail.com</a>
    </p>
  );

  return (
    <PageContainer>
      <PhotographyNav />
      <Hero>
        <HeroImageContainer>
          <SecureImage
            src="/images/headshots/collagecopy.webp"
            alt={h('heroAlt')}
            priority
            quality={90}
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>{h('title')}</h1>
          <p>
            {h('hero')}
          </p>
          <HeroButton onClick={() => setIsModalOpen(true)}>
            {h('book')}
          </HeroButton>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>{c('portfolio')}</SectionTitle>
        <PortfolioGrid>
          {['A7T01707', 'A7T01710', 'A7T02159', 'A7T03166', 'A7T03675', 'A7T05969', 'A7T06722', 'A7T07393'].map((filename, index) => (
            <PortfolioItem key={filename}>
              <SecureImage
                src={`/images/headshots/${filename}.webp`}
                alt={`${h('portraitAlt')} ${index + 1}`}
                quality={90}
              />
              <PortfolioOverlay>
                <p>{h('portrait')}</p>
              </PortfolioOverlay>
            </PortfolioItem>
          ))}
        </PortfolioGrid>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)">
        <SectionTitle>{c('packages')}</SectionTitle>
        <ServicesSection>
          <ServiceCard>
            <ServiceCardTitle>{h('plain')}</ServiceCardTitle>
            <ServiceCardPrice>$300</ServiceCardPrice>
            <ServiceCardFeatures>
              <li>{h('duration')}</li>
              <li>{h('images')}</li>
              <li>{h('plainFeature')}</li>
              <li>{h('retouch')}</li>
              <li>{h('delivery')}</li>
              <li>{h('release')}</li>
            </ServiceCardFeatures>
            <BookNowButton onClick={scrollToContact}>
              {c('bookNow')}
            </BookNowButton>
          </ServiceCard>

          <ServiceCard>
            <ServiceCardTitle>{h('creative')}</ServiceCardTitle>
            <ServiceCardPrice>$200</ServiceCardPrice>
            <ServiceCardFeatures>
              <li>{h('duration')}</li>
              <li>{h('images')}</li>
              <li>{h('creativeFeature')}</li>
              <li>{h('retouch')}</li>
              <li>{h('delivery')}</li>
              <li>{h('release')}</li>
            </ServiceCardFeatures>
            <BookNowButton onClick={scrollToContact}>
              {c('bookNow')}
            </BookNowButton>
          </ServiceCard>
        </ServicesSection>
      </Section>

      <Section>
        <SectionTitle>{c('faq')}</SectionTitle>
        <FAQSection>
          <FAQItem>
            <h3>{h('faqDuration')}</h3>
            <p>{h('faqDurationAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{h('faqWear')}</h3>
            <p>{h('faqWearAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{h('faqDelivery')}</h3>
            <p>{h('faqDeliveryAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{h('faqUse')}</h3>
            <p>{h('faqUseAnswer')}</p>
          </FAQItem>
        </FAQSection>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)" id="contact-section">
        <FormContainer>
          <FormHeader>
            <h3>{h('formTitle')}</h3>
            <p>{h('formIntro')}</p>
          </FormHeader>

          {status && <StatusMessage role={status.type === 'error' ? 'alert' : 'status'} $type={status.type}>{c(status.messageKey)}</StatusMessage>}
          {emailFallback}

          <Form ref={inlineForm.formRef} onSubmit={event => handleSubmit(event, inlineForm.validate)} onInput={inlineForm.onInput} onInvalid={inlineForm.onInvalid} aria-busy={isSubmitting} noValidate>
            <fieldset disabled={isSubmitting} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="headshot-name">{h('name')} <span>*</span></Label>
                <Input
                  id="headshot-name"
                  autoComplete="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={h('namePlaceholder')}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="headshot-email">{h('email')} <span>*</span></Label>
                <Input
                  id="headshot-email"
                  autoComplete="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={h('emailPlaceholder')}
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="headshot-phone">{c('phone')} <span>*</span></Label>
                <Input
                  id="headshot-phone"
                  autoComplete="tel"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(672) 338 - 9307"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="headshot-company">{h('company')}</Label>
                <Input
                  id="headshot-company"
                  autoComplete="organization"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={h('companyPlaceholder')}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label as="div" id="headshot-package-label">{h('selectPackage')} <span>*</span></Label>
              <PackageSelector role="group" aria-labelledby="headshot-package-label">
                <PackageOption $selected={formData.package === 'plain'}>
                  <input
                    type="radio"
                    name="package"
                    value="plain"
                    checked={formData.package === 'plain'}
                    onChange={handleChange}
                  />
                  <span>{h('plain')}</span>
                  <small>$300</small>
                </PackageOption>
                <PackageOption $selected={formData.package === 'creative'}>
                  <input
                    type="radio"
                    name="package"
                    value="creative"
                    checked={formData.package === 'creative'}
                    onChange={handleChange}
                  />
                  <span>{h('creative')}</span>
                  <small>$200</small>
                </PackageOption>
              </PackageSelector>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="headshot-date">{c('date')} <span>*</span></Label>
                <Input
                  id="headshot-date"
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="headshot-time">{h('time')}</Label>
                <Select
                  id="headshot-time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >
                  <option value="">{h('selectTime')}</option>
                  <option value="morning">{h('morning')}</option>
                  <option value="afternoon">{h('afternoon')}</option>
                  <option value="evening">{h('evening')}</option>
                </Select>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="headshot-purpose">{h('purpose')}</Label>
              <Select
                id="headshot-purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
              >
                <option value="">{h('selectPurpose')}</option>
                <option value="linkedin">{h('linkedin')}</option>
                <option value="corporate">{h('corporate')}</option>
                <option value="acting">{h('acting')}</option>
                <option value="business">{h('business')}</option>
                <option value="personal">{h('personal')}</option>
                <option value="other">{c('other')}</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="headshot-message">{h('details')}</Label>
              <TextArea
                id="headshot-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={h('detailsPlaceholder')}
              />
            </FormGroup>

            </fieldset>
            <SubmitButton type="submit" $isSubmitting={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span>{c('sending')}</span>
                </>
              ) : (
                <>
                  <span>{h('book')}</span>
                </>
              )}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Section>

      <Footer aboutTextKey="photographyContent.headshots.about" />

      {/* Modal with Form */}
      {isModalOpen && <ModalOverlay $isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent ref={dialogRef} role="dialog" aria-modal="true" aria-label={h('dialog')} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
          <FormContainer>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '3rem' }}><LanguageSwitcher /></div>
            <CloseButton type="button" aria-label={c('close')} onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
            <FormHeader>
              <h3>{h('formTitle')}</h3>
              <p>{h('formIntro')}</p>
            </FormHeader>

            {status && <StatusMessage role={status.type === 'error' ? 'alert' : 'status'} $type={status.type}>{c(status.messageKey)}</StatusMessage>}
            {emailFallback}

            <Form ref={modalForm.formRef} onSubmit={event => handleSubmit(event, modalForm.validate)} onInput={modalForm.onInput} onInvalid={modalForm.onInvalid} aria-busy={isSubmitting} noValidate>
              <fieldset disabled={isSubmitting} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="headshot-modal-name">{h('name')} <span>*</span></Label>
                  <Input
                    id="headshot-modal-name"
                    autoComplete="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={h('namePlaceholder')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="headshot-modal-email">{h('email')} <span>*</span></Label>
                  <Input
                    id="headshot-modal-email"
                    autoComplete="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={h('emailPlaceholder')}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="headshot-modal-phone">{c('phone')} <span>*</span></Label>
                  <Input
                    id="headshot-modal-phone"
                    autoComplete="tel"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(672) 338 - 9307"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="headshot-modal-company">{h('company')}</Label>
                  <Input
                    id="headshot-modal-company"
                    autoComplete="organization"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={h('companyPlaceholder')}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label as="div" id="headshot-modal-package-label">{h('selectPackage')} <span>*</span></Label>
                <PackageSelector role="group" aria-labelledby="headshot-modal-package-label">
                  <PackageOption $selected={formData.package === 'plain'}>
                    <input
                      type="radio"
                      name="package"
                      value="plain"
                      checked={formData.package === 'plain'}
                      onChange={handleChange}
                    />
                    <span>{h('plain')}</span>
                    <small>$300</small>
                  </PackageOption>
                  <PackageOption $selected={formData.package === 'creative'}>
                    <input
                      type="radio"
                      name="package"
                      value="creative"
                      checked={formData.package === 'creative'}
                      onChange={handleChange}
                    />
                    <span>{h('creative')}</span>
                    <small>$200</small>
                  </PackageOption>
                </PackageSelector>
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="headshot-modal-date">{c('date')} <span>*</span></Label>
                  <Input
                    id="headshot-modal-date"
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="headshot-modal-time">{h('time')}</Label>
                  <Select
                    id="headshot-modal-time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    <option value="">{h('selectTime')}</option>
                    <option value="morning">{h('morning')}</option>
                    <option value="afternoon">{h('afternoon')}</option>
                    <option value="evening">{h('evening')}</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="headshot-modal-purpose">{h('purpose')}</Label>
                <Select
                  id="headshot-modal-purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                >
                  <option value="">{h('selectPurpose')}</option>
                  <option value="linkedin">{h('linkedin')}</option>
                  <option value="corporate">{h('corporate')}</option>
                  <option value="acting">{h('acting')}</option>
                  <option value="business">{h('business')}</option>
                  <option value="personal">{h('personal')}</option>
                  <option value="other">{c('other')}</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="headshot-modal-message">{h('details')}</Label>
                <TextArea
                  id="headshot-modal-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={h('detailsPlaceholder')}
                />
              </FormGroup>

              </fieldset>
              <SubmitButton type="submit" $isSubmitting={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span>{c('sending')}</span>
                  </>
                ) : (
                  <>
                    <span>{h('book')}</span>
                  </>
                )}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ModalContent>
      </ModalOverlay>}
    </PageContainer>
  );
} 