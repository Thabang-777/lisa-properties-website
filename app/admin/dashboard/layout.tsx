'use client';
import { useAuth } from '@/lib/authContext';
import { AuthProvider } from '@/lib/authContext';
import Link from 'next/link';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-charcoal text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-2xl font-bold">
            Admin Dashboard
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-300">{admin?.email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg p-6 min-h-[calc(100vh-70px)]">
          <div className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gold hover:text-white rounded-lg transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/listings"
              className="block px-4 py-2 text-gray-700 hover:bg-gold hover:text-white rounded-lg transition"
            >
              🏠 Listings
            </Link>
            <Link
              href="/admin/listings/create"
              className="block px-4 py-2 text-gray-700 hover:bg-gold hover:text-white rounded-lg transition"
            >
              ➕ New Listing
            </Link>
            <Link
              href="/admin/logs"
              className="block px-4 py-2 text-gray-700 hover:bg-gold hover:text-white rounded-lg transition"
            >
              📜 Sync Logs
            </Link>
            <Link
              href="/admin/listings/import"
              className="block px-4 py-2 text-gray-700 hover:bg-gold hover:text-white rounded-lg transition"
            >
              📥 CSV Import
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
