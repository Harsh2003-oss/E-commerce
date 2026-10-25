import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        background: '#07080c',
      }}
    >
      <div style={{ maxWidth: '520px' }}>
        <div
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '120px',
            fontWeight: 800,
            color: '#1e293b',
            lineHeight: 1,
            marginBottom: '12px',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#f8fafc',
            marginBottom: '12px',
          }}
        >
          Hardware Model Not Located
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          The requested device or URL path does not exist in our active inventory catalog.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Storefront
          </Link>
          <Link href="/shop" className="btn btn-secondary">
            <Search size={16} /> Search Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
