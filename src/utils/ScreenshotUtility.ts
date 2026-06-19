import { Page, TestInfo } from '@playwright/test';
import { Logger } from './Logger';

export class ScreenshotUtility {
  /**
   * Captures a full page screenshot and attaches it to the current Playwright test reporter (Allure/HTML).
   *
   * @param page The Playwright Page instance
   * @param testInfo The Playwright TestInfo metadata instance
   * @param name Name of the attachment
   */
  public static async captureAndAttach(page: Page, testInfo: TestInfo, name: string = 'Failure-Screenshot'): Promise<void> {
    try {
      Logger.info(`Capturing screenshot: '${name}'`);
      const screenshotBuffer = await page.screenshot({ fullPage: true });
      await testInfo.attach(name, {
        body: screenshotBuffer,
        contentType: 'image/png'
      });
      Logger.info(`Successfully attached screenshot: '${name}'`);
    } catch (e) {
      Logger.error(`Failed to capture screenshot: '${name}'`, e);
    }
  }
}
