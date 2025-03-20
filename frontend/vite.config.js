import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Usa la variable de entorno para el dominio del frontend, con un fallback
const frontDomain = process.env.VITE_FRONT_DOMAIN || 'frontend-production-bdd1.up.railway.app'

export default defineConfig({
  plugins: [react()],
  // Configuración para desarrollo local
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  // Configuración para el preview (producción)
  preview: {
    allowedHosts: ['localhost', frontDomain],
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173
  }
})
