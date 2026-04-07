'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface AuditLog {
  id: string;
  admin_user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  changes: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

function AuditContent() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7');
  const supabase = createClient();

  useEffect(() => {
    fetchLogs();
  }, [timeRange, supabase]);

  const fetchLogs = async () => {
    try {
      const startDate = new Date(Date.now() - parseInt(timeRange) * 24 * 60 * 60 * 1000).toISOString();

      let query = supabase
        .from('audit_logs')
        .select('*')
        .gte('created_at', startDate)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('action', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT':
        return '#10b981';
      case 'UPDATE':
        return '#00c0d4';
      case 'DELETE':
        return '#ef4444';
      case 'SELECT':
        return '#8b5cf6';
      default:
        return '#617d96';
    }
  };

  const getTableColor = (table: string) => {
    const colors: Record<string, string> = {
      services: '#f97316',
      blog_posts: '#8b5cf6',
      testimonials: '#e8aa1a',
      images_gallery: '#10b981',
      admin_users: '#ef4444',
      contact_submissions: '#00c0d4',
    };
    return colors[table] || '#617d96';
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

  const actions = ['all', 'INSERT', 'UPDATE', 'DELETE', 'SELECT'];

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a1a4e' }}>
              Registro de Auditoría
            </h2>
            <p style={{ color: '#617d96' }}>
              Total de registros: {logs.length}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Time Range */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Período
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb', color: '#0a1a4e' }}
                >
                  <option value="1">Últimas 24 horas</option>
                  <option value="7">Últimos 7 días</option>
                  <option value="30">Últimos 30 días</option>
                  <option value="90">Últimos 90 días</option>
                </select>
              </div>

              {/* Action Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Acción
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb', color: '#0a1a4e' }}
                >
                  {actions.map((action) => (
                    <option key={action} value={action}>
                      {action === 'all' ? 'Todas las acciones' : action}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {logs.length === 0 ? (
              <div className="p-8 text-center" style={{ color: '#617d96' }}>
                <p className="text-lg">No hay registros de auditoría</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#f7f9fc' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Acción
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Tabla
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Detalles
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, idx) => (
                      <tr
                        key={log.id}
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          background: idx % 2 === 0 ? '#ffffff' : '#f7f9fc',
                        }}
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium" style={{ color: '#0a1a4e' }}>
                            {formatDate(log.created_at)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="text-xs px-3 py-1 rounded-full font-semibold text-white"
                            style={{ background: getActionColor(log.action) }}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="text-xs px-3 py-1 rounded-full font-semibold text-white"
                            style={{ background: getTableColor(log.table_name) }}
                          >
                            {log.table_name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm" style={{ color: '#617d96' }}>
                            <p className="text-xs mb-1">
                              <span style={{ color: '#9ca3af' }}>ID:</span> {log.record_id?.substring(0, 8) || '—'}
                            </p>
                            {log.changes && Object.keys(log.changes).length > 0 && (
                              <details className="cursor-pointer">
                                <summary className="text-xs" style={{ color: '#00c0d4' }}>
                                  Ver cambios ({Object.keys(log.changes).length})
                                </summary>
                                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-w-xs">
                                  {JSON.stringify(log.changes, null, 2)}
                                </pre>
                              </details>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Info */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
              <strong>Nota:</strong> El registro de auditoría captura todos los cambios realizados en la plataforma.
              Los registros se mantienen por razones de seguridad y cumplimiento.
            </p>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

export default function AuditPage() {
  return <AuditContent />;
}
