
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ensure process.env.API_KEY works in production
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
