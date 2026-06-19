import { test, expect } from '../fixtures';
import { Logger } from '../../utils/Logger';
import { CredentialManager } from '../../utils/CredentialManager';

test.describe('Majesco Claims Live Smoke Test Suite', () => {
  test.use({
    ignoreHTTPSErrors: true
  });

  test('Execute recorded Majesco E2E flow @smoke @regression', async ({ loginPage, page }) => {
    Logger.info('Starting live Majesco E2E smoke test');

    // Dynamically navigate to the environment's base URL
    await loginPage.navigate();
    
    // Perform dynamic login using Page Object Model (which automatically resolves cookie consent)
    await loginPage.loginWithRole('Admin');
    
    Logger.info('Closing initial modal overlays if present');
    const closeBtn = page.getByRole('button', { name: 'Close' });
    try {
      await closeBtn.waitFor({ state: 'visible', timeout: 5000 });
      await closeBtn.click();
      Logger.info('Closed initial modal overlay');
    } catch (e) {
      Logger.info('No initial modal overlay detected or timed out waiting');
    }
    
    // Validate we are logged in successfully and Home link is visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 30000 });
    
    Logger.info('Waiting for any initial loading overlays to disappear');
    await page.locator('.overlay').first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    await page.locator('.modal-backdrop').first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});

    Logger.info('Navigating to Claim Search');
    await page.getByRole('link', { name: 'Claim Search' }).click();
    await page.getByRole('link', { name: 'Claim Search', exact: true }).click();
    
    Logger.info('Selecting Claim Status: Open');
    await page.locator('#select2-cmbClaimStatus-sh-container').click();
    await page.getByRole('treeitem', { name: 'Open', exact: true }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    
    Logger.info('Clicking on the first claim link in the search results table');
    // Dynamically query the first hyperlink (a) inside the table body rows
    const firstClaimLink = page.locator('table tbody tr a').first();
    
    // Enforce visibility wait
    await firstClaimLink.waitFor({ state: 'visible' });
    const claimNumber = await firstClaimLink.textContent();
    Logger.info(`Selected Claim Number: '${claimNumber ? claimNumber.trim() : 'Unknown'}'`);
    
    // Click the dynamic link
    await firstClaimLink.click();
    
    Logger.info('Navigating into Claim Features tabs');
    await page.getByRole('listitem').filter({ hasText: 'Features' }).click();
    await page.getByRole('tab', { name: 'mm.icd.FNOLSummary.Features' }).click();
    
    Logger.info('Verifying Vendor Management navigation');
    await page.getByRole('link', { name: 'Vendor' }).click();
    await page.getByRole('link', { name: 'Vendor Management' }).click();
    
    Logger.info('Verifying Special Functions and Out of Office routing');
    await page.getByRole('link', { name: 'Special Functions' }).click();
    await page.getByRole('link', { name: 'Out Of Office' }).click();
    
    Logger.info('Majesco E2E smoke test completed successfully');
  });
});
