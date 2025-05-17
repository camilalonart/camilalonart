import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '../styles/theme';
import SecureImage from './SecureImage';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  slug: string;
}

interface BlogProps {
  posts: BlogPost[];
  dark?: boolean;
}

const BlogSection = styled.section<{ dark: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.main};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
`;

const BlogHeader = styled.div`
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogCard = styled(Link)`
  display: block;
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const BlogImage = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const StyledSecureImage = styled(SecureImage)`
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: ${theme.spacing.xl};
  
  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.primary.main};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  
  span {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }
`;

const CategoryBadge = styled.div`
  background: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  z-index: 1;
`;

export default function Blog({ posts, dark = false }: BlogProps) {
  return (
    <BlogSection dark={dark}>
      <BlogHeader>
        <h2>Latest Insights</h2>
        <p>
          Explore our latest thoughts, tips, and behind-the-scenes content
          about photography and creative work.
        </p>
      </BlogHeader>

      <BlogGrid>
        {posts.map((post) => (
          <BlogCard key={post.id} href={`/blog/${post.slug}`}>
            <BlogImage>
              <CategoryBadge>{post.category}</CategoryBadge>
              <StyledSecureImage
                src={post.image}
                alt={post.title}
                priority={post.id <= 3}
                quality={85}
              />
            </BlogImage>
            <BlogContent>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <BlogMeta>
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {post.date}
                </span>
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.readTime}
                </span>
              </BlogMeta>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogSection>
  );
} 