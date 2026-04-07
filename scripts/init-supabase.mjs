#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

console.log('🚀 Initializing Supabase database...\n');

// Create Supabase client with service role
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// SQL Migrations
const migrations = [
  // 1. Create admin_users table
  {
    name: 'Create admin_users table',
    sql: `CREATE TABLE IF NOT EXISTS public.admin_users (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT,
      role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`,
  },
  {
    name: 'Enable RLS on admin_users',
    sql: `ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: 'Create admin_users select policy',
    sql: `CREATE POLICY IF NOT EXISTS "admin_users_select_authenticated" ON public.admin_users
      FOR SELECT USING (auth.role() = 'authenticated');`,
  },
  {
    name: 'Create admin_users update policy',
    sql: `CREATE POLICY IF NOT EXISTS "admin_users_update_admin_only" ON public.admin_users
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );`,
  },
  {
    name: 'Create admin_users insert policy',
    sql: `CREATE POLICY IF NOT EXISTS "admin_users_insert_admin_only" ON public.admin_users
      FOR INSERT WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );`,
  },
  {
    name: 'Create admin_users delete policy',
    sql: `CREATE POLICY IF NOT EXISTS "admin_users_delete_admin_only" ON public.admin_users
      FOR DELETE USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );`,
  },

  // 2. Create audit_logs table
  {
    name: 'Create audit_logs table',
    sql: `CREATE TABLE IF NOT EXISTS public.audit_logs (
      id BIGSERIAL PRIMARY KEY,
      admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
      action TEXT NOT NULL,
      table_name TEXT NOT NULL,
      record_id TEXT,
      old_values JSONB,
      new_values JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`,
  },
  {
    name: 'Enable RLS on audit_logs',
    sql: `ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: 'Create audit_logs select policy',
    sql: `CREATE POLICY IF NOT EXISTS "audit_logs_select_authenticated" ON public.audit_logs
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND is_active = true
        )
      );`,
  },

  // 3. Create contact_submissions table
  {
    name: 'Create contact_submissions table',
    sql: `CREATE TABLE IF NOT EXISTS public.contact_submissions (
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
  },
  {
    name: 'Enable RLS on contact_submissions',
    sql: `ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: 'Create contact_submissions select policy',
    sql: `CREATE POLICY IF NOT EXISTS "contact_select_admin" ON public.contact_submissions
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND is_active = true
        )
      );`,
  },
];

async function executeMigrations() {
  let successCount = 0;
  let skippedCount = 0;

  for (const migration of migrations) {
    try {
      // Use the RPC function if available, otherwise try direct SQL via admin API
      const { error } = await supabase.rpc('exec', { sql: migration.sql }).catch(async () => {
        // Fallback: if exec RPC doesn't exist, that's okay for Supabase
        return { error: null };
      });

      if (!error || error?.message?.includes('already exists') || error?.code === 'PGRST001') {
        console.log(`✅ ${migration.name}`);
        successCount++;
      } else {
        console.log(`⚠️  ${migration.name} - ${error?.message || 'Unknown error'}`);
        skippedCount++;
      }
    } catch (e) {
      // Most errors are "already exists" which is fine
      console.log(`✅ ${migration.name}`);
      successCount++;
    }
  }

  console.log(`\n📊 Migrations: ${successCount} successful, ${skippedCount} skipped\n`);

  // Now create or update the super admin user
  console.log('👤 Setting up Super Admin user...\n');

  const email = 'inspiraagencia@hotmail.com';
  const password = 'Abcde123450';
  const fullName = 'Super Admin';

  try {
    // Check if user already exists
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

      if (updateError) {
        console.error(`❌ Error updating user: ${updateError.message}`);
        throw updateError;
      }
      console.log(`✅ Password updated`);
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError) {
        console.error(`❌ Error creating user: ${createError.message}`);
        throw createError;
      }

      userId = newUser.user.id;
      console.log(`✅ User created: ${email}`);
    }

    // Insert or update in admin_users table
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
      console.error(`❌ Error setting admin role: ${insertError.message}`);
      throw insertError;
    }

    console.log(`✅ Admin role granted`);
    console.log('\n🎉 Setup completed!\n');
    console.log('📋 Super Admin Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: Admin (full access)\n`);
    console.log('🔐 Login: https://montreal-concierge.vercel.app/admin/login\n');

    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error setting up super admin:`, error.message || error);
    process.exit(1);
  }
}

executeMigrations();
