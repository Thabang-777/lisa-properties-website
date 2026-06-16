'use client';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { useAuth } from '@/lib/authContext';
import { apiClient } from '@/lib/apiClient';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ total: 0, available: 0, sold: 0, onShow: 0 });
  const [latestSync, setLatestSync] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get listings stats
        const listingsRes = await apiClient.getListings({ limit: 1000 });
        const listings = listingsRes.listings || [];

        setStats({
          total: listingsRes.pagination?.total || 0,
          available: listings.filter((l: any) => l.status === 'available').length,
          sold: listings.filter((l: any) => l.status === 'sold').length,
          onShow: listings.filter((l: any) => l.status === 'on-show').length,
        });

        // Get latest sync log
        const syncRes = await apiClient.getLatestSyncLog();
        setLatestSync(syncRes);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleSync = async () => {
    setLoading(true);
    try {
      const result = await apiClient.triggerSync(token!);
      setLatestSync(result);
      // Refresh stats
      const listingsRes = await apiClient.getListings({ limit: 1000 });
      const listings = listingsRes.listings || [];
      setStats({
        total: listingsRes.pagination?.total || 0,
        available: listings.filter((l: any) => l.status === 'available').length,
        sold: listings.filter((l: any) => l.status === 'sold').length,
        onShow: listings.filter((l: any) => l.status === 'on-show').length,
      });
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-4xl font-bold text-charcoal mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Listings', value: stats.total, icon: '🏠', color: 'bg-blue-50 text-blue-600' },
            { label: 'Available', value: stats.available, icon: '📊', color: 'bg-green-50 text-green-600' },
            { label: 'On Show', value: stats.onShow, icon: '🔥', color: 'bg-orange-50 text-orange-600' },
            { label: 'Sold', value: stats.sold, icon: '✅', color: 'bg-purple-50 text-purple-600' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${stat.color} p-6 rounded-2xl shadow-lg`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-sm font-medium opacity-75">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Sync Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-charcoal mb-4">Property24 Sync</h2>

          <button
            onClick={handleSync}
            disabled={loading}
            className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Syncing...' : '🔄 Trigger Manual Sync'}
          </button>

          {latestSync && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{' '}
                <span className={`font-semibold ${latestSync.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {latestSync.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Last sync:</strong> {new Date(latestSync.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Scraped:</strong> {latestSync.totalScraped} | <strong>New:</strong> {latestSync.newListings} |{' '}
                <strong>Updated:</strong> {latestSync.updatedListings}
              </p>
            </div>
          )}
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-charcoal mb-2">Manage Listings</h3>
            <p className="text-gray-600 text-sm">View, edit, and manage property listings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-4">📥</div>
            <h3 className="text-xl font-bold text-charcoal mb-2">Import CSV</h3>
            <p className="text-gray-600 text-sm">Bulk import listings from CSV file</p>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
