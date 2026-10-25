import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Post from '@/models/Post';
import { ALL_PRODUCTS, BLOG_POSTS } from '@/data/mockData';

export async function GET() {
  try {
    await connectDB();

    // Check existing products count
    const existingProductsCount = await Product.countDocuments();
    let productsInserted = 0;
    let postsInserted = 0;

    if (existingProductsCount === 0) {
      // Clean up mock data _id so MongoDB generates its own ObjectIds
      const cleanProducts = ALL_PRODUCTS.map(({ _id, createdAt, ...rest }) => ({
        ...rest,
        createdAt: new Date(createdAt),
      }));
      await Product.insertMany(cleanProducts);
      productsInserted = cleanProducts.length;
    }

    const existingPostsCount = await Post.countDocuments();
    if (existingPostsCount === 0) {
      const cleanPosts = BLOG_POSTS.map(({ _id, createdAt, ...rest }) => ({
        ...rest,
        createdAt: new Date(createdAt),
      }));
      await Post.insertMany(cleanPosts);
      postsInserted = cleanPosts.length;
    }

    return NextResponse.json({
      success: true,
      message: 'Database checked and seeded successfully.',
      productsInDB: await Product.countDocuments(),
      postsInDB: await Post.countDocuments(),
      newProductsInserted: productsInserted,
      newPostsInserted: postsInserted,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to seed database. Ensure MONGODB_URI is configured.',
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectDB();

    // Force re-seed: Clear and insert fresh mock data
    await Product.deleteMany({});
    await Post.deleteMany({});

    const cleanProducts = ALL_PRODUCTS.map(({ _id, createdAt, ...rest }) => ({
      ...rest,
      createdAt: new Date(createdAt),
    }));
    await Product.insertMany(cleanProducts);

    const cleanPosts = BLOG_POSTS.map(({ _id, createdAt, ...rest }) => ({
      ...rest,
      createdAt: new Date(createdAt),
    }));
    await Post.insertMany(cleanPosts);

    return NextResponse.json({
      success: true,
      message: 'Database refreshed and re-seeded with all products and blog articles.',
      productsCount: cleanProducts.length,
      postsCount: cleanPosts.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to reset and seed database.',
      },
      { status: 500 }
    );
  }
}
