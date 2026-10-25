export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductVariant {
  label: string;
  priceDelta: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  _id: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  features: string[];
  specs?: Record<string, string>;
  inTheBox?: string[];
  highlights?: { label: string; value: string }[];
  colors?: ProductColor[];
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  warranty?: string;
  sku?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  slug: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedVariant?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  readTime: number;
  published: boolean;
  createdAt: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  image: string;
  count: number;
  description: string;
  gradient: string;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  sort: string;
  search: string;
}
