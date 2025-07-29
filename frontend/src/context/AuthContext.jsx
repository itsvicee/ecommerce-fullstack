// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';
import { jwtDecode } from 'jwt-decode'; // Necesitaremos instalar esta librería

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Creamos el Proveedor del Contexto (un componente que envolverá nuestra app)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Si hay un token en localStorage, intentamos decodificarlo
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser.user);
      } catch (error) {
        console.error("Token inválido", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decodedUser = jwtDecode(newToken);
    setUser(decodedUser.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // 3. Pasamos el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Creamos un hook personalizado para usar el contexto más fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};