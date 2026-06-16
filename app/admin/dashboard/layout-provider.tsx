'use client';
import { AuthProvider } from '@/lib/authContext';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
