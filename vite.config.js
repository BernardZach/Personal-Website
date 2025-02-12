import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures correct asset paths
  build: {
    outDir: 'dist', // Output directory
    assetsDir: 'static', // Static assets directory
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: './blog/index.html',
        weddingblog: './blog-post1/index.html',
        pdf: './public/ZachBernardResume.pdf'
      },
    }
  },
});
