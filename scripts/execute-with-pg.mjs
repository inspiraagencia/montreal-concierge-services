#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Extract host from Supabase URL
// URL format: https://xxxxx.supabase.co
const match = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
if (!match) {
  console.error('❌ Invalid Supabase URL format');
  process.exit(1);
}

const projectId = match[1];

console.log(`🚀 Attempting direct Postgres connection to ${projectId}...\n`);

// Try to use pg module if available, otherwise provide instructions
try {
  const pg = await import('pg');
  const { Client } = pg;

  const client = new Client({
    host: `${projectId}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: serviceRoleKey,
    ssl: { rejectUnauthorized: false },
  });

  console.log('📡 Connecting to Postgres...');
  await client.connect();
  console.log('✅ Connected!\n');

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
    `CREATE POLICY IF NOT EXISTS "admin_users_select_authenticated" ON public.admin_users FOR SELECT USING (auth.role() = 'authenticated');`,
    `CREATE POLICY IF NOT EXISTS "admin_users_update_admin_only" ON public.admin_users FOR UPDATE USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));`,
    `CREATE POLICY IF NOT EXISTS "admin_users_insert_admin_only" ON public.admin_users FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));`,
    `CREATE POLICY IF NOT EXISTS "admin_users_delete_admin_only" ON public.admin_users FOR DELETE USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));`,
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
    `CREATE POLICY IF NOT EXISTS "audit_logs_select_authenticated" ON public.audit_logs FOR SELECT USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND is_active = true));`,
  ];

  let executed = 0;
  for (let i = 0; i < sqlStatements.length; i++) {
    try {
      await client.query(sqlStatements[i]);
      executed++;
      console.log(`✅ Statement ${i + 1} executed`);
    } catch (error) {
      if (error.message.includes('already exists') || error.message.includes('duplicate')) {
        executed++;
        console.log(`✅ Statement ${i + 1} (already exists)`);
      } else {
        console.log(`⚠️  Statement ${i + 1}: ${error.message}`);
      }
    }
  }

  console.log(`\n✅ Migration completed: ${executed}/${sqlStatements.length}`);

  // Insert super admin user into admin_users table
  console.log('\n👤 Creating super admin record...');
  try {
    const adminId = env.ADMIN_USER_ID || 'placeholder-uuid';
    await client.query(
      `INSERT INTO public.admin_users (id, email, full_name, role, is_active)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET role = 'admin', is_active = true`,
      [adminId, 'inspiraagencia@hotmail.com', 'Super Admin', 'admin', true]
    );
    console.log('✅ Super admin record created');
  } catch (error) {
    console.log(`⚠️  Could not create admin record: ${error.message}`);
  }

  await client.end();
  console.log('\n✅ Connection closed. All done!');
  process.exit(0);

} catch (error) {
  console.log('⚠️  Connection failed:\n');
  console.log(`Error: ${error.message}`);
  console.log(`Code: ${error.code}\n`);

  if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
    console.log('Note: Direct Postgres connection is blocked by Supabase firewall.');
  }

  console.log('📋 You can manually execute the SQL in Supabase Dashboard:');
  console.log('   1. Go to: https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql');
  console.log('   2. See EXECUTE_MIGRATIONS_FIXED.md for the SQL to run\n');
  process.exit(1);
}
