import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from a .env file if it exists
dotenv.config();

const environment = process.env.ENV || 'QA_UPGRADE';

// Configured base URLs for each environment
const ENV_URLS: Record<string, string> = {
  DEV: 'https://dev-claim.majesco.io/Claim/',
  DEVAT: 'https://devat-claim.majesco.io/Claim/',
  QA: 'https://qa-claim.majesco.io/Claim/',
  QA2: 'https://qa2-claim.majesco.io/Claim/',
  CLOUDQA: 'https://cloudqa-claim.majesco.io/Claim/',
  UAT: 'https://uat-claim.majesco.io/Claim/',
  QA_UPGRADE: 'https://us-qcsup.majesco.io/Claim/'
};

const baseURL = ENV_URLS[environment] || ENV_URLS['QA_UPGRADE'];

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
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
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
export { ENV_URLS };
