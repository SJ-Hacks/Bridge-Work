import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://54.89.21.90:8000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;