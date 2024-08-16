import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    react({
      include: ['**/react/**'],
    }),
    solid({
      include: ['**/solid/**'],
    }),
    svelte(),
    vue(),
  ],
});
