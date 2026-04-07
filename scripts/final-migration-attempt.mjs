#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1]] = match[2];
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

console.log('🚀 Final Migration Execution Attempt\n');

// Try executing via the internal Postgres function if available
async function attemptMigrations() {
  const sqls = [
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
    `ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY IF NOT EXISTS "admin_users_select_authenticated" ON public.admin_users
      FOR SELECT USING (auth.role() = 'authenticated');`,
    `CREATE POLICY IF NOT EXISTS "admin_users_update_admin_only" ON public.admin_users
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );`,
    `CREATE POLICY IF NOT EXISTS "admin_users_insert_admin_only" ON public.admin_users
      FOR INSERT WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );`,
    `CREATE POLICY IF NOT EXISTS "admin_users_delete_admin_only" ON public.admin_users
      FOR DELETE USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );`,
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
    `CREATE POLICY IF NOT EXISTS "audit_logs_select_authenticated" ON public.audit_logs
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND is_active = true
        )
      );`,
  ];

  // Method 1: Try using raw SQL endpoint directly
  console.log('🔄 Attempting Method 1: Direct SQL via fetch...\n');
  for (let i = 0; i < sqls.length; i++) {
    try {
      const response = await fetch(`${supabaseUrl}/postgres/v1/sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({ sql: sqls[i] }),
      });

      if (response.ok || response.status === 201) {
        console.log(`✅ SQL ${i + 1} executed`);
      } else {
        console.log(`⚠️  SQL ${i + 1}: ${response.status}`);
      }
    } catch (e) {
      console.log(`⚠️  SQL ${i + 1}: ${e.message}`);
    }
  }

  // Method 2: Try using internal function endpoint
  console.log('\n🔄 Attempting Method 2: SQL via internal function...\n');
  const combinedSql = sqls.join('\n');
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/sql-execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ query: combinedSql }),
    });

    if (response.ok) {
      console.log('✅ All SQL executed via function endpoint');
    } else {
      console.log(`⚠️  Function endpoint returned ${response.status}`);
    }
  } catch (e) {
    console.log(`⚠️  Function endpoint: ${e.message}`);
  }

  // Method 3: Verify if tables were created
  console.log('\n🔍 Verifying table creation...\n');
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1);

    if (!error) {
      console.log('✅✅✅ SUCCESS! Tables have been created!\n');
      return true;
    } else {
      console.log(`⚠️  Tables still not found: ${error.message}\n`);
      return false;
    }
  } catch (e) {
    console.log(`⚠️  Verification failed: ${e.message}\n`);
    return false;
  }
}

const success = await attemptMigrations();

if (success) {
  console.log('═══════════════════════════════════════════');
  console.log('\n🎉 Database migration successful!\n');
  console.log('Now creating admin user...\n');

  const email = 'inspiraagencia@hotmail.com';
  const password = 'Abcde123450';

  try {
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) throw listError;

    const existingUser = existingUsers?.users?.find((u) => u.email === email);
    let userId;

    if (existingUser) {
      console.log(`ℹ️  User already exists: ${email}`);
      userId = existingUser.id;

      await supabase.auth.admin.updateUserById(userId, {
        password,
        email_confirm: true,
      });
      console.log('✅ Password updated');
    } else {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError) throw createError;
      userId = newUser.user.id;
      console.log(`✅ User created: ${email}`);
    }

    // Assign admin role
    const { error: insertError } = await supabase
      .from('admin_users')
      .upsert({
        id: userId,
        email,
        full_name: 'Super Admin',
        role: 'admin',
        is_active: true,
      });

    if (!insertError) {
      console.log('✅ Admin role assigned\n');
    }

    console.log('═══════════════════════════════════════════\n');
    console.log('✅ Complete Setup Finished!\n');
    console.log('Credentials:');
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}\n`);
    console.log('Access: https://montreal-concierge.vercel.app/admin/login\n');
  } catch (e) {
    console.log(`⚠️  Error creating user: ${e.message}\n`);
  }
} else {
  console.log('═══════════════════════════════════════════\n');
  console.log('📋 Manual Setup Required\n');
  console.log('Please visit: https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new');
  console.log('And execute the SQL from: EXECUTE_MIGRATIONS_FIXED.md\n');
  console.log('Or go to: https://montreal-concierge.vercel.app/admin/setup-migrations\n');
}
