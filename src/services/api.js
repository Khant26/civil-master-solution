import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Service for all endpoints
export const apiService = {
  // Partnership APIs
  partnerships: {
    getAll: () => api.get('/partnerships/'),
    getById: (id) => api.get(`/partnerships/${id}/`),
  },

  // Customer APIs
  customers: {
    getAll: () => api.get('/customerships/'),
    getById: (id) => api.get(`/customerships/${id}/`),
  },

  // Product APIs
  products: {
    getAll: () => api.get('/products/'),
    getById: (id) => api.get(`/products/${id}/`),
  },

  // Project Reference APIs
  projectReferences: {
    getAll: () => api.get('/projectreferences/'),
    getById: (id) => api.get(`/projectreferences/${id}/`),
    getFavorites: () => api.get('/projectreferences/favorites/'),
  },

  // News APIs
  news: {
    getAll: () => api.get('/news/'),
    getById: (id) => api.get(`/news/${id}/`),
    submit: (data) => api.post('/news/', data),
  },

  // Articles APIs
  articles: {
    getAll: () => api.get('/articles/'),
    getById: (id) => api.get(`/articles/${id}/`),
  },

  // Request Form API
  requestForm: {
    submit: (data) => api.post('/requestforms/', data),
  },

  // Chatbot API
  chatbot: {
    sendMessage: (data) => api.post('/chatbot/', data),
  },
};

export default api;