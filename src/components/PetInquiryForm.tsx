import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pawPrint = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-15deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div<{ $embedded?: boolean }>`
  background: linear-gradient(135deg, #2D241D 0%, #1F1914 100%);
  border-radius: 20px;
  max-width: ${props => props.$embedded ? '1200px' : '700px'};
  width: 100%;
  max-height: ${props => props.$embedded ? 'none' : '90vh'};
  overflow-y: ${props => props.$embedded ? 'visible' : 'auto'};
  position: relative;
  box-shadow: ${props => props.$embedded ? 'none' : '0 30px 70px rgba(0, 0, 0, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'};
  animation: ${fadeIn} 0.4s ease-out;
  border: 1px solid rgba(176, 126, 18, 0.2);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #B07E12, #8A6210);
    border-radius: 4px;
  }
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing['2xl']};
  background: linear-gradient(135deg, rgba(176, 126, 18, 0.15) 0%, rgba(176, 126, 18, 0.05) 100%);
  border-bottom: 1px solid rgba(176, 126, 18, 0.3);
  position: sticky;
  top: 0;
  border-radius: 20px 20px 0 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &::before {
    content: '🐾';
    position: absolute;
    right: 80px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    opacity: 0.5;
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: #D4A84B;
    margin: 0;
    font-weight: 400;
    font-family: 'Playfair Display', serif;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin-top: ${theme.spacing.xs};
    font-family: ${theme.typography.fontFamily.primary};
  }

  .close-button {
    background: rgba(176, 126, 18, 0.2);
    border: 1px solid rgba(176, 126, 18, 0.3);
    font-size: 1.5rem;
    cursor: pointer;
    color: #D4A84B;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(176, 126, 18, 0.4);
      transform: rotate(90deg);
      color: #FBE3C2;
    }
  }
`;

const Form = styled.form<{ $embedded?: boolean }>`
  padding: ${props => props.$embedded ? `${theme.spacing['2xl']} ${theme.spacing['3xl']}` : theme.spacing['2xl']};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`;

const FormSection = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
  animation: ${slideUp} 0.5s ease-out;
  animation-fill-mode: both;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: #D4A84B;
  margin-bottom: ${theme.spacing.lg};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.typography.fontFamily.primary};
  
  .icon {
    font-size: 1.2rem;
  }
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(176, 126, 18, 0.5), transparent);
    margin-left: ${theme.spacing.md};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  grid-column: ${props => props.$fullWidth ? '1 / -1' : 'auto'};

  label {
    display: block;
    margin-bottom: ${theme.spacing.sm};
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: color 0.3s ease;
  }

  &:focus-within label {
    color: #D4A84B;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border: 2px solid rgba(176, 126, 18, 0.3);
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: rgba(72, 58, 47, 0.6);
    color: white;
    font-family: ${theme.typography.fontFamily.primary};
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    
    &:focus {
      outline: none;
      border-color: #D4A84B;
      box-shadow: 0 0 0 4px rgba(176, 126, 18, 0.2), 0 4px 15px rgba(0, 0, 0, 0.2);
      background: rgba(72, 58, 47, 0.9);
    }
    
    &:hover:not(:focus) {
      border-color: rgba(176, 126, 18, 0.5);
      background: rgba(72, 58, 47, 0.75);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.6;
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4A84B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    cursor: pointer;
    
    option {
      background: #2D241D;
      color: white;
    }
  }
`;

const RequiredStar = styled.span`
  color: #D4A84B;
  margin-left: 2px;
`;

const SubmitButton = styled.button<{ $isSubmitting?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${props => props.$isSubmitting 
    ? 'linear-gradient(90deg, #B07E12 0%, #D4A84B 50%, #B07E12 100%)'
    : 'linear-gradient(135deg, #C9950A 0%, #A67C00 100%)'};
  background-size: ${props => props.$isSubmitting ? '200% 100%' : '100% 100%'};
  animation: ${props => props.$isSubmitting ? shimmer : 'none'} 1.5s infinite;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.$isSubmitting ? 'wait' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 4px 20px rgba(176, 126, 18, 0.4);
  margin-top: ${theme.spacing.xl};
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(176, 126, 18, 0.5);
    background: linear-gradient(135deg, #D4A84B 0%, #B07E12 100%);
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const NotificationWrapper = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${props => props.$type === 'success' 
    ? 'linear-gradient(135deg, #4CAF50, #388E3C)' 
    : 'linear-gradient(135deg, #f44336, #C62828)'};
  color: white;
  border-radius: 14px;
  box-shadow: 0 8px 35px rgba(0, 0, 0, 0.3);
  z-index: 1100;
  animation: ${slideUp} 0.4s ease-out;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
    left: ${theme.spacing.md};
  }
`;

const SuccessContent = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
  animation: ${fadeIn} 0.5s ease-out;

  .success-icon {
    font-size: 4rem;
    margin-bottom: ${theme.spacing.lg};
    animation: ${bounce} 0.8s ease-out;
  }

  .paw-prints {
    display: flex;
    justify-content: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xl};
    
    span {
      font-size: 1.5rem;
      animation: ${pawPrint} 0.5s ease-out;
      animation-fill-mode: both;
      
      &:nth-child(1) { animation-delay: 0.2s; }
      &:nth-child(2) { animation-delay: 0.4s; }
      &:nth-child(3) { animation-delay: 0.6s; }
    }
  }

  h3 {
    font-size: 1.8rem;
    color: #D4A84B;
    margin-bottom: ${theme.spacing.md};
    font-family: 'Playfair Display', serif;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: ${theme.spacing.xl};
  }

  button {
    background: linear-gradient(135deg, #C9950A 0%, #A67C00 100%);
    color: white;
    border: none;
    padding: ${theme.spacing.md} ${theme.spacing['2xl']};
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(176, 126, 18, 0.4);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #FF6B6B;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 8px;
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '⚠️';
  }
`;

interface PetInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
  embedded?: boolean;
}

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_PET_FORM_URL;

const PetInquiryForm: React.FC<PetInquiryFormProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  embedded = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    petAge: '',
    package: selectedPackage || '',
    preferredDate: '',
    location: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(undefined);

    if (!GOOGLE_SCRIPT_URL) {
      setError('Form submission URL not configured');
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'pet',
          ...formData
        }),
        mode: 'no-cors'
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        petName: '',
        petType: '',
        petAge: '',
        package: selectedPackage || '',
        preferredDate: '',
        location: '',
        message: ''
      });

      if (!embedded) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const successContent = (
    <SuccessContent>
      <div className="success-icon">🐕</div>
      <div className="paw-prints">
        <span>🐾</span>
        <span>🐾</span>
        <span>🐾</span>
      </div>
      <h3>Woof! Thank You!</h3>
      <p>
        Your inquiry has been submitted successfully. 
        We can't wait to meet your furry friend! We'll be in touch soon to discuss your pet photography session.
      </p>
      <button onClick={onClose}>Close</button>
    </SuccessContent>
  );

  const formContent = submitSuccess ? successContent : (
    <Form $embedded={embedded} onSubmit={handleSubmit}>
      <FormSection>
        <SectionTitle><span className="icon">👤</span> Your Information</SectionTitle>
        <FormRow>
          <FormGroup>
            <label htmlFor="name">Your Name<RequiredStar>*</RequiredStar></label>
            <input
              type="text"
              id="name"
              required
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email<RequiredStar>*</RequiredStar></label>
            <input
              type="email"
              id="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </FormGroup>
        </FormRow>
      </FormSection>

      <FormSection>
        <SectionTitle><span className="icon">🐾</span> Your Pet's Details</SectionTitle>
        <FormRow>
          <FormGroup>
            <label htmlFor="petName">Pet's Name<RequiredStar>*</RequiredStar></label>
            <input
              type="text"
              id="petName"
              required
              placeholder="What's your pet called?"
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="petType">Type of Pet<RequiredStar>*</RequiredStar></label>
            <input
              type="text"
              id="petType"
              required
              placeholder="e.g. Dog, Cat, Rabbit..."
              value={formData.petType}
              onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="petAge">Pet's Age</label>
            <input
              type="text"
              id="petAge"
              placeholder="e.g. 3 years old"
              value={formData.petAge}
              onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
            />
          </FormGroup>
        </FormRow>
      </FormSection>

      <FormSection>
        <SectionTitle><span className="icon">📅</span> Session Details</SectionTitle>
        <FormRow>
          <FormGroup>
            <label htmlFor="package">Preferred Package<RequiredStar>*</RequiredStar></label>
            <select
              id="package"
              required
              value={formData.package}
              onChange={(e) => setFormData({ ...formData, package: e.target.value })}
            >
              <option value="">Select a package</option>
              <option value="At Home Sessions">🏠 At Home Sessions</option>
              <option value="Outdoor Session">🌳 Outdoor Session</option>
              <option value="Pet Photobooks">📷 Pet Photobooks</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="preferredDate">Preferred Date & Time</label>
            <input
              type="datetime-local"
              id="preferredDate"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="location">Preferred Location</label>
            <input
              type="text"
              id="location"
              placeholder="Your home, park, etc."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </FormGroup>
        </FormRow>
      </FormSection>

      <FormSection>
        <SectionTitle><span className="icon">💬</span> Additional Information</SectionTitle>
        <FormGroup $fullWidth>
          <label htmlFor="message">Tell Us About Your Pet</label>
          <textarea
            id="message"
            placeholder="Tell us about your pet's personality, any specific shots you'd like, favorite treats, or anything else that would help us capture their unique spirit!"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </FormGroup>
      </FormSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={isSubmitting} $isSubmitting={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoadingSpinner />
            Submitting...
          </>
        ) : (
          <>
            🐾 Submit Inquiry
          </>
        )}
      </SubmitButton>
    </Form>
  );

  if (embedded) {
    return (
      <ModalContent $embedded={true}>
        <ModalHeader>
          <div>
            <h2>Pet Photography Inquiry</h2>
            <p className="subtitle">Let's capture your furry friend's personality!</p>
          </div>
        </ModalHeader>
        {formContent}
      </ModalContent>
    );
  }

  return isOpen ? (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <h2>Pet Photography Inquiry</h2>
            <p className="subtitle">Let's capture your furry friend's personality!</p>
          </div>
          <button 
            className="close-button" 
            onClick={onClose} 
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </ModalHeader>
        {formContent}
      </ModalContent>
    </ModalOverlay>
  ) : null;
};

export default PetInquiryForm;
