import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  base:'/mobile/',
  plugins:[react(),tailwindcss()],
  build:{outDir:'../mobile',emptyOutDir:false},
  server:{port:8102}
});
