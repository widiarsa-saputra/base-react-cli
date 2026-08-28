import { defineConfig } from 'tsup';
import fs from 'fs-extra';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    clean: true,
    banner: {
        js: '#!/usr/bin/env node',
    },
    async onSuccess() {
        // Copy folder templates ke dist/templates agar bisa dibaca saat runtime
        await fs.copy('src/templates', 'dist/templates');
    },
});