'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Solicitud {
  id: number;
  cliente_nombre: string;
  cliente_email: string;
  servicio: string;
  estado: 'pendiente' | 'respondida' | 'completada';
  fecha_solicitud: string;
  monto_estimado: number;
}

export default function GestionSolicitudes() {
  const [solicitudes] = useState<Solicitud[]>([
    {
      id: 1,
      cliente_nombre: 'Jean Dupont',
      cliente_email: 'jean@example.com',
      servicio: 'Nettoyage Commercial',
      estado: 'pendiente',
      fecha_solicitud: '2026-04-05',
      monto_estimado: 500,
    },
    {
      id: 2,
      cliente_nombre: 'Marie Laroche',
      cliente_email: 'marie@example.com',
      servicio: 'Gestión Airbnb',
      estado: 'respondida',
      fecha_solicitud: '2026-04-04',
      monto_estimado: 1200,
    },
    {
      id: 3,
      cliente_nombre: 'Pierre Beaulieu',
      cliente_email: 'pierre@example.com',
      servicio: 'Conciergerie Residencial',
      estado: 'completada',
      fecha_solicitud: '2026-04-01',
      monto_estimado: 300,
    },
  ]);

  const [filtro, setFiltro] = useState<'todas' | 'pendiente' | 'respondida' | 'completada'>('todas');

  const solicitudesFiltradas =
    filtro === 'todas' ? solicitudes : solicitudes.filter((s) => s.estado === filtro);

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, string> = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      respondida: 'bg-blue-100 text-blue-800',
      completada: 'bg-green-100 text-green-800',
    };
    return badges[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📋 Solicitudes de <span className="text-yellow-600">Presupuesto</span>
        </h1>
        <p className="text-gray-600">
          Revisa y gestiona todas las <span className="font-bold">solicitudes de presupuesto</span> de tus <span className="font-bold">clientes potenciales</span>.
          Responde rápidamente para mejorar tus oportunidades de negocio.
        </p>
      </header>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600">
          <p className="text-sm font-bold text-yellow-700 uppercase">Pendientes</p>
          <p className="text-3xl font-bold text-yellow-900">
            {solicitudes.filter((s) => s.estado === 'pendiente').length}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <p className="text-sm font-bold text-blue-700 uppercase">Respondidas</p>
          <p className="text-3xl font-bold text-blue-900">
            {solicitudes.filter((s) => s.estado === 'respondida').length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
          <p className="text-sm font-bold text-green-700 uppercase">Completadas</p>
          <p className="text-3xl font-bold text-green-900">
            {solicitudes.filter((s) => s.estado === 'completada').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md flex gap-3 flex-wrap">
        <button
          onClick={() => setFiltro('todas')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            filtro === 'todas'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todas ({solicitudes.length})
        </button>
        <button
          onClick={() => setFiltro('pendiente')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            filtro === 'pendiente'
              ? 'bg-yellow-600 text-white'
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          }`}
        >
          ⏳ Pendientes
        </button>
        <button
          onClick={() => setFiltro('respondida')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            filtro === 'respondida'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          ✅ Respondidas
        </button>
        <button
          onClick={() => setFiltro('completada')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            filtro === 'completada'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          ✓ Completadas
        </button>
        <Link href="/admin" className="ml-auto px-4 py-2 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600">
          ← Volver
        </Link>
      </div>

      {/* Solicitudes List */}
      <section className="space-y-4">
        {solicitudesFiltradas.length > 0 ? (
          solicitudesFiltradas.map((solicitud) => (
            <div
              key={solicitud.id}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Solicitud #{solicitud.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {solicitud.fecha_solicitud}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-sm ${getEstadoBadge(
                    solicitud.estado
                  )}`}
                >
                  {solicitud.estado.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-bold text-gray-900">{solicitud.cliente_nombre}</p>
                  <p className="text-sm text-blue-600">{solicitud.cliente_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Servicio Solicitado</p>
                  <p className="font-bold text-gray-900">{solicitud.servicio}</p>
                  <p className="text-sm text-green-600">
                    Monto Estimado: <span className="font-bold">${solicitud.monto_estimado}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                  📧 Responder
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">
                  ✓ Completar
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
            <p className="text-lg">No hay solicitudes en esta categoría.</p>
          </div>
        )}
      </section>

      {/* SEO Keywords Section */}
      <section className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          📌 Optimización SEO para <span className="text-green-600">Solicitudes</span>
        </h2>
        <p className="text-gray-700 mb-4">
          Las <span className="font-bold">solicitudes de presupuesto</span> son fundamentales para convertir <span className="font-bold">visitantes en clientes</span>.
          Responde rápidamente usando palabras clave como: <span className="font-bold">presupuesto gratuito, consulta sin compromiso, servicios personalizados</span>.
        </p>
        <ul className="grid grid-cols-2 gap-2 text-gray-700">
          <li>✓ <span className="font-bold">Presupuesto personalizado</span></li>
          <li>✓ <span className="font-bold">Consulta sin compromiso</span></li>
          <li>✓ <span className="font-bold">Respuesta rápida</span></li>
          <li>✓ <span className="font-bold">Servicios adaptados</span></li>
        </ul>
      </section>
    </div>
  );
}
