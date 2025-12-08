// pages/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartInfoTable: Locator;
  readonly cartProducts: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly deleteButtons: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartInfoTable = page.locator('#cart_info_table');
    this.cartProducts = page.locator('.cart_description');
    this.proceedToCheckoutButton = page.locator('text=Proceed To Checkout');
    this.deleteButtons = page.locator('.cart_quantity_delete');
    this.emptyCartMessage = page.locator('text=Cart is empty');
  }

  async gotoCartPage(): Promise<void> {
    await this.goto('/view_cart');
  }

  async assertCartPageVisible(): Promise<void> {
    await expect(this.cartInfoTable).toBeVisible();
  }

  async assertProductInCart(productName: string): Promise<void> {
    await expect(this.page.locator(`text=${productName}`)).toBeVisible();
  }

  async getProductQuantity(productName: string): Promise<string> {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    return await row.locator('.cart_quantity button').textContent() || '0';
  }

  async getProductPrice(productName: string): Promise<string> {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    return await row.locator('.cart_price p').textContent() || '0';
  }

  async getProductTotal(productName: string): Promise<string> {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    return await row.locator('.cart_total_price').textContent() || '0';
  }

  async getCartProductCount(): Promise<number> {
    return await this.cartProducts.count();
  }

  async deleteProduct(productName: string): Promise<void> {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    await row.locator('.cart_quantity_delete').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
