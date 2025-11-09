import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    vue(),
    react(),
    federation({
      name: 'remote3',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/wrappers/AppWrapper.tsx',
        './Badge': './src/wrappers/BadgeWrapper.tsx',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.5.13',
        },
        react: {
          singleton: true,
          requiredVersion: '^18.3.1',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.1',
        },
      },
    }),
  ],
  server: {
    port: 5003,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
