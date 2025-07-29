// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api'; // Importamos nuestro servicio

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // Estado para manejar mensajes de error o éxito
  const [message, setMessage] = useState('');

  // Función que se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    setMessage(''); // Limpiamos mensajes anteriores

    try {
      // Llamamos a la función 'register' de nuestro servicio de API
      const response = await authService.register(formData);
      
      // Si el registro es exitoso...
      setMessage('¡Registro exitoso! Redirigiendo al login...');
      
      // Esperamos 2 segundos y redirigimos al usuario a la página de login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // Si la API devuelve un error (ej: email ya existe)
      const errorMessage = error.response?.data?.message || 'Error en el registro. Inténtalo de nuevo.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Crear una cuenta</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300"
            >
              Registrarse
            </button>
          </div>
        </form>

        {/* Aquí mostraremos los mensajes de éxito o error */}
        {message && (
          <p className="text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
