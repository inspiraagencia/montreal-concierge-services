#!/bin/bash

# Load environment variables
source .env.local

SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL"
SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY"

echo "🚀 Executing migrations on Supabase..."
echo ""

# SQL Migrations
MIGRATIONS=(
  "CREATE TABLE IF NOT EXISTS public.admin_users (id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, email TEXT UNIQUE NOT NULL, full_name TEXT, role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer', is_active BOOLEAN DEFAULT true, last_login TIMESTAMP WITH TIME ZONE, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);"

  "ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;"

  "CREATE POLICY IF NOT EXISTS \"admin_users_select_authenticated\" ON public.admin_users FOR SELECT USING (auth.role() = 'authenticated');"

  "CREATE POLICY IF NOT EXISTS \"admin_users_update_admin_only\" ON public.admin_users FOR UPDATE USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));"

  "CREATE POLICY IF NOT EXISTS \"admin_users_insert_admin_only\" ON public.admin_users FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));"

  "CREATE POLICY IF NOT EXISTS \"admin_users_delete_admin_only\" ON public.admin_users FOR DELETE USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true));"

  "CREATE TABLE IF NOT EXISTS public.audit_logs (id BIGSERIAL PRIMARY KEY, admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL, action TEXT NOT NULL, table_name TEXT NOT NULL, record_id TEXT, old_values JSONB, new_values JSONB, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);"

  "ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;"

  "CREATE POLICY IF NOT EXISTS \"audit_logs_select_authenticated\" ON public.audit_logs FOR SELECT USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND is_active = true));"

  "ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;"

  "CREATE POLICY IF NOT EXISTS \"contact_select_admin\" ON public.contact_submissions FOR SELECT USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND is_active = true));"
)

# Execute migrations via Supabase Management API
# Note: This requires direct PostgreSQL access through sql.rawQuery or similar
# For now, we'll use the endpoint we created in the Next.js app

echo "📝 SQL Migrations:"
echo "Please execute the following SQL in Supabase Dashboard:"
echo ""
echo "=============================================="
echo "CREATE TABLE IF NOT EXISTS public.admin_users ("
echo "  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,"
echo "  email TEXT UNIQUE NOT NULL,"
echo "  full_name TEXT,"
echo "  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',"
echo "  is_active BOOLEAN DEFAULT true,"
echo "  last_login TIMESTAMP WITH TIME ZONE,"
echo "  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,"
echo "  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP"
echo ");"
echo ""
echo "ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;"
echo ""
echo "CREATE POLICY IF NOT EXISTS \"admin_users_select_authenticated\" ON public.admin_users"
echo "  FOR SELECT USING (auth.role() = 'authenticated');"
echo ""
echo "CREATE POLICY IF NOT EXISTS \"admin_users_update_admin_only\" ON public.admin_users"
echo "  FOR UPDATE USING ("
echo "    EXISTS ("
echo "      SELECT 1 FROM public.admin_users"
echo "      WHERE id = auth.uid() AND role = 'admin' AND is_active = true"
echo "    )"
echo "  );"
echo ""
echo "CREATE POLICY IF NOT EXISTS \"admin_users_insert_admin_only\" ON public.admin_users"
echo "  FOR INSERT WITH CHECK ("
echo "    EXISTS ("
echo "      SELECT 1 FROM public.admin_users"
echo "      WHERE id = auth.uid() AND role = 'admin' AND is_active = true"
echo "    )"
echo "  );"
echo ""
echo "CREATE TABLE IF NOT EXISTS public.audit_logs ("
echo "  id BIGSERIAL PRIMARY KEY,"
echo "  admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,"
echo "  action TEXT NOT NULL,"
echo "  table_name TEXT NOT NULL,"
echo "  record_id TEXT,"
echo "  old_values JSONB,"
echo "  new_values JSONB,"
echo "  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP"
echo ");"
echo ""
echo "ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;"
echo ""
echo "CREATE POLICY IF NOT EXISTS \"audit_logs_select_authenticated\" ON public.audit_logs"
echo "  FOR SELECT USING ("
echo "    EXISTS ("
echo "      SELECT 1 FROM public.admin_users"
echo "      WHERE id = auth.uid() AND is_active = true"
echo "    )"
echo "  );"
echo "=============================================="
echo ""
echo "🔗 Go to: https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql"
echo "📋 Paste the above SQL and click RUN"
echo ""
