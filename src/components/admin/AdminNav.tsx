export default function AdminNav() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="text-3xl font-bold">📊</div>
          <div>
            <h1 className="text-xl font-bold">
              Montreal <span className="text-yellow-300">Concierge</span>
            </h1>
            <p className="text-xs text-blue-100">Panel Administrativo</p>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex gap-3">
          <a
            href="/admin/perfil"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg font-medium transition"
          >
            👤 Mi Perfil
          </a>
          <a
            href="/"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            ← Salir
          </a>
        </div>
      </div>
    </nav>
  );
}
