#!/usr/bin/env node

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
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

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

console.log('🚀 Executing SQL migrations via Supabase GraphQL API...\n');

// Try executing all SQL in one batch via Postgres
async function executeSql() {
  const allSql = sqlStatements.join('\n');

  try {
    // Try PostgreSQL REST endpoint if available
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
      },
      body: JSON.stringify({ sql: allSql }),
    });

    console.log(`Response status: ${response.status}`);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('Standard REST endpoint failed, trying alternative approach...\n');

    // Try executing statements one by one with simple HTTP
    let success = 0;
    for (let i = 0; i < sqlStatements.length; i++) {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/execute-sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({ sql: sqlStatements[i] }),
        });

        if (response.ok) {
          success++;
          console.log(`✅ Statement ${i + 1} executed`);
        } else {
          console.log(`⚠️  Statement ${i + 1}: ${response.status}`);
        }
      } catch (e) {
        console.log(`⚠️  Statement ${i + 1} error: ${e.message}`);
      }
    }

    console.log(`\n✅ Executed ${success}/${sqlStatements.length} statements`);
  }
}

executeSql().catch(console.error);
