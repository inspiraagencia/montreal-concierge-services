'use client';

import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCallback } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: '📊',
      pattern: /^\/[a-z]+\/admin\/?$/,
    },
    {
      label: 'Solicitudes',
      href: '/admin/solicitudes',
      icon: '📧',
      pattern: /admin\/solicitudes/,
    },
    {
      label: 'Servicios',
      href: '/admin/servicios',
      icon: '🔧',
      pattern: /admin\/servicios/,
      requiredRole: 'editor',
    },
    {
      label: 'Blog',
      href: '/admin/blog',
      icon: '📝',
      pattern: /admin\/blog/,
      requiredRole: 'editor',
    },
    {
      label: 'Testimonios',
      href: '/admin/testimonios',
      icon: '⭐',
      pattern: /admin\/testimonios/,
      requiredRole: 'editor',
    },
    {
      label: 'Galería',
      href: '/admin/galeria',
      icon: '🖼️',
      pattern: /admin\/galeria/,
      requiredRole: 'editor',
    },
    {
      label: 'Usuarios',
      href: '/admin/usuarios',
      icon: '👥',
      pattern: /admin\/usuarios/,
      requiredRole: 'admin',
    },
    {
      label: 'Auditoría',
      href: '/admin/audit',
      icon: '📋',
      pattern: /admin\/audit/,
      requiredRole: 'admin',
    },
    {
      label: 'Reportes',
      href: '/admin/reportes',
      icon: '📈',
      pattern: /admin\/reportes/,
    },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (!item.requiredRole) return true;
    return (
      (item.requiredRole === 'admin' && user?.role === 'admin') ||
      (item.requiredRole === 'editor' && (user?.role === 'admin' || user?.role === 'editor'))
    );
  });

  const isActive = (pattern: RegExp) => pattern.test(pathname);

  return (
    <div className="flex h-screen" style={{ background: '#f7f9fc' }}>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 flex flex-col shadow-lg`}
        style={{ background: '#0a1a4e' }}
      >
        {/* Logo/Brand */}
        <div className="p-4 flex items-center justify-between h-20 border-b" style={{ borderColor: 'rgba(0,192,212,0.2)' }}>
          {sidebarOpen && (
            <div className="relative h-12 w-auto">
              <Image
                src="/images/logo.png"
                alt="Montreal Concierge"
                width={140}
                height={44}
                className="h-12 w-auto object-contain"
              />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg transition-all text-white hover:bg-white/10"
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
          {filteredNavItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                isActive(item.pattern)
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              style={
                isActive(item.pattern)
                  ? { background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }
                  : {}
              }
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div
          className="p-4 border-t"
          style={{ borderColor: 'rgba(0,192,212,0.2)' }}
        >
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <p className="font-semibold text-white truncate">{user?.full_name || 'Admin'}</p>
                <p className="truncate">{user?.email}</p>
                <p className="capitalize mt-1">
                  <span
                    className="px-2 py-0.5 rounded-full text-white text-xs font-medium"
                    style={{ background: '#00c0d4' }}
                  >
                    {user?.role}
                  </span>
                </p>
              </div>
              <button
                onClick={logout}
                className="w-full px-4 py-2 rounded-lg font-medium text-white transition-all text-sm"
                style={{
                  background: 'rgba(0,192,212,0.2)',
                  border: '1px solid rgba(0,192,212,0.4)',
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full p-2 rounded-lg transition-all text-white hover:bg-white/10"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-20 bg-white border-b shadow-sm flex items-center px-6" style={{ borderColor: '#e5e7eb' }}>
          <h1 className="text-xl font-bold" style={{ color: '#0a1a4e' }}>
            Panel de Control - Montreal Concierge Services
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
