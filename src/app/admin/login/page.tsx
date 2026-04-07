'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setMounted(true);

    // Check if already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [supabase, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Sign in with Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      // Verify admin access
      const { data: adminUser, error: userError } = await supabase
        .from('admin_users')
        .select('id, role, is_active')
        .eq('id', data.user!.id)
        .single();

      if (userError || !adminUser) {
        setError('Not authorized to access admin panel');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (!adminUser.is_active) {
        setError('Your account has been deactivated');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // Successfully logged in
      router.push('/admin');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #00c0d4, #0891b2)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #06b6d4, #0e7490)' }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="relative h-16 w-auto">
            <Image
              src="/images/logo.png"
              alt="Montreal Concierge Services"
              width={180}
              height={56}
              className="h-16 w-auto object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Login Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl backdrop-blur-xl border"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            borderColor: 'rgba(0, 192, 212, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 192, 212, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#f1f5f9' }}>
              Admin Panel
            </h1>
            <p className="text-sm font-medium" style={{ color: '#cbd5e1' }}>
              Acceso seguro al dashboard administrativo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-3" style={{ color: '#e2e8f0' }}>
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:outline-none disabled:opacity-50"
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(0, 192, 212, 0.4)',
                  color: '#f1f5f9',
                  boxShadow: 'inset 0 0 0 3px rgba(0, 192, 212, 0.3)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 3px rgba(0, 192, 212, 0.5), 0 0 0 3px rgba(0, 192, 212, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 3px rgba(0, 192, 212, 0.3)';
                }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-3" style={{ color: '#e2e8f0' }}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:outline-none disabled:opacity-50 focus:ring-2 focus:ring-offset-0"
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(0, 192, 212, 0.4)',
                  color: '#f1f5f9',
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-4 rounded-lg text-sm font-medium border"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#fca5a5'
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-8 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
              style={{
                background: loading
                  ? 'linear-gradient(135deg, rgba(0,192,212,0.4), rgba(6,182,212,0.4))'
                  : 'linear-gradient(135deg, #00c0d4 0%, #06b6d4 100%)',
                boxShadow: loading ? 'none' : '0 10px 25px -5px rgba(0, 192, 212, 0.25)',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                'Ingresar al Dashboard'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(0, 192, 212, 0.2)' }}>
            <p className="text-center text-xs font-medium" style={{ color: '#94a3b8' }}>
              ¿Necesitas ayuda? Contacta al administrador del sistema
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2" style={{ color: '#64748b' }}>
          <span className="text-xs">🔒 Conexión segura</span>
        </div>
      </div>
    </div>
  );
}
