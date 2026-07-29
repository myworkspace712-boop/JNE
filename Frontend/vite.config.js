import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Add the proxy block right here:
    proxy: {
      '/api': {
        target: 'http://192.168.1.11:5000', // Ensure this matches your backend PORT
        changeOrigin: true,
        secure: false,
      },
    },
  },
})