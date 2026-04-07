const { Pool } = require('pg');

async function test(url, label) {
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 8000 });
  try {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT 1 as ok');
    console.log(`✅ ${label} - Connected!`);
    client.release();
    await pool.end();
    return true;
  } catch(e) {
    console.log(`❌ ${label} - ${e.message.substring(0, 80)}`);
    await pool.end().catch(() => {});
    return false;
  }
}

const pass = encodeURIComponent('wjsYoPSv88rXwqsu');
const ref = 'pymttfagfwetbsqqeeej';

(async () => {
  for (const region of ['us-east-1', 'ca-central-1', 'us-west-2', 'eu-west-1']) {
    for (const port of [6543, 5432]) {
      const url = `postgresql://postgres.${ref}:${pass}@aws-0-${region}.pooler.supabase.com:${port}/postgres`;
      const ok = await test(url, `${region}:${port}`);
      if (ok) {
        console.log('\n🎯 Working URL:', url);
        process.exit(0);
      }
    }
  }
  console.log('\n⚠️ None of the pooler connections worked');
})();
