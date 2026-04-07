import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const categoryPaths: Record<string, string> = {
  hero: 'public/images/hero',
  services: 'public/images/services',
  team: 'public/images/team',
  testimonials: 'public/images/testimonials',
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'hero';

    const folderPath = path.join(process.cwd(), categoryPaths[category]);

    if (!fs.existsSync(folderPath)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(folderPath);
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((file) => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          path: `/images/${category}/${file}`,
          size: stats.size,
          lastModified: stats.mtime.toISOString(),
        };
      })
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
