
import axios from 'axios';

export const PORT = 5000;

export const api = axios.create({
    baseURL: `http://localhost:${PORT}/api`,
    withCredentials: true,
  });
