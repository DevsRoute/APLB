import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    // @turbodocx/html-to-docx needs Buffer / process / global in the browser.
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
      protocolImports: true,
    }),
  ],
  server: { port: 5173, open: false },
  resolve: {
    alias: {
      '@turbodocx/html-to-docx':
        '@turbodocx/html-to-docx/dist/html-to-docx.browser.esm.js',
    },
  },
});
