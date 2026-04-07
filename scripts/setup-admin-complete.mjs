#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';

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

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

console.log('🚀 Montreal Concierge - Complete Admin Setup\n');
console.log('═══════════════════════════════════════════\n');

// Step 1: Check if tables already exist
console.log('📊 Step 1: Checking database state...\n');

let tablesExist = false;
try {
  const { data, error } = await supabase
    .from('admin_users')
    .select('count')
    .limit(1);

  if (!error) {
    tablesExist = true;
    console.log('✅ Tables already exist!\n');
  }
} catch (e) {
  console.log('⚠️  Tables not found yet\n');
}

// Step 2: If tables don't exist, provide setup link
if (!tablesExist) {
  console.log('📋 Step 2: Creating database tables\n');
  console.log('Please execute the SQL migrations in Supabase Dashboard:');
  console.log('');
  console.log('🔗 Click here to open Supabase SQL Editor:');
  console.log('   https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new\n');

  console.log('📝 Or copy this direct link with pre-filled SQL:');
  const sqlContent = fs.readFileSync(path.join(__dirname, '..', 'EXECUTE_MIGRATIONS_FIXED.md'), 'utf8');
  const sqlSection = sqlContent.match(/```sql([\s\S]*?)```/);
  if (sqlSection) {
    const sql = sqlSection[1].trim();
    const encoded = Buffer.from(sql).toString('base64');
    console.log(`   (SQL has been encoded and ready)\n`);

    console.log('⚠️  MANUAL STEP REQUIRED:');
    console.log('   1. Visit: https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new');
    console.log('   2. Read: EXECUTE_MIGRATIONS_FIXED.md');
    console.log('   3. Copy each SQL statement and execute in order');
    console.log('   4. Then run this script again to complete setup\n');

    // Create a helper function to save SQL for easy access
    const sqlFile = path.join(__dirname, '..', '.setup-sql.txt');
    fs.writeFileSync(sqlFile, sql);
    console.log(`✅ SQL saved to: .setup-sql.txt (for copy-paste)\n`);
  }

  console.log('Press ENTER to continue after executing the SQL in Supabase...');
  await new Promise(resolve => process.stdin.once('data', resolve));
}

// Step 3: Verify tables exist
console.log('\n📊 Step 3: Verifying tables...\n');

let tablesNowExist = false;
try {
  const { data, error } = await supabase
    .from('admin_users')
    .select('count')
    .limit(1);

  if (!error) {
    tablesNowExist = true;
    console.log('✅ Tables verified!\n');
  } else {
    console.log('❌ Tables still not found. Please execute the SQL and try again.\n');
    process.exit(1);
  }
} catch (e) {
  console.log('❌ Could not verify tables. Please check Supabase Dashboard.\n');
  process.exit(1);
}

// Step 4: Create/Update super admin user
console.log('👤 Step 4: Setting up Super Admin user...\n');

const email = 'inspiraagencia@hotmail.com';
const password = 'Abcde123450';
const fullName = 'Super Admin';

try {
  const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) throw listError;

  const existingUser = existingUsers?.users?.find((u) => u.email === email);
  let userId;

  if (existingUser) {
    console.log(`ℹ️  User already exists: ${email}`);
    userId = existingUser.id;

    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });

    if (updateError) throw updateError;
    console.log(`✅ Password updated\n`);
  } else {
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) throw createError;

    userId = newUser.user.id;
    console.log(`✅ User created: ${email}\n`);
  }

  // Insert into admin_users table
  console.log('👑 Assigning admin role...\n');

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
    console.log(`⚠️  Warning: ${insertError.message}`);
  } else {
    console.log(`✅ Admin role assigned\n`);
  }

  // Success message
  console.log('═══════════════════════════════════════════\n');
  console.log('🎉 Setup Complete!\n');
  console.log('📋 Super Admin Credentials:');
  console.log(`   Email:    ${email}`);
  console.log(`   Password: ${password}`);
  console.log(`   Role:     Admin (Full Access)\n`);

  console.log('🔗 Access the admin dashboard:');
  console.log('   https://montreal-concierge.vercel.app/admin/login\n');

  console.log('═══════════════════════════════════════════\n');

  process.exit(0);
} catch (error) {
  console.error(`\n❌ Error: ${error.message || error}\n`);
  process.exit(1);
}
