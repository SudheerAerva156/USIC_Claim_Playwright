import { test, expect } from '../fixtures';
import { Logger } from '../../utils/Logger';

test.describe('USIC QA Upgrade - Base Capabilities Verification Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    Logger.info('Navigating to Majesco QA Upgrade Login Page');
    await loginPage.navigate();
  });

  test('Verify Core System Capabilities and Main Menu Navigation @upgrade @regression', async ({ loginPage, page }) => {
    Logger.info('Logging in as Admin to verify base capabilities');
    await loginPage.loginWithRole('Admin');

    // Confirm dashboard has loaded successfully by checking visibility of Home link
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 30000 });
    
    Logger.info('Verifying main menu navigation links exist');
    await expect(page.locator('a:has-text("Claim")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Vendor")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Special Functions")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Reports")').first()).toBeVisible();
    
    Logger.info('Base capabilities check completed successfully');
  });
});
