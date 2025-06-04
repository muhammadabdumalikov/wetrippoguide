import { API_BASE_URL } from '../config/apiConfig';
import { storage } from './storage';

interface ApiError extends Error {
  response?: {
    data?: any;
  };
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const accessToken = storage.getString('access_token');
  const headers = {
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error = new Error(`API error: ${response.status}`) as ApiError;
    error.response = { data: errorData };
    throw error;
  }
  return response.json();
} 