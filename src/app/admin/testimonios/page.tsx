'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote_en: string;
  quote_fr: string;
  service_en: string;
  service_fr: string;
  rating: number;
  avatar_image: string;
  published: boolean;
  created_at: string;
}

function TestimoniosContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    quote_en: '',
    quote_fr: '',
    service_en: '',
    service_fr: '',
    rating: 5,
    avatar_image: '',
  });
  const supabase = createClient();

  useEffect(() => {
    fetchTestimonials();
  }, [supabase]);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([{ ...formData, published: false }]);

        if (error) throw error;
      }

      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este testimonio?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const togglePublish = async (testimonial: Testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ published: !testimonial.published })
        .eq('id', testimonial.id);

      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      quote_en: '',
      quote_fr: '',
      service_en: '',
      service_fr: '',
      rating: 5,
      avatar_image: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      quote_en: testimonial.quote_en,
      quote_fr: testimonial.quote_fr,
      service_en: testimonial.service_en,
      service_fr: testimonial.service_fr,
      rating: testimonial.rating,
      avatar_image: testimonial.avatar_image,
    });
    setEditingId(testimonial.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a1a4e' }}>
              Testimonios
            </h2>
            <p style={{ color: '#617d96' }}>Total de testimonios: {testimonials.length}</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
            >
              + Nuevo Testimonio
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0a1a4e' }}>
              {editingId ? 'Editar Testimonio' : 'Nuevo Testimonio'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* Service EN */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Servicio (English)
                  </label>
                  <input
                    type="text"
                    value={formData.service_en}
                    onChange={(e) => setFormData({ ...formData, service_en: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* Service FR */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Service (Français)
                  </label>
                  <input
                    type="text"
                    value={formData.service_fr}
                    onChange={(e) => setFormData({ ...formData, service_fr: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Calificación
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {renderStars(r)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Avatar Image */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Avatar (URL)
                  </label>
                  <input
                    type="url"
                    value={formData.avatar_image}
                    onChange={(e) => setFormData({ ...formData, avatar_image: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Quote EN */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Testimonio (English)
                </label>
                <textarea
                  value={formData.quote_en}
                  onChange={(e) => setFormData({ ...formData, quote_en: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb' }}
                />
              </div>

              {/* Quote FR */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Témoignage (Français)
                </label>
                <textarea
                  value={formData.quote_fr}
                  onChange={(e) => setFormData({ ...formData, quote_fr: e.target.value })}
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
                  {editingId ? 'Guardar Cambios' : 'Crear Testimonio'}
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

        {/* Testimonials List */}
        <div className="grid gap-4">
          {testimonials.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center" style={{ color: '#617d96' }}>
              <p className="text-lg">No hay testimonios creados.</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                style={{ borderTop: `4px solid ${testimonial.published ? '#e8aa1a' : '#9ca3af'}` }}
              >
                <div className="flex justify-between items-start gap-4">
                  {testimonial.avatar_image && (
                    <img
                      src={testimonial.avatar_image}
                      alt={testimonial.name}
                      className="h-16 w-16 rounded-full object-cover flex-shrink-0"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: '#0a1a4e' }}>
                          {testimonial.name}
                        </h3>
                        <p className="text-sm" style={{ color: '#617d96' }}>
                          {testimonial.company}
                        </p>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-semibold"
                        style={{
                          background: testimonial.published ? 'rgba(232,170,26,0.1)' : 'rgba(107,114,128,0.1)',
                          color: testimonial.published ? '#e8aa1a' : '#6b7280',
                        }}
                      >
                        {testimonial.published ? 'Publicado' : 'Borrador'}
                      </span>
                    </div>

                    <p className="text-sm mb-2" style={{ color: '#617d96' }}>
                      {renderStars(testimonial.rating)}
                    </p>

                    <p className="text-sm italic mb-2" style={{ color: '#617d96' }}>
                      "{testimonial.quote_en}"
                    </p>

                    <p className="text-xs" style={{ color: '#9ca3af' }}>
                      {testimonial.service_en}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => togglePublish(testimonial)}
                      className="px-3 py-2 rounded-lg font-medium transition-all text-sm"
                      style={{
                        background: testimonial.published ? 'rgba(232,170,26,0.1)' : 'rgba(168,85,247,0.1)',
                        color: testimonial.published ? '#e8aa1a' : '#a855f7',
                      }}
                    >
                      {testimonial.published ? 'Publicado' : 'Publicar'}
                    </button>
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-3 py-2 rounded-lg font-medium transition-all text-sm"
                      style={{
                        background: 'rgba(0,192,212,0.1)',
                        color: '#00c0d4',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-3 py-2 rounded-lg font-medium transition-all text-sm"
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

export default function TestimoniosPage() {
  return (
    <ProtectedRoute requiredRole="editor">
      <TestimoniosContent />
    </ProtectedRoute>
  );
}
