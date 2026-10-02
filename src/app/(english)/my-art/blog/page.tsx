'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import Link from '@/i18n/LocalizedLink';
import SimpleNav from "@/components/SimpleNav";
import { useTranslation } from '@/i18n/TranslationContext';
import content from '@/i18n/locales/creative-content.en.json';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']};
  padding-top: calc(${theme.spacing['2xl']} + 64px);
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
  const { t, locale } = useTranslation();
  const posts = [
    {
      id: 1,
      date: '2024-03-15',
      image: '/images/blog/vancouver-lens.jpg',
      slug: 'exploring-vancouver-lens'
    },
    {
      id: 2,
      date: '2024-03-10',
      image: '/images/blog/digital-art-process.jpg',
      slug: 'digital-art-process-evolution'
    },
    // Add more blog posts here
  ];

  return (
    <>
      <SimpleNav />
      <PageContainer>
      <Header>
        <h1>{t('creativeContent.blog.title')}</h1>
        <p>{t('creativeContent.blog.intro')}</p>
      </Header>

      <BlogGrid>
        {posts.map((post, postIndex) => (
          <BlogCard key={post.id}>
            <BlogImage>
              {/* Add ProtectedImage component here once images are ready */}
            </BlogImage>
            <BlogContent>
              <h2>{t(`creativeContent.blog.posts.${postIndex}.title`)}</h2>
              <BlogMeta>
                <time dateTime={post.date}>{new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${post.date}T00:00:00Z`))}</time>
              </BlogMeta>
              <p>{t(`creativeContent.blog.posts.${postIndex}.excerpt`)}</p>
              <TagList>
                {content.blog.posts[postIndex].tags.map((_, tagIndex) => (
                  <Tag key={tagIndex}>{t(`creativeContent.blog.posts.${postIndex}.tags.${tagIndex}`)}</Tag>
                ))}
              </TagList>
              <ReadMore href={`/my-art/blog/${post.slug}`}>
                {t('creativeContent.blog.readMore')}
              </ReadMore>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </PageContainer>
    </>
  );
} 