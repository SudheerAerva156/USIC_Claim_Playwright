import { BasePage } from './BasePage';
import { CredentialManager, UserRole } from '../utils/CredentialManager';
import { Logger } from '../utils/Logger';

export class LoginPage extends BasePage {
  /**
   * Performs standard login with credentials.
   */
  public async login(username: string, password: string): Promise<void> {
    Logger.info(`Attempting login with username: '${username}'`);
    await this.fill('login.usernameInput', username);
    await this.fill('login.passwordInput', password);
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
