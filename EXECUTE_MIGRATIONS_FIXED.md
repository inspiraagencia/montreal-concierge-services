# 🗄️ Ejecutar Migraciones en Supabase (SQL Corregido)

## Paso a Paso

### 1. Abre Supabase SQL Editor
[🔗 Haz clic aquí](https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new)

### 2. Ejecuta este SQL EN ORDEN

**PASO 1 - Crear tabla admin_users:**
```sql
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
```
✅ Haz clic en **RUN**

---

**PASO 2 - Habilitar RLS:**
```sql
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
```
✅ Haz clic en **RUN**

---

**PASO 3 - Crear políticas:**
```sql
CREATE POLICY admin_users_select_authenticated ON public.admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY admin_users_update_admin_only ON public.admin_users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY admin_users_insert_admin_only ON public.admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

CREATE POLICY admin_users_delete_admin_only ON public.admin_users
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );
```
✅ Haz clic en **RUN**

---

**PASO 4 - Crear tabla audit_logs:**
```sql
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
```
✅ Haz clic en **RUN**

---

**PASO 5 - Habilitar RLS en audit_logs:**
```sql
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
```
✅ Haz clic en **RUN**

---

**PASO 6 - Crear políticas para audit_logs:**
```sql
CREATE POLICY audit_logs_select_authenticated ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );
```
✅ Haz clic en **RUN**

---

### 3. ¡Listo!

Una vez ejecutes todos los pasos, vuelve a:

[🔗 Admin Login](https://montreal-concierge.vercel.app/admin/login)

**Credenciales:**
- Email: `inspiraagencia@hotmail.com`
- Contraseña: `Abcde123450`

---

## 💡 Nota

Si ves errores tipo "already exists", eso significa que las tablas/políticas ya fueron creadas. Es normal y puedes ignorarlos.
