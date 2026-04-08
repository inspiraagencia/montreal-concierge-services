'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

interface DashboardStats {
  submissions: number;
  pending: number;
  services: number;
  posts: number;
  testimonials: number;
}

function AdminDashboardContent() {
  const { user } = useAdminAuth();
  const supabase = useMemo(() => createClient(), []);
  const [stats, setStats] = useState<DashboardStats>({
    submissions: 0,
    pending: 0,
    services: 0,
    posts: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const [submissionsResult, servicesResult, postsResult, testimonialsResult] = await Promise.all([
        supabase.from('contact_submissions').select('id, status, responded'),
        supabase.from('services').select('id'),
        supabase.from('blog_posts').select('id'),
        supabase.from('testimonials').select('id'),
      ]);

      const submissions = submissionsResult.data || [];
      const pending = submissions.filter((submission: any) => (
        submission.responded !== true &&
        !['responded', 'contacted', 'in_progress', 'completed', 'closed'].includes(submission.status || '')
      )).length;

      setStats({
        submissions: submissions.length,
        pending,
        services: servicesResult.data?.length || 0,
        posts: postsResult.data?.length || 0,
        testimonials: testimonialsResult.data?.length || 0,
      });
    };

    loadStats().catch((error) => {
      console.error('Error loading dashboard stats:', error);
    });
  }, [supabase]);

  const dashboardModules = [
    {
      title: 'Solicitudes de Cotización',
      description: 'Ver y responder a solicitudes de cotización',
      icon: '📧',
      href: '/admin/solicitudes',
      color: '#00c0d4',
    },
    {
      title: 'Servicios',
      description: 'Gestionar servicios ofrecidos',
      icon: '🔧',
      href: '/admin/servicios',
      color: '#1a4499',
      requiredRole: 'editor',
    },
    {
      title: 'Blog',
      description: 'Crear y editar publicaciones',
      icon: '📝',
      href: '/admin/blog',
      color: '#059669',
      requiredRole: 'editor',
    },
    {
      title: 'Testimonios',
      description: 'Gestionar testimonios de clientes',
      icon: '⭐',
      href: '/admin/testimonios',
      color: '#e8aa1a',
      requiredRole: 'editor',
    },
    {
      title: 'Galería de Imágenes',
      description: 'Organizar fotos del sitio',
      icon: '🖼️',
      href: '/admin/galeria',
      color: '#f97316',
      requiredRole: 'editor',
    },
    {
      title: 'Usuarios',
      description: 'Gestionar acceso administrativo',
      icon: '👥',
      href: '/admin/usuarios',
      color: '#6366f1',
      requiredRole: 'admin',
    },
    {
      title: 'Registro de Auditoría',
      description: 'Ver historial de cambios',
      icon: '📋',
      href: '/admin/audit',
      color: '#8b5cf6',
      requiredRole: 'admin',
    },
    {
      title: 'Reportes',
      description: 'Análisis y estadísticas',
      icon: '📊',
      href: '/admin/reportes',
      color: '#ec4899',
    },
  ];

  const filteredModules = dashboardModules.filter((module) => {
    if (!module.requiredRole) return true;
    return (
      (module.requiredRole === 'admin' && user?.role === 'admin') ||
      (module.requiredRole === 'editor' && (user?.role === 'admin' || user?.role === 'editor')) ||
      (module.requiredRole === 'viewer' && ['admin', 'editor', 'viewer'].includes(user?.role || ''))
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #0a1a4e, #1a4499)' }}>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenido, {user?.full_name || user?.email}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Rol: <span className="font-semibold text-white capitalize">{user?.role}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Solicitudes', value: stats.submissions, color: '#00c0d4' },
            { label: 'Pendientes', value: stats.pending, color: '#f97316' },
            { label: 'Servicios', value: stats.services, color: '#1a4499' },
            { label: 'Posts', value: stats.posts, color: '#059669' },
            { label: 'Testimonios', value: stats.testimonials, color: '#e8aa1a' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-5 shadow-sm"
              style={{ borderTop: `4px solid ${item.color}` }}
            >
              <p className="text-sm font-medium" style={{ color: '#617d96' }}>
                {item.label}
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#0a1a4e' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Link key={module.href} href={module.href}>
              <div
                className="h-full rounded-2xl p-6 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: 'white',
                  border: `2px solid ${module.color}20`,
                  borderLeft: `4px solid ${module.color}`,
                }}
              >
                <div
                  className="text-4xl mb-3 transition-transform group-hover:scale-110"
                  style={{ display: 'inline-block' }}
                >
                  {module.icon}
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0a1a4e' }}>
                  {module.title}
                </h3>
                <p className="text-sm" style={{ color: '#617d96' }}>
                  {module.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Note */}
        {user?.role === 'viewer' && (
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <p style={{ color: '#1e40af' }}>
              <strong>Nota:</strong> Tu cuenta tiene acceso de lectura. Contacta a un administrador para editar
              contenido.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
