import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplace par l'URL de ton backend
  timeout: 5000, // Temps maximum d'attente (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
