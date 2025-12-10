import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductDetailPage class
 * Handles interactions with the product detail page including:
 * - Viewing product information
 * - Updating quantity
 * - Adding to cart
 * - Submitting reviews
 */
export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextarea: Locator;
  readonly reviewSubmitButton: Locator;
  readonly reviewSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Locators for product information section
    this.productName = page.locator('.product-information h2');
    this.productPrice = page.locator('.product-information span span');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');

    // Locators for review section
    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextarea = page.locator('#review');
    this.reviewSubmitButton = page.locator('#button-review');
    this.reviewSuccessMessage = page.locator('text=Thank you for your review');
  }

  /**
   * Navigate to a specific product detail page
   * @param productId - Product ID, default 1
   */
  async gotoProductDetail(productId: number = 1): Promise<void> {
    await this.goto(`/product_details/${productId}`);
  }

  /** Get the product name as a string */
  async getProductName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? '';
  }

  /** Get the product price as a string */
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent())?.trim() ?? '';
  }

  /** Set the product quantity input */
  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
  }

  /** Get the currently set quantity */
  async getQuantity(): Promise<number> {
    return parseInt(await this.quantityInput.inputValue()) || 1;
  }

  /** Click 'Add to Cart' button */
  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /** Submit a product review */
  async addReview(name: string, email: string, review: string): Promise<void> {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextarea.fill(review);
    await this.reviewSubmitButton.click();
  }

  /** Assert review success message is visible */
  async assertReviewSuccess(): Promise<void> {
    await expect(this.reviewSuccessMessage).toBeVisible();
  }
}
