import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures correct asset paths
  build: {
    outDir: 'dist', // Output directory
    assetsDir: 'public/assets', // Static assets directory
    rollupOptions: {
      input: {
        main: './src/pages/index.html',
      },
    },
  },
});
