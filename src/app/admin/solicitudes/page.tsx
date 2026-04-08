'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string | null;
  service: string | null;
  description: string | null;
  message: string | null;
  budget: string | null;
  urgency: string | null;
  location: string | null;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'closed' | 'pending' | 'responded';
  created_at: string;
  responded?: boolean;
}

type SubmissionStatus = ContactSubmission['status'];

function SolicitudesContent() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'responded' | 'pending'>('all');
  const supabase = useMemo(() => createClient(), []);

  const fetchSubmissions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const isResponded = (sub: ContactSubmission) => (
    sub.responded === true ||
    ['responded', 'contacted', 'in_progress', 'completed', 'closed'].includes(sub.status)
  );

  const filteredSubmissions = submissions.filter((sub) => {
    if (filter === 'responded') return isResponded(sub);
    if (filter === 'pending') return !isResponded(sub);
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const updateStatus = async (submission: ContactSubmission, status: SubmissionStatus) => {
    const responded = ['responded', 'contacted', 'in_progress', 'completed', 'closed'].includes(status);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({
          status,
          responded,
          responded_at: responded ? new Date().toISOString() : null,
        })
        .eq('id', submission.id);

      if (error) throw error;
      setSubmissions((current) =>
        current.map((item) =>
          item.id === submission.id ? { ...item, status, responded } : item
        )
      );
    } catch (error) {
      console.error('Error updating submission status:', error);
      alert('No se pudo actualizar el estado de la solicitud.');
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
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a1a4e' }}>
            Solicitudes de Cotización
          </h2>
          <p style={{ color: '#617d96' }}>
            Total: {submissions.length} - Pendientes: {submissions.filter((s) => !isResponded(s)).length}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'pending', 'responded'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg font-medium transition-all"
              style={
                filter === f
                  ? {
                      background: 'linear-gradient(135deg, #00c0d4, #3de7f8)',
                      color: 'white',
                    }
                  : {
                      background: '#f0f1f3',
                      color: '#617d96',
                    }
              }
            >
              {f === 'all' && 'Todas'}
              {f === 'pending' && 'Pendientes'}
              {f === 'responded' && 'Respondidas'}
            </button>
          ))}
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center" style={{ color: '#617d96' }}>
              <p className="text-lg">No hay solicitudes en esta categoría</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ background: '#f7f9fc' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                      Nombre
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                      Teléfono
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                      Servicio
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission, idx) => (
                    <tr
                      key={submission.id}
                      style={{
                        borderBottom: '1px solid #e5e7eb',
                        background: idx % 2 === 0 ? '#ffffff' : '#f7f9fc',
                      }}
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium" style={{ color: '#0a1a4e' }}>
                          {submission.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-sm underline"
                          style={{ color: '#00c0d4' }}
                        >
                          {submission.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`tel:${submission.phone}`}
                          className="text-sm"
                          style={{ color: '#617d96' }}
                        >
                          {submission.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-sm px-3 py-1 rounded-full font-medium"
                          style={{
                            background: 'rgba(0,192,212,0.1)',
                            color: '#0a1a4e',
                          }}
                        >
                          {submission.service_type || submission.service || 'Sin servicio'}
                        </span>
                        {submission.location && (
                          <p className="text-xs mt-2" style={{ color: '#617d96' }}>
                            {submission.location}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm" style={{ color: '#617d96' }}>
                          {formatDate(submission.created_at)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            isResponded(submission)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {isResponded(submission) ? 'Respondida' : 'Pendiente'}
                        </span>
                        <select
                          value={submission.status || 'new'}
                          onChange={(event) => updateStatus(submission, event.target.value as SubmissionStatus)}
                          className="block mt-2 text-xs px-2 py-1 rounded border bg-white"
                          style={{ borderColor: '#e5e7eb', color: '#0a1a4e' }}
                        >
                          <option value="new">Nueva</option>
                          <option value="pending">Pendiente</option>
                          <option value="contacted">Contactada</option>
                          <option value="in_progress">En progreso</option>
                          <option value="completed">Completada</option>
                          <option value="closed">Cerrada</option>
                          <option value="responded">Respondida</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function SolicitudesPage() {
  return (
    <ProtectedRoute>
      <SolicitudesContent />
    </ProtectedRoute>
  );
}
