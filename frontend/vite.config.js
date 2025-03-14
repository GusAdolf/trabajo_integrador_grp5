import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Configuración para el desarrollo local
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  // Configuración para el preview (despliegue de producción)
  preview: {
    allowedHosts: ['localhost', 'charismatic-vibrancy-production.up.railway.app'],
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173
  }
})
