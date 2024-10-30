import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export const pezService = {
  getAllPeces: () => api.get('/peces'),
  getPezById: (id) => api.get(`/peces/${id}`),
  createPez: (data) => api.post('/peces', data),
  updatePez: (id, data) => api.put(`/peces/${id}`, data),
  deletePez: (id) => api.delete(`/peces/${id}`)
};

export const estanqueService = {
  getAllEstanques: () => api.get('/estanques'),
  getEstanqueById: (id) => api.get(`/estanques/${id}`),
  createEstanque: (data) => api.post('/estanques', data),
  updateEstanque: (id, data) => api.put(`/estanques/${id}`, data),
  deleteEstanque: (id) => api.delete(`/estanques/${id}`)
};

export default api;