import axios from 'axios';

// Dynamically resolve API URL with fallback
const baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000';

const api = axios.create({
  baseURL,
  withCredentials: true, // Send cookies across cross-origin requests
  headers: {
    'Content-Type': 'application/json',
  },
  // 3. 60-second timeout to allow Render free tier instances to complete cold-start waking
  timeout: 60000, 
});

// Request interceptor to automatically attach JWT token if stored in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 1. Response interceptor with massive, visible diagnostic logging for Network Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If no response object exists, the request never reached or never returned from the server
    if (!error.response) {
      const attemptedTarget = error.config
        ? `${error.config.baseURL || ''}${error.config.url || ''}`
        : 'Unknown URL';
      
      const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');

      console.error(
        '%c🚨 [AXIOS NETWORK DIAGNOSTIC FAILURE] 🚨',
        'background: #b91c1c; color: white; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
      );
      console.error(
        `%cTarget URL Attempted: %c${attemptedTarget}`,
        'font-weight: bold;',
        'color: #f59e0b; font-weight: bold; font-size: 13px;'
      );
      console.error(`Error Code: ${error.code || 'UNKNOWN'}`);
      console.error(`Error Message: ${error.message || 'No message'}`);

      if (isTimeout) {
        console.warn(
          '⏳ TIMEOUT (60s exceeded): The backend on Render might still be waking up from sleep, or is hanging on an unhandled promise/DB connection.'
        );
      } else if (attemptedTarget.includes('localhost') || attemptedTarget.includes('127.0.0.1')) {
        console.error(
          '❌ WRONG DOMAIN: Your frontend is still trying to communicate with LOCALHOST instead of your live Render backend URL!'
        );
      } else {
        console.error(
          '❌ SERVER UNREACHABLE OR CORS BLOCKED: Either your Render backend is down/crashed, or the browser blocked the response due to CORS headers.'
        );
      }

      console.error('Full Error Config for Inspection:', error.config);
    }

    return Promise.reject(error);
  }
);

export default api;
