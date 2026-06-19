import loginLocators from '../../locators/login.json';
import dashboardLocators from '../../locators/dashboard.json';
import claimsLocators from '../../locators/claims.json';

export class LocatorManager {
  private static readonly locatorsMap: Record<string, Record<string, string>> = {
    login: loginLocators as Record<string, string>,
    dashboard: dashboardLocators as Record<string, string>,
    claims: claimsLocators as Record<string, string>
  };

  /**
   * Retrieves a selector string by dynamic key.
   *
   * @param path A string path in the format: 'pageName.locatorKey' (e.g., 'login.usernameInput')
   */
  public static getLocator(path: string): string {
    const parts = path.split('.');
    if (parts.length !== 2) {
      throw new Error(`Invalid locator path format: '${path}'. Expected format is 'pageName.locatorKey' (e.g., 'login.usernameInput')`);
    }

    const [pageName, locatorKey] = parts;
    const pageMap = this.locatorsMap[pageName];
    if (!pageMap) {
      throw new Error(`Locator page mapping not found for: '${pageName}'. Supported pages: ${Object.keys(this.locatorsMap).join(', ')}`);
    }

    const selector = pageMap[locatorKey];
    if (!selector) {
      throw new Error(`Locator key: '${locatorKey}' not found in page: '${pageName}'.`);
    }

    return selector;
  }
}
