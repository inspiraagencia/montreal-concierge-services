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
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

// Try using Playwright to automate Supabase SQL execution
try {
  const chromium = await import('playwright').then(m => m.chromium);

  console.log('🚀 Launching automated Supabase SQL execution...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  const sqlMigrations = `CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "admin_users_select_authenticated" ON public.admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "admin_users_update_admin_only" ON public.admin_users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY IF NOT EXISTS "admin_users_insert_admin_only" ON public.admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY IF NOT EXISTS "admin_users_delete_admin_only" ON public.admin_users
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

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

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "audit_logs_select_authenticated" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );`;

  // Navigate to Supabase SQL Editor
  const sqlEditorUrl = 'https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new';
  console.log(`📡 Opening Supabase SQL Editor...`);
  await page.goto(sqlEditorUrl, { waitUntil: 'networkidle' });

  // Wait for page to load
  await page.waitForTimeout(3000);

  // Try to find and fill SQL editor
  const sqlEditor = await page.$('[data-testid="sql-editor"], textarea, [contenteditable="true"]');

  if (sqlEditor) {
    console.log('✅ SQL editor found, injecting SQL...');
    await page.focus('[data-testid="sql-editor"], textarea, [contenteditable="true"]');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(sqlMigrations, { delay: 1 });
    console.log('✅ SQL injected');
  } else {
    console.log('⚠️  Could not find SQL editor, please paste SQL manually');
    console.log('\n📋 SQL to execute:\n');
    console.log(sqlMigrations);
  }

  // Wait for user to execute
  console.log('\n⏳ Waiting for SQL execution...');
  console.log('   Please click the RUN button in Supabase Dashboard');
  console.log('   Browser will close automatically when done or after 2 minutes\n');

  // Wait for 2 minutes or until user closes
  await page.waitForTimeout(120000);

  await browser.close();
  console.log('✅ Done!');
  process.exit(0);

} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND' || error.message.includes('playwright')) {
    console.log('⚠️  Playwright not available for browser automation\n');
    console.log('📋 MANUAL SETUP REQUIRED:\n');
    console.log('Please execute the SQL migrations manually:\n');
    console.log('1. Go to: https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new');
    console.log('2. Open: EXECUTE_MIGRATIONS_FIXED.md');
    console.log('3. Copy-paste the SQL step by step');
    console.log('4. Click RUN for each step\n');
    process.exit(1);
  } else {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}
