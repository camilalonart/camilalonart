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
`;

const Hero = styled.section`
  position: relative;
  height: 90vh;
  min-height: 600px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
`;

const HeroImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing['4xl']};
  background: white;

  h1 {
    margin-bottom: ${theme.spacing.xl};
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    line-height: 1.2;
    color: #000;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    line-height: 1.8;
    color: #666;
    max-width: 600px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']};
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
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
    props.accent ? theme.colors.background.light : theme.colors.background.main};
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
  
  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const TestimonialCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  
  blockquote {
    font-style: italic;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.secondary};
  }
  
  cite {
    color: ${theme.colors.primary.main};
    font-weight: ${theme.typography.fontWeight.medium};
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
  transition: ${theme.transitions.default};
  width: 100%;
  
  &:hover {
    background: ${theme.colors.primary.dark};
  }
`;

const WhyHireSection = styled.section`
  background: ${theme.colors.background.light};
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  text-align: center;

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing['2xl']};
    color: ${theme.colors.primary.main};
  }

  p {
    max-width: 800px;
    margin: 0 auto ${theme.spacing.xl};
    line-height: 1.8;
  }
`;

const FAQSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
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
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  text-align: center;

  p {
    margin: ${theme.spacing.md} 0;
  }

  a {
    color: ${theme.colors.text.light};
    text-decoration: none;
    
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
            src="/images/pets/A7T05223.jpg"
            alt="Happy cat portrait"
            height="100%"
            priority
            quality={100}
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>Pet Photography</h1>
          <p>
            Capturing the unique personality and spirit of your beloved companions
            in beautiful, timeless portraits that celebrate the joy they bring to
            your life.
          </p>
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
              We bring portable lighting and work with natural light too.
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
            <h3>Outdoor Pawtraits</h3>
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

          <ServiceCard>
            <h3>Custom Photo Book</h3>
            <p>
              Transform your favorite pet portraits into a beautiful hardcover book.
              Includes professional design, personalized messages, and premium printing.
            </p>
            <p><strong>Includes:</strong></p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: theme.spacing.lg }}>
              <li>- 20-page hardcover photo book</li>
              <li>- Professional layout design</li>
              <li>- Custom text and captions</li>
              <li>- Premium paper quality</li>
            </ul>
            <p><strong>Starting at $200CAD</strong></p>
            <BookButton onClick={() => handleBookClick('photo-book')}>Order Book</BookButton>
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