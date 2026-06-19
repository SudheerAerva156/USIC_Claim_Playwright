import { BasePage } from './BasePage';
import { CredentialManager, UserRole } from '../utils/CredentialManager';
import { Logger } from '../utils/Logger';

export class LoginPage extends BasePage {
  /**
   * Performs standard login with credentials.
   */
  public async login(username: string, password: string): Promise<void> {
    Logger.info(`Attempting login with username: '${username}'`);
    
    // Handle Cookie Policy Consent if present
    const cookieConsentLocator = this.page.locator('#cookieConsent');
    if (await cookieConsentLocator.isVisible()) {
      const isChecked = await cookieConsentLocator.isChecked();
      if (!isChecked) {
        Logger.info('Resolving Cookie Policy consent...');
        // Dispatch click on the link to show modal
        await this.page.locator('#aCookiePolicy').dispatchEvent('click');
        
        // Wait and click OK on the modal
        const modalOkBtn = this.page.locator('#modalConsentHdrBtnOk');
        await modalOkBtn.waitFor({ state: 'visible', timeout: 5000 });
        await modalOkBtn.click();
        
        // Wait for checkbox to become enabled
        await this.page.waitForFunction(() => {
          const cb = document.getElementById('cookieConsent') as HTMLInputElement | null;
          return cb && !cb.disabled;
        }, { timeout: 5000 });
        
        // Check the checkbox
        await cookieConsentLocator.check();
        Logger.info('Cookie Policy consent checked successfully.');
      }
    }

    await this.type('login.usernameInput', username);
    await this.type('login.passwordInput', password);
    await this.click('login.loginButton');
  }

  /**
   * Dynamically loads credentials for the role and performs login.
   *
   * @param role The target role (e.g. 'Admin', 'Supervisor')
   */
  public async loginWithRole(role: UserRole): Promise<void> {
    Logger.info(`Attempting dynamic login for role: '${role}'`);
    const credentials = CredentialManager.getCredentials(role);
    await this.login(credentials.username, credentials.password);
  }

  /**
   * Retrieves any visible login error message.
   */
  public async getErrorMessage(): Promise<string> {
    return await this.getText('login.errorMessage');
  }

  /**
   * Performs logout action.
   */
  public async logout(): Promise<void> {
    Logger.info('Logging out from the application');
    await this.click('login.logoutLink');
  }

  /**
   * Verifies if the logout link is visible.
   */
  public async isLogoutVisible(): Promise<boolean> {
    return await this.isVisible('login.logoutLink');
  }
}
