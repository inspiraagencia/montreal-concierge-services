import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminAuth } from '../auth-guard';

const categoryPaths: Record<string, string> = {
  hero: 'public/images/hero',
  services: 'public/images/services',
  team: 'public/images/team',
  testimonials: 'public/images/testimonials',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if ('error' in auth) return auth.error;

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!categoryPaths[category]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Validate file type
    if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const folderPath = path.join(process.cwd(), categoryPaths[category]);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(folderPath, fileName);

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    return NextResponse.json({
      success: true,
      fileName,
      path: `/images/${category}/${fileName}`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
