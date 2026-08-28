import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://<user>.github.io/gumanizm/
export default defineConfig({
  base: '/gumanizm/',
  plugins: [react(), tailwindcss()],
})
