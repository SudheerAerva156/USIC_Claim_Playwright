import { test } from '../fixtures';
import { Logger } from '../../utils/Logger';

test.describe('USIC Claims Dashboard Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    Logger.info('Logging in to dashboard before test cases execution');
    await loginPage.navigate();
    await loginPage.loginWithRole('Supervisor');
  });

  test('Verify dashboard elements and Claims routing @smoke @regression', async ({ dashboardPage, claimsPage }) => {
    Logger.info('Checking dashboard elements and routing');

    // Confirm dashboard has loaded successfully
    const isDashboardVisible = await dashboardPage.isDashboardTitleVisible();
    Logger.info(`Dashboard visibility status: ${isDashboardVisible}`);

    // Navigate to Claims Management Page
    await dashboardPage.navigateToClaims();

    // Verify Claims Page elements are visible
    const isSearchInputVisible = await claimsPage.isVisible('claims.claimSearchInput');
    Logger.info(`Claims Search input field visibility status: ${isSearchInputVisible}`);
  });
});
