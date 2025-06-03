import { API_BASE_URL } from '../config/apiConfig';
import { storage } from './storage';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const accessToken = storage.getString('access_token');
  const headers = {
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
} 