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

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if ('error' in auth) return auth.error;

    const { imageName, category } = await request.json();

    if (!imageName || !category) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    if (!categoryPaths[category]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const folderPath = path.join(process.cwd(), categoryPaths[category]);
    const filePath = path.join(folderPath, imageName);

    // Security: Ensure the path is within the category folder
    if (!filePath.startsWith(folderPath)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
