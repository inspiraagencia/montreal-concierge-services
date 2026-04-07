# 🗄️ Ejecutar Migraciones en Supabase

## Paso a Paso

### 1. Abre Supabase SQL Editor
[🔗 Haz clic aquí para ir a Supabase](https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new)

### 2. Copia este SQL

```sql
-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create audit_logs table
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
  );
```

### 3. Pega en Supabase y ejecuta
1. En Supabase, haz clic en el área de texto
2. Pega el SQL (Ctrl+V)
3. Haz clic en el botón **RUN** (esquina superior derecha)
4. Espera a que se complete

### 4. Vuelve al setup del admin
[🔗 Ir a Setup del Admin](https://montreal-concierge.vercel.app/admin/setup)

### 5. Haz clic en "Crear Super Admin"
El sistema verificará que las tablas existan y creará el usuario super admin.

---

## 📝 Credenciales del Super Admin

Una vez completado el setup:
- **Email:** inspiraagencia@hotmail.com
- **Contraseña:** Abcde123450
- **Rol:** Admin (acceso completo)

## 🔐 Acceder al Dashboard

[🔗 Login al Admin Dashboard](https://montreal-concierge.vercel.app/admin/login)

---

## ⚠️ Si hay errores

Si ves errores de "relation already exists", eso significa que las tablas ya fueron creadas. Es normal y puedes continuar.

Si las tablas aún no se crean después de ejecutar el SQL, intenta:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña de Network
3. Intenta nuevamente
4. Busca si hay errores de CORS o de red
