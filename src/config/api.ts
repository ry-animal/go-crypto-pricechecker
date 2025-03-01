export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  version: 'v1',
  endpoints: {
    prices: '/prices'
  }
}; 