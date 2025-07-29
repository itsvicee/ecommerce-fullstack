// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },
};

export const productService = {
  getAll: () => {
    return apiClient.get('/products');
  },
  // Asegúrate de que esta función esté aquí
  getById: (id) => {
    return apiClient.get(`/products/${id}`);
  },
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