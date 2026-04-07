'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface BlogPost {
  id: string;
  title_en: string;
  title_fr: string;
  slug_en: string;
  slug_fr: string;
  excerpt_en: string;
  excerpt_fr: string;
  content_en: string;
  content_fr: string;
  featured_image: string;
  author_en: string;
  author_fr: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_fr: '',
    slug_en: '',
    slug_fr: '',
    excerpt_en: '',
    excerpt_fr: '',
    content_en: '',
    content_fr: '',
    featured_image: '',
    author_en: '',
    author_fr: '',
  });
  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, [supabase]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string, lang: 'en' | 'fr') => {
    setFormData({ ...formData, [`title_${lang}`]: value, [`slug_${lang}`]: generateSlug(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('blog_posts')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{ ...formData, published: false }]);

        if (error) throw error;
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published, updated_at: new Date().toISOString() })
        .eq('id', post.id);

      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_fr: '',
      slug_en: '',
      slug_fr: '',
      excerpt_en: '',
      excerpt_fr: '',
      content_en: '',
      content_fr: '',
      featured_image: '',
      author_en: '',
      author_fr: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title_en: post.title_en,
      title_fr: post.title_fr,
      slug_en: post.slug_en,
      slug_fr: post.slug_fr,
      excerpt_en: post.excerpt_en,
      excerpt_fr: post.excerpt_fr,
      content_en: post.content_en,
      content_fr: post.content_fr,
      featured_image: post.featured_image,
      author_en: post.author_en,
      author_fr: post.author_fr,
    });
    setEditingId(post.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
              Blog
            </h2>
            <p style={{ color: '#617d96' }}>Total de posts: {posts.length}</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
            >
              + Nuevo Post
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0a1a4e' }}>
              {editingId ? 'Editar Post' : 'Nuevo Post'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* English Section */}
              <div>
                <h4 className="font-semibold mb-4" style={{ color: '#0a1a4e' }}>
                  English
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Título
                    </label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => handleTitleChange(e.target.value, 'en')}
                      required
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Post Title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug_en}
                      onChange={(e) => setFormData({ ...formData, slug_en: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Extracto
                    </label>
                    <textarea
                      value={formData.excerpt_en}
                      onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Short description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Contenido
                    </label>
                    <textarea
                      value={formData.content_en}
                      onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg border font-mono text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Your post content (supports Markdown)..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Autor
                    </label>
                    <input
                      type="text"
                      value={formData.author_en}
                      onChange={(e) => setFormData({ ...formData, author_en: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Author name"
                    />
                  </div>
                </div>
              </div>

              {/* French Section */}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                <h4 className="font-semibold mb-4" style={{ color: '#0a1a4e' }}>
                  Français
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.title_fr}
                      onChange={(e) => handleTitleChange(e.target.value, 'fr')}
                      required
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Titre du post"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug_fr}
                      onChange={(e) => setFormData({ ...formData, slug_fr: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Extrait
                    </label>
                    <textarea
                      value={formData.excerpt_fr}
                      onChange={(e) => setFormData({ ...formData, excerpt_fr: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Courte description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Contenu
                    </label>
                    <textarea
                      value={formData.content_fr}
                      onChange={(e) => setFormData({ ...formData, content_fr: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg border font-mono text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Votre contenu (supporte Markdown)..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Auteur
                    </label>
                    <input
                      type="text"
                      value={formData.author_fr}
                      onChange={(e) => setFormData({ ...formData, author_fr: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Nom de l'auteur"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                  Imagen Destacada (URL)
                </label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: '#e5e7eb' }}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.featured_image && (
                  <div className="mt-2">
                    <img
                      src={formData.featured_image}
                      alt="Preview"
                      className="max-h-48 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
                >
                  {editingId ? 'Guardar Cambios' : 'Crear Post'}
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

        {/* Posts List */}
        <div className="grid gap-4">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center" style={{ color: '#617d96' }}>
              <p className="text-lg">No hay posts creados. Crea el primero ahora.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                style={{ borderLeft: `4px solid ${post.published ? '#00c0d4' : '#9ca3af'}` }}
              >
                <div className="flex justify-between items-start gap-4">
                  {post.featured_image && (
                    <img
                      src={post.featured_image}
                      alt={post.title_en}
                      className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold" style={{ color: '#0a1a4e' }}>
                        {post.title_en}
                      </h3>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-semibold"
                        style={{
                          background: post.published ? 'rgba(0,192,212,0.1)' : 'rgba(107,114,128,0.1)',
                          color: post.published ? '#00c0d4' : '#6b7280',
                        }}
                      >
                        {post.published ? 'Publicado' : 'Borrador'}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: '#617d96' }}>
                      {post.excerpt_en}
                    </p>
                    <p className="text-xs" style={{ color: '#9ca3af' }}>
                      {post.author_en} • {formatDate(post.created_at)}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => togglePublish(post)}
                      className="px-3 py-2 rounded-lg font-medium transition-all text-sm"
                      style={{
                        background: post.published ? 'rgba(0,192,212,0.1)' : 'rgba(168,85,247,0.1)',
                        color: post.published ? '#00c0d4' : '#a855f7',
                      }}
                    >
                      {post.published ? 'Publicado' : 'Publicar'}
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-3 py-2 rounded-lg font-medium transition-all text-sm"
                      style={{
                        background: 'rgba(0,192,212,0.1)',
                        color: '#00c0d4',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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

export default function BlogPage() {
  return (
    <ProtectedRoute requiredRole="editor">
      <BlogContent />
    </ProtectedRoute>
  );
}
