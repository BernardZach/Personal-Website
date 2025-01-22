import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures correct asset paths
  build: {
    outDir: 'dist', // Output directory
    assetsDir: 'public/assets', // Static assets directory
    rollupOptions: {
      input: {
        main: './src/pages/main/index.html',
        blog: './src/pages/blog/index.html',
        weddingblog: './src/pages/blog-post1/index.html'
      },
      output: {
        // Ensure 'main' becomes the default root file by renaming it to 'index.html'
        entryFileNames: (chunkInfo) =>
          chunkInfo.name === 'main' ? 'index.html' : `${chunkInfo.name}/index.html`,
      },
    },
  },
});
