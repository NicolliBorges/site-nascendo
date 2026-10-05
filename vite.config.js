import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' deixa o build funcionar em subpasta (ex.: GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
});
