import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev: http://127.0.0.1:5174/
// Prod (GitHub Pages / Vercel path): /gumanizm/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/gumanizm/' : '/',
  plugins: [react(), tailwindcss()],
}))
