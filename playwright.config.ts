import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

// The end-to-end tests run against the built site, served under /IronLog/ like GitHub Pages.
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}/IronLog/`,
    trace: 'retain-on-failure',
  },
  // Desktop web only for now (Justin, 2026-10-26: the site is a web prototype, not targeting phones).
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/IronLog/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
