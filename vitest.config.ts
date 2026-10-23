import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Unit tests cover the data pipeline, rules and storage, none of which need a DOM.
    environment: 'node',
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
});
