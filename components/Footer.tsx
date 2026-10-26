'use client';

import Link from 'next/link';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Shop: [
    { label: 'Smartphones', href: '/shop?category=Smartphones' },
    { label: 'Laptops', href: '/shop?category=Laptops' },
    { label: 'Audio', href: '/shop?category=Audio' },
    { label: 'Gaming', href: '/shop?category=Gaming' },
    { label: 'Smart Home', href: '/shop?category=Smart Home' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/about#careers' },
    { label: 'Press', href: '/about#press' },
    { label: 'Partners', href: '/about#partners' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/contact#faq' },
    { label: 'Shipping Policy', href: '/contact#shipping' },
    { label: 'Returns', href: '/contact#returns' },
    { label: 'Track Order', href: '/contact#track' },
  ],
};

const SOCIALS = [
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#050710',
        borderTop: '1px solid rgba(79,142,247,0.1)',
        padding: '80px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(79,142,247,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '60px',
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4f8ef7, #9b59ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={20} color="white" fill="white" />
              </div>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '20px',
                  background: 'linear-gradient(135deg, #4f8ef7, #9b59ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                VoltEdge
              </span>
            </Link>
            <p style={{ color: '#8b92b8', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', maxWidth: '240px' }}>
              Your premium destination for cutting-edge electronics. Authentic products, unbeatable prices, lightning-fast delivery.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(79,142,247,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b92b8',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(79,142,247,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)';
                    e.currentTarget.style.color = '#4f8ef7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(79,142,247,0.15)';
                    e.currentTarget.style.color = '#8b92b8';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#f0f2ff',
                  marginBottom: '20px',
                  letterSpacing: '0.3px',
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: '#8b92b8',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#4f8ef7')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#8b92b8')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                color: '#f0f2ff',
                marginBottom: '20px',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: Mail, text: 'support@voltedge.tech' },
                { icon: Phone, text: '+91 92348 42190' },
                { icon: MapPin, text: 'Bengaluru' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8b92b8', fontSize: '14px' }}>
                  <Icon size={15} color="#4f8ef7" />
                  {text}
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: '28px' }}>
              <p style={{ color: '#f0f2ff', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                Subscribe to our newsletter
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  id="footer-newsletter-input"
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'rgba(15,18,32,0.8)',
                    border: '1px solid rgba(79,142,247,0.2)',
                    borderRadius: '8px',
                    color: '#f0f2ff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  id="footer-newsletter-btn"
                  style={{
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #4f8ef7, #9b59ff)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.2), transparent)', marginBottom: '28px' }} />

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <p style={{ color: '#4a5080', fontSize: '13px' }}>
            © 2026 VoltEdge Electronics. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: '#4a5080', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#8b92b8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4a5080')}
              >
                {item}
              </a>
            ))}
            <span>Designed & Developed by Harsh Sinha </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
