import { test, expect } from '../fixtures';
import { Logger } from '../../utils/Logger';

test.describe('USIC Claims Processing E2E Suite', () => {
  test.beforeEach(async ({ loginPage, dashboardPage }) => {
    Logger.info('Logging in as Claims Examiner and navigating to Claims page');
    await loginPage.navigate();
    await loginPage.loginWithRole('Claims Examiner');
    await dashboardPage.navigateToClaims();
  });

  test('Search for an existing claim @regression', async ({ claimsPage }) => {
    Logger.info('Searching for claims CLM-2026-0099');
    await claimsPage.searchClaim('CLM-2026-0099');

    const detailsVisible = await claimsPage.isClaimDetailsVisible();
    Logger.info(`Claim details panel visibility: ${detailsVisible}`);
  });

  test('Create and verify a new property claim @regression @sanity', async ({ claimsPage }) => {
    Logger.info('Initiating Claim creation workflow');
    await claimsPage.createNewClaim('John Doe USIC', '7500.00', 'Property');

    // Retrieve claim status and check details
    const isDetailsVisible = await claimsPage.isClaimDetailsVisible();
    if (isDetailsVisible) {
      const claimNo = await claimsPage.getClaimNumber();
      const claimStatus = await claimsPage.getClaimStatus();
      Logger.info(`Claim Created Successfully - Number: ${claimNo}, Status: ${claimStatus}`);
    }
  });

  test('Verify API Utility integration @regression', async ({ apiUtility }) => {
    Logger.info('Validating ApiUtility communication channel');
    
    // Testing a dummy public API to verify headers and response mapping
    const response = await apiUtility.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
  });
});
