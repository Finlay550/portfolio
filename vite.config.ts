
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Using '' as the third argument allows loading all variables from the environment (e.g. Vercel dashboard).
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Create a safe subset of environment variables to expose to the client
  const processEnv: Record<string, string> = {};
  Object.keys(env).forEach((key) => {
    processEnv[key] = env[key];
  });

  // Ensure Gemini SDK requirement is met
  processEnv.API_KEY = env.API_KEY || env.VITE_GEMINI_API_KEY || "";

  return {
    plugins: [react()],
    define: {
      // This allows the Gemini SDK to find process.env.API_KEY literally
      'process.env.API_KEY': JSON.stringify(processEnv.API_KEY),
      // This allows dynamic access like process.env[key] to work in lib/firebase.ts
      'process.env': JSON.stringify(processEnv),
      'global': 'globalThis'
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      target: 'esnext'
    },
    server: {
      host: true,
      port: 3000
    }
  };
});
