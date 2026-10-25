import type { Metadata } from 'next';
import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse VoltEdge\'s full catalog of electronics — smartphones, laptops, audio, gaming, smart home, and more. Filter by brand, price, and category.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '120px', textAlign: 'center', color: '#8b92b8' }}>Loading products...</div>}>
      <ShopClient />
    </Suspense>
  );
}
