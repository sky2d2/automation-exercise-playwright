// pages/CheckoutPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly deliveryAddressSection: Locator;
  readonly billingAddressSection: Locator;
  readonly commentTextarea: Locator;
  readonly placeOrderButton: Locator;
  readonly registerLoginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddressSection = page.locator('#address_delivery');
    this.billingAddressSection = page.locator('#address_invoice');
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a:has-text("Place Order")');
    this.registerLoginLink = page.locator('text=Register / Login');
  }

  async gotoCheckoutPage(): Promise<void> {
    await this.goto('/checkout');
  }

  async assertCheckoutPageVisible(): Promise<void> {
    await expect(this.deliveryAddressSection).toBeVisible();
    await expect(this.billingAddressSection).toBeVisible();
  }

  async verifyDeliveryAddress(name: string, address: string): Promise<void> {
    await expect(this.deliveryAddressSection.locator(`text=${name}`)).toBeVisible();
    await expect(this.deliveryAddressSection.locator(`text=${address}`)).toBeVisible();
  }

  async verifyBillingAddress(name: string, address: string): Promise<void> {
    await expect(this.billingAddressSection.locator(`text=${name}`)).toBeVisible();
    await expect(this.billingAddressSection.locator(`text=${address}`)).toBeVisible();
  }

  async addComment(comment: string): Promise<void> {
    await this.commentTextarea.fill(comment);
  }

  async clickPlaceOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  async clickRegisterLogin(): Promise<void> {
    await this.registerLoginLink.click();
  }
}
