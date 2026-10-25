import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Headphones, Star, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import { ALL_PRODUCTS, FEATURED_PRODUCTS, CATEGORIES, TESTIMONIALS, STATS, BRAND_LOGOS } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'VoltEdge Electronics | Premium Hardware & Workstations',
  description:
    'Curated electronics store for tech enthusiasts. Flagship smartphones, Apple silicon laptops, audiophile acoustic gear, and professional camera gear with 2-year warranty.',
};

export default function HomePage() {
  const flashDeals = ALL_PRODUCTS.filter((p) => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  return (
    <div style={{ background: '#07080c' }}>
      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          position: 'relative',
          padding: '40px 0 80px',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1000px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.12) 0%, rgba(6, 182, 212, 0.05) 45%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left Copy */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '99px',
                  padding: '6px 14px',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    boxShadow: '0 0 10px #3b82f6',
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.02em' }}>
                  2026 Flagship Hardware Release
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(38px, 5.2vw, 64px)',
                  lineHeight: '1.08',
                  marginBottom: '22px',
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                Engineered for <br />
                <span className="gradient-text">Unrivaled Power.</span>
              </h1>

              <p
                style={{
                  fontSize: '16px',
                  color: '#94a3b8',
                  lineHeight: '1.65',
                  marginBottom: '36px',
                  maxWidth: '520px',
                }}
              >
                From custom 3nm Apple Silicon workstations to 200MP AI telephoto sensors. Sourced directly through authorized factory channels with 2-year warranty coverage.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '44px' }}>
                <Link href="/shop" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}>
                  Explore All Products <ArrowRight size={16} />
                </Link>
                <Link href="/product/macbook-pro-16-m4-pro" className="btn btn-secondary" style={{ padding: '14px 24px', fontSize: '15px' }}>
                  MacBook M4 Pro Showcase
                </Link>
              </div>

              {/* Live Trust Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                  gap: '20px',
                  paddingTop: '28px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', fontFamily: 'Space Grotesk, sans-serif' }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Product Card Showcase */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(145deg, #101420, #0a0d15)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(37, 99, 235, 0.15)',
              }}
            >
              {/* Product Image Frame */}
              <div style={{ position: 'relative', height: '360px', width: '100%', background: '#05070c' }}>
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
                  alt="Apple MacBook Pro 16 M4 Pro"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <span className="badge badge-blue">Staff Pick</span>
                  <span className="badge badge-rose">Save $200</span>
                </div>
              </div>

              {/* Card Meta */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Apple Flagship Workstation
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                      MacBook Pro 16&quot; (M4 Pro)
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
                      $2,499
                    </div>
                    <span style={{ fontSize: '13px', color: '#64748b', textDecoration: 'line-through' }}>
                      $2,699
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '18px' }}>
                  14-Core CPU, 20-Core GPU, 24GB Unified Memory, and Liquid Retina XDR with 120Hz ProMotion.
                </p>

                {/* Specs Pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
                  {['3nm M4 Pro Silicon', '24 Hr Battery', 'Thunderbolt 5'].map((feature) => (
                    <span
                      key={feature}
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#cbd5e1',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                      }}
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>

                {/* Card CTA */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link
                    href="/product/macbook-pro-16-m4-pro"
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '12px' }}
                  >
                    View Device Specs
                  </Link>
                  <Link
                    href="/shop?category=Laptops"
                    className="btn btn-secondary"
                    style={{ padding: '12px 18px' }}
                  >
                    Compare
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AUTHORIZED BRAND PARTNERS ===== */}
      <section style={{ padding: '36px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: '#05060a' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>
            Official Authorized Retail Partner
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              opacity: 0.85,
            }}
          >
            {BRAND_LOGOS.map((brand) => (
              <span
                key={brand.name}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#94a3b8',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {brand.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY WITH REAL PHOTOGRAPHY ===== */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Curated Hardware
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px' }}>
                Shop by <span className="gradient-text">Ecosystem</span>
              </h2>
            </div>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#3b82f6',
                textDecoration: 'none',
              }}
            >
              Browse Complete Catalog <ChevronRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card"
                  style={{
                    position: 'relative',
                    height: '240px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px',
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.55)',
                      transition: 'transform 0.4s ease, filter 0.4s ease',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {cat.count} Products
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLASH DEALS OF THE DAY ===== */}
      <section
        style={{
          padding: '80px 0',
          background: 'linear-gradient(180deg, #090b10, #0c0f17)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '36px',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span className="badge badge-rose">Limited Time</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Refreshes in: 14h 28m 42s</span>
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#f8fafc' }}>
                Featured Deals of the Day
              </h2>
            </div>
            <Link href="/shop" className="btn btn-outline" style={{ fontSize: '13px' }}>
              View All Deals
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {flashDeals.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED FLAGSHIPS SHOWCASE ===== */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Premium Selection
            </span>
            <h2 style={{ fontSize: '34px', fontWeight: 800, marginTop: '6px', color: '#ffffff' }}>
              Industry Standard Flagships
            </h2>
            <p style={{ fontSize: '15px', color: '#94a3b8', marginTop: '10px' }}>
              Handpicked hardware tested against rigorous benchmark standards for longevity, thermals, and user experience.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {FEATURED_PRODUCTS.map((prod, idx) => (
              <ProductCard key={prod._id} product={prod} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE VOLTEDGE ADVANTAGE ===== */}
      <section
        style={{
          padding: '80px 0',
          background: '#0a0c14',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff' }}>
              Why Tech Professionals Choose VoltEdge
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '6px' }}>
              We eliminate gray market risk with verified provenance and white-glove warranty support.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: ShieldCheck,
                title: '100% Factory Sealed Genuine',
                desc: 'Direct distribution contracts with Apple, Sony, Samsung, and Bose. Zero refurbished or gray-market inventory.',
              },
              {
                icon: Truck,
                title: 'Free Insured 2-Day Courier',
                desc: 'Every parcel is packed in anti-static tamper-evident boxes with signature verification and GPS tracking.',
              },
              {
                icon: RotateCcw,
                title: '30-Day Hassle-Free Returns',
                desc: 'Unsatisfied with ergonomics or sound signature? Return in original box with zero restocking fees.',
              },
              {
                icon: Headphones,
                title: 'Dedicated Hardware Concierge',
                desc: 'Chat directly with certified hardware specialists for pre-purchase compatibility or warranty claims.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card"
                style={{
                  padding: '28px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(37, 99, 235, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <Icon size={22} color="#3b82f6" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VERIFIED CUSTOMER TESTIMONIALS ===== */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Real Feedback
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: '#ffffff' }}>
              Verified Buyer Experiences
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '24px',
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '20px' }}>
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {t.name}
                      <CheckCircle size={13} color="#10b981" />
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{t.role}</div>
                    <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 600, marginTop: '2px' }}>
                      Purchased: {t.product}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER CLUB ===== */}
      <section style={{ padding: '60px 0 90px' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(145deg, #121624, #0b0e17)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '48px 32px',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(37, 99, 235, 0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Sparkles size={20} color="#3b82f6" />
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Unlock $50 Off Your First Order
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '480px', margin: '0 auto 28px' }}>
              Join 85,000+ engineers, creators, and audiophiles. Receive firmware alerts, early flash access, and invite-only hardware drops.
            </p>

            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
