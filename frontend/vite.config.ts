import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    // Gzip compression for all JS/CSS assets
    compression({ algorithms: ['gzip'] }),
    // Brotli compression for modern browsers
    compression({ algorithms: ['brotliCompress'] }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    // Improve Core Web Vitals: split vendor chunks to reduce main bundle
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/react-helmet-async')) {
            return 'vendor-helmet';
          }
        },
      },
    },
    // Inline small assets (< 4kb) to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Enable CSS code splitting per chunk
    cssCodeSplit: true,
    // Target modern browsers only (smaller bundle)
    target: 'es2020',
  },
})
