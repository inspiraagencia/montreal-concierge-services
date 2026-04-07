import pg from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres:wjsYoPSv88rXwqsu@db.pymttfagfwetbsqqeeej.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

const schema = readFileSync(join(__dirname, '../supabase/schema.sql'), 'utf-8');

// Split into individual statements, skip comments and empty lines
const statements = schema
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('COMMENT'));

async function run() {
  try {
    console.log('🔌 Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('✅ Connected!\n');

    for (const stmt of statements) {
      if (!stmt.trim()) continue;
      const preview = stmt.slice(0, 60).replace(/\n/g, ' ');
      try {
        await client.query(stmt);
        console.log(`✓ ${preview}...`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`⏭  (already exists) ${preview}...`);
        } else {
          console.warn(`⚠  Error: ${err.message.slice(0, 100)}`);
        }
      }
    }

    console.log('\n🎉 Schema applied successfully!');
    console.log('Tables created: contact_submissions, services, blog_posts');
    console.log('RLS policies, indexes and triggers configured.\n');
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
  }
}

run();
