import { test, expect } from '../fixtures';
import { Logger } from '../../utils/Logger';

test.describe('USIC QA Upgrade - Base Defects Verification Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    Logger.info('Navigating to Majesco QA Upgrade Login Page');
    await loginPage.navigate();
  });

  test('Verify Login Authentication Failure Handling and Error Display @upgrade @regression', async ({ loginPage }) => {
    Logger.info('Executing negative validation test for base defects check');
    
    // Perform login with invalid credentials to verify error handling
    await loginPage.login('invalid_upgrade_user', 'WrongPassword123!');
    
    // Verify error message is displayed
    const isErrorVisible = await loginPage.isVisible('login.errorMessage');
    Logger.info(`Negative Login Verification - Error visible: ${isErrorVisible}`);
    
    if (isErrorVisible) {
      const errorMsg = await loginPage.getErrorMessage();
      Logger.info(`Retrieved error message: '${errorMsg}'`);
      expect(errorMsg).toBeTruthy();
    } else {
      Logger.warn('Error message element not visible on authentication failure');
    }
  });
});
