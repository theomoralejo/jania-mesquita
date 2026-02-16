import { AuthProvider } from '@refinedev/core';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar token em todas as requisições
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return {
          success: true,
          redirectTo: '/',
        };
      }

      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'Credenciais inválidas',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: error.response?.data?.error || 'Erro ao fazer login',
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
      success: true,
      redirectTo: '/login',
    };
  },

  check: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
      logout: true,
    };
  },

  getPermissions: async () => {
    const user = localStorage.getItem('user');
    if (user) {
      const { role } = JSON.parse(user);
      return role;
    }
    return null;
  },

  getIdentity: async () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
        redirectTo: '/login',
        error,
      };
    }

    return { error };
  },
};

export { axiosInstance };
