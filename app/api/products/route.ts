import { NextRequest, NextResponse } from 'next/server';
import { ALL_PRODUCTS } from '@/data/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort') || 'featured';
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '20');
  const page = parseInt(searchParams.get('page') || '1');

  let products = [...ALL_PRODUCTS];

  if (category && category !== 'All') {
    products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (brand && brand !== 'All') {
    products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (minPrice) {
    products = products.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    products = products.filter((p) => p.price <= Number(maxPrice));
  }

  if (search) {
    const q = search.toLowerCase().trim();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q))
    );
  }

  // Sort
  switch (sort) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      // featured
      products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  const total = products.length;
  const skip = (page - 1) * limit;
  const paginated = products.slice(skip, skip + limit);

  return NextResponse.json({
    products: paginated,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
