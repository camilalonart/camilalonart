import React from 'react';
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
  padding: ${theme.spacing['2xl']};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.xl};
    color: ${theme.colors.primary.main};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize['2xl']};
  cursor: pointer;
  color: ${theme.colors.text.secondary};
  
  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  label {
    font-weight: ${theme.typography.fontWeight.medium};
  }

  input, textarea, select {
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.text.secondary};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.base};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.main};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background: ${theme.colors.primary.main};
  color: white;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.lg};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.primary.dark};
  }
`;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
}

export default function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // You can add email service integration here
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Book a Pet Photography Session</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="package">Package</label>
            <select id="package" defaultValue={selectedPackage}>
              <option value="at-home">At Home Sessions</option>
              <option value="pet-people">Pet & People Moments</option>
              <option value="outdoor">Outdoor Pawtraits</option>
              <option value="photo-book">Custom Photo Book</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="petInfo">Tell us about your pet</label>
            <textarea
              id="petInfo"
              placeholder="Name, age, breed, personality traits, any special needs..."
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="availability">Preferred dates and times</label>
            <textarea
              id="availability"
              placeholder="Please provide a few options that work best for you"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="vision">Your Vision</label>
            <textarea
              id="vision"
              placeholder="What's your vision for the final images? Any specific shots or ideas you'd love to capture?"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="accommodations">Special Accommodations</label>
            <textarea
              id="accommodations"
              placeholder="Any special requirements or considerations we should know about?"
            />
          </FormGroup>

          <SubmitButton type="submit">Request Quote</SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
} 