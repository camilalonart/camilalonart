import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
`;

const ModalContent = styled.div<{ $embedded?: boolean }>`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  max-width: ${props => props.$embedded ? '1400px' : '800px'};
  width: 95%;
  max-height: ${props => props.$embedded ? 'none' : '90vh'};
  overflow-y: ${props => props.$embedded ? 'visible' : 'auto'};
  position: relative;
  box-shadow: ${props => props.$embedded ? 'none' : theme.shadows.lg};
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid #E5E5E5;
  position: sticky;
  top: 0;
  background: white;
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  z-index: 1;

  h2 {
    font-size: clamp(1.4rem, 2.6vw, 2rem);
    color: #796B5F;
    margin: 0;
    font-weight: 500;
  }

  .close-button {
    position: absolute;
    top: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${theme.colors.text.secondary};
    padding: ${theme.spacing.xs};
    
    &:hover {
      color: ${theme.colors.text.primary};
    }
  }
`;

const Form = styled.form<{ $embedded?: boolean }>`
  padding: ${props => props.$embedded ? `${theme.spacing['2xl']} ${theme.spacing['3xl']}` : theme.spacing.xl};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

const FormRow = styled.div<{ $embedded?: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.$embedded 
    ? 'repeat(auto-fit, minmax(200px, 1fr))'
    : 'repeat(auto-fit, minmax(250px, 1fr))'};
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.xl}) {
    grid-template-columns: ${props => props.$embedded 
      ? 'repeat(3, 1fr)'
      : 'repeat(auto-fit, minmax(250px, 1fr))'};
  }
`;

const FormGroup = styled.div<{ $embedded?: boolean }>`
  margin-bottom: ${props => props.$embedded ? theme.spacing.xl : theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.text.secondary};
    font-size: ${props => props.$embedded ? '0.95rem' : '0.9rem'};
    letter-spacing: 0.02em;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 1px solid #E5E5E5;
    border-radius: ${theme.borderRadius.sm};
    font-size: ${props => props.$embedded ? '1.1rem' : '1rem'};
    transition: all 0.3s ease;
    background: ${props => props.$embedded ? '#FAFAFA' : 'white'};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.main};
      box-shadow: 0 0 0 2px ${theme.colors.primary.light};
      background: white;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
  }
`;

const SubmitButtonWrapper = styled.div<{ $embedded?: boolean }>`
  ${props => props.$embedded ? `
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${theme.spacing.lg} 0;
    background: white;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
  ` : ''}
`;

const SubmitButton = styled.button<{ $embedded?: boolean }>`
  width: 100%;
  max-width: ${props => props.$embedded ? '400px' : '100%'};
  margin: ${props => props.$embedded ? '0 auto' : '0'};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    background: ${theme.colors.primary.dark};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const HiddenForm = styled.iframe`
  display: none;
`;

const NotificationWrapper = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${props => props.$type === 'success' ? '#4CAF50' : '#f44336'};
  color: white;
  border-radius: ${theme.borderRadius.sm};
  box-shadow: ${theme.shadows.md};
  z-index: 1100;
  animation: slideIn 0.3s ease;
  max-width: 400px;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
    left: ${theme.spacing.md};
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: ${theme.spacing.md};
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

interface WeddingInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
  embedded?: boolean;
}

const WeddingInquiryForm: React.FC<WeddingInquiryFormProps> = ({ isOpen, onClose, selectedPackage, embedded = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    package: selectedPackage || '',
    location: '',
    aboutYou: '',
    message: '',
    hearAboutUs: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      // Here we'll send the data to your server endpoint that will handle the Microsoft Forms submission
      const response = await fetch('/api/submit-wedding-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Show success notification
      setNotification({
        type: 'success',
        message: 'Thank you for your inquiry! We will get back to you within  hours.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        package: '',
        location: '',
        aboutYou: '',
        message: '',
        hearAboutUs: ''
      });

      // Close modal if not embedded
      if (!embedded) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({
        type: 'error',
        message: 'There was an error submitting your inquiry. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide notifications after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!isOpen) return null;

  const formContent = (
    <Form onSubmit={handleSubmit} $embedded={embedded}>
      <FormRow $embedded={embedded}>
        <FormGroup $embedded={embedded}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </FormGroup>
        
        <FormGroup $embedded={embedded}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </FormGroup>

        <FormGroup $embedded={embedded}>
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </FormGroup>
      </FormRow>

      <FormRow $embedded={embedded}>
        <FormGroup $embedded={embedded}>
          <label htmlFor="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
          />
        </FormGroup>
        
        <FormGroup $embedded={embedded}>
          <label htmlFor="package">Package of Interest *</label>
          <select
            id="package"
            required
            value={formData.package}
            onChange={e => setFormData({...formData, package: e.target.value})}
          >
            <option value="">Select a package</option>
            <option value="Elopement">Elopement</option>
            <option value="Engagement">Engagement Session</option>
            <option value="Couples">Couples Session</option>
            <option value="Photobooks">Photobooks</option>
          </select>
        </FormGroup>
        
        <FormGroup $embedded={embedded}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="City, venue, or general area"
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
          />
        </FormGroup>
      </FormRow>

      <FormGroup $embedded={embedded}>
        <label htmlFor="aboutYou">Tell us about you</label>
        <textarea
          id="aboutYou"
          placeholder="Share a bit about yourselves, your story, what makes your relationship special..."
          value={formData.aboutYou}
          onChange={e => setFormData({...formData, aboutYou: e.target.value})}
        />
      </FormGroup>

      <FormGroup $embedded={embedded}>
        <label htmlFor="message">Tell us about your vision *</label>
        <textarea
          id="message"
          required
          placeholder="Share your ideas, questions, or any specific details about what you're looking for..."
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
      </FormGroup>

      <FormGroup $embedded={embedded}>
        <label htmlFor="hearAboutUs">How did you hear about us?</label>
        <input
          type="text"
          id="hearAboutUs"
          placeholder="Google, Instagram, friend referral, etc."
          value={formData.hearAboutUs}
          onChange={e => setFormData({...formData, hearAboutUs: e.target.value})}
        />
      </FormGroup>

      <SubmitButtonWrapper $embedded={embedded}>
        <SubmitButton type="submit" disabled={isSubmitting} $embedded={embedded}>
          {isSubmitting ? (
            <>
              Sending...
              <LoadingSpinner />
            </>
          ) : (
            'Send Inquiry'
          )}
        </SubmitButton>
      </SubmitButtonWrapper>
    </Form>
  );

  // Render notification if exists
  const notificationElement = notification && (
    <NotificationWrapper $type={notification.type}>
      {notification.message}
    </NotificationWrapper>
  );

  if (embedded) {
    return (
      <>
        <ModalContent $embedded={true}>
          <ModalHeader>
            <h2>Request Information</h2>
          </ModalHeader>
          {formContent}
        </ModalContent>
        {notificationElement}
      </>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>Request Information</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </ModalHeader>
        {formContent}
      </ModalContent>
      {notificationElement}
    </ModalOverlay>
  );
};

export default WeddingInquiryForm; 