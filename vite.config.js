import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],

    // Configuration de développement (pour npm run dev)
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: false,
        cors: true,
        hmr: {
            host: process.env.VITE_HMR_HOST || 'localhost',
            port: parseInt(process.env.VITE_HMR_PORT || '5173'),
            protocol: process.env.VITE_HMR_PROTOCOL || 'ws',
        },
        middlewareMode: false,
        watch: {
            usePolling: true,
            interval: 100,
        },
    },

    // Configuration de production (pour npm run build)
    build: {
        // Dossier de sortie pour les assets compilés
        outDir: 'public/build',

        // Ne pas vider le dossier (pour garder les fichiers existants)
        emptyOutDir: false,

        // Optimisation Rollup
        rollupOptions: {
            output: {
                // Format des noms de fichiers avec hash pour cache-busting
                entryFileNames: 'js/[name]-[hash].js',
                chunkFileNames: 'js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'css/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },

        // Minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Supprimer les console.log en production
            },
        },

        // Seuil pour warning sur les fichiers trop gros
        reportCompressedSize: true,
        chunkSizeWarningLimit: 1000,
    },
});
