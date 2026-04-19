'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import SecureImage from '../../../components/SecureImage';
import Footer from '../../../components/Footer';

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
  background-color: rgba(219, 162, 40, 0.59);
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
  width: 40px;
  height: 40px;
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
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  background: ${props => props.$bgColor || 'transparent'};
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  padding: ${theme.spacing.xl};
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
  background: rgb(176, 126, 18);
  color: white;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
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
    background: rgb(231, 189, 99);
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
  background: ${props => props.$isSubmitting ? '#ccc' : 'linear-gradient(135deg, rgb(176, 126, 18) 0%, rgb(169, 125, 30) 100%)'};
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
  color: ${({ $type }) => $type === 'success' ? '#27ae60' : '#c0392b'};
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
    color: rgb(169, 125, 30);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({
        type: 'success',
        message: '🎉 Thank you for your inquiry! We\'ll get back to you within 24 hours to confirm your session.',
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
      
      // Close modal after success (with delay to show message)
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus(null);
      }, 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Hero>
        <HeroImageContainer>
          <SecureImage
            src="/images/headshots/collagecopy.webp"
            alt="Professional headshots"
            priority
            quality={90}
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>Professional Headshots</h1>
          <p>
            Elevate your professional presence with meticulously crafted headshots
            that embody confidence, authenticity, and sophistication.
          </p>
          <HeroButton onClick={() => setIsModalOpen(true)}>
            Book My Session
          </HeroButton>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Portfolio</SectionTitle>
        <PortfolioGrid>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <PortfolioItem key={i}>
              <SecureImage
                src={`/images/headshots/portfolio-${i}.jpg`}
                alt={`Professional headshot example ${i}`}
                quality={90}
              />
              <PortfolioOverlay>
                <p>Professional Headshot</p>
              </PortfolioOverlay>
            </PortfolioItem>
          ))}
        </PortfolioGrid>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)">
        <SectionTitle>Packages</SectionTitle>
        <ServicesSection>
          <ServiceCard>
            <ServiceCardTitle>Plain Background</ServiceCardTitle>
            <ServiceCardPrice>$300</ServiceCardPrice>
            <ServiceCardFeatures>
              <li>30-minute session</li>
              <li>5 final edited images</li>
              <li>Plain white/neutral background</li>
              <li>Professional retouching</li>
              <li>Digital delivery</li>
              <li>Print release</li>
            </ServiceCardFeatures>
            <BookNowButton onClick={scrollToContact}>
              Book Now
            </BookNowButton>
          </ServiceCard>

          <ServiceCard>
            <ServiceCardTitle>Creative Background</ServiceCardTitle>
            <ServiceCardPrice>$200</ServiceCardPrice>
            <ServiceCardFeatures>
              <li>30-minute session</li>
              <li>5 final edited images</li>
              <li>Creative background options</li>
              <li>Professional retouching</li>
              <li>Digital delivery</li>
              <li>Print release</li>
            </ServiceCardFeatures>
            <BookNowButton onClick={scrollToContact}>
              Book Now
            </BookNowButton>
          </ServiceCard>
        </ServicesSection>
      </Section>

      <Section>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQSection>
          <FAQItem>
            <h3>How long does a session take?</h3>
            <p>Each session takes approximately 30 minutes, including setup and brief consultation.</p>
          </FAQItem>
          <FAQItem>
            <h3>What should I wear?</h3>
            <p>We recommend solid colors that complement your skin tone. Avoid busy patterns and logos. Bring 2-3 outfit options for variety.</p>
          </FAQItem>
          <FAQItem>
            <h3>When will I receive my photos?</h3>
            <p>You'll receive your edited photos within 5-7 business days after your session.</p>
          </FAQItem>
          <FAQItem>
            <h3>Can I use these photos for my business?</h3>
            <p>Yes! All packages include a print release, allowing you to use the photos for both personal and professional purposes.</p>
          </FAQItem>
        </FAQSection>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)" id="contact-section">
        <FormContainer>
          <FormHeader>
            <h3>Schedule Your Headshot Session</h3>
            <p>Fill out the form below and we'll get back to you within 24 hours to confirm your appointment.</p>
          </FormHeader>

          {status && <StatusMessage $type={status.type}>{status.message}</StatusMessage>}

          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label>Full Name <span>*</span></Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email <span>*</span></Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Phone Number <span>*</span></Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(672) 338 - 9307"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Company / Organization</Label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Select Package <span>*</span></Label>
              <PackageSelector>
                <PackageOption $selected={formData.package === 'plain'}>
                  <input
                    type="radio"
                    name="package"
                    value="plain"
                    checked={formData.package === 'plain'}
                    onChange={handleChange}
                  />
                  <span>Plain Background</span>
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
                  <span>Creative Background</span>
                  <small>$200</small>
                </PackageOption>
              </PackageSelector>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Preferred Date <span>*</span></Label>
                <Input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Preferred Time</Label>
                <Select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >
                  <option value="">Select a time slot</option>
                  <option value="morning">Morning (9am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 4pm)</option>
                  <option value="evening">Evening (4pm - 7pm)</option>
                </Select>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>What will these headshots be used for?</Label>
              <Select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
              >
                <option value="">Select purpose</option>
                <option value="linkedin">LinkedIn Profile</option>
                <option value="corporate">Corporate Website</option>
                <option value="acting">Acting / Modeling Portfolio</option>
                <option value="business">Business Cards / Marketing</option>
                <option value="personal">Personal Branding</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Additional Details or Questions</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about any specific requirements, outfit preferences, or questions you may have..."
              />
            </FormGroup>

            <SubmitButton type="submit" $isSubmitting={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Book My Session</span>
                </>
              )}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Section>

      <Footer aboutText="Specializing in professional headshots. Crafting images that convey confidence and authenticity. Based in Vancouver, BC." />

      {/* Modal with Form */}
      <ModalOverlay $isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <FormContainer>
            <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
            <FormHeader>
              <h3>Schedule Your Headshot Session</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours to confirm your appointment.</p>
            </FormHeader>

            {status && <StatusMessage $type={status.type}>{status.message}</StatusMessage>}

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Full Name <span>*</span></Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email <span>*</span></Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Phone Number <span>*</span></Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(672) 338 - 9307"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Company / Organization</Label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Select Package <span>*</span></Label>
                <PackageSelector>
                  <PackageOption $selected={formData.package === 'plain'}>
                    <input
                      type="radio"
                      name="package"
                      value="plain"
                      checked={formData.package === 'plain'}
                      onChange={handleChange}
                    />
                    <span>Plain Background</span>
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
                    <span>Creative Background</span>
                    <small>$200</small>
                  </PackageOption>
                </PackageSelector>
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Preferred Date <span>*</span></Label>
                  <Input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Preferred Time</Label>
                  <Select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    <option value="">Select a time slot</option>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 4pm)</option>
                    <option value="evening">Evening (4pm - 7pm)</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>What will these headshots be used for?</Label>
                <Select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                >
                  <option value="">Select purpose</option>
                  <option value="linkedin">LinkedIn Profile</option>
                  <option value="corporate">Corporate Website</option>
                  <option value="acting">Acting / Modeling Portfolio</option>
                  <option value="business">Business Cards / Marketing</option>
                  <option value="personal">Personal Branding</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Additional Details or Questions</Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about any specific requirements, outfit preferences, or questions you may have..."
                />
              </FormGroup>

              <SubmitButton type="submit" $isSubmitting={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Book My Session</span>
                  </>
                )}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
} 