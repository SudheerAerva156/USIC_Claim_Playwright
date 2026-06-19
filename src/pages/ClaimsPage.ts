import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class ClaimsPage extends BasePage {
  /**
   * Searches for a claim number in the dashboard.
   */
  public async searchClaim(claimNumber: string): Promise<void> {
    Logger.info(`Searching for claim number: '${claimNumber}'`);
    await this.fill('claims.claimSearchInput', claimNumber);
    await this.click('claims.claimSearchButton');
  }

  /**
   * Triggers the "New Claim" wizard button.
   */
  public async clickCreateNewClaim(): Promise<void> {
    Logger.info('Clicking "New Claim" button');
    await this.click('claims.createNewClaimBtn');
  }

  /**
   * Fills the claim form inputs.
   */
  public async fillClaimForm(claimantName: string, amount: string, claimType: string): Promise<void> {
    Logger.info(`Filling claim form (Name: ${claimantName}, Amount: ${amount}, Type: ${claimType})`);
    await this.fill('claims.claimantNameInput', claimantName);
    await this.fill('claims.claimAmountInput', amount);
    
    // Select dropdown option
    const dropdown = this.getLocator('claims.claimTypeSelect');
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.selectOption({ label: claimType });
  }

  /**
   * Submits the filled claim.
   */
  public async submitClaim(): Promise<void> {
    Logger.info('Submitting new claim');
    await this.click('claims.submitClaimBtn');
  }

  /**
   * Combines creation actions in a single helper.
   */
  public async createNewClaim(claimantName: string, amount: string, claimType: string): Promise<void> {
    await this.clickCreateNewClaim();
    await this.fillClaimForm(claimantName, amount, claimType);
    await this.submitClaim();
  }

  /**
   * Retrieves the claim number from details page.
   */
  public async getClaimNumber(): Promise<string> {
    return await this.getText('claims.claimNumberLabel');
  }

  /**
   * Retrieves the claim status.
   */
  public async getClaimStatus(): Promise<string> {
    return await this.getText('claims.claimStatusLabel');
  }

  /**
   * Checks if the claim details panel is loaded.
   */
  public async isClaimDetailsVisible(): Promise<boolean> {
    return await this.isVisible('claims.claimDetailsContainer');
  }
}
