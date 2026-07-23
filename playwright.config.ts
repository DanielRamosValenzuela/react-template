import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: 'html',
  retries: process.env.CI ? 2 : 0,
  testDir: './test/ui',
  use: {
    baseURL: 'http://localhost:3002',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start -- -p 3002',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    url: 'http://localhost:3002',
  },
  workers: process.env.CI ? 1 : undefined,
});
