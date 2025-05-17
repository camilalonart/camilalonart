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
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Let's Create Beautiful Memories Together</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="package">Interested In</label>
            <select id="package" defaultValue={selectedPackage}>
              <option value="engagement">Engagement Session</option>
              <option value="elopement">Elopement Package</option>
              <option value="album">Wedding Album</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="names">Your Names</label>
            <input type="text" id="names" placeholder="Both partners' names" required />
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
            <label htmlFor="eventDate">When's the Big Day?</label>
            <input type="date" id="eventDate" required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="location">Where Are You Celebrating?</label>
            <textarea
              id="location"
              placeholder="Tell us about your venue or location ideas. If you're still deciding, what type of setting are you envisioning?"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="guestCount">Approximate Guest Count</label>
            <input 
              type="number" 
              id="guestCount" 
              placeholder="Even a rough estimate helps us plan"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="style">Your Photography Style</label>
            <select id="style">
              <option value="">Select your preferred style</option>
              <option value="documentary">Documentary/Photojournalistic</option>
              <option value="traditional">Traditional/Classic</option>
              <option value="artistic">Artistic/Editorial</option>
              <option value="mixed">Mix of Styles</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="story">Your Love Story</label>
            <textarea
              id="story"
              placeholder="We'd love to hear a bit about you both! How did you meet? What makes your relationship special? Any fun details about the proposal?"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="vision">Your Wedding Vision</label>
            <textarea
              id="vision"
              placeholder="What's your dream for your wedding photos? Any specific moments, styles, or shots you're hoping to capture? Special traditions or unique elements you're planning?"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="budget">Photography Budget Range</label>
            <select id="budget">
              <option value="">Select your budget range</option>
              <option value="2000-3000">$2,000 - $3,000</option>
              <option value="3000-4000">$3,000 - $4,000</option>
              <option value="4000-5000">$4,000 - $5,000</option>
              <option value="5000+">$5,000+</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="timeline">Wedding Day Timeline</label>
            <textarea
              id="timeline"
              placeholder="What time does your day begin? Any specific events or traditions we should know about? First look planned?"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="questions">Questions & Special Requests</label>
            <textarea
              id="questions"
              placeholder="Any specific questions about our services? Special requests or unique elements of your day we should know about?"
            />
          </FormGroup>

          <SubmitButton type="submit">Begin Your Journey With Us</SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
} 