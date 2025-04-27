import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://ec2-54-89-21-90.compute-1.amazonaws.com:8000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;