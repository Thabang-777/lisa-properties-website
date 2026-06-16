'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/admin/auth/login');
    }
  }, [token, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return token ? <>{children}</> : null;
};
