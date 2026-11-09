import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-landing-pages-at-root',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && req.url.startsWith('/landing-pages/')) {
            req.url = '/Portfolio' + req.url;
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && req.url.startsWith('/landing-pages/')) {
            req.url = '/Portfolio' + req.url;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      'designcodeio/threeui/style.css': path.resolve(__dirname, 'src/shaders/threeui.css'),
      '@designcodeio/threeui/style.css': path.resolve(__dirname, 'src/shaders/threeui.css'),
      'designcodeio/threeui': '@designcodeio/threeui',
    },
  },
  // GitHub Pages repository name is 'Portfolio'
  base: '/Portfolio/',
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

