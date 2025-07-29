// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos nuestro hook

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtenemos la función de login del contexto

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await login(formData); // Usamos la función de login del contexto
      navigate('/'); // Redirigimos al inicio si el login es exitoso
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error en el login. Inténtalo de nuevo.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs para email y password (similar a RegisterPage) */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" name="password" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300">
              Entrar
            </button>
          </div>
        </form>
        {message && <p className="text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;