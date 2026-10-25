import { NextRequest, NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/data/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '10');

  let posts = [...BLOG_POSTS];
  if (category && category !== 'All') {
    posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  return NextResponse.json({
    posts: posts.slice(0, limit),
    total: posts.length,
  });
}
