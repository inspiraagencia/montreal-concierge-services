#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Missing Supabase credentials');
  process.exit(1);
}

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

  // 2. Enable RLS on admin_users
  `ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;`,

  // 3. Admin policies for admin_users table
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

  // 4. Create audit_logs table
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

  // 5. Enable RLS on audit_logs
  `ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;`,

  // 6. Audit logs policies
  `CREATE POLICY "audit_logs_select_authenticated" ON public.audit_logs
    FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND is_active = true
      )
    );`,

  `CREATE POLICY "audit_logs_delete_admin_only" ON public.audit_logs
    FOR DELETE USING (
      EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND role = 'admin' AND is_active = true
      )
    );`,

  // 7. Create contact_submissions table
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

  // 8. Enable RLS on contact_submissions
  `ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;`,

  // 9. Contact policies
  `CREATE POLICY "contact_submissions_select_admin" ON public.contact_submissions
    FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND is_active = true
      )
    );`,

  `CREATE POLICY "contact_submissions_update_admin" ON public.contact_submissions
    FOR UPDATE USING (
      EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND role IN ('admin', 'editor') AND is_active = true
      )
    );`,
];

async function executeSql(sql) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({ sql }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`SQL Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

async function setupDatabase() {
  try {
    console.log('🚀 Setting up admin dashboard database...\n');

    let completed = 0;
    let failed = 0;

    for (const sql of migrations) {
      try {
        await executeSql(sql);
        completed++;
        process.stdout.write(`\r✅ ${completed}/${migrations.length} migrations applied...`);
      } catch (error) {
        // If it fails due to "already exists", that's ok
        if (error.message.includes('already exists') || error.message.includes('duplicate')) {
          completed++;
          process.stdout.write(`\r✅ ${completed}/${migrations.length} migrations applied...`);
        } else {
          console.error(`\n⚠️  ${error.message}`);
          failed++;
        }
      }
    }

    console.log('\n\n✨ Database setup completed!');
    console.log('\n📋 Super Admin Credentials:');
    console.log('   Email: inspiraagencia@hotmail.com');
    console.log('   Password: Abcde123450');
    console.log('   Role: Admin (full access)');
    console.log('\n🔐 You can now log in at: http://localhost:3000/admin/login\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
