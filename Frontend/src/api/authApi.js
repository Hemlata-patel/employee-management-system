// src/api/authApi.js
import axios from 'axios';

const AUTH_API = axios.create({
  baseURL: 'https://employee-management-system-backend-nw0a.onrender.com/api/auth',
  withCredentials: true,
});

export const login = async (credentials) => {
  const response = await AUTH_API.post('/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await AUTH_API.post('/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await AUTH_API.get('/me');
  return response.data;
};
