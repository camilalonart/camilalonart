'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import ProtectedImage from '../../../components/ProtectedImage';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: ${theme.spacing.lg};
    background: linear-gradient(120deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const Section = styled.section<{ $dark?: boolean }>`
  padding: ${theme.spacing['3xl']} 0;
  background-color: ${props => 
    props.$dark ? theme.colors.background.dark : theme.colors.background.main};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const CourseCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: ${theme.spacing.md} 0;
    
    li {
      padding: ${theme.spacing.xs} 0;
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      
      &::before {
        content: '•';
        color: ${theme.colors.primary.main};
      }
    }
  }

  .price {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.primary.main};
    margin-top: ${theme.spacing.lg};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const InfoCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};

  h3 {
    color: ${theme.colors.primary.main};
    margin: ${theme.spacing.md} 0;
  }

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

export default function ArtClassesPage() {
  const courses = [
    {
      title: 'Digital Art Fundamentals',
      items: [
        'Introduction to digital tools',
        'Color theory and composition',
        'Digital painting techniques',
        'Character design basics',
        'Portfolio development'
      ],
      duration: '8 weeks',
      schedule: 'Once a week, 2 hours',
      price: 599
    },
    {
      title: 'Traditional Art Workshop',
      items: [
        'Drawing fundamentals',
        'Watercolor techniques',
        'Oil painting basics',
        'Mixed media exploration',
        'Live model sessions'
      ],
      duration: '6 weeks',
      schedule: 'Twice a week, 2 hours',
      price: 499
    },
    {
      title: 'Art Business Essentials',
      items: [
        'Portfolio building',
        'Social media marketing',
        'Pricing strategies',
        'Client communication',
        'Legal considerations'
      ],
      duration: '4 weeks',
      schedule: 'Once a week, 2 hours',
      price: 399
    }
  ];

  const info = [
    {
      title: 'Small Class Sizes',
      description: 'Maximum of 8 students per class for personalized attention and feedback.'
    },
    {
      title: 'Flexible Schedule',
      description: 'Morning and evening classes available to accommodate different schedules.'
    },
    {
      title: 'All Skill Levels',
      description: 'Courses designed for beginners to advanced artists looking to expand their skills.'
    },
    {
      title: 'Vancouver Location',
      description: 'Classes held in our Vancouver studio with all necessary equipment provided.'
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <h1>Art Classes</h1>
        <p>
          Learn, grow, and express yourself through art. Professional art classes
          for all skill levels in Vancouver.
        </p>
      </Hero>

      <Section>
        <h2>Available Courses</h2>
        <Grid>
          {courses.map((course) => (
            <CourseCard key={course.title}>
              <h3>{course.title}</h3>
              <ul>
                {course.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Schedule:</strong> {course.schedule}</p>
              <p className="price">${course.price}</p>
            </CourseCard>
          ))}
        </Grid>
      </Section>

      <Section $dark>
        <h2>Class Information</h2>
        <Grid>
          {info.map((item) => (
            <InfoCard key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </InfoCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <ContactForm service="Art Classes" />
      </Section>
    </PageContainer>
  );
} 