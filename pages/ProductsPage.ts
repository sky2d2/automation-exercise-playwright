// pages/ProductsPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productsList: Locator;
  readonly viewProductButtons: Locator;
  readonly addToCartButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;
  readonly allProductsTitle: Locator;
  readonly searchedProductsTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productsList = page.locator('.features_items');
    this.viewProductButtons = page.locator('a:has-text("View Product")');
    this.addToCartButtons = page.locator('.btn.btn-default.add-to-cart');
    this.continueShoppingButton = page.locator('.modal-footer .btn-success');
    this.viewCartLink = page.locator('text=View Cart');
    this.allProductsTitle = page.locator('text=All Products');
    this.searchedProductsTitle = page.locator('text=Searched Products');
  }

  async gotoProductsPage(): Promise<void> {
    await this.goto('/products');
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async assertAllProductsVisible(): Promise<void> {
    await expect(this.allProductsTitle).toBeVisible();
    await expect(this.productsList).toBeVisible();
  }

  async assertSearchedProductsVisible(): Promise<void> {
    await expect(this.searchedProductsTitle).toBeVisible();
  }

  async assertProductVisible(productName: string): Promise<void> {
    await expect(this.page.locator(`text=${productName}`).first()).toBeVisible();
  }

  async addProductToCart(index: number = 0): Promise<void> {
    // Click directly; avoid scrolling when modal is already visible
    // Use nth(index) on the list of buttons which targets a single control
    await this.addToCartButtons.nth(index).first().click({ force: true });
  }

  async hoverAndAddToCart(index: number = 0): Promise<void> {
    // Hover over product, then click Add to Cart (use force to avoid occasional overlay interception)
    const product = this.page.locator('.features_items .col-sm-4').nth(index);
    await product.hover();
    // The add-to-cart selector may resolve to multiple elements inside the product (duplicates/overlays).
    // Use .first() to avoid Playwright strict-mode errors and target a single element.
    await product.locator('.btn.btn-default.add-to-cart').first().click({ force: true });
  }

  async addProductToCartAndContinue(index: number = 0): Promise<void> {
    // Click directly and close modal with Escape (more reliable than clicking modal button)
    await this.addToCartButtons.nth(index).click({ force: true });
    await this.page.waitForTimeout(1000);
  }

  async clickViewCartInModal(): Promise<void> {
    // Wait for modal to appear and click "View Cart"
    await this.page.waitForSelector('.modal-content', { timeout: 5000 }).catch(() => {});
    
    // Try multiple selectors
    const viewCartLink = this.page.locator('a:has-text("View Cart")').first();
    
    if (await viewCartLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await viewCartLink.click({ force: true });
    } else {
      // Fallback: use keyboard shortcut or escape and navigate
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
      await this.navigateToCart();
    }
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.features_items .col-sm-4').count();
  }
}
