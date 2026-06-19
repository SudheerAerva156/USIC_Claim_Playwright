import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { ENV_URLS } from './config/environments.config';

// Load environment variables from a .env file if it exists
dotenv.config();

const environment = process.env.ENV || 'QA';

const baseURL = ENV_URLS[environment] || ENV_URLS['QA'];

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  timeout: 60000,
  expect: {
    timeout: 15000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }]
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20000,
    navigationTimeout: 40000,
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // }
  ]
});
export { ENV_URLS };
