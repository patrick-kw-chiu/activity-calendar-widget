import react from '@astrojs/react';
import solidJs from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), solidJs(), svelte(), vue()],
});
