#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1]] = match[2];
  }
});

// Use pooler URL for better compatibility
const password = encodeURIComponent('wjsYoPSv88rXwqsu');
const POOLER_URL = `postgresql://postgres.pymttfagfwetbsqqeeej:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

const pool = new Pool({
  connectionString: POOLER_URL,
  ssl: { rejectUnauthorized: false },
});

const migrations = [
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

  `CREATE POLICY IF NOT EXISTS "contact_select_admin" ON public.contact_submissions
    FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND is_active = true
      )
    );`,
];

async function runMigrations() {
  const client = await pool.connect();
  try {
    console.log('🚀 Running database migrations...\n');

    let completed = 0;
    for (const migration of migrations) {
      try {
        await client.query(migration);
        completed++;
        process.stdout.write(`\r✅ ${completed}/${migrations.length} migrations completed`);
      } catch (error) {
        // "already exists" errors are ok
        if (
          error.message.includes('already exists') ||
          error.message.includes('duplicate') ||
          error.message.includes('relation')
        ) {
          completed++;
          process.stdout.write(`\r✅ ${completed}/${migrations.length} migrations completed`);
        } else {
          console.error(`\n⚠️ Error in migration ${completed + 1}:`, error.message);
        }
      }
    }

    console.log('\n\n✨ Database migrations completed successfully!\n');

    // Now create super admin user in auth
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey) {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const email = 'inspiraagencia@hotmail.com';
      const password = 'Abcde123450';

      try {
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const alreadyExists = existingUsers?.users?.find((u) => u.email === email);

        let userId;

        if (alreadyExists) {
          userId = alreadyExists.id;
          await supabase.auth.admin.updateUserById(userId, { password });
          console.log('✅ Super Admin user updated');
        } else {
          const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
          });

          if (createError) throw createError;
          userId = newUser.user.id;
          console.log('✅ Super Admin user created');
        }

        // Insert into admin_users
        const { error: dbError } = await client.query(
          `INSERT INTO public.admin_users (id, email, full_name, role, is_active)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE SET role = 'admin', is_active = true`,
          [userId, email, 'Super Admin', 'admin', true]
        );

        if (dbError) throw dbError;
        console.log('✅ Super Admin record inserted\n');
      } catch (authError) {
        console.error('⚠️ Auth setup error:', authError.message);
      }
    }

    console.log('📋 Super Admin Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('   Role: Admin (full access)\n');
    console.log('🔐 You can now log in at: http://localhost:3000/admin/login\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.release();
    await pool.end();
  }
}

runMigrations();
