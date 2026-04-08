'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SetupMigrationsPage() {
  const [step, setStep] = useState<'check' | 'execute' | 'verify' | 'complete' | 'error'>('check');
  const [loading, setLoading] = useState(true);
  const [sqlToExecute, setSqlToExecute] = useState('');

  const sqlMigrations = `-- Create admin_users table
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

-- Create policies for admin_users
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

-- Enable RLS for audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for audit_logs
CREATE POLICY IF NOT EXISTS "audit_logs_select_authenticated" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );`;

  useEffect(() => {
    loadSql();
    checkTables();
  }, []);

  const loadSql = async () => {
    try {
      const response = await fetch('/api/admin/run-migrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get-sql' }),
      });
      const data = await response.json();
      setSqlToExecute(data.sql || sqlMigrations);
    } catch {
      setSqlToExecute(sqlMigrations);
    }
  };

  const checkTables = async () => {
    try {
      const response = await fetch('/api/admin/run-migrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify' }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.tablesCreated) {
        setStep('complete');
      } else {
        setStep('execute');
      }
    } catch (error) {
      setLoading(false);
      setStep('execute');
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(sqlToExecute || sqlMigrations);
    alert('SQL copied to clipboard!');
  };

  const openSupabase = () => {
    window.open('https://app.supabase.com/project/pymttfagfwetbsqqeeej/sql/new', '_blank');
  };

  const verifyAgain = async () => {
    setLoading(true);
    await checkTables();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Admin Dashboard Setup
          </h1>
          <p className="text-gray-400">Complete the database configuration</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-400">Checking database state...</p>
          </div>
        ) : step === 'execute' ? (
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Copy the SQL Migration</h3>
                  <p className="text-gray-400 mb-4">Click the button below to copy all database migrations</p>
                  <button
                    onClick={copySql}
                    className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition"
                  >
                    📋 Copy SQL to Clipboard
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Execute in Supabase</h3>
                  <p className="text-gray-400 mb-4">Open the Supabase SQL editor and execute the migrations</p>
                  <button
                    onClick={openSupabase}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition inline-flex items-center gap-2"
                  >
                    🔗 Open Supabase SQL Editor
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Paste and Execute</h3>
                  <p className="text-gray-400 mb-4">Paste the SQL (Ctrl+V) and click the RUN button in Supabase Dashboard</p>
                  <p className="text-sm text-gray-500">⏱️ Wait 30 seconds after clicking RUN for changes to propagate</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Verify Setup</h3>
                  <p className="text-gray-400 mb-4">Once SQL has been executed in Supabase, click below to verify</p>
                  <button
                    onClick={verifyAgain}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                  >
                    ✅ Verify Setup Complete
                  </button>
                </div>
              </div>
            </div>

            {/* SQL Preview */}
            <details className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <summary className="text-lg font-semibold text-cyan-400 cursor-pointer hover:text-cyan-300">
                📝 View SQL to Execute
              </summary>
              <pre className="mt-4 bg-slate-900 rounded p-4 overflow-x-auto text-sm text-gray-300">
                {sqlToExecute || sqlMigrations}
              </pre>
            </details>
          </div>
        ) : step === 'complete' ? (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center backdrop-blur">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-2">Database Setup Complete!</h2>
              <p className="text-gray-400 mb-6">All tables have been created successfully</p>

              <div className="bg-slate-800 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-cyan-400 mb-3">Admin Credentials:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <span className="ml-2 font-mono">Use your admin email</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Password:</span>
                    <span className="ml-2 font-mono">Use the password you configured in Supabase Auth</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Role:</span>
                    <span className="ml-2 font-mono">Admin (Full Access)</span>
                  </div>
                </div>
              </div>

              <Link href="/admin/login">
                <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-bold transition">
                  🔐 Go to Admin Login
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
