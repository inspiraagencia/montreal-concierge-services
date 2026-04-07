'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface StatsCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

interface ContactStats {
  total: string;
  pending: string;
  responded: string;
  conversionRate: string;
}

function ReportesContent() {
  const [stats, setStats] = useState<StatsCard[]>([]);
  const [contactStats, setContactStats] = useState<ContactStats>({
    total: '0',
    pending: '0',
    responded: '0',
    conversionRate: '0%',
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');
  const supabase = createClient();

  useEffect(() => {
    fetchStats();
  }, [timeRange, supabase]);

  const fetchStats = async () => {
    try {
      // Fetch contact submission stats
      const { data: allSubmissions } = await supabase
        .from('contact_submissions')
        .select('*');

      const { data: recentSubmissions } = await supabase
        .from('contact_submissions')
        .select('*')
        .gte('created_at', new Date(Date.now() - parseInt(timeRange) * 24 * 60 * 60 * 1000).toISOString());

      const totalSubmissions = allSubmissions?.length || 0;
      const pendingSubmissions = allSubmissions?.filter((s) => !s.responded).length || 0;
      const respondedSubmissions = totalSubmissions - pendingSubmissions;
      const conversionRate = totalSubmissions > 0 ? ((respondedSubmissions / totalSubmissions) * 100).toFixed(1) : '0';

      setContactStats({
        total: totalSubmissions.toString(),
        pending: pendingSubmissions.toString(),
        responded: respondedSubmissions.toString(),
        conversionRate: `${conversionRate}%`,
      });

      // Calculate trending
      const recentTotal = recentSubmissions?.length || 0;
      const previousTotal = totalSubmissions - recentTotal;
      const change = previousTotal > 0 ? (((recentTotal - previousTotal) / previousTotal) * 100).toFixed(0) : '0';

      setStats([
        {
          title: 'Solicitudes Totales',
          value: totalSubmissions,
          change: parseInt(change as string),
          icon: '📧',
          color: '#00c0d4',
        },
        {
          title: 'Solicitudes Pendientes',
          value: pendingSubmissions,
          change: -Math.abs(parseInt(change as string)),
          icon: '⏳',
          color: '#f97316',
        },
        {
          title: 'Solicitudes Respondidas',
          value: respondedSubmissions,
          change: parseInt(change as string),
          icon: '✓',
          color: '#10b981',
        },
        {
          title: 'Tasa de Respuesta',
          value: `${conversionRate}%`,
          change: 0,
          icon: '📊',
          color: '#8b5cf6',
        },
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#00c0d4' }} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a1a4e' }}>
              Reportes y Análisis
            </h2>
            <p style={{ color: '#617d96' }}>Dashboard de rendimiento y estadísticas</p>
          </div>
          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: '#e5e7eb', color: '#0a1a4e' }}
            >
              <option value="7">Últimos 7 días</option>
              <option value="30">Últimos 30 días</option>
              <option value="90">Últimos 90 días</option>
              <option value="365">Último año</option>
            </select>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 shadow-sm"
              style={{
                background: 'white',
                borderTop: `4px solid ${stat.color}`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.change >= 0 ? 'text-green-700' : 'text-red-700'
                  }`}
                  style={{
                    background: stat.change >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  }}
                >
                  {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                </span>
              </div>
              <h3 className="text-sm font-medium mb-1" style={{ color: '#617d96' }}>
                {stat.title}
              </h3>
              <p className="text-3xl font-bold" style={{ color: '#0a1a4e' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Overview */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-xl font-bold mb-6" style={{ color: '#0a1a4e' }}>
            Resumen de Solicitudes de Cotización
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(0,192,212,0.1)' }}>
              <p className="text-sm text-gray-600 mb-2">Total</p>
              <p className="text-2xl font-bold" style={{ color: '#00c0d4' }}>
                {contactStats.total}
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(249,115,22,0.1)' }}>
              <p className="text-sm text-gray-600 mb-2">Pendientes</p>
              <p className="text-2xl font-bold" style={{ color: '#f97316' }}>
                {contactStats.pending}
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)' }}>
              <p className="text-sm text-gray-600 mb-2">Respondidas</p>
              <p className="text-2xl font-bold" style={{ color: '#10b981' }}>
                {contactStats.responded}
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(139,92,246,0.1)' }}>
              <p className="text-sm text-gray-600 mb-2">Tasa Respuesta</p>
              <p className="text-2xl font-bold" style={{ color: '#8b5cf6' }}>
                {contactStats.conversionRate}
              </p>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity Insights */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#0a1a4e' }}>
              Insights de Actividad
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">📈</span>
                <div>
                  <p className="font-semibold" style={{ color: '#0a1a4e' }}>
                    Solicitudes Activas
                  </p>
                  <p className="text-sm" style={{ color: '#617d96' }}>
                    Tienes {contactStats.pending} solicitudes esperando respuesta
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">⚡</span>
                <div>
                  <p className="font-semibold" style={{ color: '#0a1a4e' }}>
                    Engagement
                  </p>
                  <p className="text-sm" style={{ color: '#617d96' }}>
                    Tu tasa de respuesta es de {contactStats.conversionRate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">🎯</span>
                <div>
                  <p className="font-semibold" style={{ color: '#0a1a4e' }}>
                    Tendencia
                  </p>
                  <p className="text-sm" style={{ color: '#617d96' }}>
                    Mantén la comunicación frecuente con potenciales clientes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#0a1a4e' }}>
              Recomendaciones
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <div>
                  <p className="font-semibold" style={{ color: '#0a1a4e' }}>
                    Responde Solicitudes
                  </p>
                  <p className="text-sm" style={{ color: '#617d96' }}>
                    Responde las solicitudes pendientes lo antes posible
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">📝</span>
                <div>
                  <p className="font-semibold" style={{ color: '#0a1a4e' }}>
                    Actualiza Contenido
                  </p>
                  <p className="text-sm" style={{ color: '#617d96' }}>
                    Publica nuevos posts regularmente para mantener el sitio fresco
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">⭐</span>
                <div>
                  <p className="font-semibold" style={{ color: '#0a1a4e' }}>
                    Testimonios
                  </p>
                  <p className="text-sm" style={{ color: '#617d96' }}>
                    Pide a clientes satisfechos que dejen testimonios
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,192,212,0.1), rgba(61,231,248,0.1))' }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: '#0a1a4e' }}>
            Exportar Datos
          </h3>
          <p className="text-sm mb-6" style={{ color: '#617d96' }}>
            Descarga tus estadísticas en diferentes formatos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
            >
              📊 Descargar Excel
            </button>
            <button
              className="px-6 py-2.5 rounded-lg font-semibold transition-all"
              style={{
                background: 'white',
                border: '2px solid #00c0d4',
                color: '#00c0d4',
              }}
            >
              📄 Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function ReportesPage() {
  return (
    <ProtectedRoute>
      <ReportesContent />
    </ProtectedRoute>
  );
}
