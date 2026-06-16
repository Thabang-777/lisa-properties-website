'use client';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';

export default function SyncLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getSyncLogs({ page, limit: 20 });
      setLogs(res.logs || []);
      setTotal(res.pagination?.total || 0);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-4xl font-bold text-charcoal mb-6">Sync Logs</h1>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : logs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-600">No sync logs yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Scraped</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">New</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Updated</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Removed</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold">{log.syncType}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : log.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{log.totalScraped || 0}</td>
                    <td className="px-6 py-4 text-sm">{log.newListings || 0}</td>
                    <td className="px-6 py-4 text-sm">{log.updatedListings || 0}</td>
                    <td className="px-6 py-4 text-sm">{log.removedListings || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > 20 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${Math.ceil(total / 20)}`}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / 20)}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
