import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// Dynamic base: Vercel sets VERCEL=1 so base is '/', whereas GitHub Pages deploys under '/Portfolio/'
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';

export default defineConfig({
  plugins: [react()],
  base: isVercel ? '/' : '/Portfolio/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion', 'gsap', 'lenis'],
          three: ['three'],
          icons: ['lucide-react']
        }
      }
    }
  }
});

