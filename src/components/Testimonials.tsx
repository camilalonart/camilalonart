import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import SecureImage from './SecureImage';

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  company?: string;
  image?: string;
  quote: string;
  service: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
  dark?: boolean;
}

const TestimonialsContainer = styled.section<{ dark: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.main};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.lg};
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const TestimonialSlider = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const TestimonialTrack = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.currentIndex * -100}%);
`;

const TestimonialSlide = styled.div`
  flex: 0 0 100%;
  padding: ${theme.spacing.xl};
`;

const TestimonialCard = styled.div`
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.lg};
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const QuoteText = styled.blockquote`
  font-size: ${theme.typography.fontSize.xl};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
  font-style: italic;
  color: ${theme.colors.text.primary};
  
  &::before,
  &::after {
    content: '"';
    color: ${theme.colors.primary.main};
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
`;

const AuthorImage = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
`;

const AuthorDetails = styled.div`
  text-align: left;
  
  h4 {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.xs};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing['2xl']};
`;

const SliderDot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props =>
    props.active ? theme.colors.primary.main : theme.colors.background.light};
  border: 2px solid ${theme.colors.primary.main};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${theme.colors.primary.light};
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${theme.colors.background.light};
  box-shadow: ${theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${theme.transitions.default};
  z-index: 1;
  
  &:hover {
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.text.light};
  }
  
  &.prev {
    left: ${theme.spacing.md};
  }
  
  &.next {
    right: ${theme.spacing.md};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export default function Testimonials({
  testimonials,
  autoplay = true,
  interval = 5000,
  dark = false
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [autoplay, interval, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <TestimonialsContainer dark={dark}>
      <TestimonialsHeader>
        <h2>What Our Clients Say</h2>
        <p>
          Read about the experiences of our valued clients and their journey
          with our services.
        </p>
      </TestimonialsHeader>

      <TestimonialSlider>
        <SliderButton className="prev" onClick={goToPrevSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </SliderButton>

        <TestimonialTrack currentIndex={currentIndex}>
          {testimonials.map((testimonial) => (
            <TestimonialSlide key={testimonial.id}>
              <TestimonialCard>
                <QuoteText>{testimonial.quote}</QuoteText>
                <AuthorInfo>
                  {testimonial.image && (
                    <AuthorImage>
                      <SecureImage
                        src={testimonial.image}
                        alt={`${testimonial.name}'s profile picture`}
                        priority
                        quality={90}
                      />
                    </AuthorImage>
                  )}
                  <AuthorDetails>
                    <h4>{testimonial.name}</h4>
                    {(testimonial.role || testimonial.company) && (
                      <p>
                        {testimonial.role}
                        {testimonial.role && testimonial.company && ' at '}
                        {testimonial.company}
                      </p>
                    )}
                    <p>{testimonial.service}</p>
                  </AuthorDetails>
                </AuthorInfo>
              </TestimonialCard>
            </TestimonialSlide>
          ))}
        </TestimonialTrack>

        <SliderButton className="next" onClick={goToNextSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </SliderButton>
      </TestimonialSlider>

      <SliderControls>
        {testimonials.map((_, index) => (
          <SliderDot
            key={index}
            active={currentIndex === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </SliderControls>
    </TestimonialsContainer>
  );
} 