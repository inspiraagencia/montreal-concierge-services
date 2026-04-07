import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, contraseña y rol son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Configuración de Supabase faltante' }, { status: 500 });
    }

    // Use service role client to verify current user is admin
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const requestClient = createClient(supabaseUrl, anonKey);

    // Get the auth token from the request header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user: currentUser }, error: userError } = await requestClient.auth.getUser(token);

    if (userError || !currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Use service role to check if current user is admin
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: adminUser, error: checkError } = await adminClient
      .from('admin_users')
      .select('role')
      .eq('id', currentUser.id)
      .single();

    if (checkError || !adminUser || adminUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Solo los administradores pueden crear usuarios' },
        { status: 403 }
      );
    }

    // Create new user in Supabase Auth (email auto-confirmed, no verification needed)
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (createError) {
      if (createError.message.includes('already registered')) {
        return NextResponse.json({ error: 'Este email ya está registrado' }, { status: 409 });
      }
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    // Insert into admin_users table
    const { error: dbError } = await adminClient.from('admin_users').insert({
      id: newUser.user.id,
      email,
      full_name: full_name || '',
      role,
      is_active: true,
    });

    if (dbError) {
      // Rollback: delete auth user if DB insert fails
      await adminClient.auth.admin.deleteUser(newUser.user.id);
      return NextResponse.json({ error: `Error en base de datos: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Usuario ${email} creado con rol ${role}`,
      userId: newUser.user.id,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
