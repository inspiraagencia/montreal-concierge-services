'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'editor' | 'viewer';
}

export default function ProtectedRoute({ children, requiredRole = 'viewer' }: ProtectedRouteProps) {
  const { user, loading, isAdmin, isEditor, isViewer } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/admin/login');
      return;
    }

    // Check role permissions
    const hasPermission =
      (requiredRole === 'admin' && isAdmin) ||
      (requiredRole === 'editor' && (isAdmin || isEditor)) ||
      (requiredRole === 'viewer' && (isAdmin || isEditor || isViewer));

    if (!hasPermission) {
      router.push('/admin');
    }
  }, [user, loading, requiredRole, isAdmin, isEditor, isViewer, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#00c0d4' }} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
