import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures correct asset paths
  build: {
    outDir: 'dist', // Output directory for production builds
    assetsDir: 'assets', // Directory for static assets relative to outDir
    rollupOptions: {
      input: {
        main: 'index.html', // Entry point of your application
      },
    },
  },
});
