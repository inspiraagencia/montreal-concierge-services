'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'migration'>('idle');
  const [message, setMessage] = useState('');
  const [migrationSql, setMigrationSql] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const router = useRouter();
  const sqlRef = useRef<HTMLPreElement>(null);

  const handleSetup = async () => {
    setLoading(true);
    setStatus('idle');
    setMessage('');
    setMigrationSql('');

    try {
      // Try the migration execution endpoint first
      const res = await fetch('/api/admin/execute-migration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setup_key: 'INIT_MONTREAL_2024' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage('✅ ¡Dashboard admin completamente inicializado! Redirigiendo al login...');
        setTimeout(() => router.push('/admin/login'), 2500);
        return;
      }

      // If migration endpoint fails, try the old fallback
      const fallbackRes = await fetch('/api/admin/setup-super-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setup_key: 'INIT_MONTREAL_2024' }),
      });

      const fallbackData = await fallbackRes.json();

      if (fallbackRes.status === 409 && fallbackData.error === 'MISSING_TABLE') {
        setStatus('migration');
        setMessage(fallbackData.message);
        setMigrationSql(fallbackData.migration_sql);
        return;
      }

      if (fallbackRes.ok) {
        setStatus('success');
        setMessage('✅ ¡Configuración completada! Redirigiendo al login...');
        setTimeout(() => router.push('/admin/login'), 2500);
        return;
      }

      setStatus('error');
      setMessage(fallbackData.error || data.error || 'Error desconocido');
    } catch (error) {
      setStatus('error');
      setMessage('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySql = () => {
    if (migrationSql && sqlRef.current) {
      navigator.clipboard.writeText(migrationSql);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    }
  };

  const handleOpenSupabase = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const projectRef = supabaseUrl.split('https://')[1]?.split('.supabase.co')[0];
      window.open(`https://app.supabase.com/project/${projectRef}/sql/new`, '_blank');
    }
  };

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

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/images/logo.png"
            alt="Montreal Concierge Services"
            width={180}
            height={56}
            className="h-16 w-auto object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Setup Card */}
        <div
          className="rounded-3xl p-10 shadow-2xl backdrop-blur-xl border"
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderColor: 'rgba(0, 192, 212, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 192, 212, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#f1f5f9' }}>
              Configuración Inicial
            </h1>
            <p className="text-base font-medium" style={{ color: '#cbd5e1' }}>
              Vamos a preparar tu dashboard administrativo en 2 sencillos pasos
            </p>
          </div>

          {/* Credentials Card */}
          <div
            className="rounded-2xl p-6 mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 192, 212, 0.1), rgba(6, 182, 212, 0.05))',
              border: '1px solid rgba(0, 192, 212, 0.3)',
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#00c0d4' }}>
              🔐 Credenciales del Super Admin
            </p>
            <div className="space-y-3 text-sm" style={{ color: '#e2e8f0' }}>
              <div className="flex justify-between items-center">
                <span style={{ color: '#94a3b8' }}>Email:</span>
                <code className="font-mono px-3 py-1 rounded" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                  inspiraagencia@hotmail.com
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#94a3b8' }}>Contraseña:</span>
                <code className="font-mono px-3 py-1 rounded" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                  Abcde123450
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#94a3b8' }}>Rol:</span>
                <span className="px-3 py-1 rounded text-xs font-semibold" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          {status === 'migration' && (
            <div className="space-y-6 mb-8">
              {/* Step 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full font-semibold flex items-center justify-center text-white"
                    style={{ background: '#00c0d4' }}
                  >
                    1
                  </div>
                  <p className="font-semibold" style={{ color: '#e2e8f0' }}>
                    Abre Supabase Dashboard
                  </p>
                </div>
                <button
                  onClick={handleOpenSupabase}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-all hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #00c0d4, #06b6d4)',
                    color: 'white',
                    boxShadow: '0 10px 25px -5px rgba(0, 192, 212, 0.25)',
                  }}
                >
                  🔗 Abrir Supabase SQL Editor
                </button>
              </div>

              {/* Step 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full font-semibold flex items-center justify-center text-white"
                    style={{ background: '#00c0d4' }}
                  >
                    2
                  </div>
                  <p className="font-semibold" style={{ color: '#e2e8f0' }}>
                    Copia y ejecuta este SQL
                  </p>
                </div>
                <div
                  className="rounded-lg p-4 mb-3 text-xs font-mono overflow-x-auto"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(0, 192, 212, 0.2)',
                    color: '#e2e8f0',
                    lineHeight: '1.6',
                  }}
                  ref={sqlRef}
                >
                  {migrationSql}
                </div>
                <button
                  onClick={handleCopySql}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold transition-all"
                  style={{
                    background: copiedToClipboard ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 192, 212, 0.2)',
                    color: copiedToClipboard ? '#10b981' : '#00c0d4',
                    border: copiedToClipboard ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(0, 192, 212, 0.4)',
                  }}
                >
                  {copiedToClipboard ? '✅ Copiado' : '📋 Copiar SQL'}
                </button>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full font-semibold flex items-center justify-center text-white"
                    style={{ background: '#00c0d4' }}
                  >
                    3
                  </div>
                  <p className="font-semibold" style={{ color: '#e2e8f0' }}>
                    Vuelve aquí y verifica la configuración
                  </p>
                </div>
                <p className="text-sm" style={{ color: '#cbd5e1' }}>
                  Una vez que hayas ejecutado el SQL en Supabase, haz clic en el botón de abajo para verificar que todo está listo.
                </p>
              </div>
            </div>
          )}

          {/* Status Message */}
          {(status === 'success' || status === 'error') && (
            <div
              className="p-4 rounded-lg mb-6"
              style={{
                background: status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${status === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                color: status === 'success' ? '#86efac' : '#fca5a5',
              }}
            >
              <p className="font-semibold">
                {status === 'success' ? '✅ ' : '❌ '}{message}
              </p>
            </div>
          )}

          {/* Setup Button */}
          <button
            onClick={handleSetup}
            disabled={loading || status === 'success'}
            className="w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg active:scale-95"
            style={{
              background: loading
                ? 'linear-gradient(135deg, rgba(0,192,212,0.4), rgba(6,182,212,0.4))'
                : status === 'success'
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'linear-gradient(135deg, #00c0d4 0%, #06b6d4 100%)',
              boxShadow: status === 'success' ? 'none' : '0 10px 25px -5px rgba(0, 192, 212, 0.25)',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {status === 'migration' ? 'Verificando configuración...' : 'Creando Super Admin...'}
              </span>
            ) : status === 'success' ? (
              '✅ Redirigiendo al login...'
            ) : (
              '🚀 Crear Super Admin'
            )}
          </button>

          <p className="text-center text-xs mt-6" style={{ color: '#64748b' }}>
            💡 Esta página solo se usa una vez durante la configuración inicial
          </p>
        </div>
      </div>
    </div>
  );
}
