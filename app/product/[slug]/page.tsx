import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_PRODUCTS } from '@/data/mockData';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | VoltEdge Electronics`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p._id !== product._id
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
