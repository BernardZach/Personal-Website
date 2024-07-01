import { defineConfig } from 'vite';

export default defineConfig({
  base: './',

  build: {
    outDir: 'dist', // Output directory for production builds
    assetsDir: 'assets', // Directory for static assets relative to outDir
    rollupOptions: {
      input: {
        main: 'index.html', // Entry point of your application
      },
    },
  },

  // Explicitly include all files from 'static' directory
  assetsInclude: ["assets/**"],
});
