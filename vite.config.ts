import { defineConfig } from 'vite';


export default defineConfig({
  build: {
    target: 'node16', // Adjust according to your Node version
    ssr: true,        // Enables SSR support
    rollupOptions: {
      output: {
        format: 'esm', // Use ES modules for compatibility
      },
    },
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
  define: {
    'process.env': {}, // Define an empty process object for client-side use
  },
});
