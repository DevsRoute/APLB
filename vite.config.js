import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
      protocolImports: true,
    }),
  ],
  server: { port: 5173, open: false },
  // eigenpal/docx-editor's PDF engine uses top-level await, which needs es2022.
  build: { target: 'es2022' },
  optimizeDeps: {
    esbuildOptions: { target: 'es2022' },
  },
  resolve: {
    alias: {
      '@turbodocx/html-to-docx':
        '@turbodocx/html-to-docx/dist/html-to-docx.browser.esm.js',
    },
  },
});
