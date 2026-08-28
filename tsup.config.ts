import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    clean: true,
    minify: false,
    sourcemap: false,
    // Bundle semua dependencies ke dalam single file output
    noExternal: [/.*/],
    publicDir: 'src/templates',
    outDir: 'dist',
    banner: {
        js: '#!/usr/bin/env node',
    },
});