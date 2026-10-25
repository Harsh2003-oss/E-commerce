import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, ShieldCheck, Globe, Award, CheckCircle, Cpu } from 'lucide-react';
import { STATS } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'About Us | VoltEdge Electronics Provenance',
  description: 'Learn about VoltEdge Electronics — our mission, authentic supply chains, and the engineering team curating premium computing hardware.',
};

const TEAM = [
  {
    name: 'Vikram Nair',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Former Hardware Logistics Director. Passionate about eliminating counterfeit components in consumer computing.',
  },
  {
    name: 'Ananya Iyer',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Distributed systems architect. Spearheads our real-time inventory serialization and quality control labs.',
  },
  {
    name: 'Marcus Chen',
    role: 'VP of Hardware Curation',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Benchmark engineer with an obsession for silicon thermals, acoustic dampening, and mechanical switches.',
  },
  {
    name: 'Elena Vance',
    role: 'Head of Customer Concierge',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Oversees 24/7 dedicated hardware support and white-glove warranty replacements.',
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Zero Gray-Market Tolerance',
    desc: 'Every single SKU is verified via cryptographic factory serial numbers and direct OEM distribution channels.',
    color: '#3b82f6',
  },
  {
    icon: Cpu,
    title: 'Engineered Evaluation',
    desc: 'We do not list inventory simply to fill shelves. Every model undergoes extensive thermal, battery, and ergonomic profiling.',
    color: '#06b6d4',
  },
  {
    icon: Globe,
    title: 'Sustainable Packaging',
    desc: '100% recycled structural honeycomb cardboard and biodegradable water-soluble air cushions for transit.',
    color: '#10b981',
  },
  {
    icon: Award,
    title: 'Direct Brand Warranty',
    desc: 'All repairs or diagnostics are performed by certified Apple, Sony, and Samsung authorized repair centers.',
    color: '#f59e0b',
  },
];

const MILESTONES = [
  { year: '2021', event: 'VoltEdge established as a specialist workstation supplier for Silicon Valley and Bangalore engineers.' },
  { year: '2022', event: 'Signed official direct retailer contracts with Sony Professional Audio and Apple Authorized Distribution.' },
  { year: '2023', event: 'Launched 2-Day Insured Express Courier across 45 countries with tamper-evident packaging.' },
  { year: '2024', event: 'Crossed 250,000 verified orders with a 99.4% positive hardware satisfaction rating.' },
  { year: '2025', event: 'Introduced on-site custom thermal benchmarking reports included in every workstation purchase.' },
  { year: '2026', event: 'Surpassed $50M in hardware distribution with over 450,000 active technology enthusiasts.' },
];

export default function AboutPage() {
  return (
    <div style={{ background: '#07080c', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* ===== HERO ===== */}
      <section style={{ padding: '40px 0 64px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              The VoltEdge Standard
            </span>
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', marginTop: '6px', lineHeight: '1.15' }}>
              Curating Technology Without Compromise.
            </h1>
            <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.7', marginTop: '18px' }}>
              We founded VoltEdge out of frustration with gray-market counterfeits, misleading spec sheets, and indifferent customer service. We set out to build the definitive trusted destination for authentic consumer electronics.
            </p>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              marginTop: '56px',
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="card"
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#f8fafc', fontFamily: 'Space Grotesk, sans-serif' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Guiding Principles
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              The Core Values We Live By
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="card"
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: '#0d101a',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${color}18`,
                    border: `1px solid ${color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
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

      {/* ===== LEADERSHIP TEAM WITH REAL PORTRAITS ===== */}
      <section
        style={{
          padding: '80px 0',
          background: '#0a0d15',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Hardware Leadership
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              The Team Behind the Hardware
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="card"
                style={{
                  overflow: 'hidden',
                  borderRadius: '16px',
                  background: '#0e121d',
                }}
              >
                <img
                  src={m.image}
                  alt={m.name}
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>{m.name}</h3>
                  <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600, marginBottom: '10px' }}>
                    {m.role}
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOURNEY TIMELINE ===== */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Evolution
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Our Five-Year Trajectory
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {MILESTONES.map((milestone) => (
              <div
                key={milestone.year}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  padding: '18px 24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#3b82f6',
                    fontFamily: 'Space Grotesk, sans-serif',
                    minWidth: '55px',
                  }}
                >
                  {milestone.year}
                </span>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
                  {milestone.event}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/shop" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Shop Authentic Gear <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
