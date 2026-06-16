'use client';
import { useState, useRef } from 'react';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { useAuth } from '@/lib/authContext';
import { apiClient } from '@/lib/apiClient';

export default function CSVImportPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = async () => {
    const templateUrl = await apiClient.getCSVTemplate();
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'listings-template.csv';
    link.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await apiClient.importCSV(file, token!);
      setResult(res);
      setSuccess(`Successfully imported! New: ${res.newListings}, Updated: ${res.updatedListings}`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setError(err.message || 'Failed to import CSV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-4xl font-bold text-charcoal mb-6">CSV Bulk Import</h1>

        <div className="max-w-2xl">
          {/* Template Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-charcoal mb-4">📥 Import Listings</h2>
            <p className="text-gray-600 mb-6">
              Download the CSV template, fill it with your property data, and upload it here.
            </p>

            <button
              onClick={handleDownloadTemplate}
              className="bg-charcoal text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              📄 Download CSV Template
            </button>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-charcoal mb-4">Upload CSV File</h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
              />

              <div className="text-4xl mb-4">📁</div>
              <p className="text-gray-600 mb-2">Click to select CSV file or drag and drop</p>
              <p className="text-sm text-gray-500">Only .csv files are supported</p>
            </div>

            {result && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-charcoal mb-4">Import Results</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`text-lg font-bold ${result.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {result.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Imported</p>
                    <p className="text-lg font-bold text-blue-600">{result.totalScraped}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">New Listings</p>
                    <p className="text-lg font-bold text-green-600">{result.newListings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-bold">{result.duration}s</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CSV Format Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-blue-900 mb-2">📋 CSV Format Requirements</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Headers: price, bedrooms, bathrooms, parkingSpaces, erfSize, zoning, propertyType, abbreviated, fullDescription, location, mainImage, status</li>
              <li>Price format: R 1,000,000</li>
              <li>Numeric fields: bedrooms, bathrooms, parkingSpaces</li>
              <li>Status options: available, on-show, sold, withdrawn</li>
              <li>Ensure URLs are complete and valid</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
