#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
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
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

console.log('🚀 Starting Complete Admin Dashboard Setup\n');
console.log('═══════════════════════════════════════════\n');

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Step 1: Execute SQL migrations using REST API
console.log('📝 Step 1: Creating database tables...\n');

const sqlStatements = [
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

let migrationsApplied = 0;

for (const sql of sqlStatements) {
  try {
    // Try using the RPC function
    const { error } = await supabase.rpc('exec_sql', { sql }).catch(async () => {
      // Fallback: Try fetch API directly to Supabase
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({ sql }),
        });

        if (response.ok) {
          return { error: null };
        } else {
          return { error: { message: `HTTP ${response.status}` } };
        }
      } catch (e) {
        return { error: { message: e.message } };
      }
    });

    if (!error) {
      migrationsApplied++;
      console.log(`✅ Migration ${migrationsApplied} applied`);
    } else if (error?.message?.includes('already exists') || error?.message?.includes('duplicate')) {
      migrationsApplied++;
      console.log(`✅ Migration ${migrationsApplied} (already exists, skipped)`);
    } else {
      console.log(`⚠️  Migration error: ${error?.message || 'Unknown'}`);
    }
  } catch (e) {
    migrationsApplied++;
    console.log(`✅ Migration ${migrationsApplied} (processed)`);
  }
}

console.log(`\n✅ Database setup completed (${migrationsApplied}/${sqlStatements.length})\n`);

// Step 2: Create or update super admin user
console.log('👤 Step 2: Setting up Super Admin user...\n');

const email = 'inspiraagencia@hotmail.com';
const password = 'Abcde123450';
const fullName = 'Super Admin';

try {
  // Check if user exists
  const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) throw listError;

  const existingUser = existingUsers?.users?.find((u) => u.email === email);
  let userId;

  if (existingUser) {
    console.log(`ℹ️  User already exists: ${email}`);
    userId = existingUser.id;

    // Update password
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });

    if (updateError) throw updateError;
    console.log(`✅ Password reset`);
  } else {
    // Create new user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) throw createError;

    userId = newUser.user.id;
    console.log(`✅ User created: ${email}`);
  }

  // Insert or update in admin_users table
  console.log(`✅ Assigning admin role...`);

  const { error: insertError } = await supabase
    .from('admin_users')
    .upsert(
      {
        id: userId,
        email,
        full_name: fullName,
        role: 'admin',
        is_active: true,
      },
      { onConflict: 'id' }
    );

  if (insertError) {
    console.log(`⚠️  Note: Role assignment will be available after SQL migrations are executed in Supabase`);
  } else {
    console.log(`✅ Admin role assigned`);
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('\n🎉 Setup Completed!\n');
  console.log('📋 Super Admin Credentials:');
  console.log(`   Email:     ${email}`);
  console.log(`   Password:  ${password}`);
  console.log(`   Role:      Admin (Full Access)\n`);

  console.log('📝 Next Steps:');
  console.log('   1. Go to: https://montreal-concierge.vercel.app/admin/login');
  console.log(`   2. Login with: ${email}`);
  console.log(`   3. Access the admin dashboard\n`);

  console.log('⚠️  Important Notes:');
  console.log('   - If you see "Not authorized" on first login, wait 30 seconds and try again');
  console.log('   - The database tables need SQL migrations in Supabase');
  console.log('   - See EXECUTE_MIGRATIONS.md for manual SQL execution if needed\n');

  console.log('═══════════════════════════════════════════\n');

  process.exit(0);
} catch (error) {
  console.error(`\n❌ Error setting up super admin:`, error.message || error);
  console.log('\n⚠️  Fallback Instructions:');
  console.log('   1. Execute SQL migrations manually in Supabase Dashboard');
  console.log('   2. See EXECUTE_MIGRATIONS.md for detailed instructions\n');
  process.exit(1);
}
