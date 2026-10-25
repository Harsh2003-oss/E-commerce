'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  FileText,
  MessageSquare,
  ShieldAlert,
  PackageCheck,
  Cpu,
  Layers,
  Lock,
  HelpCircle,
  Award,
} from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.label || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'reviews' | 'shipping' | 'warranty'>('specs');
  const [added, setAdded] = useState(false);
  const [bundleIncluded, setBundleIncluded] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Fallbacks for product highlights & in the box
  const productHighlights =
    product.highlights && product.highlights.length > 0
      ? product.highlights
      : product.specs
      ? Object.entries(product.specs).slice(0, 4).map(([label, value]) => ({ label, value }))
      : product.features.slice(0, 4).map((f, i) => ({ label: `Architecture ${i + 1}`, value: f }));

  const boxItems =
    product.inTheBox && product.inTheBox.length > 0
      ? product.inTheBox
      : [
          `${product.name} Factory Sealed Hardware Unit`,
          'High-Speed Braided USB-C Fast-Charging & Sync Cable',
          'Official OEM Quick Setup Manual & Compliance Certificate',
          'VoltEdge 2-Year Serial Verified Warranty Card',
        ];

  // Dynamic price based on variant
  const currentVariantObj = product.variants?.find((v) => v.label === selectedVariant);
  const activePrice = product.price + (currentVariantObj?.priceDelta || 0);
  const originalPrice = product.originalPrice
    ? product.originalPrice + (currentVariantObj?.priceDelta || 0)
    : undefined;

  const discount = originalPrice
    ? Math.round(((originalPrice - activePrice) / originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBundleAdd = () => {
    addToCart(product, 1, selectedColor, selectedVariant);
    if (relatedProducts[0]) {
      addToCart(relatedProducts[0], 1);
    }
  };

  return (
    <div style={{ background: '#07080c', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Breadcrumb Header */}
      <section style={{ padding: '24px 0 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} />
            <Link href="/shop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Shop</Link>
            <ChevronRight size={13} />
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>
              {product.category}
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: '#ffffff', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.name}
            </span>
          </div>
        </div>
      </section>

      {/* Main Product Showcase Grid */}
      <section style={{ padding: '40px 0 64px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '56px',
              alignItems: 'start',
            }}
          >
            {/* Left Photo Gallery */}
            <div>
              {/* Primary Active Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  background: '#0d1019',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                }}
              >
                <img
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.2s ease',
                  }}
                />

                {discount > 0 && (
                  <span
                    className="badge badge-rose"
                    style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}
                  >
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {product.images.map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedImg(idx)}
                      style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        padding: 0,
                        border: selectedImg === idx ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: '#0e111a',
                        cursor: 'pointer',
                        boxShadow: selectedImg === idx ? '0 0 14px rgba(59, 130, 246, 0.4)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges Trio */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginTop: '28px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px',
                }}
              >
                {[
                  { icon: ShieldCheck, title: '100% Genuine', sub: 'Authorized Stock' },
                  { icon: Truck, title: 'Free 2-Day', sub: 'Insured Courier' },
                  { icon: RotateCcw, title: '30-Day Return', sub: 'Zero Restock Fee' },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} style={{ textAlign: 'center' }}>
                    <Icon size={18} color="#3b82f6" style={{ margin: '0 auto 6px' }} />
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>{title}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Product Buy Box */}
            <div>
              {/* Brand & Stock Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {product.brand} • SKU: {product.sku || 'VOLT-2026-X'}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#34d399',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  In Stock ({product.stock} units ready)
                </span>
              </div>

              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '8px' }}>
                {product.name}
              </h1>

              {product.tagline && (
                <p style={{ fontSize: '15px', color: '#93c5fd', fontWeight: 500, marginBottom: '16px' }}>
                  {product.tagline}
                </p>
              )}

              {/* Rating Review Summary */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={i < Math.round(product.rating) ? '#f59e0b' : '#334155'}
                      color={i < Math.round(product.rating) ? '#f59e0b' : '#334155'}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>{product.rating}</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>
                  ({product.reviewCount.toLocaleString()} verified customer reviews)
                </span>
              </div>

              {/* Hardware Highlights Quick Grid */}
              {productHighlights && productHighlights.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    marginBottom: '22px',
                  }}
                >
                  {productHighlights.slice(0, 4).map((h, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(255, 255, 255, 0.025)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          color: '#64748b',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                        }}
                      >
                        {h.label}
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#f8fafc',
                          marginTop: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {h.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                  padding: '16px 20px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  marginBottom: '28px',
                }}
              >
                <span style={{ fontSize: '34px', fontWeight: 800, color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif' }}>
                  ${activePrice.toLocaleString()}
                </span>
                {originalPrice && (
                  <span style={{ fontSize: '18px', color: '#64748b', textDecoration: 'line-through' }}>
                    ${originalPrice.toLocaleString()}
                  </span>
                )}
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, marginLeft: 'auto' }}>
                  Includes 2-Year Official Warranty
                </span>
              </div>

              {/* Color Swatch Selector */}
              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px' }}>
                    Finish: <span style={{ color: '#ffffff', fontWeight: 700 }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: selectedColor === c.name ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          border: selectedColor === c.name ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'pointer',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 600,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: c.hex,
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                          }}
                        />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant / Storage Capacity Selector */}
              {product.variants && product.variants.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px' }}>
                    Configuration & Capacity:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant === v.label;
                      return (
                        <button
                          key={v.label}
                          type="button"
                          onClick={() => setSelectedVariant(v.label)}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '10px',
                            background: isSelected ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#ffffff',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ fontSize: '13px', fontWeight: 700 }}>{v.label}</div>
                          <div style={{ fontSize: '11px', color: isSelected ? '#93c5fd' : '#64748b', marginTop: '2px' }}>
                            {v.priceDelta === 0 ? 'Standard Config' : `+$${v.priceDelta}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Bag CTA */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
                {/* Quantity */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#151926',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '4px 8px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: '14px',
                    fontSize: '15px',
                    background: added ? '#10b981' : '#ffffff',
                    color: '#07080c',
                  }}
                >
                  {added ? (
                    <>
                      <Check size={18} /> Added to Shopping Bag!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Bag — ${(activePrice * quantity).toLocaleString()}
                    </>
                  )}
                </button>
              </div>

              {/* Delivery Promise Box */}
              <div
                style={{
                  padding: '14px 18px',
                  background: 'rgba(37, 99, 235, 0.06)',
                  border: '1px solid rgba(37, 99, 235, 0.15)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#94a3b8',
                  lineHeight: '1.5',
                }}
              >
                <div style={{ color: '#f8fafc', fontWeight: 600, marginBottom: '2px' }}>
                  ⚡ Guaranteed Express Dispatch
                </div>
                Order within <strong>3 hours 25 mins</strong> to receive delivery by{' '}
                <strong style={{ color: '#38bdf8' }}>Wednesday, Oct 28</strong>. Sealed with tamper-evident serial tape.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FREQUENTLY BOUGHT TOGETHER BUNDLE ===== */}
      {relatedProducts[0] && (
        <section style={{ padding: '0 0 64px' }}>
          <div className="container">
            <div
              style={{
                background: '#0d101a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '28px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '18px' }}>
                Frequently Bought Together
              </h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                  <span style={{ fontSize: '20px', color: '#64748b' }}>+</span>
                  <img
                    src={relatedProducts[0].images[0]}
                    alt={relatedProducts[0].name}
                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc' }}>
                    Bundle: {product.name} + {relatedProducts[0].name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>
                    Includes 10% Bundle Discount
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                      ${Math.round((activePrice + relatedProducts[0].price) * 0.9).toLocaleString()}
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b', textDecoration: 'line-through' }}>
                      ${(activePrice + relatedProducts[0].price).toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleBundleAdd}
                    className="btn btn-secondary"
                    style={{ fontSize: '13px' }}
                  >
                    Add Both to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== INTERACTIVE SPECIFICATIONS & TABS ===== */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '14px',
              marginBottom: '36px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'box', label: `In The Box (${boxItems.length})` },
              { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
              { id: 'shipping', label: 'Shipping & Returns' },
              { id: 'warranty', label: 'Official Warranty' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`tab-pill ${activeTab === tab.id ? 'active' : ''}`}
                style={{ fontSize: '14px', padding: '10px 20px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Technical Specs */}
          {activeTab === 'specs' && (
            <div style={{ background: '#0d101a', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>
                  Hardware Architecture & Engineering Specifications
                </h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                  Official OEM technical parameters verified by VoltEdge quality control laboratories.
                </p>
              </div>

              {product.specs ? (
                <div>
                  {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                    <div
                      key={specKey}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '220px 1fr',
                        padding: '16px 28px',
                        background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        fontSize: '14px',
                      }}
                    >
                      <span style={{ color: '#94a3b8', fontWeight: 600 }}>{specKey}</span>
                      <span style={{ color: '#f8fafc' }}>{specVal}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '28px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {product.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '14px' }}>
                        <Check size={16} color="#3b82f6" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab: In The Box Packaging */}
          {activeTab === 'box' && (
            <div style={{ background: '#0d101a', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              <div
                style={{
                  padding: '24px 28px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>
                    Factory Sealed Retail Packaging Contents
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                    Genuine manufacturer carton protected by serialized tamper-evident holographic security seal.
                  </p>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    color: '#34d399',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  <Check size={14} /> Brand New OEM Factory Sealed
                </div>
              </div>

              <div
                style={{
                  padding: '28px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                }}
              >
                {boxItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px 20px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(59, 130, 246, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#60a5fa',
                        flexShrink: 0,
                      }}
                    >
                      <PackageCheck size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc' }}>{item}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                        Included Component #{idx + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: '16px 28px',
                  background: 'rgba(255, 255, 255, 0.015)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '12px',
                  color: '#94a3b8',
                }}
              >
                <ShieldCheck size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
                <span>
                  All packaging materials are 100% fiber-based and certified plastic-neutral by OEM environmental sustainability standards.
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Customer Reviews */}
          {activeTab === 'reviews' && (
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px',
                  marginBottom: '36px',
                  background: '#0d101a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                <div>
                  <div style={{ fontSize: '48px', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>
                    {product.rating}
                  </div>
                  <div style={{ display: 'flex', gap: '3px', margin: '8px 0' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                    Based on {product.reviewCount} verified consumer purchases
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                  {[
                    { stars: 5, pct: 88 },
                    { stars: 4, pct: 9 },
                    { stars: 3, pct: 2 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 0 },
                  ].map(({ stars, pct }) => (
                    <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                      <span style={{ width: '40px', color: '#94a3b8' }}>{stars} ★</span>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: '99px' }} />
                      </div>
                      <span style={{ width: '32px', textAlign: 'right', color: '#64748b' }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: '20px 24px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>{rev.author}</span>
                          {rev.verified && (
                            <span style={{ fontSize: '11px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                              <Check size={12} /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                        {rev.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                        {rev.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#94a3b8', padding: '24px 0' }}>No written reviews yet for this model.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Returns */}
          {activeTab === 'shipping' && (
            <div
              style={{
                background: '#0d101a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
              }}
            >
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Courier Logistics & Delivery
                </h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  Orders placed before 4 PM EST ship the same business day. We partner exclusively with FedEx Express and DHL Priority to guarantee sealed tamper-evident transportation.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  30-Day Hassle-Free Returns
                </h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  If the hardware does not meet your performance expectations, initiate a free return within 30 days. Full refund processed within 48 hours of inspection.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Warranty */}
          {activeTab === 'warranty' && (
            <div
              style={{
                background: '#0d101a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Official Manufacturer Warranty Coverage
              </h4>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
                {product.warranty || '2-Year Direct Factory Warranty included with serial registration.'}
              </p>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                All repairs or replacements are handled exclusively by Apple Authorized Service Providers, Sony Pro Service Centers, or Samsung Care+ certified engineers using genuine OEM parts.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== ENGINEERING ARCHITECTURE DEEP DIVE ===== */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Built For Demanding Workflows
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Architectural <span className="gradient-text">Engineering</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '6px' }}>
              Precision hardware standards designed to endure sustained computational and physical stress.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: Cpu,
                title: 'Sustained Thermal Headroom',
                desc: 'Vapor-chamber liquid cooling and optimized aerodynamic dissipation prevent clock throttling even during multi-hour render jobs.',
                metric: '0% Thermal Throttling',
              },
              {
                icon: Layers,
                title: 'Factory Color & Optical Calibrated',
                desc: 'Every display and sensor unit undergoes individual spectral calibration with Delta-E < 1.0 color accuracy certification.',
                metric: 'Delta-E < 1.0 Certified',
              },
              {
                icon: Lock,
                title: 'Cryptographic Security Enclave',
                desc: 'Hardware-isolated secure enclave safeguards biometric credentials, cryptographic keys, and tamper-resistant serial logging.',
                metric: 'FIPS 140-3 Level 3',
              },
            ].map(({ icon: Icon, title, desc, metric }) => (
              <div
                key={title}
                style={{
                  background: '#0d101a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(59, 130, 246, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60a5fa',
                      marginBottom: '18px',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                    {desc}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ color: '#64748b' }}>Benchmark Verification</span>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>{metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FREQUENTLY ASKED QUESTIONS ===== */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Common Inquiries
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Device Compatibility & Support FAQ
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'Is this hardware brand-new, factory-sealed, and unlocked?',
                a: 'Yes, 100%. VoltEdge exclusively stocks factory-sealed OEM retail inventory with serialized holographic security seals. All mobile and wireless devices are carrier-unlocked for worldwide bands.',
              },
              {
                q: 'How does the official manufacturer warranty work?',
                a: 'Your serial number is automatically registered with the manufacturer on dispatch date. You can take your hardware to any Apple Store, Sony Pro Service Center, Samsung Experience Store, or authorized repair partner worldwide.',
              },
              {
                q: 'What charging speeds and Power Delivery protocols are supported?',
                a: 'This device complies with international USB Power Delivery 3.0 / 3.1 standards. We recommend using GaN fast chargers rated at or above the device minimum wattage for peak charging velocity.',
              },
              {
                q: 'What is the return window if it does not fit my workflow?',
                a: 'We offer a 30-day trial window with zero restocking fees. Simply retain the original retail packaging and included accessories to receive a full refund.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#0d101a',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="#94a3b8"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                        marginLeft: '16px',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 20px',
                        fontSize: '13px',
                        color: '#94a3b8',
                        lineHeight: '1.6',
                        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                        paddingTop: '16px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== RELATED HARDWARE ===== */}
      {relatedProducts.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '64px' }}>
          <div className="container">
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '28px' }}>
              Complementary Hardware & Ecosystem Devices
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p._id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
