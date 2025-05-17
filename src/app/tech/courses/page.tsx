'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
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

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
`;

const CourseCard = styled.div`
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const CourseContent = styled.div`
  padding: ${theme.spacing.xl};

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.6;
  }
`;

const CourseDetails = styled.div`
  margin: ${theme.spacing.lg} 0;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.md};

  h4 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: ${theme.spacing.xs} 0;
      padding-left: ${theme.spacing.md};
      position: relative;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${theme.colors.accent.success};
      }
    }
  }
`;

const PriceTag = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.main};
  margin: ${theme.spacing.lg} 0;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary.dark};
  }
`;

export default function TechCoursesPage() {
  const courses = [
    {
      title: 'Modern Web Development',
      description: 'Learn to build modern, responsive web applications using React, Next.js, and TypeScript.',
      duration: '8 weeks',
      schedule: 'Twice a week, 2 hours per session',
      topics: [
        'React fundamentals and hooks',
        'Next.js 13+ features',
        'TypeScript essentials',
        'Styled-components and CSS-in-JS',
        'API integration and data fetching',
        'Performance optimization',
      ],
      price: 999,
    },
    {
      title: 'Cloud Architecture Fundamentals',
      description: 'Master cloud computing concepts and learn to design scalable infrastructure on AWS.',
      duration: '6 weeks',
      schedule: 'Once a week, 3 hours per session',
      topics: [
        'AWS core services',
        'Infrastructure as Code',
        'Serverless architecture',
        'Microservices design',
        'Security best practices',
        'Cost optimization',
      ],
      price: 799,
    },
    {
      title: 'Full-Stack Development Bootcamp',
      description: 'Comprehensive program covering both frontend and backend development.',
      duration: '12 weeks',
      schedule: 'Three times a week, 3 hours per session',
      topics: [
        'HTML, CSS, and JavaScript',
        'React and Next.js',
        'Node.js and Express',
        'Database design and MongoDB',
        'RESTful APIs',
        'Authentication and authorization',
      ],
      price: 1499,
    },
  ];

  return (
    <PageContainer>
      <Header>
        <h1>Tech Courses</h1>
        <p>
          Level up your tech skills with hands-on courses taught by industry professionals.
          Small class sizes, practical projects, and personalized feedback.
        </p>
      </Header>

      <CourseGrid>
        {courses.map((course) => (
          <CourseCard key={course.title}>
            <CourseContent>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <CourseDetails>
                <h4>Course Details</h4>
                <ul>
                  <li>Duration: {course.duration}</li>
                  <li>Schedule: {course.schedule}</li>
                </ul>
                <h4>What You'll Learn</h4>
                <ul>
                  {course.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </CourseDetails>
              <PriceTag>${course.price}</PriceTag>
              <RegisterButton>Register Interest</RegisterButton>
            </CourseContent>
          </CourseCard>
        ))}
      </CourseGrid>

      <ContactForm service="Tech Courses" />
    </PageContainer>
  );
} 