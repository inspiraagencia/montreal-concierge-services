'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface Service {
  id: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  icon: string;
  color: string;
  order: number;
  active: boolean;
  created_at: string;
}

function ServiciosContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_en: '',
    name_fr: '',
    description_en: '',
    description_fr: '',
    icon: '🔧',
    color: '#00c0d4',
    order: 0,
  });
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    fetchServices();
  }, [supabase]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{ ...formData, active: true }]);

        if (error) throw error;
      }

      resetForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_fr: '',
      description_en: '',
      description_fr: '',
      icon: '🔧',
      color: '#00c0d4',
      order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (service: Service) => {
    setFormData({
      name_en: service.name_en,
      name_fr: service.name_fr,
      description_en: service.description_en,
      description_fr: service.description_fr,
      icon: service.icon,
      color: service.color,
      order: service.order,
    });
    setEditingId(service.id);
    setShowForm(true);
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
              Servicios
            </h2>
            <p style={{ color: '#617d96' }}>Total de servicios: {services.length}</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
            >
              + Nuevo Servicio
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0a1a4e' }}>
              {editingId ? 'Editar Servicio' : 'Nuevo Servicio'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* English Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Nombre (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* French Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Nom (Français)
                  </label>
                  <input
                    type="text"
                    value={formData.name_fr}
                    onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Ícono (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    maxLength={2}
                    className="w-full px-4 py-2 rounded-lg border text-center text-2xl"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Color (Hex)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-12 h-10 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Orden
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              {/* English Description */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Descripción (English)
                </label>
                <textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb' }}
                />
              </div>

              {/* French Description */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Description (Français)
                </label>
                <textarea
                  value={formData.description_fr}
                  onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb' }}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
                >
                  {editingId ? 'Guardar Cambios' : 'Crear Servicio'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-lg font-semibold transition-all"
                  style={{
                    background: '#f0f1f3',
                    color: '#617d96',
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="grid gap-4">
          {services.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center" style={{ color: '#617d96' }}>
              <p className="text-lg">No hay servicios creados. Crea el primero ahora.</p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                style={{ borderLeft: `4px solid ${service.color}` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: '#0a1a4e' }}>
                          {service.name_en}
                        </h3>
                        <p className="text-sm" style={{ color: '#617d96' }}>
                          {service.name_fr}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mt-2" style={{ color: '#617d96' }}>
                      {service.description_en}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-4 py-2 rounded-lg font-medium transition-all text-sm"
                      style={{
                        background: 'rgba(0,192,212,0.1)',
                        color: '#00c0d4',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="px-4 py-2 rounded-lg font-medium transition-all text-sm"
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        color: '#ef4444',
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function ServiciosPage() {
  return (
    <ProtectedRoute requiredRole="editor">
      <ServiciosContent />
    </ProtectedRoute>
  );
}
