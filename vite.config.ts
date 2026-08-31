import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 4173,
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    minify: 'oxc',
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096, // Inline small assets (<4kb) as base64
    rollupOptions: {
      output: {
        // Long-term caching: split vendor code into stable chunks so a content
        // change in your app doesn't bust the react/react-query cache.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-dom') || id.includes('/react/')) return 'react'
          if (id.includes('react-router')) return 'router'
          if (id.includes('@tanstack')) return 'query'
          if (id.includes('react-helmet-async')) return 'meta'
          if (id.includes('next-themes')) return 'theme'
          if (id.includes('lucide-react')) return 'icons'
          return 'vendor'
        },
        // Deterministic file names for CDN caching.
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: ({ names }) => {
          const filename = names[0] ?? 'asset'
          if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(filename)) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(filename)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      '@tanstack/react-query',
      'react-helmet-async',
      'next-themes',
    ],
  },
})
