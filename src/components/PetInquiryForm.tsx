import React, { useState } from 'react';
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

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text.primary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${theme.colors.primary.light};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${theme.colors.primary.light};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${theme.colors.primary.light};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primary.dark};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: ${theme.colors.text.disabled};
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
  color: ${theme.colors.accent.success};

  h3 {
    font-size: 1.8rem;
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: ${theme.spacing.xl};
  }

  button {
    background: transparent;
    border: 2px solid ${theme.colors.accent.success};
    color: ${theme.colors.accent.success};
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.sm};
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${theme.colors.accent.success};
      color: white;
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.accent.error};
  margin-top: ${theme.spacing.sm};
  font-size: 0.9rem;
`;

interface PetInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
  embedded?: boolean;
  useIframe?: boolean;
}

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL'; // Replace with your deployed Google Apps Script URL

const PetInquiryForm: React.FC<PetInquiryFormProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  embedded = false,
  useIframe = false
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

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'pet',
          ...formData
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSubmitSuccess(true);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (useIframe) {
    return (
      <iframe
        src="YOUR_GOOGLE_FORM_URL"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        Loading...
      </iframe>
    );
  }

  const formContent = submitSuccess ? (
    <SuccessMessage>
      <h3>Thank You!</h3>
      <p>
        Your inquiry has been submitted successfully. We'll get back to you within 24-48 hours to discuss your pet photography session.
      </p>
      <button onClick={onClose}>Close</button>
    </SuccessMessage>
  ) : (
    <Form $embedded={embedded} onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Your Name *</Label>
        <Input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email *</Label>
        <Input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="petName">Pet's Name *</Label>
        <Input
          type="text"
          id="petName"
          required
          value={formData.petName}
          onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="petType">Type of Pet *</Label>
        <Select
          id="petType"
          required
          value={formData.petType}
          onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
        >
          <option value="">Select pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="petAge">Pet's Age</Label>
        <Input
          type="text"
          id="petAge"
          value={formData.petAge}
          onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="package">Preferred Package *</Label>
        <Select
          id="package"
          required
          value={formData.package}
          onChange={(e) => setFormData({ ...formData, package: e.target.value })}
        >
          <option value="">Select a package</option>
          <option value="Playful Pack">The Playful Pack</option>
          <option value="Luxury Fur">The Luxury Fur</option>
          <option value="Family Paws">The Family Paws</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="preferredDate">Preferred Date</Label>
        <Input
          type="date"
          id="preferredDate"
          value={formData.preferredDate}
          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="location">Preferred Location</Label>
        <Input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="message">Additional Information</Label>
        <TextArea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your pet's personality, any specific shots you'd like, or any other details that would help us prepare for the session."
        />
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </SubmitButton>
    </Form>
  );

  if (embedded) {
    return formContent;
  }

  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Pet Photography Session Inquiry</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </ModalHeader>
        {formContent}
      </ModalContent>
    </ModalOverlay>
  ) : null;
};

export default PetInquiryForm; 