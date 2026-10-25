'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Zap, Phone, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ALL_PRODUCTS } from '@/data/mockData';
import { Product } from '@/types';

const NAV_LINKS = [
  { href: '/shop', label: 'All Hardware' },
  { href: '/shop?category=Smartphones', label: 'Phones' },
  { href: '/shop?category=Laptops', label: 'Laptops' },
  { href: '/shop?category=Wearables', label: 'Wearables' },
  { href: '/shop?category=Audio', label: 'Audio' },
  { href: '/shop?category=Gaming', label: 'Gaming' },
  { href: '/blog', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Support' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchQuery('');
    setSearchFocused(false);
  }, [pathname]);

  // Click outside to close search preview
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search live across title, brand, category, tagline and specs
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase().trim();
    const matches = ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.highlights && p.highlights.some((h) => h.value.toLowerCase().includes(q)))
    ).slice(0, 5);
    setSearchResults(matches);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900 }}>
      {/* Top Announcement Bar */}
      <div
        style={{
          background: '#040508',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '6px 24px',
          fontSize: '11px',
          color: '#94a3b8',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
              <Truck size={13} color="#3b82f6" />
              Free Worldwide Express Delivery on orders $150+
            </span>
            <span style={{ display: 'none', color: '#64748b' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={13} color="#10b981" />
              Authorized Brand Retailer with Official Warranty
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a
              href="tel:18008658334"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#94a3b8',
                textDecoration: 'none',
              }}
            >
              <Phone size={12} /> +91 92348 42190
            </a>
            <Link href="/contact#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          background: scrolled ? 'rgba(7, 8, 12, 0.95)' : 'rgba(7, 8, 12, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'background 0.3s ease',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07080c',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.25)',
              }}
            >
              <Zap size={18} fill="#07080c" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  fontSize: '18px',
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  lineHeight: '1.1',
                }}
              >
                VOLTEDGE
              </span>
              <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: '#64748b', fontWeight: 600 }}>
                ELECTRONICS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Search Bar & Cart Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            {/* Live Search Input */}
            <div ref={searchRef} style={{ position: 'relative', width: '220px' }}>
              <form onSubmit={handleSearchSubmit}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: searchFocused ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0 12px',
                    height: '38px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Search size={15} color="#94a3b8" style={{ marginRight: '8px', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search devices, chips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontSize: '13px',
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </form>

              {/* Instant Search Dropdown Preview */}
              {searchFocused && searchResults.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '340px',
                    background: '#0e111a',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    padding: '8px',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
                    zIndex: 1000,
                  }}
                >
                  <div style={{ padding: '8px 10px', fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Matching Products
                  </div>
                  {searchResults.map((p) => (
                    <Link
                      key={p._id}
                      href={`/product/${p.slug}`}
                      onClick={() => setSearchFocused(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#ffffff',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          {p.brand} • <span style={{ color: '#3b82f6', fontWeight: 600 }}>${p.price}</span>
                        </div>
                      </div>
                      <ChevronRight size={14} color="#64748b" />
                    </Link>
                  ))}
                  <Link
                    href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchFocused(false)}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '10px',
                      fontSize: '12px',
                      color: '#3b82f6',
                      fontWeight: 600,
                      textDecoration: 'none',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      marginTop: '4px',
                    }}
                  >
                    View all results for &quot;{searchQuery}&quot; →
                  </Link>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
            >
              <ShoppingBag size={16} />
              <span>Bag</span>
              {cartCount > 0 && (
                <span
                  style={{
                    background: '#3b82f6',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '99px',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'none',
              }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          style={{
            background: '#07080c',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#f8fafc',
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
