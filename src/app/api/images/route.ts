import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 });
  }

  const publicDir = path.join(process.cwd(), 'public', 'images', category);
  
  try {
    const files = fs.readdirSync(publicDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => ({
        src: `/images/${category}/${file}`,
        alt: `${category} photo`
      }));

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
} 