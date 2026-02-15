import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("CONFIG DE VITE CARGADA");



export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://movielist.develotion.com/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
