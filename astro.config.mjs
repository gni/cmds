import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://loop.brain.fr',
  base: '/cmds',
  vite: {
    plugins: [tailwindcss()],
  },
});
