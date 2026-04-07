'use client';

import Link from 'next/link';

export default function GestionReportes() {
  const reportesData = {
    ingresosMes: 8450,
    totalClientes: 45,
    solicitudesCompletadas: 12,
    tasaConversion: 28.5,
    ingresoPromedio: 704,
    servicioMasPopular: 'Nettoyage Commercial',
  };

  const porServicio = [
    { nombre: 'Nettoyage Commercial', ingresos: 3500, clientes: 12 },
    { nombre: 'Gestión Airbnb', ingresos: 2800, clientes: 8 },
    { nombre: 'Conciergerie Residencial', ingresos: 2150, clientes: 25 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📊 Reportes y <span className="text-purple-600">Analíticos</span>
        </h1>
        <p className="text-gray-600">
          Análisis detallado de tu negocio de <span className="font-bold">servicios de conciergerie</span>.
          Revisa <span className="font-bold">ingresos</span>, <span className="font-bold">clientes</span> y <span className="font-bold">tendencias</span> de desempeño.
        </p>
      </header>

      {/* Main KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm font-bold uppercase opacity-90">Ingresos Este Mes</p>
          <p className="text-4xl font-bold mt-2">${reportesData.ingresosMes.toLocaleString()}</p>
          <p className="text-sm mt-2 opacity-80">Servicios profesionales facturados</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm font-bold uppercase opacity-90">Total de Clientes</p>
          <p className="text-4xl font-bold mt-2">{reportesData.totalClientes}</p>
          <p className="text-sm mt-2 opacity-80">Clientes activos registrados</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-sm font-bold uppercase opacity-90">Tasa de Conversión</p>
          <p className="text-4xl font-bold mt-2">{reportesData.tasaConversion}%</p>
          <p className="text-sm mt-2 opacity-80">De solicitudes a servicios completados</p>
        </div>
      </section>

      {/* Performance Cards */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📈 Indicadores de <span className="text-purple-600">Desempeño</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 p-4 rounded-lg">
            <p className="text-sm font-bold text-gray-600 uppercase">Servicios Completados</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {reportesData.solicitudesCompletadas}
            </p>
            <p className="text-xs text-gray-500 mt-2">En los últimos 30 días</p>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <p className="text-sm font-bold text-gray-600 uppercase">Ingreso Promedio por Servicio</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${reportesData.ingresoPromedio}
            </p>
            <p className="text-xs text-gray-500 mt-2">Valor medio de transacciones</p>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <p className="text-sm font-bold text-gray-600 uppercase">Servicio Más Popular</p>
            <p className="text-lg font-bold text-gray-900 mt-2">
              {reportesData.servicioMasPopular}
            </p>
            <p className="text-xs text-gray-500 mt-2">Mayor demanda entre clientes</p>
          </div>
        </div>
      </section>

      {/* Services Revenue Breakdown */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          💼 Ingresos por <span className="text-purple-600">Tipo de Servicio</span>
        </h2>
        <div className="space-y-4">
          {porServicio.map((servicio, index) => {
            const totalIngresos = porServicio.reduce((sum, s) => sum + s.ingresos, 0);
            const porcentaje = (servicio.ingresos / totalIngresos) * 100;

            return (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{servicio.nombre}</h3>
                  <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full font-bold text-sm">
                    {porcentaje.toFixed(1)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <p>
                    💰 Ingresos: <span className="font-bold text-gray-900">${servicio.ingresos}</span>
                  </p>
                  <p>
                    👥 Clientes: <span className="font-bold text-gray-900">{servicio.clientes}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          💡 Recomendaciones para <span className="text-purple-600">Crecimiento</span>
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            ✅ Tu <span className="font-bold">servicio más popular</span> es <span className="font-bold">{reportesData.servicioMasPopular}</span>.
            Considera promocionarlo más en tus <span className="font-bold">estrategias SEO</span>.
          </li>
          <li>
            ✅ Tu <span className="font-bold">tasa de conversión</span> es {reportesData.tasaConversion}%.
            Esto es <span className="font-bold">excelente</span> - mantén la calidad de servicio.
          </li>
          <li>
            ✅ Busca aumentar el <span className="font-bold">número de solicitudes</span> mediante
            <span className="font-bold"> marketing digital</span> y <span className="font-bold">posicionamiento en buscadores</span>.
          </li>
          <li>
            ✅ Diversifica tus <span className="font-bold">servicios</span> para atraer diferentes
            <span className="font-bold"> segmentos de clientes</span>.
          </li>
        </ul>
      </section>

      {/* Export Options */}
      <div className="flex gap-3">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition">
          📥 Descargar Reporte PDF
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
          📊 Exportar a Excel
        </button>
        <Link
          href="/admin"
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition ml-auto"
        >
          ← Volver
        </Link>
      </div>

      {/* SEO Keywords Section */}
      <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          📌 Palabras Clave para <span className="text-blue-600">Reportes y Análisis</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Métricas de Negocio:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <span className="font-bold">ROI de servicios</span></li>
              <li>• <span className="font-bold">Tasa de conversión</span></li>
              <li>• <span className="font-bold">Ingresos mensuales</span></li>
              <li>• <span className="font-bold">Satisfacción del cliente</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Estrategia de Crecimiento:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <span className="font-bold">Análisis competitivo</span></li>
              <li>• <span className="font-bold">Expansión de servicios</span></li>
              <li>• <span className="font-bold">Marketing digital</span></li>
              <li>• <span className="font-bold">Posicionamiento SEO</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
