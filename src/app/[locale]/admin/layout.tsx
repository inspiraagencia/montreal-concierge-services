import AdminNav from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Dashboard Admin | Gestion de Servicios de Conciergerie - Montreal',
  description: 'Panel administrativo para gestionar servicios profesionales de conciergerie, solicitudes de presupuesto y reportes en Montreal y Riviera Sud.',
  keywords: 'dashboard admin, gestión de servicios, panel administrativo, conciergerie, Montreal',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNav />
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              <span className="text-blue-600">📊</span> Control Admin
            </h2>

            <a href="/admin" className="block px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
              Dashboard
            </a>

            <a href="/admin/servicios" className="block px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
              <span className="font-bold">Gestión de Servicios</span>
            </a>

            <a href="/admin/solicitudes" className="block px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
              <span className="font-bold">Solicitudes de Presupuesto</span>
            </a>

            <a href="/admin/reportes" className="block px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
              <span className="font-bold">Reportes y Analíticos</span>
            </a>

            <hr className="my-4" />

            <a href="/" className="block px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium">
              ← Volver a Inicio
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </>
  );
}
