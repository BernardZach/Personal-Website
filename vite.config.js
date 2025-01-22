import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures correct asset paths
  build: {
    outDir: 'dist', // Output directory
    assetsDir: 'public/assets', // Static assets directory
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: './src/pages/blog/index.html',
        weddingblog: './src/pages/blog-post1/index.html'
      },
    }
  },
});
