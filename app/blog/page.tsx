import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, User, Tag, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Hardware Journal & Architecture Benchmarks | VoltEdge',
  description: 'In-depth engineering reviews, silicon architecture comparisons, and workspace ergonomics by VoltEdge technical editors.',
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div style={{ background: '#07080c', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Page Header */}
      <section style={{ padding: '40px 0 48px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              The VoltEdge Dispatch
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Hardware Journal & <span className="gradient-text">Analysis</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.6', marginTop: '14px' }}>
              Deep-dive silicon architecture breakdowns, acoustic psychoacoustics, and ergonomic workstation curation from our engineering staff.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Lead Story */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <Link
            href={`/blog/${featured.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                overflow: 'hidden',
                borderRadius: '20px',
                background: '#0d101a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              }}
            >
              {/* Cover Image Frame */}
              <div style={{ height: '360px', width: '100%', position: 'relative' }}>
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-blue" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                  Lead Architecture Feature
                </span>
              </div>

              {/* Story Summary */}
              <div style={{ padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                    {featured.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {featured.readTime} min technical read
                  </span>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', lineHeight: '1.3', marginBottom: '16px' }}>
                  {featured.title}
                </h2>

                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.7', marginBottom: '28px' }}>
                  {featured.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {featured.authorAvatar && (
                      <img
                        src={featured.authorAvatar}
                        alt={featured.author}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>{featured.author}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{featured.authorRole || 'Technical Editor'}</div>
                    </div>
                  </div>

                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#3b82f6' }}>
                    Read Full Paper <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid of Articles */}
      <section style={{ padding: '24px 0 64px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
              Recent Dispatches & Guides
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '28px',
            }}
          >
            {rest.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#0d101a',
                  }}
                >
                  <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase' }}>
                          {post.category}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          • {post.readTime} min read
                        </span>
                      </div>

                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', lineHeight: '1.35', marginBottom: '10px' }}>
                        {post.title}
                      </h3>

                      <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '20px' }}>
                        {post.excerpt}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>
                        {post.author}
                      </span>
                      <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Read Article <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
