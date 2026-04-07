'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function AdminNav() {
  const locale = useLocale();
  const isEnglish = locale === 'en';

  const adminLinks = [
    { href: '/admin', label: isEnglish ? 'Dashboard' : 'Panel', icon: '📊' },
    { href: '/admin/servicios', label: isEnglish ? 'Services' : 'Servicios', icon: '🔧' },
    { href: '/admin/solicitudes', label: isEnglish ? 'Requests' : 'Solicitudes', icon: '📧' },
    { href: '/admin/reportes', label: isEnglish ? 'Reports' : 'Reportes', icon: '📈' },
    { href: '/admin/galeria', label: isEnglish ? 'Gallery' : 'Galería', icon: '🖼️' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/admin" className="flex items-center space-x-3 hover:opacity-80 transition">
          <div className="text-3xl font-bold">📊</div>
          <div>
            <h1 className="text-xl font-bold">
              Montreal <span className="text-yellow-300">Concierge</span>
            </h1>
            <p className="text-xs text-blue-100">{isEnglish ? 'Admin Panel' : 'Panel Administrativo'}</p>
          </div>
        </Link>

        {/* User Menu */}
        <div className="flex gap-3">
          <a
            href="/"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            ← {isEnglish ? 'Exit' : 'Salir'}
          </a>
        </div>
      </div>

      {/* Menu Links */}
      <div className="bg-blue-700 px-6 py-3 overflow-x-auto">
        <div className="flex gap-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition whitespace-nowrap"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
