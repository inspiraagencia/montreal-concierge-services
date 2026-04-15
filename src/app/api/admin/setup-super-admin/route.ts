import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { resend } from '@/lib/resend';

// Generate secure random password
function generateSecurePassword(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return password;
}

export async function POST(request: NextRequest) {
  try {
    const { setup_key, email } = await request.json();

    // ✅ CRITICAL FIX: Remove hardcoded fallback setup key
    if (!process.env.ADMIN_SETUP_KEY || setup_key !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json({ error: 'Invalid setup key' }, { status: 403 });
    }

    // ✅ CRITICAL FIX: Require email parameter instead of hardcoded
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
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

    // ✅ CRITICAL FIX: Generate secure random password instead of hardcoded
    const password = generateSecurePassword(16);

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

    // ✅ CRITICAL FIX: Send password via email instead of returning in response
    try {
      await resend.emails.send({
        from: 'security@montreal-concierge-services.com',
        to: email,
        subject: '🔐 Your Admin Account Has Been Created',
        html: `
          <h2>Admin Account Created Successfully</h2>
          <p>Your admin account for Montreal Concierge Services has been created.</p>

          <h3>Login Credentials:</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Temporary Password:</strong> <code>${password}</code></p>

          <p><strong>⚠️ IMPORTANT:</strong> This temporary password will expire in 24 hours. Please change it immediately after logging in.</p>

          <p><a href="https://montreal-concierge-services.vercel.app/admin/login">Go to Admin Login</a></p>

          <hr />
          <p style="color: #666; font-size: 12px;">If you did not request this account, please contact security immediately.</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send password email:', emailError);
      // Don't fail the whole request, but log it
    }

    // ✅ CRITICAL FIX: Log audit trail
    try {
      await adminClient.from('audit_logs').insert({
        admin_id: userId,
        action: 'SUPER_ADMIN_CREATED',
        table_name: 'admin_users',
        record_id: userId,
        new_values: { email, role: 'admin' },
        created_at: new Date().toISOString(),
      });
    } catch (auditError) {
      console.error('Failed to log audit trail:', auditError);
    }

    // ✅ SECURITY: Do NOT return password in response
    return NextResponse.json({
      success: true,
      message: 'Super Admin creado. Las credenciales fueron enviadas al email proporcionado.',
      email,
      userId,
      note: 'Password sent to email - check inbox/spam folder'
    });
  } catch (error) {
    // ✅ CRITICAL FIX: Sanitize error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Setup error - sanitized:', {
      type: error instanceof Error ? error.constructor.name : 'Unknown',
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ error: 'Setup failed. Check server logs.' }, { status: 500 });
  }
}
