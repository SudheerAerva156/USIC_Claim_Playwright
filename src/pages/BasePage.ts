import { Page, Locator } from '@playwright/test';
import { LocatorManager } from '../utils/LocatorManager';
import { Logger } from '../utils/Logger';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Resolves a locator dynamically by key from the locator repository.
   *
   * @param path Locator repository path, e.g. 'login.usernameInput'
   */
  protected getLocator(path: string): Locator {
    const selector = LocatorManager.getLocator(path);
    return this.page.locator(selector);
  }

  /**
   * Clicks an element after ensuring it's visible.
   */
  protected async click(path: string): Promise<void> {
    Logger.info(`Clicking element: '${path}'`);
    const locator = this.getLocator(path);
    await locator.first().waitFor({ state: 'visible' });
    await locator.first().click();
  }

  /**
   * Fills a text input after ensuring it's visible.
   */
  protected async fill(path: string, value: string): Promise<void> {
    const isSecret = path.toLowerCase().includes('password') || path.toLowerCase().includes('secret');
    Logger.info(`Filling field: '${path}' with value: '${isSecret ? '********' : value}'`);
    const locator = this.getLocator(path);
    await locator.first().waitFor({ state: 'visible' });
    await locator.first().fill(value);
  }

  /**
   * Retrieves text content from an element.
   */
  public async getText(path: string): Promise<string> {
    const locator = this.getLocator(path);
    await locator.first().waitFor({ state: 'visible' });
    const content = await locator.first().textContent();
    const result = content ? content.trim() : '';
    Logger.debug(`Retrieved text from '${path}': '${result}'`);
    return result;
  }

  /**
   * Checks if an element is visible on the page.
   */
  public async isVisible(path: string): Promise<boolean> {
    const locator = this.getLocator(path);
    const visible = await locator.first().isVisible();
    Logger.debug(`Element '${path}' visibility: ${visible}`);
    return visible;
  }

  /**
   * Navigates to a specific path relative to the baseURL.
   */
  public async navigate(urlPath: string = ''): Promise<void> {
    Logger.info(`Navigating to path: '${urlPath}'`);
    await this.page.goto(urlPath);
  }
}
