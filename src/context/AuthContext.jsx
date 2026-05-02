import { createContext, useState, useEffect, useCallback } from 'react';
import { checkAuth as checkAuthAPI, login as loginAPI, logout as logoutAPI } from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const data = await checkAuthAPI();
      setIsAuthenticated(data?.authenticated || false);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username, password) => {
    const data = await loginAPI(username, password);
    if (data.success) {
      setIsAuthenticated(true);
    }
    return data;
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
