import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  username: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
refreshUser: () => Promise<void>;
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshUser = async () => {
    const res = await api.get('/auth/me');
    setUser(res.data);
  };
  

  const login = async () => {
    const res = await api.get('/auth/me');
    setUser(res.data);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  useEffect(() => {
    login().catch(() => setUser(null)).finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
