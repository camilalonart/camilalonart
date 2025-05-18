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

const ModalContent = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  max-width: 800px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
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

const Form = styled.form`
  padding: ${theme.spacing.md};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.text.secondary};
    font-size: 0.9rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 1px solid #E5E5E5;
    border-radius: ${theme.borderRadius.sm};
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.main};
      box-shadow: 0 0 0 2px ${theme.colors.primary.light};
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

const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
  embedded?: boolean;
}

interface MSFormResponse {
  [key: string]: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedPackage, embedded = false }) => {
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

  const formRef = useRef<HTMLIFrameElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for messages from the Microsoft Form iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Make sure the message is from Microsoft Forms
      if (event.origin.includes('forms.office.com')) {
        if (event.data.includes('submitted')) {
          // Form was submitted successfully
          setIsSubmitting(false);
          alert('Thank you for your inquiry! We will get back to you soon.');
          onClose();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get the iframe document
    const iframeDoc = formRef.current?.contentWindow?.document;
    if (!iframeDoc) {
      console.error('Could not access form iframe');
      return;
    }

    try {
      // Find and fill each form field
      const inputs = Array.from(iframeDoc.querySelectorAll('input, textarea, select'));
      inputs.forEach((element) => {
        const input = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const name = input.name.toLowerCase();
        
        // Match our form fields to Microsoft Form fields based on name/label
        if (name.includes('name')) {
          input.value = formData.name;
        } else if (name.includes('email')) {
          input.value = formData.email;
        } else if (name.includes('phone')) {
          input.value = formData.phone;
        } else if (name.includes('date')) {
          input.value = formData.date;
        } else if (name.includes('package') || name.includes('interest')) {
          input.value = formData.package;
        } else if (name.includes('location')) {
          input.value = formData.location;
        } else if (name.includes('about you') || name.includes('about_you')) {
          input.value = formData.aboutYou;
        } else if (name.includes('message') || name.includes('vision')) {
          input.value = formData.message;
        } else if (name.includes('hear') || name.includes('found')) {
          input.value = formData.hearAboutUs;
        }
      });

      // Submit the form
      const submitButton = iframeDoc.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.click();
      } else {
        throw new Error('Could not find submit button');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your inquiry. Please try again later.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formContent = (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <FormGroup>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
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
        
        <FormGroup>
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

      <FormGroup>
        <label htmlFor="aboutYou">Tell us about you</label>
        <textarea
          id="aboutYou"
          placeholder="Share a bit about yourselves, your story, what makes your relationship special..."
          value={formData.aboutYou}
          onChange={e => setFormData({...formData, aboutYou: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="message">Tell us about your vision *</label>
        <textarea
          id="message"
          required
          placeholder="Share your ideas, questions, or any specific details about what you're looking for..."
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="hearAboutUs">How did you hear about us?</label>
        <input
          type="text"
          id="hearAboutUs"
          placeholder="Google, Instagram, friend referral, etc."
          value={formData.hearAboutUs}
          onChange={e => setFormData({...formData, hearAboutUs: e.target.value})}
        />
      </FormGroup>

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </SubmitButton>
    </Form>
  );

  if (embedded) {
    return (
      <>
        <ModalHeader>
          <h2>Request Information</h2>
        </ModalHeader>
        {formContent}
        <HiddenForm
          ref={formRef}
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAXNTilpUMUtETzNCSEZFRVFPMjBEWEZCU0ExMEQ5Uy4u&embed=true"
          width="0"
          height="0"
          frameBorder="0"
        />
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
        <HiddenForm
          ref={formRef}
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAXNTilpUMUtETzNCSEZFRVFPMjBEWEZCU0ExMEQ5Uy4u&embed=true"
          width="0"
          height="0"
          frameBorder="0"
        />
      </ModalContent>
    </ModalOverlay>
  );
};

export default BookingModal; 