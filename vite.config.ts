import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// Vite is the build tool and development server for this project.
// Think of it as a combination of a compiler (like 'go build') and a live-reloading server (like 'uvicorn' or 'flask run').
// It handles bundling dependencies, compiling TypeScript to JavaScript, and serving the app.

export default defineConfig(() => {
  return {
    // Server configuration for the local development environment.
    server: {
      port: 3000,
      host: '0.0.0.0', // Expose to network (similar to binding to 0.0.0.0 in Python servers)
      // allowedHosts: ['34ec49998820.ngrok-free.app'],
    },
    // Plugins extend Vite's functionality. Here we add React support.
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Resolve aliases allow us to use '@' as a shortcut for the './src' directory.
    // This avoids long relative paths like '../../../components' (similar to configuring PYTHONPATH or Go modules).
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Build settings for production output (typically generated in the 'dist' folder).
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          // Manual chunks help split the code into smaller files for better caching.
          // Here we separate React libraries into their own file (vendor chunk).
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  };
});
