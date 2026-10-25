'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          color: '#34d399',
          padding: '12px 24px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        <Check size={18} />
        <span>Welcome to the Dispatch! Your $50 credit code is: <strong>VOLT50</strong></span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        maxWidth: '460px',
        margin: '0 auto',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your professional email..."
        className="input-field"
        style={{ flex: 1, minWidth: '240px' }}
      />
      <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
        Join Dispatch
      </button>
    </form>
  );
}
