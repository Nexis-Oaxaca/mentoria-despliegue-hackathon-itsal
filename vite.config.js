import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // `base` es la ruta donde vive el sitio. En casi todas las plataformas es '/'.
  // GitHub Pages es la excepción: el sitio vive en usuario.github.io/<repo>/,
  // así que el workflow de GitHub Actions define BASE_PATH='/<repo>/'.
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
