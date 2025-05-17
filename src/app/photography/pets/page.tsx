'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import ProtectedImage from '../../../components/ProtectedImage';
import BookingModal from '../../../components/BookingModal';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: hidden;
  width: 100%;
  position: relative;

  * {
    max-width: 100vw;
    box-sizing: border-box;
  }
`;

const Hero = styled.section`
  position: relative;
  height: 90vh;
  min-height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: ${theme.spacing.md};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 80vh;
    padding: ${theme.spacing.sm};
  }
`;

const HeroImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing['4xl']};
  z-index: 2;
  max-width: 800px;

  h1 {
    margin-bottom: ${theme.spacing.xl};
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    line-height: 1.2;
    color: white;
  }

  p {
    font-size: clamp(0.9rem, 1.4vw, 1.2rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin-bottom: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
  }
`;

const BookButton = styled.button`
  background: ${theme.colors.primary.main};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  margin-top: auto;
  cursor: pointer;
  width: 280px;
  height: 60px;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${theme.colors.primary.dark};
    z-index: -1;
    transition: width 0.4s ease;
  }

  &:hover {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    &:before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

const HeroButton = styled(BookButton)`
  max-width: 300px;
  width: 100%;
  font-size: 1rem;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  background: transparent;
  border: 2px solid white;
  color: white;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: white;
    z-index: -1;
    transition: width 0.4s ease;
  }

  &:hover {
    color: black;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    &:before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 250px;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    max-width: 200px;
    font-size: 0.9rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    padding: ${theme.spacing.lg};
    gap: ${theme.spacing.sm};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.md};
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: scale(1.02);
  }
`;

const Section = styled.section<{ accent?: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props =>
    props.accent ? '#edede9' : theme.colors.background.main};
  width: 100%;
  box-sizing: border-box;
  
  h2 {
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['2xl']};
    text-align: center;
    color: #003566;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing['2xl']} auto;
  padding: 0 ${theme.spacing.md};
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.sm};
    margin: ${theme.spacing.xl} auto;
  }
`;

const ServiceCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: ${theme.transitions.default};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
  
  h3 {
    color: #003566;
    margin-bottom: ${theme.spacing.lg};
    font-size: clamp(1.2rem, 2.2vw, 1.8rem);
    font-weight: 500;
  }

  > p {
    flex-grow: 1;
    margin-bottom: ${theme.spacing.md};
  }

  em {
    display: block;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.secondary};
  }
`;

const TestimonialCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
  
  blockquote {
    font-style: italic;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.secondary};
    word-wrap: break-word;
  }
  
  cite {
    color: ${theme.colors.primary.main};
    font-weight: ${theme.typography.fontWeight.medium};
    display: block;
    word-wrap: break-word;
  }
`;

const WhyHireSection = styled.section`
  background: ${theme.colors.background.light};
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  text-align: center;
  width: 100%;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['2xl']};
    color: ${theme.colors.primary.main};
  }

  p {
    max-width: 800px;
    margin: 0 auto ${theme.spacing.xl};
    line-height: 1.8;
    padding: 0 ${theme.spacing.md};
  }
`;

const FAQSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  width: 100%;
  overflow: hidden;
  
  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['2xl']};
    text-align: center;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
  padding: 0 ${theme.spacing.md};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.sm};
  }
`;

const FAQItem = styled.div`
  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.xl};
  }

  p {
    line-height: 1.6;
    color: ${theme.colors.text.secondary};
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.background.dark};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
  text-align: center;
  width: 100%;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }

  p {
    margin: ${theme.spacing.md} 0;
  }

  a {
    color: ${theme.colors.text.light};
    text-decoration: none;
    word-break: break-word;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function PetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>();

  const handleBookClick = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsModalOpen(true);
  };

  return (
    <PageContainer>
      <Hero>
        <HeroImageContainer>
          <ProtectedImage
            src="/images/pets/A7T05223-horizontal.jpg"
            alt="Happy cat portrait"
            height="100%"
            priority
            quality={100}
            objectFit="cover"
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>Pet Photography</h1>
          <p>
            Capturing the unique personality and spirit of your beloved companions
            in beautiful, timeless portraits that celebrate the joy they bring to
            your life.
          </p>
          <HeroButton onClick={() => handleBookClick('Pet Photography')}>Contact Us</HeroButton>
        </HeroContent>
      </Hero>

      <Section accent>
        <h2>Our Services</h2>
        <Grid>
          <ServiceCard>
            <h3>At Home Sessions</h3>
            <p>
              Cozy, indoor portraits taken in your pet's own space. 
              Ideal for senior pets, indoor animals, or a calmer setting. 
            </p>
            <p><strong>Includes:</strong> 10–15 fully edited high-resolution images</p>
            <p><strong>Add-on:</strong> A $50 flat fee to buy all unedited or lightly edited photos taken during the session</p>
            <em>Travel fees may apply for locations outside the local area</em>
            <p><strong>Starting at $100CAD</strong></p>
            <BookButton onClick={() => handleBookClick('at-home')}>Book Session</BookButton>
          </ServiceCard>
          
          <ServiceCard>
            <h3>Pet & People Moments</h3>
            <p>
              Celebrate your bond with relaxed portraits of you and your pet together. 
              Sessions take place outdoors or at your home for a warm, natural look.
            </p>
            <p><strong>Includes:</strong> 10–15 fully edited high-resolution images</p>
            <p><strong>Add-on:</strong> A $50 flat fee to buy all unedited or lightly edited photos taken during the session</p>
            <em>Travel fees may apply for locations outside the local area</em>
            <p><strong>Starting at $150CAD</strong></p>
            <BookButton onClick={() => handleBookClick('pet-people')}>Book Session</BookButton>
          </ServiceCard>
          
          <ServiceCard>
            <h3>Outdoor Sessions</h3>
            <p>
              Beautiful, expressive shots of your pet exploring the outdoors. 
              Perfect for energetic pets—on-leash is recommended.
            </p>
            <p><strong>Includes:</strong> 10–15 fully edited high-resolution images</p>
            <p><strong>Add-on:</strong> A $50 flat fee to buy all unedited or lightly edited photos taken during the session</p>
            <em>Travel fees may apply for locations outside the local area</em>
            <p><strong>Starting at $200CAD</strong></p>
            <BookButton onClick={() => handleBookClick('outdoor')}>Book Session</BookButton>
          </ServiceCard>
        </Grid>
      </Section>

      <Section>
        <h2>Recent Work</h2>
        <ImageGrid>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ImageCard key={i}>
              <ProtectedImage
                src={`/images/pets/gallery-${i}.jpg`}
                alt={`Pet portrait ${i}`}
                height="300px"
              />
            </ImageCard>
          ))}
        </ImageGrid>
      </Section>

      <WhyHireSection>
        <h2>Why Hire a Pet Photographer?</h2>
        <p>
          Your pets are family members, and they deserve to be photographed with the same care and 
          artistry as any other family portrait. Professional pet photography goes beyond simple snapshots 
          to capture the unique personality, spirit, and beauty of your beloved companions.
        </p>
        <p>
          As a dedicated pet photographer, I understand animal behavior and know how to create an 
          environment where your pet feels comfortable and relaxed. This allows me to capture authentic 
          moments that truly reflect their character.
        </p>
        <p>
          With professional equipment, expertise in lighting, and post-processing skills, I can create 
          stunning, gallery-quality images that you'll treasure for years to come.
        </p>
      </WhyHireSection>

      <FAQSection>
        <h2>Frequently Asked Questions</h2>
        <FAQGrid>
          <FAQItem>
            <h3>How long does a session last?</h3>
            <p>Most sessions last 1-2 hours, but we work at your pet's pace. We take breaks as needed and ensure your pet stays comfortable throughout the shoot.</p>
          </FAQItem>
          <FAQItem>
            <h3>What if my pet is shy or anxious?</h3>
            <p>We'll take things slow and let your pet set the pace. I have experience working with shy and anxious pets and will use gentle techniques to help them feel at ease.</p>
          </FAQItem>
          <FAQItem>
            <h3>When will I receive my photos?</h3>
            <p>You'll receive a preview gallery within 1 week of your session, and final edited images within 2-3 weeks. Rush delivery is available upon request.</p>
          </FAQItem>
          <FAQItem>
            <h3>Can I purchase additional photos?</h3>
            <p>Yes! You can purchase individual images or upgrade to receive all photos from your session with light editing for a flat fee of $50.</p>
          </FAQItem>
          <FAQItem>
            <h3>Do you photograph multiple pets?</h3>
            <p>Absolutely! I love photographing multiple pets and can create beautiful portraits that showcase their relationships and individual personalities.</p>
          </FAQItem>
          <FAQItem>
            <h3>What about special needs pets?</h3>
            <p>I have experience working with senior pets, disabled pets, and those with special needs. We'll adapt the session to ensure their comfort and safety.</p>
          </FAQItem>
        </FAQGrid>
      </FAQSection>

      <Section accent>
        <h2>Happy Pet Parents</h2>
        <Grid>
          <TestimonialCard>
            <blockquote>
              "Camilo captured our dog's personality perfectly! The photos are
              absolutely stunning and we'll treasure them forever."
            </blockquote>
            <cite>- Sarah & Max the Golden Retriever</cite>
          </TestimonialCard>
          
          <TestimonialCard>
            <blockquote>
              "We were amazed by how patient and understanding Camilo was with
              our cats. The results are beyond what we could have hoped for!"
            </blockquote>
            <cite>- Michael & Luna the Maine Coon</cite>
          </TestimonialCard>
          
          <TestimonialCard>
            <blockquote>
              "The outdoor session was so much fun, and the photos perfectly
              capture our dog's playful spirit. Highly recommended!"
            </blockquote>
            <cite>- Emma & Bailey the Australian Shepherd</cite>
          </TestimonialCard>
        </Grid>
      </Section>

      <Section>
        <ContactForm service="Pet Photography" />
      </Section>

      <Footer>
        <h3>Get in Touch</h3>
        <p>Email: <a href="mailto:contact@camilonart.com">contact@camilonart.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
        <p>Based in Vancouver, BC • Available for travel</p>
      </Footer>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </PageContainer>
  );
} 