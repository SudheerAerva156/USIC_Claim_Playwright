import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ClaimsPage } from '../pages/ClaimsPage';
import { ApiUtility } from '../utils/ApiUtility';
import { Logger } from '../utils/Logger';
import { EnvironmentManager } from '../utils/EnvironmentManager';

// Define the custom fixtures type
export interface CustomFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  claimsPage: ClaimsPage;
  apiUtility: ApiUtility;
}

// Extend the base test with custom page object models and utilities
export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  claimsPage: async ({ page }, use) => {
    const claimsPage = new ClaimsPage(page);
    await use(claimsPage);
  },

  apiUtility: async ({ request }, use) => {
    const apiUtility = new ApiUtility(request);
    await use(apiUtility);
  }
});

// Setup hooks for logging and metadata injection
test.beforeEach(async ({}, testInfo) => {
  const currentEnv = EnvironmentManager.getEnv();
  const currentUrl = EnvironmentManager.getBaseUrl();
  
  Logger.info(`\n======================================================================`);
  Logger.info(`[STARTING TEST] : "${testInfo.title}"`);
  Logger.info(`[ENVIRONMENT]   : ${currentEnv}`);
  Logger.info(`[BASE URL]      : ${currentUrl}`);
  Logger.info(`======================================================================\n`);

  // Add metadata as annotations for reports
  testInfo.annotations.push({
    type: 'environment',
    description: currentEnv
  });
  testInfo.annotations.push({
    type: 'base_url',
    description: currentUrl
  });
});

test.afterEach(async ({}, testInfo) => {
  Logger.info(`\n======================================================================`);
  Logger.info(`[FINISHED TEST] : "${testInfo.title}"`);
  Logger.info(`[STATUS]        : ${testInfo.status?.toUpperCase()}`);
  Logger.info(`======================================================================\n`);
});

export { expect };
