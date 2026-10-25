import { NextResponse } from 'next/server';
import { ALL_PRODUCTS, BLOG_POSTS } from '@/data/mockData';

export async function GET() {
  if (process.env.MONGODB_URI) {
    try {
      const connectDB = (await import('@/lib/mongodb')).default;
      const Product = (await import('@/models/Product')).default;
      const Post = (await import('@/models/Post')).default;
      await connectDB();
      const existingProductsCount = await Product.countDocuments();
      if (existingProductsCount === 0) {
        const cleanProducts = ALL_PRODUCTS.map(({ _id, createdAt, ...rest }) => ({
          ...rest,
          createdAt: new Date(createdAt),
        }));
        await Product.insertMany(cleanProducts);
      }
      return NextResponse.json({
        success: true,
        mode: 'mongodb',
        message: 'MongoDB connected and seeded successfully.',
        productsInDB: await Product.countDocuments(),
      });
    } catch (e: any) {
      console.warn('MongoDB optional seed skipped:', e.message);
    }
  }

  return NextResponse.json({
    success: true,
    mode: 'in-memory',
    message: 'VoltEdge standalone catalog active. 36 flagship products loaded with zero database requirement.',
    productsCount: ALL_PRODUCTS.length,
    postsCount: BLOG_POSTS.length,
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    mode: 'in-memory',
    message: 'VoltEdge in-memory catalog active.',
    productsCount: ALL_PRODUCTS.length,
  });
}
