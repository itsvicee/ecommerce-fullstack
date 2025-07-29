// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  // Vercel inyectará esta variable de entorno durante el build
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const authService = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
};

export const productService = {
  getAll: () => apiClient.get('/products'),
  getById: (id) => apiClient.get(`/products/${id}`),
};

export const orderService = {
  create: (orderData, token) => {
    return apiClient.post('/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
