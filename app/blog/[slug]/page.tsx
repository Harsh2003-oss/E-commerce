import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Tag, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { BLOG_POSTS } from '@/data/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} | VoltEdge Dispatch`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p._id !== post._id).slice(0, 2);

  return (
    <div style={{ background: '#07080c', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Article Header */}
      <section style={{ padding: '40px 0 32px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            <ArrowLeft size={14} /> Back to Dispatch
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <span className="badge badge-blue">{post.category}</span>
            <span style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {post.readTime} min read
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 46px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {post.authorAvatar && (
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>{post.author}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{post.authorRole || 'Hardware Technical Editor'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Cover Frame */}
      <div className="container" style={{ maxWidth: '860px', padding: '36px 24px' }}>
        <div
          style={{
            width: '100%',
            height: '420px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="container" style={{ maxWidth: '780px' }}>
        <div
          style={{
            color: '#cbd5e1',
            fontSize: '16px',
            lineHeight: '1.85',
          }}
        >
          <p
            style={{
              fontSize: '19px',
              color: '#f8fafc',
              fontWeight: 500,
              lineHeight: '1.6',
              marginBottom: '32px',
              borderLeft: '3px solid #3b82f6',
              paddingLeft: '18px',
            }}
          >
            {post.excerpt}
          </p>

          <div
            style={{
              whiteSpace: 'pre-line',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            {post.content}
          </div>
        </div>

        {/* Author Bio Card */}
        <div
          style={{
            marginTop: '56px',
            padding: '28px',
            background: '#0d101a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {post.authorAvatar && (
            <img
              src={post.authorAvatar}
              alt={post.author}
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
              Written by {post.author}
            </h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
              {post.authorRole || 'Senior Hardware Specialist'} at VoltEdge Labs. Testing and analyzing computing silicon, camera sensors, and audiophile acoustic gear.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '24px' }}>
              Continue Reading
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/blog/${r.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="card"
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase' }}>
                      {r.category}
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '6px 0 8px' }}>
                      {r.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{r.readTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
