'use client';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { useAuth } from '@/lib/authContext';
import { apiClient } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

export default function CreateListingPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    price: '',
    bedrooms: '',
    bathrooms: '',
    parkingSpaces: '',
    erfSize: '',
    zoning: '',
    propertyType: 'House',
    abbreviated: '',
    fullDescription: '',
    location: '',
    mainImage: '',
    status: 'available',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.createListing(
        {
          ...formData,
          galleryImgs: formData.mainImage ? [formData.mainImage] : [],
          bedrooms: parseInt(formData.bedrooms) || 0,
          bathrooms: parseInt(formData.bathrooms) || 0,
          parkingSpaces: parseInt(formData.parkingSpaces) || 0,
        },
        token!
      );
      router.push('/admin/listings');
    } catch (err: any) {
      setError(err.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-4xl font-bold text-charcoal mb-6">Create New Listing</h1>

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
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. R 1,000,000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Johannesburg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking Spaces</label>
              <input
                type="number"
                name="parkingSpaces"
                value={formData.parkingSpaces}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Erf Size</label>
              <input
                type="text"
                name="erfSize"
                value={formData.erfSize}
                onChange={handleChange}
                placeholder="e.g. 382 m²"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              >
                <option>House</option>
                <option>Apartment</option>
                <option>Townhouse</option>
                <option>Land</option>
                <option>Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Zoning</label>
              <input
                type="text"
                name="zoning"
                value={formData.zoning}
                onChange={handleChange}
                placeholder="e.g. Residential"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
              <input
                type="text"
                name="abbreviated"
                value={formData.abbreviated}
                onChange={handleChange}
                placeholder="Brief description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                placeholder="Detailed description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL</label>
              <input
                type="url"
                name="mainImage"
                value={formData.mainImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
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
              {loading ? 'Creating...' : 'Create Listing'}
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
