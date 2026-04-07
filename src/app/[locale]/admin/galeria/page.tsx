'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import AdminNav from '@/components/admin/AdminNav';

interface ImageFile {
  name: string;
  path: string;
  size: number;
  lastModified: string;
}

export default function GaleriaPage() {
  const locale = useLocale();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('hero');

  const isEnglish = locale === 'en';

  // Categorías de imágenes
  const categories = [
    { id: 'hero', label: isEnglish ? 'Hero Images' : 'Imágenes Hero', path: '/images/hero' },
    { id: 'services', label: isEnglish ? 'Services' : 'Servicios', path: '/images/services' },
    { id: 'team', label: isEnglish ? 'Team' : 'Equipo', path: '/images/team' },
    { id: 'testimonials', label: isEnglish ? 'Testimonials' : 'Testimonios', path: '/images/testimonials' },
  ];

  useEffect(() => {
    fetchImages();
  }, [category]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/images?category=${category}`);
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const response = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log(`Uploaded: ${file.name}`);
        } else {
          console.error(`Failed to upload: ${file.name}`);
        }
      }
      await fetchImages();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageName: string) => {
    if (!confirm(isEnglish ? 'Delete this image?' : '¿Eliminar esta imagen?')) return;

    try {
      const response = await fetch(`/api/admin/delete-image`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageName, category }),
      });

      if (response.ok) {
        await fetchImages();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEnglish ? 'Image Gallery' : 'Galería de Imágenes'}
          </h1>
          <p className="text-gray-600">
            {isEnglish ? 'Manage website images' : 'Administra las imágenes del sitio'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                category === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Upload New Image' : 'Subir Nueva Imagen'}
          </h2>

          <label className="block">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:bg-blue-50 cursor-pointer transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="text-4xl mb-2">📤</div>
              <p className="text-gray-700 font-medium">
                {uploading
                  ? isEnglish ? 'Uploading...' : 'Subiendo...'
                  : isEnglish ? 'Click to upload or drag images' : 'Haz click para subir o arrastra imágenes'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {isEnglish ? 'PNG, JPG, WebP (max 5MB)' : 'PNG, JPG, WebP (máx 5MB)'}
              </p>
            </div>
          </label>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Current Images' : 'Imágenes Actuales'} ({images.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-blue-600 text-3xl mb-2">⏳</div>
              <p className="text-gray-600">
                {isEnglish ? 'Loading images...' : 'Cargando imágenes...'}
              </p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {isEnglish ? 'No images yet' : 'Sin imágenes aún'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.name} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  {/* Preview */}
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={image.path}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="font-medium text-gray-900 truncate mb-1">
                      {image.name}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {(image.size / 1024).toFixed(1)} KB
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(image.path, '_blank')}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition"
                      >
                        👁️ {isEnglish ? 'View' : 'Ver'}
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(image.path);
                          alert(isEnglish ? 'Path copied!' : '¡Ruta copiada!');
                        }}
                        className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition"
                      >
                        📋 {isEnglish ? 'Copy' : 'Copiar'}
                      </button>
                      <button
                        onClick={() => handleDelete(image.name)}
                        className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition"
                      >
                        🗑️ {isEnglish ? 'Delete' : 'Eliminar'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-blue-900 mb-2">
            {isEnglish ? 'How to use' : 'Cómo usar'}
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              {isEnglish
                ? '1. Upload images using the form above'
                : '1. Sube imágenes usando el formulario arriba'}
            </li>
            <li>
              {isEnglish
                ? '2. Copy the image path and use it in your components'
                : '2. Copia la ruta de la imagen y úsala en tus componentes'}
            </li>
            <li>
              {isEnglish
                ? '3. Delete old/unused images to save space'
                : '3. Elimina imágenes antiguas para ahorrar espacio'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
