import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * OrderConfirmationPage class
 * Handles interactions and assertions on order confirmation page including:
 * - Verifying order placement
 * - Downloading invoice
 * - Clicking continue
 */
export class OrderConfirmationPage extends BasePage {
  readonly orderPlacedMessage: Locator;
  readonly successMessage: Locator;
  readonly continueButton: Locator;
  readonly downloadInvoiceButton: Locator;

  constructor(page: Page) {
    super(page);

    // Locators for confirmation messages and buttons
    this.orderPlacedMessage = page.locator('[data-qa="order-placed"]');
    this.successMessage = page.locator('text=Congratulations! Your order has been confirmed!');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.downloadInvoiceButton = page.locator('a:has-text("Download Invoice")');
  }

  /** Assert order placed message is visible */
  async assertOrderPlaced(): Promise<void> {
    await expect(this.orderPlacedMessage).toBeVisible();
  }

  /** Assert success message is visible */
  async assertSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  /** Click Continue button */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /** Download the invoice and return the download object */
  async downloadInvoice(): Promise<any> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceButton.click()
    ]);
    return download;
  }

  /** Check if Download Invoice button is visible */
  async isDownloadInvoiceVisible(): Promise<boolean> {
    return await this.downloadInvoiceButton.isVisible();
  }
}
