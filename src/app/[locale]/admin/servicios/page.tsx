'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio_base: number;
  categoria: string;
}

export default function GestionServicios() {
  const [servicios] = useState<Servicio[]>([
    {
      id: 1,
      nombre: 'Nettoyage Commercial',
      descripcion: 'Servicios de limpieza profesional para oficinas y comercios',
      precio_base: 150,
      categoria: 'Limpieza',
    },
    {
      id: 2,
      nombre: 'Gestión Airbnb',
      descripcion: 'Administración completa de propiedades y huéspedes',
      precio_base: 200,
      categoria: 'Hospedaje',
    },
    {
      id: 3,
      nombre: 'Conciergerie Residencial',
      descripcion: 'Servicios de conciergerie para residencias y propietarios',
      precio_base: 100,
      categoria: 'Conciergerie',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔧 Gestión de <span className="text-green-600">Servicios Profesionales</span>
        </h1>
        <p className="text-gray-600">
          Administra todos tus <span className="font-bold">servicios de conciergerie</span> y <span className="font-bold">limpieza</span> desde aquí.
          Agrega nuevos servicios, edita descripciones y actualiza precios.
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
        >
          ✨ Agregar Nuevo Servicio
        </button>
        <Link
          href="/admin"
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition"
        >
          ← Volver
        </Link>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Crear Nuevo <span className="text-green-600">Servicio</span>
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block font-bold text-gray-700 mb-2">
                Nombre del Servicio
              </label>
              <input
                type="text"
                placeholder="ej: Nettoyage Commercial"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                placeholder="Describe tu servicio de conciergerie..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-2">
                  Precio Base ($)
                </label>
                <input
                  type="number"
                  placeholder="150"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-2">
                  Categoría
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Limpieza</option>
                  <option>Conciergerie</option>
                  <option>Hospedaje</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
              >
                💾 Guardar Servicio
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Table */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 p-6 border-b-2 border-green-600">
          📋 Lista de <span className="text-green-600">Servicios Activos</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-gray-900">ID</th>
                <th className="px-6 py-3 text-left font-bold text-gray-900">Nombre Servicio</th>
                <th className="px-6 py-3 text-left font-bold text-gray-900">Categoría</th>
                <th className="px-6 py-3 text-left font-bold text-gray-900">Precio Base</th>
                <th className="px-6 py-3 text-left font-bold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio, index) => (
                <tr
                  key={servicio.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-3 text-gray-700">#{servicio.id}</td>
                  <td className="px-6 py-3">
                    <div>
                      <p className="font-bold text-gray-900">{servicio.nombre}</p>
                      <p className="text-sm text-gray-500">{servicio.descripcion}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-sm">
                      {servicio.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-bold text-gray-900">
                    ${servicio.precio_base}
                  </td>
                  <td className="px-6 py-3 space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">
                      ✏️ Editar
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700">
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO Section */}
      <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          📌 Palabras Clave para <span className="text-blue-600">Posicionamiento SEO</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Servicios Principales:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• <span className="font-bold">Nettoyage commercial</span> Montreal</li>
              <li>• <span className="font-bold">Gestión Airbnb</span> profesional</li>
              <li>• <span className="font-bold">Conciergerie</span> residencial</li>
              <li>• <span className="font-bold">Limpieza</span> de oficinas</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Ubicaciones:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• <span className="font-bold">Montreal</span> - Riviera Sud</li>
              <li>• <span className="font-bold">Grand Montréal</span></li>
              <li>• <span className="font-bold">Servicios profesionales</span> locales</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
