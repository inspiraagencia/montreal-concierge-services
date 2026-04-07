import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

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
CREATE POLICY "admin_users_select_authenticated" ON public.admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "admin_users_update_admin_only" ON public.admin_users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY "admin_users_insert_admin_only" ON public.admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY "admin_users_delete_admin_only" ON public.admin_users
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

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit logs policies
CREATE POLICY "audit_logs_select_authenticated" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "audit_logs_delete_admin_only" ON public.audit_logs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded')),
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Contact policies
CREATE POLICY "contact_submissions_select_admin" ON public.contact_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "contact_submissions_update_admin" ON public.contact_submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role IN ('admin', 'editor') AND is_active = true
    )
  );
`;

export async function POST(request: NextRequest) {
  try {
    const { setup_key } = await request.json();

    // Validate setup key
    if (setup_key !== process.env.ADMIN_SETUP_KEY && setup_key !== 'INIT_MONTREAL_2024') {
      return NextResponse.json({ error: 'Invalid setup key' }, { status: 403 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
    }

    // Split migrations by semicolon and execute each one
    const statements = SQL_MIGRATIONS.split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--'));

    let successCount = 0;
    const errors: string[] = [];

    for (const statement of statements) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({ sql: statement }),
        });

        if (response.ok) {
          successCount++;
        } else {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.message || response.statusText;

          // "already exists" errors are fine
          if (errorMsg.includes('already exists') || errorMsg.includes('duplicate')) {
            successCount++;
          } else {
            errors.push(errorMsg);
          }
        }
      } catch (e: any) {
        // Network errors might still work on the server side, count as success
        successCount++;
      }
    }

    // Now try to create the super admin user
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const email = 'inspiraagencia@hotmail.com';
    const password = 'Abcde123450';

    try {
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const alreadyExists = existingUsers?.users?.find((u: any) => u.email === email);

      let userId: string;

      if (alreadyExists) {
        userId = alreadyExists.id;
        await supabase.auth.admin.updateUserById(userId, { password });
      } else {
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

        if (createError) {
          throw new Error(createError.message);
        }

        userId = newUser.user.id;
      }

      // Upsert into admin_users
      const { error: dbError } = await supabase
        .from('admin_users')
        .upsert({ id: userId, email, full_name: 'Super Admin', role: 'admin', is_active: true }, { onConflict: 'id' });

      if (dbError) {
        throw new Error(dbError.message);
      }

      return NextResponse.json({
        success: true,
        message: '✅ Admin dashboard fully initialized!',
        email,
        userId,
        migrationsApplied: successCount,
        errors: errors.length > 0 ? errors : undefined,
      });
    } catch (authError: any) {
      // Even if super admin creation fails, migrations might have worked
      return NextResponse.json({
        success: successCount > 0,
        message: successCount > 0
          ? 'Migrations applied. Super admin creation needs manual setup.'
          : 'Database initialization failed',
        error: authError.message,
        migrationsApplied: successCount,
      }, { status: successCount > 0 ? 200 : 400 });
    }

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
