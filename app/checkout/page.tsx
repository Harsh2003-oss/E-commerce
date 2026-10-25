'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, CheckCircle, ShieldCheck, Truck, Lock, Loader2, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });

  const shippingCost = shippingMethod === 'express' ? 15 : cartTotal >= 150 ? 0 : 10;
  const tax = Math.round(cartTotal * 0.08);
  const totalDue = cartTotal + shippingCost + tax;

  const handleFillDemo = () => {
    setForm({
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@techfoundry.io',
      phone: '+1 (415) 890-2341',
      street: '420 Montgomery Street, Suite 800',
      city: 'San Francisco',
      state: 'CA',
      zip: '94104',
      country: 'United States',
      cardNumber: '4242 •••• •••• 9012',
      cardExp: '08/29',
      cardCvc: '312',
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    const generatedId = `VE-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    setIsSubmitting(false);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div style={{ background: '#07080c', minHeight: '80vh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="card"
          style={{
            maxWidth: '520px',
            width: '100%',
            padding: '48px 36px',
            textAlign: 'center',
            background: 'linear-gradient(145deg, #101422, #0a0d15)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <CheckCircle size={36} color="#10b981" />
          </div>

          <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Payment Authorized & Cleared
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '6px 0 12px' }}>
            Order Confirmed!
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '28px' }}>
            A formal VAT invoice and tracking link have been dispatched to <strong>{form.email || 'your email'}</strong>. Your devices are being packed in sealed antistatic containers.
          </p>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '32px',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Tracking & Order ID
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#3b82f6', fontFamily: 'Space Grotesk, sans-serif' }}>
                {orderId}
              </div>
            </div>
            <span className="badge badge-emerald">Dispatched in 24h</span>
          </div>

          <Link href="/shop" className="btn btn-primary" style={{ width: '100%', padding: '13px' }}>
            Return to Tech Catalog
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ background: '#07080c', minHeight: '75vh', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
          No items in bag to checkout
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
          Please add electronics hardware to your shopping bag before continuing.
        </p>
        <Link href="/shop" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#07080c', minHeight: '100vh', padding: '36px 0 96px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Secure SSL Checkout
            </span>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
              Shipping & Payment Details
            </h1>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="btn btn-secondary"
            style={{ fontSize: '12px', padding: '8px 16px' }}
          >
            <Sparkles size={14} color="#3b82f6" /> Fill Demo Details
          </button>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Delivery Address & Payment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Shipping Address Card */}
              <div
                className="card"
                style={{
                  padding: '28px',
                  borderRadius: '18px',
                  background: '#0d101a',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={18} color="#3b82f6" /> 1. Shipping Destination
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>First Name</label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="e.g. Alex"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Last Name</label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="e.g. Mercer"
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@workstation.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Street Address</label>
                  <input
                    type="text"
                    required
                    value={form.street}
                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                    placeholder="100 Silicon Blvd, Suite 400"
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>City</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="San Jose"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>State</label>
                    <input
                      type="text"
                      required
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      placeholder="CA"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Postal Code</label>
                    <input
                      type="text"
                      required
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      placeholder="95110"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Method */}
              <div
                className="card"
                style={{
                  padding: '24px',
                  borderRadius: '18px',
                  background: '#0d101a',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                  2. Courier Delivery Speed
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: shippingMethod === 'standard' ? 'rgba(37, 99, 235, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: shippingMethod === 'standard' ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        style={{ accentColor: '#3b82f6' }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>FedEx Standard Insured (2-3 Business Days)</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Signature required upon delivery</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: cartTotal >= 150 ? '#34d399' : '#ffffff' }}>
                      {cartTotal >= 150 ? 'FREE' : '$10'}
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: shippingMethod === 'express' ? 'rgba(37, 99, 235, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: shippingMethod === 'express' ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        style={{ accentColor: '#3b82f6' }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>DHL Priority Overnight (Next Business Morning)</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Guaranteed AM delivery with GPS tracking</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>$15</span>
                  </label>
                </div>
              </div>

              {/* Payment Method Card */}
              <div
                className="card"
                style={{
                  padding: '28px',
                  borderRadius: '18px',
                  background: '#0d101a',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} color="#3b82f6" /> 3. Secure Payment Method
                </h3>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { id: 'card', label: 'Credit Card / Apple Pay' },
                    { id: 'cod', label: 'Cash on Delivery (Courier)' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: paymentMethod === m.id ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                        color: paymentMethod === m.id ? '#07080c' : '#94a3b8',
                        border: paymentMethod === m.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Card Number</label>
                      <input
                        type="text"
                        required
                        value={form.cardNumber}
                        onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Expiry</label>
                        <input
                          type="text"
                          required
                          value={form.cardExp}
                          onChange={(e) => setForm({ ...form, cardExp: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>CVC / CVV</label>
                        <input
                          type="text"
                          required
                          value={form.cardCvc}
                          onChange={(e) => setForm({ ...form, cardCvc: e.target.value })}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
                    Pay with Cash, Credit Card, or Contactless UPI when the courier delivers your package. Official receipt provided upon handover.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Order Review & Submit */}
            <div
              style={{
                background: '#0d101a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '28px',
                position: 'sticky',
                top: '110px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
                Order Summary
              </h3>

              {/* Items Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedColor || ''}-${item.selectedVariant || ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', background: '#07080c' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`}
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  margin: '16px 0',
                }}
              />

              {/* Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Hardware Subtotal</span>
                  <span style={{ color: '#ffffff' }}>${cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Courier Shipping</span>
                  <span style={{ color: shippingCost === 0 ? '#34d399' : '#ffffff' }}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Tax (8%)</span>
                  <span style={{ color: '#ffffff' }}>${tax.toLocaleString()}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#ffffff',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span>Grand Total</span>
                  <span>${totalDue.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Authorizing Payment...
                  </>
                ) : (
                  <>Place Order (${totalDue.toLocaleString()})</>
                )}
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  fontSize: '11px',
                  color: '#64748b',
                }}
              >
                <ShieldCheck size={14} color="#10b981" />
                <span>30-Day Money Back Guarantee • Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
