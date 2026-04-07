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

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkSchema() {
  console.log('🔍 Checking Supabase schema...\n');

  try {
    // Try to query the information_schema to see what tables exist
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (error) {
      console.log('⚠️  Cannot query information_schema directly');
      console.log('Attempting to query public tables via PostgREST...\n');

      // Try to check by accessing tables directly
      const tables = ['admin_users', 'audit_logs', 'contact_submissions'];

      for (const table of tables) {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);

        if (error) {
          if (error.message.includes('relation') || error.message.includes('does not exist')) {
            console.log(`❌ Table NOT found: ${table}`);
          } else {
            console.log(`⚠️  ${table}: ${error.message}`);
          }
        } else {
          console.log(`✅ Table exists: ${table}`);
        }
      }
    } else {
      console.log('📋 Tables in public schema:');
      data?.forEach((row) => {
        console.log(`   - ${row.table_name}`);
      });
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkSchema();
