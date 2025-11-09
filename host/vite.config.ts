import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remote1: {
          type: 'module',
          name: 'remote1',
          entry: 'http://localhost:5001/remoteEntry.js',
          entryGlobalName: 'remote1',
          shareScope: 'default',
        },
        remote2: {
          type: 'module',
          name: 'remote2',
          entry: 'http://localhost:5002/remoteEntry.js',
          entryGlobalName: 'remote2',
          shareScope: 'default',
        },
        remote3: {
          type: 'module',
          name: 'remote3',
          entry: 'http://localhost:5003/remoteEntry.js',
          entryGlobalName: 'remote3',
          shareScope: 'default',
        },
      },
      shared: {
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
    port: 5000,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
