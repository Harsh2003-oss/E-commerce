'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        {/* Media Frame */}
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div className="product-card-media">
            <img
              src={currentImage}
              alt={product.name}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease, opacity 0.25s ease',
              }}
            />

            {/* Badges overlay */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                zIndex: 2,
              }}
            >
              {product.isNew && <span className="badge badge-blue">New Release</span>}
              {product.isBestSeller && <span className="badge badge-amber">Best Seller</span>}
              {discount > 0 && <span className="badge badge-rose">Save {discount}%</span>}
            </div>

            {/* In stock live status */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(7, 8, 12, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#34d399',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                }}
              />
              In Stock
            </div>
          </div>
        </Link>

        {/* Body */}
        <div style={{ padding: '18px 18px 12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#64748b',
              }}
            >
              {product.brand}
            </span>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
                {product.rating}
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                ({product.reviewCount > 999 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
              </span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#f8fafc',
                lineHeight: '1.35',
                marginBottom: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#f8fafc')}
            >
              {product.name}
            </h3>
          </Link>

          {product.tagline && (
            <p
              style={{
                fontSize: '12px',
                color: '#94a3b8',
                lineHeight: '1.4',
                marginBottom: '10px',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.tagline}
            </p>
          )}

          {/* Key Hardware Architecture Preview Chips */}
          {product.highlights && product.highlights.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {product.highlights.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    background: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '6px',
                    color: '#94a3b8',
                    lineHeight: 1.2,
                  }}
                >
                  <strong style={{ color: '#e2e8f0', fontWeight: 600 }}>{h.value}</strong>
                </span>
              ))}
            </div>
          ) : product.features && product.features.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '10px',
                  padding: '3px 8px',
                  background: 'rgba(255, 255, 255, 0.035)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '6px',
                  color: '#cbd5e1',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {product.features[0]}
              </span>
            </div>
          ) : null}

          {/* Color Preview Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: c.hex,
                    border: selectedColor === c.name ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    outline: 'none',
                    padding: 0,
                    boxShadow: selectedColor === c.name ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                />
              ))}
              <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '4px' }}>
                {selectedColor}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Price & Add to Bag */}
      <div
        style={{
          padding: '12px 18px 18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc' }}>
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '13px', color: '#64748b', textDecoration: 'line-through' }}>
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span style={{ fontSize: '10px', color: '#94a3b8' }}>Free 2-day delivery</span>
        </div>

        <button
          onClick={handleQuickAdd}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: added ? '#10b981' : '#ffffff',
            color: '#07080c',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
          }}
          onMouseEnter={(e) => {
            if (!added) e.currentTarget.style.background = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            if (!added) e.currentTarget.style.background = '#ffffff';
          }}
        >
          {added ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            <>
              <ShoppingBag size={14} /> Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}
