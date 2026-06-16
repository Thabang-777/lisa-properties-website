'use client';
import { AuthProvider } from '@/lib/authContext';

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
