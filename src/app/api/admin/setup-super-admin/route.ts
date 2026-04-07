import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { setup_key } = await request.json();

    if (setup_key !== process.env.ADMIN_SETUP_KEY && setup_key !== 'INIT_MONTREAL_2024') {
      return NextResponse.json({ error: 'Invalid setup key' }, { status: 403 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
    }

    // Step 1: Create user in Supabase Auth (service role bypasses email confirmation)
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const email = 'inspiraagencia@hotmail.com';
    const password = 'Abcde123450';

    // Check if already exists
    const { data: existingUsers } = await adminClient.auth.admin.listUsers();
    const alreadyExists = existingUsers?.users?.find((u) => u.email === email);

    let userId: string;

    if (alreadyExists) {
      userId = alreadyExists.id;
      await adminClient.auth.admin.updateUserById(userId, { password });
    } else {
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 400 });
      }

      userId = newUser.user.id;
    }

    // Step 3: Upsert into admin_users
    const { error: dbError } = await adminClient
      .from('admin_users')
      .upsert({ id: userId, email, full_name: 'Super Admin', role: 'admin', is_active: true }, { onConflict: 'id' });

    if (dbError) {
      // Table likely doesn't exist yet — show migration SQL
      const isMissingTable = dbError.message.includes('schema cache') || dbError.message.includes('does not exist');

      if (isMissingTable) {
        return NextResponse.json({
          error: 'MISSING_TABLE',
          message: 'La tabla admin_users no existe. Ejecuta las migraciones primero.',
          auth_user_created: true,
          user_id: userId,
          migration_sql: `
-- Pega este SQL en Supabase Dashboard → SQL Editor → New Query y presiona RUN:

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Luego vuelve a hacer clic en "Crear Super Admin"
          `.trim(),
        }, { status: 409 });
      }

      return NextResponse.json({ error: `DB error: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Super Admin creado exitosamente', email, userId });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
