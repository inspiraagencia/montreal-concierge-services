import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Servicios Activos',
      value: '8',
      icon: '🔧',
      description: 'Servicios de conciergerie disponibles',
    },
    {
      title: 'Solicitudes Pendientes',
      value: '12',
      icon: '📋',
      description: 'Presupuestos por revisar',
    },
    {
      title: 'Clientes Registrados',
      value: '45',
      icon: '👥',
      description: 'Usuarios activos',
    },
    {
      title: 'Ingresos Este Mes',
      value: '$8,450',
      icon: '💰',
      description: 'Ingresos profesionales',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Dashboard de <span className="text-blue-600">Administración</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Bienvenido al <span className="font-bold">panel administrativo</span> de <span className="font-bold">servicios profesionales de conciergerie</span>.
          Aquí puedes gestionar todos los aspectos de tu negocio.
        </p>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-blue-500"
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <h3 className="text-sm font-bold text-gray-500 uppercase">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-600 mt-2">{stat.description}</p>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Acciones Rápidas de <span className="text-blue-600">Gestión</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/servicios"
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition cursor-pointer border border-blue-200"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              🔧 Gestión de Servicios
            </h3>
            <p className="text-gray-700">
              Crea, edita y gestiona todos tus <span className="font-bold">servicios profesionales</span> de <span className="font-bold">conciergerie</span>.
            </p>
          </Link>

          <Link
            href="/admin/solicitudes"
            className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg hover:shadow-lg transition cursor-pointer border border-yellow-200"
          >
            <h3 className="text-xl font-bold text-yellow-900 mb-2">
              📋 Solicitudes de Presupuesto
            </h3>
            <p className="text-gray-700">
              Revisa y gestiona todas las <span className="font-bold">solicitudes de presupuesto</span> de tus <span className="font-bold">clientes</span>.
            </p>
          </Link>

          <Link
            href="/admin/reportes"
            className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition cursor-pointer border border-green-200"
          >
            <h3 className="text-xl font-bold text-green-900 mb-2">
              📊 Reportes y Analíticos
            </h3>
            <p className="text-gray-700">
              Análisis detallados de ingresos, <span className="font-bold">clientes</span> y rendimiento del negocio.
            </p>
          </Link>
        </div>
      </section>

      {/* SEO Information */}
      <section className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ℹ️ Información del Sistema
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <span className="font-bold">Plataforma:</span> Dashboard de Administración para Servicios de Conciergerie Profesional
          </li>
          <li>
            <span className="font-bold">Función Principal:</span> Gestionar <span className="font-bold">servicios</span>, <span className="font-bold">solicitudes</span> y <span className="font-bold">reportes</span>
          </li>
          <li>
            <span className="font-bold">Ubicación de Servicios:</span> Montreal, Riviera Sud y alrededores
          </li>
          <li>
            <span className="font-bold">Seguridad:</span> Acceso restringido a administradores autorizados
          </li>
        </ul>
      </section>
    </div>
  );
}
