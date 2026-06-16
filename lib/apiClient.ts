const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Auth
  register: async (email: string, password: string, name: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  getProfile: async (token: string) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Listings
  getListings: async (params?: any) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/listings?${query}`);
    return res.json();
  },

  getListingById: async (id: string) => {
    const res = await fetch(`${API_URL}/listings/${id}`);
    return res.json();
  },

  createListing: async (data: any, token: string) => {
    const res = await fetch(`${API_URL}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateListing: async (id: string, data: any, token: string) => {
    const res = await fetch(`${API_URL}/listings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteListing: async (id: string, token: string) => {
    const res = await fetch(`${API_URL}/listings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  bulkUpdateStatus: async (ids: string[], status: string, token: string) => {
    const res = await fetch(`${API_URL}/listings/bulk/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids, status }),
    });
    return res.json();
  },

  toggleFeatured: async (id: string, isFeatured: boolean, token: string) => {
    const res = await fetch(`${API_URL}/listings/${id}/featured`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isFeatured }),
    });
    return res.json();
  },

  // Sync
  triggerSync: async (token: string) => {
    const res = await fetch(`${API_URL}/sync/sync`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  getSyncLogs: async (params?: any) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/sync/logs?${query}`);
    return res.json();
  },

  getLatestSyncLog: async () => {
    const res = await fetch(`${API_URL}/sync/logs/latest`);
    return res.json();
  },

  // CSV
  getCSVTemplate: async () => {
    return `${API_URL}/csv/template`;
  },

  importCSV: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}/csv/import`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return res.json();
  },
};
