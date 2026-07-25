import { createContext, useContext, useState, useEffect } from 'react';
import { isLoggedIn, login as apiLogin, clearTokens } from '../lib/adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    setAuthenticated(isLoggedIn());
  }, []);

  const login = async (username, password) => {
    await apiLogin(username, password);
    setAuthenticated(true);
  };

  const logout = () => {
    clearTokens();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
