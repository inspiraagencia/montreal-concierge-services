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

const sqlStatements = [
  `CREATE TABLE IF NOT EXISTS public.admin_users (id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, email TEXT UNIQUE NOT NULL, full_name TEXT, role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer', is_active BOOLEAN DEFAULT true, last_login TIMESTAMP WITH TIME ZONE, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`,
  `ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;`,
  `CREATE POLICY IF NOT EXISTS "admin_users_select_authenticated" ON public.admin_users FOR SELECT USING (auth.role() = 'authenticated');`,
  `CREATE POLICY IF NOT EXISTS "admin_users_update_admin_only" ON public.admin_users FOR UPDATE USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));`,
  `CREATE POLICY IF NOT EXISTS "admin_users_insert_admin_only" ON public.admin_users FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));`,
  `CREATE POLICY IF NOT EXISTS "admin_users_delete_admin_only" ON public.admin_users FOR DELETE USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));`,
  `CREATE TABLE IF NOT EXISTS public.audit_logs (id BIGSERIAL PRIMARY KEY, admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL, action TEXT NOT NULL, table_name TEXT NOT NULL, record_id TEXT, old_values JSONB, new_values JSONB, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`,
  `ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;`,
  `CREATE POLICY IF NOT EXISTS "audit_logs_select_authenticated" ON public.audit_logs FOR SELECT USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND is_active = true));`,
];

console.log('🚀 Executing SQL migrations...\n');

async function executeMigrations() {
  let executed = 0;

  // Try multiple approaches
  const approaches = [
    // Approach 1: Try direct SQL execution via rest endpoint
    async (sql) => {
      try {
        const response = await fetch(`${supabaseUrl}/sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
            'apikey': serviceRoleKey,
          },
          body: JSON.stringify({ sql }),
        });

        if (response.ok || response.status === 201) {
          return { ok: true, status: response.status };
        }
        const text = await response.text();
        return { ok: false, status: response.status, text };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    },
    // Approach 2: Try via edges/functions endpoint
    async (sql) => {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/sql-executor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({ sql }),
        });

        if (response.ok) {
          return { ok: true, status: response.status };
        }
        return { ok: false, status: response.status };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    },
  ];

  for (let i = 0; i < sqlStatements.length; i++) {
    let success = false;

    for (const approach of approaches) {
      const result = await approach(sqlStatements[i]);

      if (result.ok) {
        executed++;
        console.log(`✅ Statement ${i + 1} executed`);
        success = true;
        break;
      }
    }

    if (!success) {
      console.log(`⚠️  Statement ${i + 1} - All approaches failed`);
    }
  }

  console.log(`\n✅ Migration execution completed: ${executed}/${sqlStatements.length}`);

  // Verify tables were created
  console.log('\n🔍 Verifying table creation...');
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/admin_users?limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'apikey': serviceRoleKey,
        },
      }
    );

    if (response.ok) {
      console.log('✅ admin_users table verified!');
    } else {
      console.log(`⚠️  admin_users table not found (${response.status})`);
    }
  } catch (e) {
    console.log(`⚠️  Verification failed: ${e.message}`);
  }
}

executeMigrations().catch(console.error);
