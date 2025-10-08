import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica se usuário está logado ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem('upgradeStore_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const users = [
        {
          id: 1,
          email: 'cliente@email.com',
          password: '123456',
          name: 'João Cliente',
          role: 'customer',
          avatar: '👤'
        },
        {
          id: 2,
          email: 'admin@upgradestore.com',
          password: 'admin123',
          name: 'Administrador',
          role: 'admin',
          avatar: '👨‍💼'
        }
      ];

      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = { ...foundUser };
        delete userData.password;
        
        setUser(userData);
        localStorage.setItem('upgradeStore_user', JSON.stringify(userData));
        
        // Redireciona admin para dashboard
        if (userData.role === 'admin') {
          navigate('/admin');
        }
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Credenciais inválidas' };
      }
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('upgradeStore_user');
    navigate('/');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};