import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      'locale.json': path.resolve(__dirname, 'src/locale.json'),
      'package.json': path.resolve(__dirname, 'package.json'),
      queries: path.resolve(__dirname, 'src/queries.ts'),
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
