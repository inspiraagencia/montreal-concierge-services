import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Verifies the request has a valid admin session.
 * Returns the authenticated user or an error response.
 */
export async function verifyAdminAuth(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: NextResponse.json({ error: 'Server configuration error' }, { status: 500 }) };
  }

  const authHeader = request.headers.get('authorization');
  const cookieHeader = request.headers.get('cookie');

  // Try to extract token from Authorization header or cookies
  let accessToken: string | null = null;

  if (authHeader?.startsWith('Bearer ')) {
    accessToken = authHeader.slice(7);
  } else if (cookieHeader) {
    const match = cookieHeader.match(/sb-[^-]+-auth-token=([^;]+)/);
    if (match) {
      try {
        const decoded = decodeURIComponent(match[1]);
        const parsed = JSON.parse(decoded);
        accessToken = Array.isArray(parsed) ? parsed[0] : parsed.access_token;
      } catch {
        // ignore parse errors
      }
    }
  }

  if (!accessToken) {
    return { error: NextResponse.json({ error: 'Authentication required' }, { status: 401 }) };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return { error: NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 }) };
  }

  return { user };
}
