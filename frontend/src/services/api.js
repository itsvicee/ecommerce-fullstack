// frontend/src/services/api.js
import axios from 'axios';

// La URL base ahora es relativa. El navegador la completará automáticamente
// a http://localhost/api, y Nginx redirigirá la llamada al backend.
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones protegidas
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

// --- ¡AQUÍ ESTÁ LA LÍNEA QUE FALTABA! ---
export const orderService = {
  createOrder: (orderData) => apiClient.post('/orders', orderData),
};
