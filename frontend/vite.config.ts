import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/jania-mesquita/' : '/',
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}));
