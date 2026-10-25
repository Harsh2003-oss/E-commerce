import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: {
    template: '%s | VoltEdge Electronics',
    default: 'VoltEdge Electronics — Premium Tech Store & Silicon Hardware',
  },
  description:
    'VoltEdge is your premier destination for cutting-edge electronics: Apple Silicon workstations, flagship smartphones, audiophile grade sound, and pro creator equipment.',
  keywords: ['electronics', 'smartphones', 'laptops', 'gaming', 'audio', 'smart home', 'VoltEdge'],
  authors: [{ name: 'VoltEdge Team' }],
  creator: 'VoltEdge Electronics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voltedge.tech',
    siteName: 'VoltEdge Electronics',
    title: 'VoltEdge Electronics — Premium Tech Store',
    description: 'Premier destination for cutting-edge electronics and workstations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoltEdge Electronics',
    description: 'Premier destination for cutting-edge electronics and workstations.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main style={{ minHeight: '100vh', paddingTop: '105px' }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
