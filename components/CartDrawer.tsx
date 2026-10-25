'use client';

import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const progress = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diff = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#0e111a',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.7)',
          animation: 'fadeIn 0.25s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>
              Your Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Orders ship within 24 business hours
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div
          style={{
            padding: '14px 24px',
            background: 'rgba(37, 99, 235, 0.08)',
            borderBottom: '1px solid rgba(37, 99, 235, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Truck size={15} color="#60a5fa" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#93c5fd' }}>
              {diff === 0
                ? '🎉 You unlocked FREE Express Delivery!'
                : `Add $${diff.toFixed(2)} more for FREE Express Shipping`}
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '5px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '99px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: diff === 0 ? '#10b981' : '#3b82f6',
                borderRadius: '99px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <p style={{ fontSize: '15px', marginBottom: '16px', color: '#94a3b8' }}>
                Your shopping bag is empty.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary"
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedColor || ''}-${item.selectedVariant || ''}`}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      background: '#07080c',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#f8fafc',
                          lineHeight: '1.3',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '190px',
                        }}
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 8px' }}>
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedVariant && <span> • {item.selectedVariant}</span>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#151926',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '2px 6px',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: '#07080c',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Subtotal</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '12px', color: '#64748b' }}>
              <span>Taxes and shipping calculated at checkout</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px', fontSize: '14px' }}
              >
                Proceed to Checkout <ArrowRight size={15} />
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '11px', fontSize: '13px' }}
              >
                View Full Bag Details
              </Link>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '14px',
                fontSize: '11px',
                color: '#64748b',
              }}
            >
              <ShieldCheck size={14} color="#10b981" />
              <span>256-Bit Bank Level Encryption • Official Warranty</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
