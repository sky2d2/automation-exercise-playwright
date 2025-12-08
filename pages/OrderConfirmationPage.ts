// pages/OrderConfirmationPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly orderPlacedMessage: Locator;
  readonly successMessage: Locator;
  readonly continueButton: Locator;
  readonly downloadInvoiceButton: Locator;

  constructor(page: Page) {
    super(page);
    this.orderPlacedMessage = page.locator('[data-qa="order-placed"]');
    this.successMessage = page.locator('text=Congratulations! Your order has been confirmed!');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.downloadInvoiceButton = page.locator('a:has-text("Download Invoice")');
  }

  async assertOrderPlaced(): Promise<void> {
    await expect(this.orderPlacedMessage).toBeVisible();
  }

  async assertSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async downloadInvoice(): Promise<any> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceButton.click()
    ]);
    return download;
  }

  async isDownloadInvoiceVisible(): Promise<boolean> {
    return await this.downloadInvoiceButton.isVisible();
  }
}
