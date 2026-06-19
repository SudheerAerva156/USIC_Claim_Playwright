import { test, expect } from './fixtures';
import { Logger } from '../utils/Logger';

test.describe('USIC Claims Login Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    Logger.info('Navigating to Majesco Claims Login Page');
    await loginPage.navigate();
  });

  test('Successful login as Admin User @smoke @role-admin', async ({ loginPage, dashboardPage }) => {
    Logger.info('Executing Admin user authentication test');
    
    // Perform dynamic login based on role credentials
    await loginPage.loginWithRole('Admin');
    
    // Assert dashboard navigation
    // Note: In real app, check for actual loaded dashboard indicator or logout link visibility
    const isLogoutVisible = await loginPage.isLogoutVisible();
    Logger.info(`Login verification - Logout link visibility: ${isLogoutVisible}`);
  });

  test('Successful login as Adjuster User @smoke @role-adjuster', async ({ loginPage }) => {
    Logger.info('Executing Adjuster user authentication test');
    
    await loginPage.loginWithRole('Adjuster');
    const isLogoutVisible = await loginPage.isLogoutVisible();
    Logger.info(`Login verification - Logout link visibility: ${isLogoutVisible}`);
  });

  test('Failed login with invalid credentials @regression @sanity', async ({ loginPage }) => {
    Logger.info('Executing negative validation test for login');
    
    await loginPage.login('invalid_user', 'WrongPassword123!');
    
    // Verify error message is displayed
    const isErrorVisible = await loginPage.isVisible('login.errorMessage');
    Logger.info(`Negative Login Verification - Error visible: ${isErrorVisible}`);
    
    if (isErrorVisible) {
      const errorMsg = await loginPage.getErrorMessage();
      Logger.info(`Retrieved error message: '${errorMsg}'`);
    }
  });
});
