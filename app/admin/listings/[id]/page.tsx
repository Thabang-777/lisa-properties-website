'use client';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { useAuth } from '@/lib/authContext';
import { apiClient } from '@/lib/apiClient';
import { useRouter, useParams } from 'next/navigation';

export default function EditListingPage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [listing, setListing] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await apiClient.getListingById(id);
        setListing(data);
        setFormData(data);
      } catch (err: any) {
        setError('Failed to load listing');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.updateListing(id, formData, token!);
      router.push('/admin/listings');
    } catch (err: any) {
      setError(err.message || 'Failed to update listing');
      setLoading(false);
    }
  };

  if (loading && !formData) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-4xl font-bold text-charcoal mb-6">Edit Listing</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={formData?.price || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData?.location || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData?.bedrooms || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData?.bathrooms || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking Spaces</label>
              <input
                type="number"
                name="parkingSpaces"
                value={formData?.parkingSpaces || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData?.status || 'available'}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              >
                <option value="available">Available</option>
                <option value="on-show">On Show</option>
                <option value="sold">Sold</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
              <input
                type="text"
                name="abbreviated"
                value={formData?.abbreviated || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
              <textarea
                name="fullDescription"
                value={formData?.fullDescription || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gold text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-opacity-90"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
