'use client';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { useAuth } from '@/lib/authContext';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';

export default function ListingsPage() {
  const { token } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState('');

  useEffect(() => {
    fetchListings();
  }, [page, status, token]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getListings({ page, status, limit: 20 });
      setListings(res.listings || []);
      setTotal(res.pagination?.total || 0);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkStatusChange = async () => {
    if (!bulkStatus || selectedIds.length === 0) return;

    try {
      await apiClient.bulkUpdateStatus(selectedIds, bulkStatus, token!);
      setSelectedIds([]);
      setBulkStatus('');
      fetchListings();
    } catch (error) {
      console.error('Bulk update failed:', error);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  if (loading && listings.length === 0)
    return <div className="text-center py-8">Loading listings...</div>;

  return (
    <ProtectedRoute>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-charcoal">Listings</h1>
          <Link href="/admin/listings/create" className="bg-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90">
            ➕ New Listing
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="on-show">On Show</option>
                <option value="sold">Sold</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            {selectedIds.length > 0 && (
              <div className="flex gap-2">
                <select
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
                >
                  <option value="">Change status...</option>
                  <option value="available">Available</option>
                  <option value="on-show">On Show</option>
                  <option value="sold">Sold</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
                <button
                  onClick={handleBulkStatusChange}
                  disabled={!bulkStatus}
                  className="px-4 py-2 bg-gold text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === listings.length && listings.length > 0}
                    onChange={(e) =>
                      setSelectedIds(e.target.checked ? listings.map((l) => l._id) : [])
                    }
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Source</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(listing._id)}
                      onChange={() => toggleSelection(listing._id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-charcoal">{listing.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{listing.location}</td>
                  <td className="px-6 py-4 text-sm">{listing.propertyType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        listing.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : listing.status === 'sold'
                          ? 'bg-red-100 text-red-800'
                          : listing.status === 'on-show'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{listing.source}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/listings/${listing._id}`}
                      className="text-gold hover:underline font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
      </div>
    </ProtectedRoute>
  );
}
