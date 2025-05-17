'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import Link from 'next/link';

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
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const BlogCard = styled.article`
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

const BlogImage = styled.div`
  position: relative;
  height: 200px;
  background-color: ${theme.colors.background.dark};
`;

const BlogContent = styled.div`
  padding: ${theme.spacing.xl};

  h2 {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary.main};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.6;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const TagList = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.md};
`;

const Tag = styled.span`
  background: ${theme.colors.background.main};
  color: ${theme.colors.primary.main};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
`;

const ReadMore = styled(Link)`
  display: inline-block;
  color: ${theme.colors.primary.main};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  margin-top: ${theme.spacing.md};

  &:hover {
    text-decoration: underline;
  }
`;

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'Exploring Vancouver Through a Lens',
      excerpt: 'A photographic journey through the hidden gems and iconic locations of Vancouver...',
      date: '2024-03-15',
      image: '/images/blog/vancouver-lens.jpg',
      tags: ['Photography', 'Vancouver', 'City Life'],
      slug: 'exploring-vancouver-lens'
    },
    {
      id: 2,
      title: 'The Evolution of My Digital Art Process',
      excerpt: 'How my digital art workflow has transformed over the years, from traditional to digital...',
      date: '2024-03-10',
      image: '/images/blog/digital-art-process.jpg',
      tags: ['Digital Art', 'Creative Process', 'Technology'],
      slug: 'digital-art-process-evolution'
    },
    // Add more blog posts here
  ];

  return (
    <PageContainer>
      <Header>
        <h1>Blog</h1>
        <p>
          Stories, insights, and behind-the-scenes looks at my creative journey
          in Vancouver and beyond. Exploring art, photography, and the creative process.
        </p>
      </Header>

      <BlogGrid>
        {posts.map((post) => (
          <BlogCard key={post.id}>
            <BlogImage>
              {/* Add ProtectedImage component here once images are ready */}
            </BlogImage>
            <BlogContent>
              <h2>{post.title}</h2>
              <BlogMeta>
                <time>{post.date}</time>
              </BlogMeta>
              <p>{post.excerpt}</p>
              <TagList>
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
              <ReadMore href={`/my-art/blog/${post.slug}`}>
                Read More →
              </ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </PageContainer>
  );
} 