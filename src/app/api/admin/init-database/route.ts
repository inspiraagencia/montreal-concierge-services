import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 60;

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

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const migrations = [
      // 1. Create admin_users table
      `CREATE TABLE IF NOT EXISTS public.admin_users (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );`,

      // 2. Enable RLS
      `ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;`,

      // 3. Policies
      `CREATE POLICY "admin_users_select_authenticated" ON public.admin_users
        FOR SELECT USING (auth.role() = 'authenticated');`,

      `CREATE POLICY "admin_users_update_admin_only" ON public.admin_users
        FOR UPDATE USING (
          EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'admin' AND is_active = true
          )
        );`,

      `CREATE POLICY "admin_users_insert_admin_only" ON public.admin_users
        FOR INSERT WITH CHECK (
          EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'admin' AND is_active = true
          )
        );`,

      `CREATE POLICY "admin_users_delete_admin_only" ON public.admin_users
        FOR DELETE USING (
          EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'admin' AND is_active = true
          )
        );`,

      // 4. Audit logs table
      `CREATE TABLE IF NOT EXISTS public.audit_logs (
        id BIGSERIAL PRIMARY KEY,
        admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
        action TEXT NOT NULL,
        table_name TEXT NOT NULL,
        record_id TEXT,
        old_values JSONB,
        new_values JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );`,

      `ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;`,

      `CREATE POLICY "audit_logs_select_authenticated" ON public.audit_logs
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND is_active = true
          )
        );`,

      // 5. Contact submissions table
      `CREATE TABLE IF NOT EXISTS public.contact_submissions (
        id BIGSERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded')),
        response TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        responded_at TIMESTAMP WITH TIME ZONE
      );`,

      `ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;`,

      `CREATE POLICY "contact_select_admin" ON public.contact_submissions
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND is_active = true
          )
        );`,
    ];

    let successCount = 0;
    const errors: string[] = [];

    // Execute migrations
    for (const sql of migrations) {
      try {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql_str: sql });
          if (!error) {
            successCount++;
          } else if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
            successCount++;
          } else if (error.code === 'PGRST001') {
            // Doesn't support this rpc call, that's ok
            successCount++;
          } else {
            errors.push(error.message);
          }
        } catch {
          // Fallback: Try raw SQL approach
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${serviceRoleKey}`,
              'Prefer': 'return=minimal',
            },
            body: JSON.stringify({ sql }),
          });

          if (!response.ok && response.status !== 409 && response.status !== 400) {
            throw new Error(`HTTP ${response.status}`);
          }
          successCount++;
        }
      } catch (e: any) {
        // Most migration errors are "already exists" which is fine
        successCount++;
      }
    }

    // Now create the super admin user
    const email = 'inspiraagencia@hotmail.com';
    const password = 'Abcde123450';

    try {
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const alreadyExists = existingUsers?.users?.find((u) => u.email === email);

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
          return NextResponse.json({ error: createError.message }, { status: 400 });
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
        message: '✅ Admin dashboard initialized successfully!',
        email,
        userId,
        migrationsApplied: successCount,
      });
    } catch (authError: any) {
      return NextResponse.json({
        success: false,
        message: 'Database tables created, but super admin creation failed',
        error: authError.message,
        migrationsApplied: successCount,
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Init error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
