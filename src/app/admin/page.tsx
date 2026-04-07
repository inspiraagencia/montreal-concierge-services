'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

function AdminDashboardContent() {
  const { user } = useAdminAuth();

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
