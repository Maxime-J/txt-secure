import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      'fr-locale': path.resolve(__dirname, 'locale/fr.json'),
      'package.json': path.resolve(__dirname, 'package.json'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app-[hash].js',
        assetFileNames: 'assets/styles-[hash].css',
      },
    },
  },
});
