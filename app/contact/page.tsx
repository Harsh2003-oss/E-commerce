'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 2-5 business days. Express delivery (1-2 days) is available at checkout for select pin codes.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day return policy for all products in original condition with box and accessories. Damaged or defective products can be returned within 90 days.',
  },
  {
    q: 'Are the products authentic?',
    a: 'Absolutely. All products on VoltEdge are 100% genuine, sourced directly from brands or authorized distributors. Every product comes with official brand warranty.',
  },
  {
    q: 'Can I track my order?',
    a: 'Yes! Once your order ships, you will receive a tracking link via email and SMS. You can also track it in the Orders section of your account.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, Net Banking, EMI (No Cost & Low Cost), Wallets (PhonePe, Paytm, GPay), and Cash on Delivery.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', padding: '140px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(79,142,247,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
          <div className="badge badge-blue" style={{ marginBottom: '24px', display: 'inline-flex' }}>
            <MessageSquare size={11} />
            Get in Touch
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-2px', marginBottom: '20px', lineHeight: 1.05 }}>
            We&apos;re Here to <span className="gradient-text">Help</span>
          </h1>
          <p style={{ color: '#8b92b8', fontSize: '17px', lineHeight: 1.7 }}>
            Have questions about a product, an order, or anything else? Our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <section style={{ padding: '0 24px 60px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: Mail, label: 'Email Us', value: 'support@voltedge.tech', sub: 'We reply within 2 hours', color: '#4f8ef7' },
              { icon: Phone, label: 'Call Us', value: '+91 92348 42190', sub: 'Mon-Sat, 9AM - 9PM IST', color: '#9b59ff' },
              { icon: MapPin, label: 'Visit Us', value: 'Bengaluru, Karnataka', sub: 'MG Road Experience Store', color: '#00d4ff' },
              { icon: Clock, label: 'Support Hours', value: '24/7 Chat Support', sub: 'Always here for you', color: '#00d464' },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div key={label} className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Icon size={24} color={color} />
                </div>
                <div style={{ fontSize: '13px', color: '#8b92b8', marginBottom: '6px', fontWeight: 500 }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#f0f2ff', marginBottom: '4px' }}>{value}</div>
                <div style={{ fontSize: '12px', color: '#4a5080' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM + FAQ ===== */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* Form */}
          <div className="glass-card" style={{ padding: '40px' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 700, marginBottom: '28px', color: '#f0f2ff' }}>
              Send us a Message
            </h2>

            {status === 'success' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'rgba(0,212,100,0.1)', border: '1px solid rgba(0,212,100,0.3)', borderRadius: '12px', marginBottom: '24px', color: '#00d464' }}>
                <CheckCircle size={20} />
                <span style={{ fontWeight: 600 }}>Message sent! We&apos;ll be in touch soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div style={{ padding: '16px 20px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', marginBottom: '24px', color: '#ef4444', fontWeight: 600 }}>
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} id="contact-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name *</label>
                  <input id="contact-name" type="text" className="form-input" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address *</label>
                  <input id="contact-email" type="email" className="form-input" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">Phone (optional)</label>
                  <input id="contact-phone" type="tel" className="form-input" placeholder="+91 9876543210" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Subject *</label>
                  <input id="contact-subject" type="text" className="form-input" placeholder="Order #12345 inquiry" value={formData.subject} onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message *</label>
                <textarea id="contact-message" className="form-input" placeholder="Tell us how we can help..." rows={5} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} required />
              </div>
              <button id="contact-submit-btn" type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
                ) : (
                  <><Send size={17} /> Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div id="contact-faq">
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 700, marginBottom: '28px', color: '#f0f2ff' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 24px',
                      gap: '16px',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '15px', color: '#f0f2ff', flex: 1 }}>{item.q}</span>
                    <span style={{ color: '#4f8ef7', fontSize: '22px', fontWeight: 300, flexShrink: 0, lineHeight: 1, transition: 'transform 0.3s ease', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 20px', color: '#8b92b8', fontSize: '14px', lineHeight: 1.7, borderTop: '1px solid rgba(79,142,247,0.1)' }}>
                      <p style={{ paddingTop: '16px' }}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section id="contact-shipping" style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(79,142,247,0.15)',
              background: 'linear-gradient(135deg, #0a0d1a 0%, #0f1220 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <MapPin size={48} color="#4f8ef7" style={{ position: 'relative' }} />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 700, color: '#f0f2ff', marginBottom: '8px' }}>
                VoltEdge Experience Store
              </div>
              <div style={{ color: '#8b92b8', fontSize: '15px' }}>
                100, MG Road, Bangalore, Karnataka 560001, India
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
