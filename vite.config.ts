import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from https://justins95.github.io/IronLog/, so every asset path starts with /IronLog/.
export default defineConfig({
  base: '/IronLog/',
  plugins: [react()],
});
