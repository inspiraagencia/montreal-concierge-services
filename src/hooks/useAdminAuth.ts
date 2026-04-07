'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'editor' | 'viewer';
  is_active: boolean;
  last_login: string | null;
}

interface UseAdminAuthReturn {
  user: AdminUser | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  isViewer: boolean;
  logout: () => Promise<void>;
}

export function useAdminAuth(): UseAdminAuthReturn {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Fetch admin user details
        const { data: adminUser, error: userError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userError) {
          console.error('Error fetching admin user:', userError);
          setUser(null);
          setLoading(false);
          return;
        }

        // Check if user is active
        if (!adminUser?.is_active) {
          await supabase.auth.signOut();
          setUser(null);
          setLoading(false);
          return;
        }

        // Update last_login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminUser.id);

        setUser(adminUser as AdminUser);
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session?.user) {
        setUser(null);
        return;
      }

      // Fetch updated admin user
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (adminUser) {
        setUser(adminUser as AdminUser);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    loading,
    isAdmin: user?.role === 'admin' ?? false,
    isEditor: user?.role === 'editor' ?? false,
    isViewer: user?.role === 'viewer' ?? false,
    logout,
  };
}
