'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoError, setPromoError] = useState('');

  const shipping = cartTotal >= 150 ? 0 : 15;
  const estimatedTax = Math.round(cartTotal * 0.08);
  const finalTotal = Math.max(0, cartTotal + shipping + estimatedTax - discountAmount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'VOLT50') {
      setDiscountAmount(50);
      setPromoSuccess(true);
    } else if (promoCode.trim().toUpperCase() === 'TECH10') {
      const tenPercent = Math.round(cartTotal * 0.1);
      setDiscountAmount(tenPercent);
      setPromoSuccess(true);
    } else {
      setPromoError('Invalid coupon. Try "VOLT50" for $50 off or "TECH10" for 10% off.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '60px 24px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <ShoppingBag size={36} color="#64748b" />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
          Your shopping bag is empty
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '420px', marginBottom: '28px' }}>
          Explore our certified electronics catalog and configure your ideal setup with express worldwide delivery.
        </p>
        <Link href="/shop" className="btn btn-primary" style={{ padding: '12px 28px' }}>
          Explore Hardware
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#07080c', minHeight: '100vh', padding: '40px 0 96px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff' }}>
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
              Items are reserved in your bag for the next 60 minutes
            </p>
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
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Items List */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedColor || ''}-${item.selectedVariant || ''}`}
                  className="card"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    borderRadius: '16px',
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{
                      width: '96px',
                      height: '96px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      background: '#0e111a',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase' }}>
                          {item.brand}
                        </span>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', lineHeight: '1.3', marginTop: '2px' }}>
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 14px' }}>
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedVariant && <span> • Config: {item.selectedVariant}</span>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#151926',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '3px 8px',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff' }}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Right Summary Box */}
          <div
            style={{
              background: '#0d101a',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '28px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={applyPromo} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Promo Code (e.g. VOLT50)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input-field"
                  style={{ textTransform: 'uppercase', fontSize: '13px' }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0 18px', fontSize: '13px' }}>
                  Apply
                </button>
              </div>
              {promoSuccess && (
                <div style={{ fontSize: '12px', color: '#34d399', marginTop: '6px', fontWeight: 600 }}>
                  ✓ Promo code applied successfully! (-${discountAmount})
                </div>
              )}
              {promoError && (
                <div style={{ fontSize: '12px', color: '#f43f5e', marginTop: '6px' }}>
                  {promoError}
                </div>
              )}
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Subtotal</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>${cartTotal.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Estimated Express Courier</span>
                <span style={{ color: shipping === 0 ? '#34d399' : '#ffffff', fontWeight: 600 }}>
                  {shipping === 0 ? 'FREE' : `$${shipping}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Estimated State & Import Tax (8%)</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>${estimatedTax.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontWeight: 600 }}>
                  <span>Promotional Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              <div
                style={{
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  margin: '8px 0',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                <span>Total Due</span>
                <span>${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center' }}
            >
              Proceed to Secure Checkout <ArrowRight size={16} />
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '18px',
                fontSize: '11px',
                color: '#64748b',
              }}
            >
              <ShieldCheck size={14} color="#10b981" />
              <span>Encrypted with TLS 1.3 • Authorized Retailer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
