'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface GalleryImage {
  id: string;
  category: string;
  image_url: string;
  alt_text_en: string;
  alt_text_fr: string;
  title_en: string;
  title_fr: string;
  order: number;
  created_at: string;
}

const CATEGORIES = ['hero', 'services', 'testimonials', 'team', 'portfolio', 'other'];

function GaleriaContent() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    category: 'other',
    image_url: '',
    alt_text_en: '',
    alt_text_fr: '',
    title_en: '',
    title_fr: '',
    order: 0,
  });
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    fetchImages();
  }, [supabase]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('images_gallery')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('images_gallery')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('images_gallery')
          .insert([formData]);

        if (error) throw error;
      }

      resetForm();
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta imagen?')) return;

    try {
      const { error } = await supabase
        .from('images_gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      category: 'other',
      image_url: '',
      alt_text_en: '',
      alt_text_fr: '',
      title_en: '',
      title_fr: '',
      order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (image: GalleryImage) => {
    setFormData({
      category: image.category,
      image_url: image.image_url,
      alt_text_en: image.alt_text_en,
      alt_text_fr: image.alt_text_fr,
      title_en: image.title_en,
      title_fr: image.title_fr,
      order: image.order,
    });
    setEditingId(image.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredImages = selectedCategory === 'all' ? images : images.filter((img) => img.category === selectedCategory);

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
              Galería de Imágenes
            </h2>
            <p style={{ color: '#617d96' }}>Total de imágenes: {images.length}</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
            >
              + Agregar Imagen
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0a1a4e' }}>
              {editingId ? 'Editar Imagen' : 'Agregar Nueva Imagen'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
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

                {/* Title EN */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Título (English)
                  </label>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>

                {/* Title FR */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                    Titre (Français)
                  </label>
                  <input
                    type="text"
                    value={formData.title_fr}
                    onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  URL de la Imagen
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb' }}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image_url && (
                  <div className="mt-4">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="max-h-48 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Alt Text EN */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Texto Alternativo (English)
                </label>
                <textarea
                  value={formData.alt_text_en}
                  onChange={(e) => setFormData({ ...formData, alt_text_en: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb' }}
                  placeholder="Descripción para accesibilidad"
                />
              </div>

              {/* Alt Text FR */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Texte Alternatif (Français)
                </label>
                <textarea
                  value={formData.alt_text_fr}
                  onChange={(e) => setFormData({ ...formData, alt_text_fr: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb' }}
                  placeholder="Description pour l'accessibilité"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
                >
                  {editingId ? 'Guardar Cambios' : 'Agregar Imagen'}
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

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {['all', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-2 rounded-lg font-medium transition-all"
              style={
                selectedCategory === cat
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
              {cat === 'all' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.length === 0 ? (
            <div className="col-span-full text-center py-12" style={{ color: '#617d96' }}>
              <p className="text-lg">No hay imágenes en esta categoría</p>
            </div>
          ) : (
            filteredImages.map((image) => (
              <div key={image.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.alt_text_en}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                    }}
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#0a1a4e' }}>
                    {image.title_en || 'Sin título'}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: '#617d96' }}>
                    {image.category}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(image)}
                      className="flex-1 px-3 py-2 rounded-lg font-medium transition-all text-sm"
                      style={{
                        background: 'rgba(0,192,212,0.1)',
                        color: '#00c0d4',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="flex-1 px-3 py-2 rounded-lg font-medium transition-all text-sm"
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

export default function GaleriaPage() {
  return (
    <ProtectedRoute requiredRole="editor">
      <GaleriaContent />
    </ProtectedRoute>
  );
}
