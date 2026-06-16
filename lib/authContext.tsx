'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from './apiClient';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      // Verify token by fetching profile
      apiClient
        .getProfile(savedToken)
        .then((data) => {
          if (data.email) setAdmin(data);
        })
        .catch(() => {
          localStorage.removeItem('adminToken');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiClient.login(email, password);
    if (data.token) {
      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem('adminToken', data.token);
    } else {
      throw new Error(data.error || 'Login failed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const data = await apiClient.register(email, password, name);
    if (data.token) {
      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem('adminToken', data.token);
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ admin, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
