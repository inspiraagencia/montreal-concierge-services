import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const SQL_MIGRATIONS = `
-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "admin_users_select_authenticated" ON public.admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "admin_users_update_admin_only" ON public.admin_users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY IF NOT EXISTS "admin_users_insert_admin_only" ON public.admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY IF NOT EXISTS "admin_users_delete_admin_only" ON public.admin_users
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "audit_logs_select_authenticated" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );
`;

async function getSqlMigrations() {
  try {
    return await readFile(
      path.join(process.cwd(), 'supabase', 'migrations', '003_dashboard_schema_compatibility.sql'),
      'utf8'
    );
  } catch {
    return SQL_MIGRATIONS;
  }
}

// ✅ CRITICAL FIX: Add mandatory authentication check
async function verifyAdminAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;

    // Verify user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role, is_active')
      .eq('id', user.id)
      .single();

    if (!adminUser || adminUser.role !== 'admin' || !adminUser.is_active) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // ✅ CRITICAL FIX: Verify admin authentication BEFORE processing
    const adminUser = await verifyAdminAuth(request);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const { action } = await request.json().catch(() => ({ action: 'get-sql' }));

    // ✅ CRITICAL FIX: Whitelist allowed actions
    const ALLOWED_ACTIONS = ['get-sql', 'verify'];
    if (!ALLOWED_ACTIONS.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // ✅ CRITICAL FIX: Audit log all migration operations
    const auditClient = createClient(supabaseUrl, serviceRoleKey);
    try {
      await auditClient.from('audit_logs').insert({
        admin_id: adminUser.id,
        action: `MIGRATION_${action.toUpperCase()}`,
        table_name: 'migrations',
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Audit log failed:', err);
    }

    if (action === 'get-sql') {
      const sql = await getSqlMigrations();

      // Return the SQL for manual execution
      return NextResponse.json({
        success: true,
        message: 'SQL migration script retrieved',
        sql,
        instructions: [
          'Go to: https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql',
          'Click "New Query"',
          'Paste the SQL above',
          'Click RUN',
          'Return here and click the "Verify Migration" button',
        ],
      });
    }

    if (action === 'verify') {
      // Verify if tables exist
      const supabase = createClient(supabaseUrl, serviceRoleKey);
      const requiredTables = [
        'admin_users',
        'audit_logs',
        'contact_submissions',
        'services',
        'blog_posts',
        'testimonials',
        'images_gallery',
      ];
      const missingTables: Record<string, boolean> = {};

      for (const table of requiredTables) {
        const { error } = await supabase
          .from(table)
          .select('id')
          .limit(1);

        missingTables[table] = Boolean(error);
      }

      const tablesCreated = !Object.values(missingTables).some(Boolean);

      if (tablesCreated) {
        return NextResponse.json({
          success: true,
          message: 'All dashboard tables are available.',
          tablesCreated: true,
        });
      }

      return NextResponse.json({
        success: false,
        message: 'Some dashboard tables are missing. Please execute the SQL in Supabase Dashboard.',
        tablesCreated: false,
        missingTables,
      });

    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
