import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user session
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Fetch admin user details
    const { data: adminUser, error: dbError } = await supabase
      .from('admin_users')
      .select('id, email, role, is_active')
      .eq('id', user.id)
      .single();

    if (dbError || !adminUser) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    if (!adminUser.is_active) {
      return NextResponse.json({ error: 'Admin account is inactive' }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { requiredRole } = await request.json();
    const supabase = await createClient();

    // Get current user session
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Fetch admin user details
    const { data: adminUser, error: dbError } = await supabase
      .from('admin_users')
      .select('id, email, role, is_active')
      .eq('id', user.id)
      .single();

    if (dbError || !adminUser) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    if (!adminUser.is_active) {
      return NextResponse.json({ error: 'Admin account is inactive' }, { status: 403 });
    }

    // Check role permission
    if (requiredRole) {
      const hasPermission =
        (requiredRole === 'admin' && adminUser.role === 'admin') ||
        (requiredRole === 'editor' && (adminUser.role === 'admin' || adminUser.role === 'editor')) ||
        (requiredRole === 'viewer' && ['admin', 'editor', 'viewer'].includes(adminUser.role));

      if (!hasPermission) {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
