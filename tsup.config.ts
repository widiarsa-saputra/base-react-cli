import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    target: 'es2022',
    clean: true,
    minify: false,
    sourcemap: false,
    publicDir: 'src/templates',
    outDir: 'dist',
    banner: {
        js: '#!/usr/bin/env node',
    },
});