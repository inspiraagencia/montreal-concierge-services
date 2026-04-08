'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'editor' | 'viewer';
  is_active: boolean;
  last_login: string;
  created_at: string;
}

function UsuariosContent() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
  });
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    fetchUsers();
  }, [supabase]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Only allow updating role and full_name for existing users
        const { error } = await supabase
          .from('admin_users')
          .update({
            full_name: formData.full_name,
            role: formData.role,
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        // Get current session token to authenticate the API call
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('No hay sesión activa');
        }

        const response = await fetch('/api/admin/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            full_name: formData.full_name,
            role: formData.role,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Error al crear usuario');
        }

        if (result.success) {
          alert(`✅ Usuario creado exitosamente.\n\nEmail: ${formData.email}\nContraseña: ${formData.password}\nRol: ${formData.role}\n\nGuarda estas credenciales.`);
        }
      }

      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const toggleActive = async (user: AdminUser) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ is_active: !user.is_active })
        .eq('id', user.id);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      full_name: '',
      password: '',
      role: 'viewer',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (user: AdminUser) => {
    setFormData({
      email: user.email,
      full_name: user.full_name,
      password: '',
      role: user.role,
    });
    setEditingId(user.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return '#ef4444';
      case 'editor':
        return '#00c0d4';
      case 'viewer':
        return '#8b5cf6';
      default:
        return '#617d96';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#00c0d4' }} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a1a4e' }}>
                Gestión de Usuarios
              </h2>
              <p style={{ color: '#617d96' }}>Total de usuarios: {users.length}</p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
              >
                + Nuevo Usuario
              </button>
            )}
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0a1a4e' }}>
                {editingId ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={!!editingId}
                      className="w-full px-4 py-2 rounded-lg border disabled:opacity-50"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                    {editingId && (
                      <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                        No se puede cambiar el email
                      </p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  {/* Password (only for new users) */}
                  {!editingId && (
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                        Contraseña Temporal
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required={!editingId}
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ borderColor: '#e5e7eb' }}
                        placeholder="Mínimo 8 caracteres"
                      />
                      <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                        El usuario puede cambiarla después de login
                      </p>
                    </div>
                  )}

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0a1a4e' }}>
                      Rol
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#e5e7eb' }}
                    >
                      <option value="viewer">Visualizador (Solo lectura)</option>
                      <option value="editor">Editor (Crear/Editar contenido)</option>
                      <option value="admin">Administrador (Acceso completo)</option>
                    </select>
                  </div>
                </div>

                {/* Info Box */}
                <div
                  className="p-4 rounded-lg text-sm"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    color: '#1e40af',
                  }}
                >
                  <strong>Roles:</strong>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• <strong>Visualizador:</strong> Solo puede ver datos, sin editar</li>
                    <li>• <strong>Editor:</strong> Puede crear y editar servicios, posts, testimonios, imágenes</li>
                    <li>• <strong>Administrador:</strong> Acceso completo, gestiona usuarios y auditoría</li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)' }}
                  >
                    {editingId ? 'Guardar Cambios' : 'Crear Usuario'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-lg font-semibold transition-all"
                    style={{
                      background: '#f0f1f3',
                      color: '#617d96',
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {users.length === 0 ? (
              <div className="p-8 text-center" style={{ color: '#617d96' }}>
                <p className="text-lg">No hay usuarios registrados</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#f7f9fc' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Nombre
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Rol
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Último Acceso
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#0a1a4e' }}>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr
                        key={user.id}
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          background: idx % 2 === 0 ? '#ffffff' : '#f7f9fc',
                        }}
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium" style={{ color: '#0a1a4e' }}>
                            {user.full_name || '—'}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm" style={{ color: '#617d96' }}>
                            {user.email}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="text-xs px-3 py-1 rounded-full font-semibold text-white"
                            style={{ background: getRoleColor(user.role) }}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm" style={{ color: '#617d96' }}>
                            {formatDate(user.last_login)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              user.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {user.is_active ? '✓ Activo' : '✗ Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleActive(user)}
                              className="px-3 py-1 rounded text-xs font-medium transition-all"
                              style={{
                                background: user.is_active ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                                color: user.is_active ? '#ef4444' : '#10b981',
                              }}
                            >
                              {user.is_active ? 'Desactivar' : 'Activar'}
                            </button>
                            <button
                              onClick={() => handleEdit(user)}
                              className="px-3 py-1 rounded text-xs font-medium transition-all"
                              style={{
                                background: 'rgba(0,192,212,0.1)',
                                color: '#00c0d4',
                              }}
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="px-3 py-1 rounded text-xs font-medium transition-all"
                              style={{
                                background: 'rgba(239,68,68,0.1)',
                                color: '#ef4444',
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

export default function UsuariosPage() {
  return <UsuariosContent />;
}
