import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json().catch(() => ({ action: 'get-sql' }));

    if (action === 'get-sql') {
      // Return the SQL for manual execution
      return NextResponse.json({
        success: true,
        message: 'SQL migration script retrieved',
        sql: SQL_MIGRATIONS,
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

      let error1: any = null;
      let error2: any = null;

      try {
        await supabase
          .from('admin_users')
          .select('count')
          .limit(1);
      } catch (e) {
        error1 = { message: 'Table not found' };
      }

      try {
        await supabase
          .from('audit_logs')
          .select('count')
          .limit(1);
      } catch (e) {
        error2 = { message: 'Table not found' };
      }

      const adminUsersExists = !error1 || !error1.message.includes('does not exist');
      const auditLogsExists = !error2 || !error2.message.includes('does not exist');

      if (adminUsersExists && auditLogsExists) {
        return NextResponse.json({
          success: true,
          message: '✅ All tables created successfully!',
          tablesCreated: true,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: '❌ Some tables are still missing. Please execute the SQL in Supabase Dashboard.',
          tablesCreated: false,
          missingTables: {
            admin_users: !adminUsersExists,
            audit_logs: !auditLogsExists,
          },
        });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
